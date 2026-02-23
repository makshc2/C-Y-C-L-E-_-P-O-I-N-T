import Database from 'better-sqlite3'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dataDir = join(__dirname, 'data')
const dbPath = process.env.SQLITE_PATH || join(dataDir, 'races.db')
if (!process.env.SQLITE_PATH && !fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

let db

function getDb() {
  if (!db) {
    db = new Database(dbPath)
    db.pragma('journal_mode = WAL')
    const stmt = db.prepare(`
      CREATE TABLE IF NOT EXISTS races (
        id TEXT PRIMARY KEY,
        date_iso TEXT NOT NULL,
        finish_meters INTEGER NOT NULL,
        runner1 TEXT NOT NULL,
        runner2 TEXT NOT NULL,
        winner TEXT NOT NULL,
        time1 INTEGER,
        time2 INTEGER,
        laps1 TEXT NOT NULL,
        laps2 TEXT NOT NULL,
        created_at TEXT DEFAULT (datetime('now'))
      )
    `)
    stmt.run()
  }
  return db
}

export function insertRace(row) {
  const database = getDb()
  const stmt = database.prepare(`
    INSERT INTO races (id, date_iso, finish_meters, runner1, runner2, winner, time1, time2, laps1, laps2)
    VALUES (@id, @date_iso, @finish_meters, @runner1, @runner2, @winner, @time1, @time2, @laps1, @laps2)
  `)
  stmt.run({
    id: row.id,
    date_iso: row.dateIso,
    finish_meters: row.finishMeters,
    runner1: JSON.stringify(row.runner1),
    runner2: JSON.stringify(row.runner2),
    winner: String(row.winner),
    time1: row.time1 ?? null,
    time2: row.time2 ?? null,
    laps1: JSON.stringify(row.laps1 ?? []),
    laps2: JSON.stringify(row.laps2 ?? []),
  })
}

export function initDb() {
  getDb()
}
