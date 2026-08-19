export const INSTAGRAM_URL = 'https://www.instagram.com/cyclepoint_workshop/'

export const COPYRIGHT_PATHS = ['/', '/charity'] as const

export type GeoPoint = {
  lat: number
  lng: number
}

export const VENUE = {
  name: 'Cycle Point',
  address: 'вул. Богдана Хмельницького, 58А, Київ',
  lat: 50.4480618,
  lng: 30.5055842,
} as const

export function getVenueDirectionsUrl(origin?: GeoPoint): string {
  const url = new URL('https://www.google.com/maps/dir/')
  url.searchParams.set('api', '1')
  url.searchParams.set('destination', VENUE.address)
  url.searchParams.set('travelmode', 'bicycling')
  if (origin) {
    url.searchParams.set('origin', `${origin.lat},${origin.lng}`)
  }
  return url.toString()
}

export function getVenueEmbedSrc(): string {
  const url = new URL('https://www.google.com/maps')
  url.searchParams.set('q', VENUE.address)
  url.searchParams.set('ll', `${VENUE.lat},${VENUE.lng}`)
  url.searchParams.set('z', '17')
  url.searchParams.set('hl', 'uk')
  url.searchParams.set('output', 'embed')
  return url.toString()
}
