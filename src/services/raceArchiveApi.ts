import type { RaceRecord } from '@/services/localDb'

const baseUrl = import.meta.env.VITE_ARCHIVE_API_URL as string | undefined

function apiUrl(path: string): string | undefined {
  if (!baseUrl || typeof baseUrl !== 'string') return undefined
  return baseUrl.replace(/\/$/, '') + path
}

export function archiveRace(record: RaceRecord): void {
  const url = apiUrl('/api/races')
  if (!url) return
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(record),
  }).catch(() => {})
}

export function fetchRaces(): Promise<RaceRecord[]> {
  const url = apiUrl('/api/races')
  if (!url) return Promise.resolve([])
  return fetch(url).then((r) => {
    if (!r.ok) throw new Error('Failed to fetch')
    return r.json()
  })
}

export const hasArchiveApi = Boolean(baseUrl)
