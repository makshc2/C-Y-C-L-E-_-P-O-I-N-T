export const INSTAGRAM_URL = 'https://www.instagram.com/cyclepoint_workshop/'

export const EVENTS_INSTAGRAM_URL = 'https://www.instagram.com/cyclepoint_kyiv/'

export const EVENTS_INSTAGRAM_EMBED_SRC =
  'https://www.instagram.com/cyclepoint_kyiv/embed'

export const WORKSHOP_PRICE_SHEET_SRC =
  'https://docs.google.com/spreadsheets/d/14uzzfjP3ak0qjtX2TAON8NrpXWkyL67amTsg15BW6Gc/preview?gid=0&rm=minimal&range=A1:C200'

export const CHARITY_RESULTS_SHEET_SRC =
  'https://docs.google.com/spreadsheets/d/1xZ0xpcZdbfgJJAIpr9FvPthXycFrIlzFFMQI8Jr_Rvs/preview?gid=0&rm=minimal&range=A1:F80'

export const COPYRIGHT_PATHS = ['/', '/charity'] as const

export type GeoPoint = {
  lat: number
  lng: number
}

export const VENUE = {
  name: 'Cycle Point',
  address: 'вул. Богдана Хмельницького, 58А, Київ',
  lat: 50.448291,
  lng: 30.50535,
} as const

export function getVenueDirectionsUrl(origin?: GeoPoint): string {
  const url = new URL('https://www.google.com/maps/dir/')
  url.searchParams.set('api', '1')
  url.searchParams.set('destination', `${VENUE.lat},${VENUE.lng}`)
  url.searchParams.set('travelmode', 'bicycling')
  if (origin) {
    url.searchParams.set('origin', `${origin.lat},${origin.lng}`)
  }
  return url.toString()
}

export function getVenueEmbedSrc(): string {
  const url = new URL('https://www.google.com/maps')
  url.searchParams.set('q', `${VENUE.name}@${VENUE.lat},${VENUE.lng}`)
  url.searchParams.set('ll', `${VENUE.lat},${VENUE.lng}`)
  url.searchParams.set('z', '17')
  url.searchParams.set('hl', 'uk')
  url.searchParams.set('output', 'embed')
  return url.toString()
}
