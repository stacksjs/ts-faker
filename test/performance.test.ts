import { beforeAll, describe, expect, it } from 'bun:test'
import { Faker } from '../packages/core/src/faker'
import { LocaleLoader } from '../packages/core/src/locale-loader'

/**
 * Performance benchmarks for ts-mocker
 * These tests ensure the library maintains good performance characteristics
 */

// Thresholds in milliseconds
const THRESHOLDS = {
  SINGLE_GENERATION: 1, // Single data generation should be < 1ms
  BATCH_100: 50, // 100 generations should be < 50ms
  BATCH_1000: 300, // 1000 generations should be < 300ms
  BATCH_10000: 2000, // 10000 generations should be < 2s
  LOCALE_LOAD: 100, // Locale loading should be < 100ms
  LOCALE_SWITCH: 150, // Locale switching should be < 150ms
}

describe('Performance Tests', () => {
  let faker: Faker

  beforeAll(async () => {
    faker = await Faker.create({ locale: 'en' })
  })

  describe('Single Generation Performance', () => {
    it('should generate person.firstName quickly', () => {
      const start = performance.now()
      for (let i = 0; i < 100; i++) {
        faker.person.firstName()
      }
      const duration = performance.now() - start
      const avgTime = duration / 100

      expect(avgTime).toBeLessThan(THRESHOLDS.SINGLE_GENERATION)
      console.log(`  ⏱️  Average firstName generation: ${avgTime.toFixed(4)}ms`)
    })

    it('should generate person.fullName quickly', () => {
      const start = performance.now()
      for (let i = 0; i < 100; i++) {
        faker.person.fullName()
      }
      const duration = performance.now() - start
      const avgTime = duration / 100

      expect(avgTime).toBeLessThan(THRESHOLDS.SINGLE_GENERATION)
      console.log(`  ⏱️  Average fullName generation: ${avgTime.toFixed(4)}ms`)
    })

    it('should generate internet.email quickly', () => {
      const start = performance.now()
      for (let i = 0; i < 100; i++) {
        faker.internet.email()
      }
      const duration = performance.now() - start
      const avgTime = duration / 100

      expect(avgTime).toBeLessThan(THRESHOLDS.SINGLE_GENERATION)
      console.log(`  ⏱️  Average email generation: ${avgTime.toFixed(4)}ms`)
    })

    it('should generate address.city quickly', () => {
      const start = performance.now()
      for (let i = 0; i < 100; i++) {
        faker.address.city()
      }
      const duration = performance.now() - start
      const avgTime = duration / 100

      expect(avgTime).toBeLessThan(THRESHOLDS.SINGLE_GENERATION)
      console.log(`  ⏱️  Average city generation: ${avgTime.toFixed(4)}ms`)
    })

    it('should generate phone.number quickly', () => {
      const start = performance.now()
      for (let i = 0; i < 100; i++) {
        faker.phone.number()
      }
      const duration = performance.now() - start
      const avgTime = duration / 100

      expect(avgTime).toBeLessThan(THRESHOLDS.SINGLE_GENERATION)
      console.log(`  ⏱️  Average phone generation: ${avgTime.toFixed(4)}ms`)
    })
  })

  describe('Batch Generation Performance', () => {
    it('should generate 100 full names efficiently', () => {
      const start = performance.now()
      const names = []
      for (let i = 0; i < 100; i++) {
        names.push(faker.person.fullName())
      }
      const duration = performance.now() - start

      expect(duration).toBeLessThan(THRESHOLDS.BATCH_100)
      expect(names.length).toBe(100)
      console.log(`  ⏱️  100 names in ${duration.toFixed(2)}ms (${(duration / 100).toFixed(4)}ms each)`)
    })

    it('should generate 1000 full names efficiently', () => {
      const start = performance.now()
      const names = []
      for (let i = 0; i < 1000; i++) {
        names.push(faker.person.fullName())
      }
      const duration = performance.now() - start

      expect(duration).toBeLessThan(THRESHOLDS.BATCH_1000)
      expect(names.length).toBe(1000)
      console.log(`  ⏱️  1000 names in ${duration.toFixed(2)}ms (${(duration / 1000).toFixed(4)}ms each)`)
    })

    it('should generate 10000 full names efficiently', () => {
      const start = performance.now()
      const names = []
      for (let i = 0; i < 10000; i++) {
        names.push(faker.person.fullName())
      }
      const duration = performance.now() - start

      expect(duration).toBeLessThan(THRESHOLDS.BATCH_10000)
      expect(names.length).toBe(10000)
      console.log(`  ⏱️  10000 names in ${duration.toFixed(2)}ms (${(duration / 10000).toFixed(4)}ms each)`)
    })

    it('should generate mixed data types efficiently', () => {
      const start = performance.now()
      const records = []
      for (let i = 0; i < 1000; i++) {
        records.push({
          name: faker.person.fullName(),
          email: faker.internet.email(),
          city: faker.address.city(),
          phone: faker.phone.number(),
          company: faker.company.name(),
        })
      }
      const duration = performance.now() - start

      expect(duration).toBeLessThan(THRESHOLDS.BATCH_1000 * 2) // Allow 2x for complex objects
      expect(records.length).toBe(1000)
      console.log(`  ⏱️  1000 user records in ${duration.toFixed(2)}ms (${(duration / 1000).toFixed(4)}ms each)`)
    })
  })

  describe('Locale Performance', () => {
    it('should load a locale quickly', async () => {
      LocaleLoader.clearCache()

      const start = performance.now()
      await LocaleLoader.load('es')
      const duration = performance.now() - start

      expect(duration).toBeLessThan(THRESHOLDS.LOCALE_LOAD)
      console.log(`  ⏱️  Locale loaded in ${duration.toFixed(2)}ms`)
    })

    it('should load cached locale instantly', async () => {
      await LocaleLoader.load('fr') // Pre-load

      const start = performance.now()
      await LocaleLoader.load('fr')
      const duration = performance.now() - start

      expect(duration).toBeLessThan(1) // Cached should be < 1ms
      console.log(`  ⏱️  Cached locale loaded in ${duration.toFixed(4)}ms`)
    })

    it('should switch locales efficiently', async () => {
      const testFaker = await Faker.create({ locale: 'en' })

      const start = performance.now()
      await testFaker.setLocale('es')
      const duration = performance.now() - start

      expect(duration).toBeLessThan(THRESHOLDS.LOCALE_SWITCH)
      console.log(`  ⏱️  Locale switched in ${duration.toFixed(2)}ms`)
    })

    it('should preload multiple locales efficiently', async () => {
      LocaleLoader.clearCache()

      const start = performance.now()
      await LocaleLoader.preload(['de', 'fr', 'it', 'ja'])
      const duration = performance.now() - start

      expect(duration).toBeLessThan(THRESHOLDS.LOCALE_LOAD * 4)
      console.log(`  ⏱️  4 locales preloaded in ${duration.toFixed(2)}ms`)
    })
  })

  describe('Seeded Generation Performance', () => {
    it('should not significantly slow down with seed', () => {
      const unseededFaker = new Faker()
      const seededFaker = new Faker({ seed: 12345 })

      // Unseeded
      const unseededStart = performance.now()
      for (let i = 0; i < 1000; i++) {
        unseededFaker.person.fullName()
      }
      const unseededDuration = performance.now() - unseededStart

      // Seeded
      const seededStart = performance.now()
      for (let i = 0; i < 1000; i++) {
        seededFaker.person.fullName()
      }
      const seededDuration = performance.now() - seededStart

      // Seeded should not be more than 3x slower
      const slowdownRatio = seededDuration / unseededDuration
      expect(slowdownRatio).toBeLessThan(3)

      console.log(`  ⏱️  Unseeded: ${unseededDuration.toFixed(2)}ms`)
      console.log(`  ⏱️  Seeded: ${seededDuration.toFixed(2)}ms`)
      console.log(`  ⏱️  Slowdown: ${((slowdownRatio - 1) * 100).toFixed(1)}%`)
    })
  })

  describe('Multi-locale Performance', () => {
    it('should generate data in multiple locales efficiently', async () => {
      const locales = ['en', 'es', 'fr', 'de', 'ja']
      const fakers = await Promise.all(
        locales.map(locale => Faker.create({ locale })),
      )

      const start = performance.now()
      for (const testFaker of fakers) {
        for (let i = 0; i < 100; i++) {
          testFaker.person.fullName()
        }
      }
      const duration = performance.now() - start

      expect(duration).toBeLessThan(THRESHOLDS.BATCH_100 * locales.length)
      console.log(`  ⏱️  500 names (5 locales × 100) in ${duration.toFixed(2)}ms`)
    })
  })

  describe('Complex Data Generation Performance', () => {
    it('should generate complex nested objects efficiently', () => {
      const start = performance.now()
      const users = []
      for (let i = 0; i < 100; i++) {
        users.push({
          id: i,
          profile: {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            fullName: faker.person.fullName(),
            gender: faker.person.gender(),
            jobTitle: faker.person.jobTitle(),
          },
          contact: {
            email: faker.internet.email(),
            phone: faker.phone.number(),
          },
          address: {
            street: faker.address.street(),
            city: faker.address.city(),
            state: faker.address.state(),
            country: faker.address.country(),
            zipCode: faker.address.zipCode(),
          },
          company: {
            name: faker.company.name(),
            industry: faker.company.industry(),
          },
          preferences: {
            favoriteColor: faker.color.hex(),
            favoriteFruit: faker.food.fruit(),
            favoriteAnimal: faker.animal.dog(),
          },
        })
      }
      const duration = performance.now() - start

      expect(duration).toBeLessThan(THRESHOLDS.BATCH_100 * 5) // Allow 5x for complex nested data
      expect(users.length).toBe(100)
      console.log(`  ⏱️  100 complex user objects in ${duration.toFixed(2)}ms`)
    })
  })

  describe('Memory Efficiency', () => {
    it('should handle large batch generation without memory issues', () => {
      const start = performance.now()
      const names = []

      // Generate 50k names
      for (let i = 0; i < 50000; i++) {
        names.push(faker.person.fullName())
      }

      const duration = performance.now() - start

      expect(names.length).toBe(50000)
      expect(duration).toBeLessThan(10000) // Should complete in < 10s
      console.log(`  ⏱️  50000 names in ${duration.toFixed(2)}ms`)
      console.log(`  ⏱️  Average: ${(duration / 50000).toFixed(4)}ms per name`)
    })
  })

  describe('Category Coverage Performance', () => {
    const categories = [
      { name: 'person', method: () => faker.person.fullName() },
      { name: 'address', method: () => faker.address.city() },
      { name: 'company', method: () => faker.company.name() },
      { name: 'internet', method: () => faker.internet.email() },
      { name: 'phone', method: () => faker.phone.number() },
      { name: 'food', method: () => faker.food.dish() },
      { name: 'animal', method: () => faker.animal.dog() },
      { name: 'sport', method: () => faker.sport.sport() },
      { name: 'music', method: () => faker.music.genre() },
      { name: 'commerce', method: () => faker.commerce.product() },
      { name: 'book', method: () => faker.book.title() },
      { name: 'vehicle', method: () => faker.vehicle.manufacturer() },
      { name: 'word', method: () => faker.word.noun() },
      { name: 'hacker', method: () => faker.hacker.phrase() },
      { name: 'system', method: () => faker.system.fileName() },
      { name: 'science', method: () => faker.science.chemicalElement() },
    ]

    it('should maintain consistent performance across all categories', () => {
      const results: Array<{ category: string, avgTime: number }> = []

      for (const { name, method } of categories) {
        const start = performance.now()
        for (let i = 0; i < 100; i++) {
          method()
        }
        const duration = performance.now() - start
        const avgTime = duration / 100

        results.push({ category: name, avgTime })
        expect(avgTime).toBeLessThan(THRESHOLDS.SINGLE_GENERATION)
      }

      // Log results sorted by speed
      results.sort((a, b) => a.avgTime - b.avgTime)
      console.log('\n  📊 Category Performance (100 iterations each):')
      results.forEach(({ category, avgTime }) => {
        console.log(`  ⏱️  ${category.padEnd(15)} ${avgTime.toFixed(4)}ms`)
      })
    })
  })

  describe('Concurrent Generation Performance', () => {
    it('should handle concurrent faker instances efficiently', async () => {
      const start = performance.now()

      const results = await Promise.all([
        (async () => {
          const f = await Faker.create({ locale: 'en' })
          const names = []
          for (let i = 0; i < 500; i++) {
            names.push(f.person.fullName())
          }
          return names
        })(),
        (async () => {
          const f = await Faker.create({ locale: 'es' })
          const names = []
          for (let i = 0; i < 500; i++) {
            names.push(f.person.fullName())
          }
          return names
        })(),
        (async () => {
          const f = await Faker.create({ locale: 'fr' })
          const names = []
          for (let i = 0; i < 500; i++) {
            names.push(f.person.fullName())
          }
          return names
        })(),
      ])

      const duration = performance.now() - start

      expect(results.flat().length).toBe(1500)
      expect(duration).toBeLessThan(THRESHOLDS.BATCH_1000 * 2)
      console.log(`  ⏱️  1500 names (3 concurrent locales) in ${duration.toFixed(2)}ms`)
    })
  })
})
