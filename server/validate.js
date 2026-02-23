function isNonEmptyString(x) {
  return typeof x === 'string' && x.trim().length > 0
}

function isRunner(obj) {
  return obj && typeof obj === 'object' &&
    isNonEmptyString(obj.name) &&
    (obj.color == null || typeof obj.color === 'string')
}

function isLap(obj) {
  return obj && typeof obj === 'object' &&
    typeof obj.atMeters === 'number' && obj.atMeters >= 0 &&
    typeof obj.atMs === 'number' && obj.atMs >= 0
}

function isLapArray(arr) {
  return Array.isArray(arr) && arr.every(isLap)
}

export function validateRaceRecord(body) {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'Body must be a JSON object' }
  }
  if (!isNonEmptyString(body.id)) {
    return { ok: false, error: 'id is required (non-empty string)' }
  }
  if (!isNonEmptyString(body.dateIso)) {
    return { ok: false, error: 'dateIso is required (ISO date string)' }
  }
  if (typeof body.finishMeters !== 'number' || body.finishMeters < 0) {
    return { ok: false, error: 'finishMeters must be a non-negative number' }
  }
  if (!isRunner(body.runner1)) {
    return { ok: false, error: 'runner1 must be { name: string, color?: string }' }
  }
  if (!isRunner(body.runner2)) {
    return { ok: false, error: 'runner2 must be { name: string, color?: string }' }
  }
  const w = body.winner
  if (w !== 1 && w !== 2 && w !== 'tie') {
    return { ok: false, error: 'winner must be 1, 2 or "tie"' }
  }
  if (body.time1 != null && (typeof body.time1 !== 'number' || body.time1 < 0)) {
    return { ok: false, error: 'time1 must be null or non-negative number' }
  }
  if (body.time2 != null && (typeof body.time2 !== 'number' || body.time2 < 0)) {
    return { ok: false, error: 'time2 must be null or non-negative number' }
  }
  if (!isLapArray(body.laps1)) {
    return { ok: false, error: 'laps1 must be array of { atMeters, atMs }' }
  }
  if (!isLapArray(body.laps2)) {
    return { ok: false, error: 'laps2 must be array of { atMeters, atMs }' }
  }
  return { ok: true }
}
