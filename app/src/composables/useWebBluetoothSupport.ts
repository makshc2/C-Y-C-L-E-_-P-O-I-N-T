export default function ensureSupport(): string | null {
    if (!window.isSecureContext) {
        return 'Потрібен HTTPS або http://localhost (secure context).'
    }
    if (!('bluetooth' in navigator)) {
        return 'Браузер не підтримує Web Bluetooth або доступ заборонено.'
    }
    return null
}
