import express from 'express'
import cors from 'cors'
import { initDb, insertRace } from './db.js'
import { validateRaceRecord } from './validate.js'

initDb()

const app = express()
const port = Number(process.env.PORT) || 3000

app.use(cors({ origin: true }))
app.use(express.json({ limit: '512kb' }))

app.post('/api/races', (req, res) => {
  const validation = validateRaceRecord(req.body)
  if (!validation.ok) {
    res.status(400).json({ error: validation.error })
    return
  }
  try {
    insertRace(req.body)
    res.status(201).json({ id: req.body.id })
  } catch (e) {
    if (e.code === 'SQLITE_CONSTRAINT_PRIMARYKEY') {
      res.status(409).json({ error: 'Race with this id already exists' })
      return
    }
    console.error(e)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})
