import type { RaceRecord } from '@/services/localDb'

const baseUrl = import.meta.env.VITE_ARCHIVE_API_URL as string | undefined

export function archiveRace(record: RaceRecord): void {
  if (!baseUrl || typeof baseUrl !== 'string') return
  const url = baseUrl.replace(/\/$/, '') + '/api/races'
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(record),
  }).catch(() => {})
}
