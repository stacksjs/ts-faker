# Extending ts-mocker

Learn how to extend ts-mocker with custom data, locales, and functionality to fit your specific needs.

## Custom Data Arrays

Add custom data to existing categories:

```ts
import { faker } from 'ts-mocker'

// Extend with custom data
const customFaker = {
  ...faker,
  person: {
    ...faker.person,
    // Add custom method
    superheroName: () => {
      const superheroes = [
        'Superman',
        'Batman',
        'Wonder Woman',
        'Spider-Man',
        'Iron Man',
      ]
      return superheroes[Math.floor(Math.random() * superheroes.length)]
    },
  },
}

console.log(customFaker.person.superheroName()) // "Batman"
```

## Custom Locales

Create your own locale with complete data:

```ts
import type { LocaleDefinition } from 'ts-mocker'
import { faker } from 'ts-mocker'

const customLocale: LocaleDefinition = {
  title: 'Custom English',
  person: {
    firstName: ['Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey'],
    lastName: ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones'],
    gender: ['Non-binary', 'Agender', 'Genderfluid'],
    jobTitle: ['DevRel Engineer', 'Growth Hacker', 'Data Scientist'],
    prefix: ['Mx.', 'Dr.', 'Prof.'],
    suffix: ['PhD', 'MD', 'Esq.'],
  },
  address: {
    street: ['Innovation Drive', 'Tech Boulevard', 'Startup Lane'],
    city: ['Silicon Valley', 'Austin', 'Seattle'],
    state: ['California', 'Texas', 'Washington'],
    country: ['United States', 'Canada', 'United Kingdom'],
    zipCode: ['94025', '78701', '98101'],
    direction: ['North', 'South', 'East', 'West'],
  },
  // ... add all other required categories
}

// Register custom locale
const customFaker = faker.locale('custom' as any)
// Note: TypeScript will show an error, but it will work at runtime
```

## Custom Categories

Add entirely new categories:

```ts
import { faker } from 'ts-mocker'

interface ExtendedFaker {
  fantasy: {
    dragon: () => string
    spell: () => string
    kingdom: () => string
  }
}

const extendedFaker = faker as any as ExtendedFaker

extendedFaker.fantasy = {
  dragon: () => {
    const dragons = ['Smaug', 'Drogon', 'Toothless', 'Falkor']
    return dragons[Math.floor(Math.random() * dragons.length)]
  },
  spell: () => {
    const spells = ['Fireball', 'Ice Storm', 'Lightning Bolt']
    return spells[Math.floor(Math.random() * spells.length)]
  },
  kingdom: () => {
    const kingdoms = ['Gondor', 'Winterfell', 'Narnia']
    return kingdoms[Math.floor(Math.random() * kingdoms.length)]
  },
}

console.log(extendedFaker.fantasy.dragon()) // "Smaug"
console.log(extendedFaker.fantasy.spell()) // "Fireball"
```

## Wrapper Functions

Create utility functions around ts-mocker:

```ts
import { faker } from 'ts-mocker'

// Full address generator
function generateFullAddress() {
  return {
    street: faker.address.street(),
    city: faker.address.city(),
    state: faker.address.state(),
    country: faker.address.country(),
    zipCode: faker.address.zipCode(),
  }
}

// Complete user profile
function generateUserProfile() {
  return {
    personal: {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
    },
    address: generateFullAddress(),
    preferences: {
      favoriteFood: faker.food.dish(),
      favoriteSport: faker.sport.sport(),
      favoriteMusic: faker.music.genre(),
    },
  }
}

const user = generateUserProfile()
```

## Custom Formatters

Create formatters for specific data patterns:

```ts
import { faker } from 'ts-mocker'

// Credit card formatter
function generateCreditCard() {
  const cardNumber = Array.from({ length: 16 }, () =>
    Math.floor(Math.random() * 10)).join('')

  return {
    number: cardNumber.match(/.{1,4}/g)?.join('-'),
    holder: faker.person.fullName().toUpperCase(),
    expiry: `${Math.floor(Math.random() * 12 + 1).toString().padStart(2, '0')}/${new Date().getFullYear() + Math.floor(Math.random() * 5)}`,
    cvv: Math.floor(Math.random() * 900 + 100).toString(),
  }
}

// Social security number formatter
function generateSSN() {
  const area = Math.floor(Math.random() * 900 + 100)
  const group = Math.floor(Math.random() * 90 + 10)
  const serial = Math.floor(Math.random() * 9000 + 1000)
  return `${area}-${group}-${serial}`
}

console.log(generateCreditCard())
// {
//   number: "1234-5678-9012-3456",
//   holder: "JOHN DOE",
//   expiry: "12/2028",
//   cvv: "123"
// }
```

## Mixins Pattern

Create reusable mixins:

```ts
import { faker } from 'ts-mocker'

// Mixin for timestamps
const timestampMixin = {
  createdAt: () => new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
  updatedAt: () => new Date(),
}

// Mixin for IDs
const idMixin = {
  uuid: () => crypto.randomUUID(),
  shortId: () => Math.random().toString(36).substring(2, 9),
}

// Combine mixins
function createEntity() {
  return {
    ...idMixin,
    ...timestampMixin,
    name: faker.person.fullName(),
    email: faker.internet.email(),
  }
}

const entity = createEntity()
```

## Plugin System

Create a simple plugin system:

```ts
import { faker } from 'ts-mocker'

type Plugin = (faker: any) => void

const plugins: Plugin[] = []

function registerPlugin(plugin: Plugin) {
  plugins.push(plugin)
  plugin(faker)
}

// Example plugin: Gaming data
const gamingPlugin: Plugin = (faker) => {
  faker.gaming = {
    gamertag: () => {
      const adjectives = ['Epic', 'Dark', 'Shadow', 'Legendary']
      const nouns = ['Warrior', 'Mage', 'Assassin', 'Hunter']
      const adj = adjectives[Math.floor(Math.random() * adjectives.length)]
      const noun = nouns[Math.floor(Math.random() * nouns.length)]
      const num = Math.floor(Math.random() * 9999)
      return `${adj}${noun}${num}`
    },
    achievement: () => {
      const achievements = [
        'First Blood',
        'Triple Kill',
        'Legendary',
        'Victory Royale',
      ]
      return achievements[Math.floor(Math.random() * achievements.length)]
    },
  }
}

// Register and use
registerPlugin(gamingPlugin)
console.log((faker as any).gaming.gamertag()) // "EpicWarrior1234"
```

## Factory Pattern

Build complex objects with factories:

```ts
import { faker } from 'ts-mocker'

class UserFactory {
  private overrides: Partial<User> = {}

  with(overrides: Partial<User>): this {
    this.overrides = { ...this.overrides, ...overrides }
    return this
  }

  withLocale(locale: string): this {
    faker.locale = locale as any
    return this
  }

  build(): User {
    return {
      id: crypto.randomUUID(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      city: faker.address.city(),
      ...this.overrides,
    }
  }

  buildMany(count: number): User[] {
    return Array.from({ length: count }, () => this.build())
  }
}

// Usage
const user = new UserFactory()
  .withLocale('es')
  .with({ email: 'custom@example.com' })
  .build()

const users = new UserFactory().buildMany(10)
```

## Type-Safe Extensions

Extend ts-mocker with full TypeScript support:

```ts
import { faker } from 'ts-mocker'

declare module 'ts-mocker' {
  interface Faker {
    custom: {
      uuid: () => string
      slug: () => string
    }
  }
}

(faker as any).custom = {
  uuid: () => crypto.randomUUID(),
  slug: () => faker.person.lastName().toLowerCase().replace(/\s+/g, '-'),
}

// Now TypeScript knows about the custom methods
const id = faker.custom.uuid()
const slug = faker.custom.slug()
```

## Internationalization Helpers

Create locale-aware helpers:

```ts
import { faker } from 'ts-mocker'

function generateLocalizedUser(locale: string) {
  const originalLocale = faker.locale
  faker.locale = locale as any

  const user = {
    name: faker.person.fullName(),
    address: faker.address.city(),
    food: faker.food.dish(),
  }

  faker.locale = originalLocale as any
  return user
}

// Generate users in different locales
const users = ['en', 'es', 'fr', 'de'].map(locale => ({
  locale,
  ...generateLocalizedUser(locale),
}))
```

## Best Practices

### 1. Keep Extensions Separate

```ts
// extensions/gaming.ts
// main.ts
import { faker } from 'ts-mocker'
import { gamingExtension } from './extensions/gaming'

export const gamingExtension = {
  gamertag: () => {
    // Implementation
  },
}

// extensions/finance.ts
export const financeExtension = {
  creditCard: () => {
    // Implementation
  },
}

Object.assign(faker, { gaming: gamingExtension })
```

### 2. Document Your Extensions

```ts
/**

 * Gaming extension for ts-mocker

 *

 * @example
 * ```ts
 * faker.gaming.gamertag() // "EpicWarrior1234"
 * ```

 */
export const gamingExtension = {
  // Implementation
}
```

### 3. Maintain Consistency

```ts
// Good - Follows ts-mocker patterns
faker.custom.methodName()

// Avoid - Different patterns
faker.CustomCategory.MethodName()
```

### 4. Test Your Extensions

```ts
import { describe, expect, test } from 'bun:test'
import { faker } from 'ts-mocker'

describe('Custom extensions', () => {
  test('generates valid gamertag', () => {
    const gamertag = (faker as any).gaming.gamertag()
    expect(gamertag).toBeTruthy()
    expect(typeof gamertag).toBe('string')
  })
})
```

Extending ts-mocker allows you to create domain-specific fake data generators that perfectly match your application's needs.
