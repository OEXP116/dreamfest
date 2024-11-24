import { describe, expect, test } from 'vitest'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { capitalise, validateDay } from '../routes/helpers.ts'

// TODO: Write these tests (remove .todo)
describe('capitalise', () => {
  test('returns a capitalised string', () => {
    expect(capitalise('hello')).toBe('Hello');
    expect(capitalise('world')).toBe('World');
  });

  // TODO: Implement this functionality in helpers.js
  test('returns an empty string if the name argument is not a string', () => {
    expect(capitalise(123 as unknown as string)).toBe('');
    expect(capitalise(null as unknown as string)).toBe('');
    expect(capitalise(undefined as unknown as string)).toBe('');
  });

    // TODO: Implement this functionality in helpers.js
  test('returns an empty string if the name argument is an empty string', () => {
    expect(capitalise('')).toBe('');
  });
});



// TODO: Write these tests (remove .todo)
describe('validateDay', () => {
  test.todo("returns the day if it exists in the supplied 'days' array")

  test.todo(
    "returns the first day from the supplied 'days' array if 'day' is not in that array"
  )

  test.todo(
    "returns the day from 'eventDays' if 'day' exists in 'eventDays' and no 'days' argument is provided"
  )

  test.todo(
    "returns 'friday' if 'day' does not exist in 'eventDays' and no 'days' argument is provided"
  )

  // TODO: Implement this functionality in helpers.js
  test.todo("returns the matching lowercase day if 'day' is uppercase")

  // TODO: Implement this functionality in helpers.js
  test.todo('throws an error if the days argument is not an array of strings')
})
