export type Lap = { atMeters: number; atMs: number }

export type RaceRecord = {
    id: string
    dateIso: string
    finishMeters: number
    runner1: { name: string; color: string }
    runner2: { name: string; color: string }
    winner: 1 | 2 | 'tie'
    time1: number | null
    time2: number | null
    laps1: Lap[]
    laps2: Lap[]
}

const KEY = 'races_db_v1'

function loadAll(): RaceRecord[] {
    try {
        const raw = localStorage.getItem(KEY)
        return raw ? (JSON.parse(raw) as RaceRecord[]) : []
    } catch {
        return []
    }
}

function saveAll(list: RaceRecord[]) {
    localStorage.setItem(KEY, JSON.stringify(list))
}

export function addRace(r: RaceRecord) {
    const list = loadAll()
    list.unshift(r)
    saveAll(list)
}

export function getRaces(): RaceRecord[] {
    return loadAll()
}

export function clearRaces() {
    saveAll([])
}

export function deleteRace(id: string) {
    const list = loadAll().filter(r => r.id !== id)
    saveAll(list)
}
