import { describe, expect, it } from 'bun:test'
import { faker } from '../packages/core/src'

/**
 * The date helpers used to require `Date` instances and nothing else. An ISO
 * string went straight through to `from.getTime()` and threw
 * "getTime is not a function" from inside the module, which reads as a bug in
 * the library rather than a wrong argument — and in a seeder, where the call
 * sits inside a factory whose failures are caught and defaulted away, it
 * showed up only as a column full of nulls.
 */
describe('date bounds', () => {
  it('accepts ISO strings', () => {
    const date = faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2020-12-31T00:00:00.000Z' })

    expect(date).toBeInstanceOf(Date)
    expect(date.getUTCFullYear()).toBe(2020)
  })

  it('accepts millisecond timestamps', () => {
    const from = Date.UTC(2015, 0, 1)
    const to = Date.UTC(2015, 11, 31)

    const date = faker.date.between({ from, to })

    expect(date.getTime()).toBeGreaterThanOrEqual(from)
    expect(date.getTime()).toBeLessThanOrEqual(to)
  })

  it('still accepts Date instances', () => {
    const from = new Date('2001-01-01T00:00:00.000Z')
    const to = new Date('2001-06-01T00:00:00.000Z')

    const date = faker.date.between({ from, to })

    expect(date.getTime()).toBeGreaterThanOrEqual(from.getTime())
    expect(date.getTime()).toBeLessThanOrEqual(to.getTime())
  })

  it('coerces the bounds of past() and future() too', () => {
    const past = faker.date.past({ to: '2010-01-01T00:00:00.000Z' })
    const future = faker.date.future({ from: '2030-01-01T00:00:00.000Z' })

    expect(past.getTime()).toBeLessThanOrEqual(Date.UTC(2010, 0, 1))
    expect(future.getTime()).toBeGreaterThanOrEqual(Date.UTC(2030, 0, 1))
  })

  it('names the offending bound when it cannot be parsed', () => {
    expect(() => faker.date.between({ from: 'the day before yesterday' })).toThrow(/`from`/)
  })
})
