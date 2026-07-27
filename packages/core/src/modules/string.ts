import type { Random } from '../random'
import type { StringOptions } from '../types'

/**
 * Read a length-or-options argument.
 *
 * `faker.string.alphanumeric(4)` is what people write, and taking only an
 * options object meant that call silently produced the default ten
 * characters: an argument accepted, ignored, and never reported.
 */
function asOptions<T extends StringOptions>(options?: number | T): T {
  return (typeof options === 'number' ? { length: options } : options ?? {}) as T
}

export class StringModule {
  constructor(private random: Random) {}

  /**
   * Generate a random UUID v4
   * @example faker.string.uuid() // '550e8400-e29b-41d4-a716-446655440000'
   */
  uuid(): string {
    // Optimized: use native crypto.randomUUID() when available and not seeded
    if (!this.random.isSeeded() && typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID()
    }

    // Fallback for seeded random or environments without crypto.randomUUID
    const hex = '0123456789abcdef'
    let result = ''

    for (let i = 0; i < 36; i++) {
      if (i === 8 || i === 13 || i === 18 || i === 23) {
        result += '-'
      }
      else if (i === 14) {
        result += '4'
      }
      else if (i === 19) {
        const r = this.random.int(0, 15)
        result += hex[(r & 0x3) | 0x8]
      }
      else {
        result += hex[this.random.int(0, 15)]
      }
    }

    return result
  }

  /**
   * Generate a random nanoid
   * @example faker.string.nanoid() // 'V1StGXR8_Z5jdHi6B-myT'
   */
  nanoid(size = 21): string {
    const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'
    let result = ''
    for (let i = 0; i < size; i++) {
      result += alphabet[this.random.int(0, alphabet.length - 1)]
    }
    return result
  }

  /**
   * Generate a random alphabetic string
   * @example faker.string.alpha() // 'aBcDeFgHiJ'
   */
  alpha(options?: number | StringOptions): string {
    const settings = asOptions(options)
    const length = settings.length ?? 10
    const casing = settings.casing ?? 'mixed'

    const lower = 'abcdefghijklmnopqrstuvwxyz'
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    let chars = ''
    if (casing === 'lower') {
      chars = lower
    }
    else if (casing === 'upper') {
      chars = upper
    }
    else {
      chars = lower + upper
    }

    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars[this.random.int(0, chars.length - 1)]
    }
    return result
  }

  /**
   * Generate a random alphanumeric string
   * @example faker.string.alphanumeric() // 'aBc123XyZ'
   */
  alphanumeric(options?: number | StringOptions): string {
    const settings = asOptions(options)
    const length = settings.length ?? 10
    const casing = settings.casing ?? 'mixed'

    const lower = 'abcdefghijklmnopqrstuvwxyz'
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numbers = '0123456789'

    let chars = numbers
    if (casing === 'lower') {
      chars += lower
    }
    else if (casing === 'upper') {
      chars += upper
    }
    else {
      chars += lower + upper
    }

    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars[this.random.int(0, chars.length - 1)]
    }
    return result
  }

  /**
   * Generate a random numeric string
   * @example faker.string.numeric() // '1234567890'
   */
  numeric(length = 10): string {
    // Optimized: use direct Math.random for unseeded case
    if (!this.random.isSeeded()) {
      let result = ''
      for (let i = 0; i < length; i++) {
        result += Math.floor(Math.random() * 10)
      }
      return result
    }

    let result = ''
    for (let i = 0; i < length; i++) {
      result += this.random.int(0, 9)
    }
    return result
  }

  /**
   * Generate a sample text string
   * @example faker.string.sample() // 'Hello World'
   */
  sample(length = 10): string {
    return this.alphanumeric({ length })
  }

  /**
   * Generate a symbol string
   * @example faker.string.symbol() // '!@#$%'
   */
  symbol(length = 5): string {
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'
    let result = ''
    for (let i = 0; i < length; i++) {
      result += symbols[this.random.int(0, symbols.length - 1)]
    }
    return result
  }

  /**
   * Generate a hexadecimal string
   * @example faker.string.hexadecimal() // 'a3f5b2'
   */
  hexadecimal(options?: number | (StringOptions & { prefix?: string })): string {
    const settings = asOptions<StringOptions & { prefix?: string }>(options)
    const length = settings.length ?? 6
    const prefix = settings.prefix ?? ''
    const chars = '0123456789abcdef'
    let result = prefix
    for (let i = 0; i < length; i++) {
      result += chars[this.random.int(0, chars.length - 1)]
    }
    return result
  }
}
