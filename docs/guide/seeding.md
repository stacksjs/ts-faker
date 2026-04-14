# Deterministic Seeding

ts-mocker supports seeding for reproducible, deterministic fake data generation. This is essential for testing, debugging, and creating consistent fixtures.

## Why Use Seeding

- **Reproducible tests** - Same seed produces identical data every time
- **Debugging** - Recreate exact data conditions that caused issues
- **Consistent fixtures** - Generate the same test data across environments
- **Snapshot testing** - Compare generated data against known snapshots

## Basic Seeding

### Setting a Seed on Instance Creation

```typescript
import { Faker } from 'ts-mocker'

// Create a seeded faker instance
const faker = new Faker({ seed: 12345 })

// Same seed always produces the same sequence
console.log(faker.person.firstName())  // Always "Michael"
console.log(faker.person.lastName())   // Always "Johnson"
console.log(faker.internet.email())    // Always "michael.johnson@example.com"
```

### Setting a Seed After Creation

```typescript
import { faker } from 'ts-mocker'

// Reset with a specific seed
faker.seed(42)

const name1 = faker.person.fullName()
const email1 = faker.internet.email()

// Reset to the same seed
faker.seed(42)

const name2 = faker.person.fullName()
const email2 = faker.internet.email()

// Same values
console.log(name1 === name2)   // true
console.log(email1 === email2) // true
```

## Seeding with Locale

Seeds work consistently across locales:

```typescript
import { Faker } from 'ts-mocker'

const enFaker = new Faker({ seed: 12345, locale: 'en' })
const esFaker = new Faker({ seed: 12345, locale: 'es' })

// Same sequence, locale-appropriate data
console.log(enFaker.person.firstName())  // Consistent English name
console.log(esFaker.person.firstName())  // Consistent Spanish name
```

## Async Creation with Seed

```typescript
import { Faker } from 'ts-mocker'

// Combine seed with async locale loading
const seededJapanese = await Faker.create({
  locale: 'ja',
  seed: 99999
})

// Always produces the same Japanese names
console.log(seededJapanese.person.fullName())
```

## Testing Patterns

### Jest Example

```typescript
import { Faker } from 'ts-mocker'

describe('User Service', () => {
  let faker: Faker

  beforeEach(() => {
    // Fresh seeded faker for each test
    faker = new Faker({ seed: 12345 })
  })

  test('creates user with expected data', () => {
    const user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number()
    }

    // These values are deterministic
    expect(user.name).toBe('Michael Johnson')
    expect(user.email).toBe('michael.johnson@example.com')
  })

  test('generates consistent addresses', () => {
    const address = {
      street: faker.address.street(),
      city: faker.address.city(),
      state: faker.address.state(),
      zip: faker.address.zipCode()
    }

    expect(address.city).toBe('San Francisco')
  })
})
```

### Vitest Example

```typescript
import { Faker } from 'ts-mocker'
import { describe, test, expect, beforeEach } from 'vitest'

describe('Order Processing', () => {
  const SEED = 54321
  let faker: Faker

  beforeEach(() => {
    faker = new Faker({ seed: SEED })
  })

  test('processes order with deterministic data', () => {
    const order = {
      id: faker.string.uuid(),
      customer: faker.person.fullName(),
      total: faker.commerce.price()
    }

    // Snapshot testing works perfectly
    expect(order).toMatchSnapshot()
  })
})
```

### Bun Test Example

```typescript
import { Faker } from 'ts-mocker'
import { test, expect, describe, beforeEach } from 'bun:test'

describe('Product Catalog', () => {
  let faker: Faker

  beforeEach(() => {
    faker = new Faker({ seed: 777 })
  })

  test('generates products consistently', () => {
    const products = Array.from({ length: 5 }, () => ({
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      category: faker.commerce.department()
    }))

    // Always the same 5 products
    expect(products[0].name).toBe('Ergonomic Steel Chair')
  })
})
```

## Generating Fixtures

Create consistent test fixtures:

```typescript
import { Faker } from 'ts-mocker'
import fs from 'fs'

function generateUserFixtures(count: number, seed: number) {
  const faker = new Faker({ seed })

  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    address: {
      street: faker.address.street(),
      city: faker.address.city(),
      state: faker.address.state(),
      zipCode: faker.address.zipCode(),
      country: faker.address.country()
    },
    company: faker.company.name(),
    jobTitle: faker.person.jobTitle(),
    createdAt: faker.date.past().toISOString()
  }))
}

// Generate fixtures
const fixtures = generateUserFixtures(100, 12345)

// Save to file
fs.writeFileSync('fixtures/users.json', JSON.stringify(fixtures, null, 2))

// Same seed = same fixtures every time
```

## Database Seeding

```typescript
import { Faker } from 'ts-mocker'
import { db } from './database'

async function seedDatabase() {
  const faker = new Faker({ seed: 42 })

  // Users
  const users = Array.from({ length: 50 }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  }))

  await db.users.createMany({ data: users })

  // Products
  const products = Array.from({ length: 100 }, () => ({
    name: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price()),
    description: faker.lorem.paragraph(),
    category: faker.commerce.department()
  }))

  await db.products.createMany({ data: products })

  console.log('Database seeded with consistent data')
}
```

## CLI Seeding

Use the CLI with a seed for reproducible command-line generation:

```bash
# Always generates the same name
ts-mocker generate person fullName --seed 12345

# Generate consistent batch data
ts-mocker batch 10 --template user --seed 42 > users.json

# Reproducible across runs
ts-mocker generate internet email --seed 99999 --count 5
```

## Advanced Patterns

### Factory Functions with Seeds

```typescript
import { Faker } from 'ts-mocker'

function createUserFactory(seed: number) {
  const faker = new Faker({ seed })

  return {
    create: (overrides = {}) => ({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      ...overrides
    }),

    createMany: (count: number) =>
      Array.from({ length: count }, () => ({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        email: faker.internet.email()
      }))
  }
}

// Usage
const userFactory = createUserFactory(12345)

const user = userFactory.create()
const users = userFactory.createMany(10)
const customUser = userFactory.create({ name: 'Custom Name' })
```

### Seed Management in Tests

```typescript
import { Faker } from 'ts-mocker'

// Central seed management
const TEST_SEEDS = {
  users: 11111,
  products: 22222,
  orders: 33333,
  payments: 44444
}

// Create dedicated fakers
const fakers = {
  users: new Faker({ seed: TEST_SEEDS.users }),
  products: new Faker({ seed: TEST_SEEDS.products }),
  orders: new Faker({ seed: TEST_SEEDS.orders }),
  payments: new Faker({ seed: TEST_SEEDS.payments })
}

// Use in tests
test('user creation', () => {
  const user = {
    name: fakers.users.person.fullName(),
    email: fakers.users.internet.email()
  }
  // Always consistent
})
```

### Resetting Mid-Test

```typescript
import { Faker } from 'ts-mocker'

test('generates different data sets', () => {
  const faker = new Faker({ seed: 100 })

  // First data set
  const set1 = [
    faker.person.firstName(),
    faker.person.firstName(),
    faker.person.firstName()
  ]

  // Reset to same seed
  faker.seed(100)

  // Same data set
  const set2 = [
    faker.person.firstName(),
    faker.person.firstName(),
    faker.person.firstName()
  ]

  expect(set1).toEqual(set2)
})
```

## Best Practices

1. **Use meaningful seed values** - Document why specific seeds are used
2. **Store seeds as constants** - Avoid magic numbers scattered in tests
3. **Reset seeds in beforeEach** - Ensure test isolation
4. **Document seed-dependent assertions** - Note that values depend on seed
5. **Version control fixtures** - Commit generated fixture files

```typescript
// Good: Documented seed constants
const SEEDS = {
  USER_TESTS: 12345,     // Used in user.test.ts
  ORDER_TESTS: 67890,    // Used in order.test.ts
  E2E_FIXTURES: 11111    // Used for E2E test data
} as const

// Good: Clear test setup
beforeEach(() => {
  faker.seed(SEEDS.USER_TESTS)
})
```
