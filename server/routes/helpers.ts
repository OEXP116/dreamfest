export const eventDays = ['friday', 'saturday', 'sunday']

/**
 * Takes a string and capitalises the first letter.
 *
 * e.g. capitalise('tangle stage') => returns 'Tangle stage'
 * @param {string} name
 * @returns string
 */
export function capitalise(name: string) {
  if (typeof name !== 'string' || name.length === 0) return '';
  return name[0].toUpperCase() + name.substring(1)
}

/**
 * Ensures that @param day is a string and is a valid Event day
 * The default valid event days are: friday, saturday, and sunday
 *
 * If the input day is not valid, use the first valid day instead
 * @param {string} day
 * @param {string[]} days
 * @returns string
 */
export function validateDay(
  day: string | undefined,
  days?: string[],
  eventDaysOverride: string[] = eventDays
): string {
  const validDays = days ?? eventDaysOverride

  // Validate the 'days' array
  if (!Array.isArray(validDays) || !validDays.every(d => typeof d === 'string')) {
    throw new Error('days must be an array of strings')
  }

  if (typeof day !== 'string') return validDays[0]
  const lowerCaseDay = day.toLowerCase()
  return validDays.includes(lowerCaseDay) ? lowerCaseDay : validDays[0]
}





