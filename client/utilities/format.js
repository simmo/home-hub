export const toMbps = integer => `${(integer / 1000).toFixed(1)} Mbps`
export const toUppercaseFirst = string => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
export const pluralise = (integer, singular, plural) => integer === 1 ? singular : plural
export const decimalToPercent = (decimal, places = 0) => (decimal * 100).toFixed(places)
