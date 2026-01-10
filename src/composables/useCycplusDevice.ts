import { ref, type Ref } from 'vue'

type UseCycplusOptions = {
    wheelCircumference: Ref<number>
    finishDistance: Ref<number>
    deviceName?: Ref<string>
    deviceNamePrefix?: Ref<string>
}

type CscCharacteristic = BluetoothRemoteGATTCharacteristic

export default function useCycplusDevice(opts: UseCycplusOptions) {
    const angle = ref<number>(-120)
    const targetAngle = ref<number>(-120)
    const speedKmh = ref<number>(0)
    const distanceM = ref<number>(0)
    const elapsedMs = ref<number>(0)
    const status = ref<string>('Очікування…')
    const deviceName = ref<string>('')

    let device: BluetoothDevice | null = null
    let characteristic: CscCharacteristic | null = null
    let savedDeviceId: string | null = null
    let reconnectAttempts = 0
    const MAX_RECONNECT_ATTEMPTS = 5

    let lastRevs = 0
    let lastTime1024 = 0

    let rafId: number | null = null
    function animateNeedle() {
        const cur = angle.value
        const tgt = targetAngle.value
        const delta = tgt - cur
        if (Math.abs(delta) > 0.1) {
            angle.value = cur + delta * 0.15
            rafId = requestAnimationFrame(animateNeedle)
        } else {
            angle.value = tgt
            rafId = null
        }
    }

    function setAngleByDistance(meters: number) {
        const maxDist = Math.max(1, opts.finishDistance.value)
        const capped = Math.min(Math.max(meters, 0), maxDist)
        targetAngle.value = -120 + (capped / maxDist) * 240
        if (rafId == null) rafId = requestAnimationFrame(animateNeedle)
    }

    function recalibrate() {
        setAngleByDistance(distanceM.value)
    }

    let startTs = 0
    let tickTimer: number | null = null
    function startElapsed() {
        startTs = performance.now()
        stopElapsed()
        tickTimer = window.setInterval(() => {
            elapsedMs.value = Math.max(0, performance.now() - startTs)
        }, 30)
    }
    function stopElapsed() {
        if (tickTimer) {
            clearInterval(tickTimer)
            tickTimer = null
        }
    }

    // let simTimer: number | null = null
    // function startSim(stepMetersPerTick = 40, tickMs = 1000) {
    //     stopSim()
    //     status.value = 'Симуляція…'
    //     if (elapsedMs.value === 0) startElapsed()
    //     simTimer = window.setInterval(() => {
    //         distanceM.value = Math.min(1000000, distanceM.value + stepMetersPerTick)
    //         const kmh = (stepMetersPerTick / (tickMs / 1000)) * 3.6
    //         speedKmh.value = kmh
    //         setAngleByDistance(distanceM.value)
    //     }, tickMs)
    // }
    // function stopSim() {
    //     if (simTimer) {
    //         clearInterval(simTimer)
    //         simTimer = null
    //         status.value = 'Зупинено'
    //     }
    // }

    async function connect(): Promise<'connected' | 'cancelled' | 'error'> {
        try {
            if (device && device.gatt && device.gatt.connected) {
                status.value = 'Вже підключено'
                return 'connected'
            }
            
            status.value = 'Запит пристрою…'
            let requestOptions: any = {
                optionalServices: [0x1816]
            }
            
            if (opts.deviceName && opts.deviceName.value) {
                requestOptions.filters = [{ name: opts.deviceName.value }]
            } else if (opts.deviceNamePrefix && opts.deviceNamePrefix.value) {
                requestOptions.filters = [{ namePrefix: opts.deviceNamePrefix.value }]
            } else {
                requestOptions.acceptAllDevices = true
            }
            
            const dev = await navigator.bluetooth.requestDevice(requestOptions)
            device = dev
            savedDeviceId = dev.id
            deviceName.value = dev.name || 'Невідомий пристрій'
            device.addEventListener('gattserverdisconnected', onDisconnected)
            reconnectAttempts = 0

            status.value = 'Підключення…'
            const server = await dev.gatt!.connect()
            
            if (!server.connected) {
                status.value = '❌ Помилка підключення'
                return 'error'
            }
            
            const service = await server.getPrimaryService(0x1816)
            characteristic = await service.getCharacteristic(0x2A5B)

            await characteristic.startNotifications()
            characteristic.addEventListener('characteristicvaluechanged', onCscNotification as EventListener)

            status.value = 'Підключено, очікую дані…'
            setAngleByDistance(distanceM.value)
            return 'connected'
        } catch (e: unknown) {
            const error = e as Error
            if (error?.name === 'NotFoundError' || error?.message?.includes('cancelled')) {
                status.value = 'Скасовано користувачем'
                return 'cancelled'
            }
            console.error('BLE error:', error)
            status.value = '❌ Помилка підключення'
            device = null
            characteristic = null
            return 'error'
        }
    }

    function onDisconnected(event: Event) {
        const disconnectedDevice = event.target as BluetoothDevice
        if (disconnectedDevice === device) {
            status.value = 'Роз\'єднано'
            stopElapsed()
            stopSpeedCheck()
            characteristic = null
            device = null
            if (isDataProcessingEnabled && savedDeviceId) {
                setTimeout(() => {
                    reconnect()
                }, 1000)
            }
        }
    }

    async function reconnect(): Promise<boolean> {
        if (!savedDeviceId || reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
            if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
                status.value = 'Не вдалося перепідключитися'
                deviceName.value = ''
                savedDeviceId = null
            }
            return false
        }

        try {
            reconnectAttempts++
            status.value = `Перепідключення... (${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})`
            
            if (device && device.gatt) {
                try {
                    const server = await device.gatt.connect()
                    
                    if (server.connected) {
                        const service = await server.getPrimaryService(0x1816)
                        characteristic = await service.getCharacteristic(0x2A5B)

                        await characteristic.startNotifications()
                        characteristic.addEventListener('characteristicvaluechanged', onCscNotification as EventListener)

                        status.value = 'Перепідключено'
                        reconnectAttempts = 0
                        setAngleByDistance(distanceM.value)
                        return true
                    }
                } catch (e) {
                    console.warn('Direct reconnect failed, trying full reconnect:', e)
                }
            }
            
            let requestOptions: any = {
                optionalServices: [0x1816]
            }
            
            if (opts.deviceName && opts.deviceName.value) {
                requestOptions.filters = [{ name: opts.deviceName.value }]
            } else if (opts.deviceNamePrefix && opts.deviceNamePrefix.value) {
                requestOptions.filters = [{ namePrefix: opts.deviceNamePrefix.value }]
            } else {
                requestOptions.acceptAllDevices = true
            }

            const dev = await navigator.bluetooth.requestDevice(requestOptions)
            
            if (dev.id !== savedDeviceId) {
                device = dev
                savedDeviceId = dev.id
            } else {
                device = dev
            }
            
            deviceName.value = dev.name || 'Невідомий пристрій'
            device.addEventListener('gattserverdisconnected', onDisconnected)

            const server = await dev.gatt!.connect()
            
            if (!server.connected) {
                throw new Error('Server not connected')
            }
            
            const service = await server.getPrimaryService(0x1816)
            characteristic = await service.getCharacteristic(0x2A5B)

            await characteristic.startNotifications()
            characteristic.addEventListener('characteristicvaluechanged', onCscNotification as EventListener)

            status.value = 'Перепідключено'
            reconnectAttempts = 0
            setAngleByDistance(distanceM.value)
            return true
        } catch (e: unknown) {
            console.error('Reconnection error:', e)
            const error = e as Error
            if (error?.name === 'NotFoundError' || error?.message?.includes('cancelled')) {
                status.value = 'Перепідключення скасовано'
                return false
            }
            if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
                setTimeout(() => {
                    reconnect()
                }, 2000)
            } else {
                status.value = 'Не вдалося перепідключитися'
                deviceName.value = ''
                savedDeviceId = null
            }
            return false
        }
    }

    async function disconnect() {
        try {
            isDataProcessingEnabled = false
            reconnectAttempts = MAX_RECONNECT_ATTEMPTS
            
            if (characteristic) {
                try {
                    await characteristic.stopNotifications()
                } catch (e) {
                    console.warn('Error stopping notifications:', e)
                }
                try {
                    characteristic.removeEventListener('characteristicvaluechanged', onCscNotification as EventListener)
                } catch (e) {
                    console.warn('Error removing event listener:', e)
                }
                characteristic = null
            }
            if (device) {
                try {
                    device.removeEventListener('gattserverdisconnected', onDisconnected)
                } catch (e) {
                    console.warn('Error removing disconnect listener:', e)
                }
                if (device.gatt && device.gatt.connected) {
                    try {
                        await device.gatt.disconnect()
                    } catch (e) {
                        console.warn('Error disconnecting GATT:', e)
                    }
                }
            }
            device = null
            deviceName.value = ''
            savedDeviceId = null
            status.value = 'Відключено'
            stopElapsed()
            stopSpeedCheck()
        } catch (e) {
            console.error('Error disconnecting:', e)
            device = null
            characteristic = null
            deviceName.value = ''
            savedDeviceId = null
            status.value = 'Відключено'
            stopSpeedCheck()
        }
    }

    let isClockRunning = false
    let isDataProcessingEnabled = false
    let lastSpeedUpdateTime = 0
    let speedCheckTimer: number | null = null

    function onCscNotification(event: Event) {
        if (!isDataProcessingEnabled) return
        
        try {
            const char = event.target as BluetoothRemoteGATTCharacteristic
            if (!char || !char.value) return
            
            const dv = char.value as DataView
            if (!dv || dv.byteLength < 7) return
            
            const flags = dv.getUint8(0)
            const wheelPresent = (flags & 0x01) !== 0
            if (!wheelPresent) return

            const cumulativeRevs = dv.getUint32(1, true)
            const lastWheelEventTime = dv.getUint16(5, true)

            if (lastTime1024 !== 0 && cumulativeRevs !== lastRevs) {
                const deltaRevs = cumulativeRevs - lastRevs
                const deltaTimeSec = ((lastWheelEventTime - lastTime1024 + 65536) % 65536) / 1024
                const wheelCirc = opts.wheelCircumference.value
                const instSpeedKmh = (deltaRevs * wheelCirc) / Math.max(1e-6, deltaTimeSec) * 3.6
                speedKmh.value = instSpeedKmh
                distanceM.value += deltaRevs * wheelCirc
                setAngleByDistance(distanceM.value)
                lastSpeedUpdateTime = performance.now()
            }

            lastRevs = cumulativeRevs
            lastTime1024 = lastWheelEventTime
        } catch (error) {
            console.error('Error processing CSC notification:', error)
            if (device && device.gatt && !device.gatt.connected) {
                status.value = 'Роз\'єднано'
                stopElapsed()
                device = null
                characteristic = null
            }
        }
    }

    function startSpeedCheck() {
        stopSpeedCheck()
        speedCheckTimer = window.setInterval(() => {
            if (isDataProcessingEnabled && lastSpeedUpdateTime > 0) {
                const timeSinceLastUpdate = performance.now() - lastSpeedUpdateTime
                if (timeSinceLastUpdate > 2000) {
                    speedKmh.value = 0
                }
            }
        }, 500)
    }

    function stopSpeedCheck() {
        if (speedCheckTimer) {
            clearInterval(speedCheckTimer)
            speedCheckTimer = null
        }
    }

    function startClock() {
        if (!isClockRunning) {
            isDataProcessingEnabled = true
            startElapsed()
            isClockRunning = true
            lastSpeedUpdateTime = performance.now()
            startSpeedCheck()
            status.value = 'Гонка активна'
        }
    }

    function stopClock() {
        // stopSim()
        stopElapsed()
        stopSpeedCheck()
        isClockRunning = false
        isDataProcessingEnabled = false
        status.value = 'Зупинено'
    }

    function stopDataProcessing() {
        isDataProcessingEnabled = false
        stopElapsed()
        stopSpeedCheck()
        status.value = 'Фініш досягнуто'
    }

    function reset() {
        // stopSim()
        stopElapsed()
        stopSpeedCheck()
        isClockRunning = false
        isDataProcessingEnabled = false
        reconnectAttempts = 0
        speedKmh.value = 0
        distanceM.value = 0
        elapsedMs.value = 0
        angle.value = -120
        targetAngle.value = -120
        status.value = 'Скинуто'
        deviceName.value = ''
        savedDeviceId = null
        lastRevs = 0
        lastTime1024 = 0
        lastSpeedUpdateTime = 0
    }

    function isConnected(): boolean {
        return !!(device && device.gatt && device.gatt.connected)
    }

    return {
        angle, targetAngle, speedKmh, distanceM, elapsedMs, status, deviceName,
        connect, disconnect, reconnect, reset, recalibrate, startClock, stopClock, stopDataProcessing, isConnected,
        // startSim, stopSim
    }
}
