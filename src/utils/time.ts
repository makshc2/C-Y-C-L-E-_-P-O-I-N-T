export function formatTime(ms: number | null | undefined): string {
    if (ms == null) return '—'

    const totalSec = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSec / 60)
    const seconds = totalSec % 60
    const millis = Math.floor(ms % 1000)

    if (minutes > 0) {
        return `${minutes} хв ${seconds} сек`
    } else {
        return `${seconds}.${String(millis).padStart(3, '0')} сек`
    }
}
