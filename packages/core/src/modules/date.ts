import type { Random } from '../random'
import type { DateOptions } from '../types'

export class DateModule {
  constructor(private random: Random) {}

  /**
   * Generate a random date in the past
   * @example faker.date.past() // Date object from the past
   */
  past(options?: DateOptions & { years?: number }): Date {
    const years = options?.years ?? 1
    const to = options?.to ?? new Date()
    const from = options?.from ?? new Date(to.getTime() - years * 365 * 24 * 60 * 60 * 1000)

    return this.between({ from, to })
  }

  /**
   * Generate a random date in the future
   * @example faker.date.future() // Date object in the future
   */
  future(options?: DateOptions & { years?: number }): Date {
    const years = options?.years ?? 1
    const from = options?.from ?? new Date()
    const to = options?.to ?? new Date(from.getTime() + years * 365 * 24 * 60 * 60 * 1000)

    return this.between({ from, to })
  }

  /**
   * Generate a random date between two dates
   * @example faker.date.between({ from: new Date(2020, 0, 1), to: new Date(2025, 0, 1) })
   */
  between(options: DateOptions): Date {
    const from = options.from ?? new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
    const to = options.to ?? new Date()

    const fromTime = from.getTime()
    const toTime = to.getTime()

    const randomTime = this.random.int(fromTime, toTime)
    return new Date(randomTime)
  }

  /**
   * Generate a random recent date
   * @example faker.date.recent() // Date from the last few days
   */
  recent(options?: { days?: number }): Date {
    const days = options?.days ?? 1
    const to = new Date()
    const from = new Date(to.getTime() - days * 24 * 60 * 60 * 1000)

    return this.between({ from, to })
  }

  /**
   * Generate a random soon date
   * @example faker.date.soon() // Date in the next few days
   */
  soon(options?: { days?: number }): Date {
    const days = options?.days ?? 1
    const from = new Date()
    const to = new Date(from.getTime() + days * 24 * 60 * 60 * 1000)

    return this.between({ from, to })
  }

  /**
   * Generate a random month name
   * @example faker.date.month() // 'January'
   */
  month(): string {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    return this.random.arrayElement(months)
  }

  /**
   * Generate a random weekday name
   * @example faker.date.weekday() // 'Monday'
   */
  weekday(): string {
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    return this.random.arrayElement(weekdays)
  }

  /**
   * Laravel-compatible: Generate a random date time
   * @example faker.date.dateTime() // Date object
   */
  dateTime(): Date {
    return this.between({ from: new Date(1970, 0, 1), to: new Date() })
  }

  /**
   * Laravel-compatible: Generate a random date time between dates
   * @example faker.date.dateTimeBetween({ from: new Date(2020, 0, 1), to: new Date(2025, 0, 1) })
   */
  dateTimeBetween(options: DateOptions): Date {
    return this.between(options)
  }

  /**
   * Generate a random date of birth.
   *
   * Two modes mirror @faker-js/faker so existing factories migrate cleanly:
   *
   * - `mode: 'age'` (default) takes age bounds in years and returns a date
   *   that, evaluated against `today`, sits in `[min, max]` years.
   * - `mode: 'year'` takes calendar year bounds and returns a random date
   *   in any of those years.
   *
   * Defaults match @faker-js/faker: 18–80 years old in age mode.
   *
   * @example faker.date.birthdate({ min: 21, max: 70, mode: 'age' })
   * @example faker.date.birthdate({ min: 1950, max: 2005, mode: 'year' })
   */
  birthdate(options?: { min?: number, max?: number, mode?: 'age' | 'year', refDate?: Date }): Date {
    const mode = options?.mode ?? 'age'
    const refDate = options?.refDate ?? new Date()

    if (mode === 'year') {
      const minYear = options?.min ?? 1900
      const maxYear = options?.max ?? refDate.getUTCFullYear()
      const from = new Date(Date.UTC(minYear, 0, 1))
      const to = new Date(Date.UTC(maxYear, 11, 31, 23, 59, 59, 999))
      return this.between({ from, to })
    }

    // age mode: convert to year bounds. min age → most recent date, max age → oldest date.
    const minAge = Math.max(0, options?.min ?? 18)
    const maxAge = Math.max(minAge, options?.max ?? 80)
    const ms = (yrs: number): number => yrs * 365.25 * 24 * 60 * 60 * 1000
    const from = new Date(refDate.getTime() - ms(maxAge))
    const to = new Date(refDate.getTime() - ms(minAge))
    return this.between({ from, to })
  }
}
