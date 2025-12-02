/** Alphabet characters for random string generation */
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('')

/** Digit characters for random number string generation */
const DIGITS = '0123456789'

/**
 * Random number generator with optional seeding support
 */
export class Random {
  private seed: number | undefined

  constructor(seed?: number) {
    this.seed = seed
  }

  /**
   * Check if this Random instance is seeded
   */
  isSeeded(): boolean {
    return this.seed !== undefined
  }

  /**
   * Generate a random number between 0 and 1
   */
  number(): number {
    if (this.seed !== undefined) {
      // Simple seeded random using a linear congruential generator
      this.seed = (this.seed * 9301 + 49297) % 233280
      return this.seed / 233280
    }
    return Math.random()
  }

  /**
   * Generate a random integer between min and max (inclusive)
   */
  int(min = 0, max = 100): number {
    return Math.floor(this.number() * (max - min + 1)) + min
  }

  /**
   * Generate a random float between min and max
   */
  float(min = 0, max = 1, precision = 2): number {
    const num = this.number() * (max - min) + min
    return Number.parseFloat(num.toFixed(precision))
  }

  /**
   * Pick a random element from an array
   */
  arrayElement<T>(array: readonly T[]): T {
    if (array.length === 0) {
      throw new Error('Cannot pick from empty array')
    }
    // Optimize for unseeded random - avoid int() overhead
    if (this.seed === undefined) {
      return array[Math.floor(Math.random() * array.length)]
    }
    return array[this.int(0, array.length - 1)]
  }

  /**
   * Pick multiple random elements from an array
   */
  arrayElements<T>(array: readonly T[], count?: number): T[] {
    if (array.length === 0) {
      return []
    }

    const actualCount = count ?? this.int(1, array.length)
    const shuffled = [...array].sort(() => this.number() - 0.5)
    return shuffled.slice(0, Math.min(actualCount, array.length))
  }

  /**
   * Shuffle an array
   */
  shuffle<T>(array: readonly T[]): T[] {
    const result = [...array]
    for (let i = result.length - 1; i > 0; i--) {
      const j = this.int(0, i)
      ;[result[i], result[j]] = [result[j], result[i]]
    }
    return result
  }

  /**
   * Generate a boolean with optional weight
   */
  boolean(weight = 0.5): boolean {
    return this.number() < weight
  }

  /**
   * Replace # with random digits and ? with random letters
   */
  replaceSymbols(format: string): string {
    // Optimized: avoid regex callback overhead for unseeded random
    if (this.seed === undefined) {
      let result = ''
      for (let i = 0; i < format.length; i++) {
        const char = format[i]
        if (char === '#') {
          result += DIGITS[Math.floor(Math.random() * 10)]
        }
        else if (char === '?') {
          result += ALPHABET[Math.floor(Math.random() * 26)]
        }
        else {
          result += char
        }
      }
      return result
    }

    // Seeded version
    return format.replace(/[#?]/g, (match) => {
      if (match === '#') {
        return String(this.int(0, 9))
      }
      return this.arrayElement(ALPHABET)
    })
  }

  /**
   * Replace symbols with locale-aware formatting
   */
  replaceCreditCardSymbols(format = '####-####-####-####', symbol = '#'): string {
    return format.replace(new RegExp(symbol, 'g'), () => String(this.int(0, 9)))
  }

  /**
   * Pick a weighted random element from an array of weighted items
   * @param items Array of objects with 'item' and 'weight' properties
   */
  weightedArrayElement<T>(items: Array<{ item: T, weight: number }>): T {
    if (items.length === 0) {
      throw new Error('Cannot pick from empty weighted items array')
    }

    // Calculate total weight
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0)

    if (totalWeight <= 0) {
      throw new Error('Total weight must be greater than 0')
    }

    // Generate random number between 0 and total weight
    const randomValue = this.number() * totalWeight

    // Find the selected item
    let currentWeight = 0
    for (const weightedItem of items) {
      currentWeight += weightedItem.weight
      if (randomValue <= currentWeight) {
        return weightedItem.item
      }
    }

    // Fallback to last item (should never reach here)
    return items[items.length - 1].item
  }

  /**
   * Pick multiple weighted random elements from an array
   * @param items Array of weighted items
   * @param count Number of items to pick
   * @param allowDuplicates Whether to allow duplicate selections
   */
  weightedArrayElements<T>(
    items: Array<{ item: T, weight: number }>,
    count?: number,
    allowDuplicates = false,
  ): T[] {
    if (items.length === 0) {
      return []
    }

    const actualCount = count ?? this.int(1, items.length)
    const result: T[] = []
    const availableItems = [...items]

    for (let i = 0; i < actualCount && availableItems.length > 0; i++) {
      const selectedItem = this.weightedArrayElement(availableItems)
      result.push(selectedItem)

      if (!allowDuplicates) {
        // Remove the selected item from available items
        const index = availableItems.findIndex(item => item.item === selectedItem)
        if (index !== -1) {
          availableItems.splice(index, 1)
        }
      }
    }

    return result
  }

  /**
   * Generate a weighted boolean with custom probability
   * @param trueWeight Weight for true (0-1, where 0.5 = 50% chance)
   */
  weightedBoolean(trueWeight = 0.5): boolean {
    return this.number() < trueWeight
  }

  /**
   * Generate a random integer with weighted distribution
   * @param min Minimum value
   * @param max Maximum value
   * @param weights Optional array of weights for each value (defaults to uniform distribution)
   */
  weightedInt(min: number, max: number, weights?: number[]): number {
    const range = max - min + 1

    if (weights) {
      if (weights.length !== range) {
        throw new Error('Weights array length must match the range size')
      }

      const weightedItems = weights.map((weight, index) => ({
        item: min + index,
        weight,
      }))

      return this.weightedArrayElement(weightedItems)
    }

    // Default to uniform distribution
    return this.int(min, max)
  }
}
