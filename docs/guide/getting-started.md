# Getting Started

This guide will help you get up and running with ts-mocker in your TypeScript or JavaScript project.

## Installation

Install ts-mocker using your preferred package manager:

```bash
# npm
npm install ts-mocker

# pnpm
pnpm add ts-mocker

# yarn
yarn add ts-mocker

# bun
bun add ts-mocker
```

## Basic Usage

Import the faker instance and start generating fake data:

```typescript
import { faker } from 'ts-mocker'

// Generate basic data
const firstName = faker.person.firstName()
const lastName = faker.person.lastName()
const email = faker.internet.email()
const city = faker.address.city()

console.log(`${firstName} ${lastName}`)  // "John Smith"
console.log(email)                        // "john.smith@example.com"
console.log(city)                         // "New York"
```

## Creating a Custom Faker Instance

You can create your own Faker instance with custom options:

```typescript
import { Faker } from 'ts-mocker'

// Create with specific locale
const spanishFaker = new Faker({ locale: 'es' })
console.log(spanishFaker.person.fullName())  // "Carlos Garcia"

// Create with a seed for reproducible data
const seededFaker = new Faker({ seed: 12345 })
console.log(seededFaker.person.firstName())  // Always returns the same name
```

## Async Locale Loading

For non-English locales, use async initialization for better performance:

```typescript
import { Faker } from 'ts-mocker'

// Recommended: async creation for non-English locales
const japaneseFaker = await Faker.create({ locale: 'ja' })
console.log(japaneseFaker.person.fullName())  // "Tanaka Taro"

// Preload multiple locales
await Faker.preloadLocales(['es', 'fr', 'de', 'ja'])
```

## Quick Examples

### Generating Person Data

```typescript
import { faker } from 'ts-mocker'

const person = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  fullName: faker.person.fullName(),
  jobTitle: faker.person.jobTitle(),
  gender: faker.person.gender(),
  prefix: faker.person.prefix(),
  suffix: faker.person.suffix()
}
```

### Generating Contact Information

```typescript
const contact = {
  email: faker.internet.email(),
  phone: faker.phone.number(),
  address: {
    street: faker.address.street(),
    city: faker.address.city(),
    state: faker.address.state(),
    zipCode: faker.address.zipCode(),
    country: faker.address.country()
  }
}
```

### Generating Company Data

```typescript
const company = {
  name: faker.company.name(),
  industry: faker.company.industry(),
  buzzword: faker.company.buzzword()
}
```

### Generating Multiple Records

```typescript
// Generate an array of users
const users = Array.from({ length: 10 }, () => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  avatar: faker.image.avatar()
}))
```

## Gender-Specific Names

Generate names based on gender:

```typescript
// Male names
const maleName = faker.person.firstName({ gender: 'male' })
const maleFullName = faker.person.fullName({ gender: 'male' })

// Female names
const femaleName = faker.person.firstName({ gender: 'female' })
const femaleFullName = faker.person.fullName({ gender: 'female' })

// Gender-neutral names
const neutralName = faker.person.firstName({ gender: 'neutral' })
```

## Using with TypeScript

ts-mocker is written in TypeScript and provides full type definitions:

```typescript
import { faker, Faker, type MockOptions } from 'ts-mocker'

// All methods are fully typed
const name: string = faker.person.firstName()

// Options are type-safe
const options: MockOptions = {
  locale: 'en',
  seed: 42
}

const customFaker = new Faker(options)
```

## Next Steps

- Learn about all available [Data Providers](/guide/providers)
- Explore [Locale Support](/guide/locales)
- Set up [Deterministic Seeding](/guide/seeding) for tests
