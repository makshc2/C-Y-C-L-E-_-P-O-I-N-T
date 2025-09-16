// src/composables/useCycplusDevice.ts
import { ref, type Ref } from 'vue'

type UseCycplusOptions = {
    wheelCircumference: Ref<number> // довжина кола колеса, м
}

type CscCharacteristic = BluetoothRemoteGATTCharacteristic

export default function useCycplusDevice(opts: UseCycplusOptions) {
    // реактивний стан
    const angle = ref<number>(-120)           // поточний кут стрілки
    const targetAngle = ref<number>(-120)     // цільовий кут
    const speedKmh = ref<number>(0)
    const distanceM = ref<number>(0)
    const elapsedMs = ref<number>(0)
    const status = ref<string>('Очікування…')

    // BLE
    let device: BluetoothDevice | null = null
    let characteristic: CscCharacteristic | null = null

    // дані CSC
    let lastRevs = 0
    let lastTime1024 = 0

    // анімація стрілки
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
        // шкала 0..200 м → -120..+120
        const capped = Math.min(Math.max(meters, 0), 200)
        targetAngle.value = -120 + (capped / 200) * 240
        if (rafId == null) rafId = requestAnimationFrame(animateNeedle)
    }

    // таймер гонки
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

    // симуляція (для розробки)
    let simTimer: number | null = null
    function startSim(stepMetersPerTick = 40, tickMs = 1000) {
        stopSim()
        status.value = 'Симуляція…'
        if (elapsedMs.value === 0) startElapsed()
        simTimer = window.setInterval(() => {
            distanceM.value = Math.min(10000, distanceM.value + stepMetersPerTick)
            // проста модель швидкості: крок/сек → м/с → км/год
            const kmh = (stepMetersPerTick / (tickMs / 1000)) * 3.6
            speedKmh.value = kmh
            setAngleByDistance(distanceM.value)
        }, tickMs)
    }
    function stopSim() {
        if (simTimer) {
            clearInterval(simTimer)
            simTimer = null
            status.value = 'Зупинено'
        }
    }

    // BLE підключення
    async function connect() {
        try {
            status.value = 'Запит пристрою…'
            device = await navigator.bluetooth.requestDevice({
                filters: [{ namePrefix: 'CYCPLUS' }],
                optionalServices: [0x1816] // CSC service
            })
            device.addEventListener('gattserverdisconnected', onDisconnected)

            status.value = 'Підключення…'
            const server = await device.gatt!.connect()
            const service = await server.getPrimaryService(0x1816)
            characteristic = await service.getCharacteristic(0x2A5B)

            await characteristic.startNotifications()
            characteristic.addEventListener('characteristicvaluechanged', onCscNotification as any)

            status.value = 'Підключено'
            if (elapsedMs.value === 0) startElapsed()
        } catch (e: any) {
            console.error('BLE error:', e)
            status.value = '❌ Помилка підключення'
        }
    }

    function onDisconnected() {
        status.value = 'Роз’єднано'
    }

    // Обробка CSC Measurement (спиці колеса)
    function onCscNotification(event: Event) {
        const dv = (event as any).target.value as DataView
        const flags = dv.getUint8(0)
        const wheelPresent = (flags & 0x01) !== 0
        if (!wheelPresent) return

        const cumulativeRevs = dv.getUint32(1, true)
        const lastWheelEventTime = dv.getUint16(5, true) // 1/1024 сек

        if (lastTime1024 !== 0 && cumulativeRevs !== lastRevs) {
            const deltaRevs = cumulativeRevs - lastRevs
            // врахування overflow (модуль 65536)
            const deltaTimeSec = ((lastWheelEventTime - lastTime1024 + 65536) % 65536) / 1024

            const wheelCirc = opts.wheelCircumference.value // м
            const instSpeedKmh = (deltaRevs * wheelCirc) / Math.max(1e-6, deltaTimeSec) * 3.6
            speedKmh.value = instSpeedKmh
            distanceM.value += deltaRevs * wheelCirc

            setAngleByDistance(distanceM.value)
            if (elapsedMs.value === 0) startElapsed()
        }

        lastRevs = cumulativeRevs
        lastTime1024 = lastWheelEventTime
    }

    // Скидання стану
    function reset() {
        stopSim()
        stopElapsed()
        speedKmh.value = 0
        distanceM.value = 0
        elapsedMs.value = 0
        angle.value = -120
        targetAngle.value = -120
        status.value = 'Скинуто'
        lastRevs = 0
        lastTime1024 = 0
    }

    return {
        // state
        angle, targetAngle, speedKmh, distanceM, elapsedMs, status,
        // actions
        connect, startSim, stopSim, reset
    }
}
