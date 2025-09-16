import { ref, watch, type Ref } from 'vue'

type Options = {
    color?: string
    wheelCircumference: Ref<number>
}

export default function useCycplusDevice(opts: Options) {
    const wheelCirc = opts.wheelCircumference

    const speedKmh = ref(0)
    const distanceM = ref(0)
    const angle = ref(-120)
    const targetAngle = ref(-120)
    const status = ref('')

    let lastRevs = 0
    let lastTime1024 = 0

    const elapsedMs = ref(0)
    let startedAt = 0
    let tickInterval: number | null = null

    let animFrame: number | null = null
    const animateNeedle = () => {
        const diff = targetAngle.value - angle.value
        if (Math.abs(diff) > 0.1) {
            angle.value += diff * 0.1
            animFrame = requestAnimationFrame(animateNeedle)
        } else {
            angle.value = targetAngle.value
            if (animFrame) {
                cancelAnimationFrame(animFrame)
                animFrame = null
            }
        }
    }

    const setDistance = (dist: number) => {
        const capped = Math.min(Math.max(dist, 0), 200)
        targetAngle.value = -120 + (capped / 200) * 240
        if (!animFrame) animFrame = requestAnimationFrame(animateNeedle)

        if (dist > 0 && !tickInterval) {
            startedAt = performance.now()
            tickInterval = window.setInterval(() => {
                elapsedMs.value = performance.now() - startedAt
            }, 30)
        }
    }

    const connect = async () => {
        try {
            status.value = 'Запит доступу до Bluetooth…'
            const device = await navigator.bluetooth.requestDevice({
                // filters: [{ namePrefix: 'CYCPLUS' }],
                acceptAllDevices: true,
                optionalServices: [0x1816],
            })

            const server = await device.gatt!.connect()
            const service = await server.getPrimaryService(0x1816)
            const characteristic = await service.getCharacteristic(0x2A5B)

            await characteristic.startNotifications()
            characteristic.addEventListener('characteristicvaluechanged', handleCSCMeasurement)
            status.value = 'Підключено!'
        } catch (e) {
            console.error(e)
            status.value = '❌ Помилка підключення'
        }
    }

    const handleCSCMeasurement = (event: Event) => {
        const dv = (event.target as BluetoothRemoteGATTCharacteristic).value
        if (!dv) return

        const flags = dv.getUint8(0)
        const wheelPresent = (flags & 0x01) !== 0

        if (!wheelPresent) return

        const cumulativeRevs = dv.getUint32(1, true)
        const lastWheelEventTime = dv.getUint16(5, true)

        if (lastTime1024 !== 0 && cumulativeRevs !== lastRevs) {
            const deltaRevs = cumulativeRevs - lastRevs
            const deltaTsec = ((lastWheelEventTime - lastTime1024 + 0x10000) % 0x10000) / 1024

            const instMs = deltaRevs * wheelCirc.value
            const instKmh = (instMs / deltaTsec) * 3.6
            speedKmh.value = isFinite(instKmh) ? instKmh : 0

            distanceM.value += instMs
            setDistance(distanceM.value)
        }

        lastRevs = cumulativeRevs
        lastTime1024 = lastWheelEventTime
    }

    let simInt: number | null = null
    const startSim = (metersPerTick = 40, periodMs = 1000) => {
        stopSim()
        simInt = window.setInterval(() => {
            distanceM.value = Math.min(distanceM.value + metersPerTick, 1000)
            speedKmh.value = 10 + Math.abs(Math.sin(distanceM.value / 50)) * 25
            setDistance(distanceM.value)
        }, periodMs)
    }
    const stopSim = () => {
        if (simInt) {
            clearInterval(simInt)
            simInt = null
        }
    }

    watch(wheelCirc, () => {
        speedKmh.value = 0
    })

    return {
        speedKmh,
        distanceM,
        angle,
        targetAngle,
        status,
        elapsedMs,
        connect,
        startSim,
        stopSim,
    }
}
