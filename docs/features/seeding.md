# Seeding

ts-mocker provides deterministic data generation through seeding. When you set a seed, the same sequence of fake data will be generated every time, making your tests reproducible and consistent.

## Basic Seeding

### Setting a Seed

```typescript
import { faker } from 'ts-mocker'

// Set a numeric seed
faker.seed(12345)

// Generate data - same seed always produces same results
console.log(faker.person.fullName())  // Always "John Smith" with seed 12345
console.log(faker.internet.email())   // Always "john.smith@example.com"
```

### Resetting the Seed

```typescript
// Reset to generate the same sequence again
faker.seed(12345)
console.log(faker.person.fullName())  // "John Smith" again
```

## Using Seeds in Tests

### Jest/Vitest

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { faker } from 'ts-mocker'

describe('User Registration', () => {
  beforeEach(() => {
    // Reset seed before each test for consistent data
    faker.seed(42)
  })

  it('should create a valid user', () => {
    const user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      address: faker.address.city()
    }

    // These assertions will always pass with the same seed
    expect(user.name).toBe('Jane Doe')
    expect(user.email).toBe('jane.doe@example.com')
    expect(user.address).toBe('Springfield')
  })

  it('should create unique users with different seeds', () => {
    faker.seed(100)
    const user1 = faker.person.fullName()

    faker.seed(200)
    const user2 = faker.person.fullName()

    expect(user1).not.toBe(user2)
  })
})
```

### Bun Test

```typescript
import { describe, it, expect, beforeEach } from 'bun:test'
import { faker } from 'ts-mocker'

describe('Data Fixtures', () => {
  beforeEach(() => {
    faker.seed(1337)
  })

  it('generates consistent fixtures', () => {
    const fixtures = Array.from({ length: 5 }, () => ({
      name: faker.person.fullName(),
      city: faker.address.city()
    }))

    // Same fixtures every time with same seed
    expect(fixtures[0].name).toBe('Michael Johnson')
    expect(fixtures[0].city).toBe('New York')
  })
})
```

## Instance-Level Seeding

Create isolated faker instances with their own seeds:

```typescript
import { Faker } from 'ts-mocker'

// Create separate instances with different seeds
const faker1 = new Faker({ locale: 'en', seed: 100 })
const faker2 = new Faker({ locale: 'en', seed: 200 })

// Each instance has its own random sequence
console.log(faker1.person.firstName())  // "Alice"
console.log(faker2.person.firstName())  // "Bob"

// Calling again continues the sequence
console.log(faker1.person.firstName())  // "Charlie"
console.log(faker2.person.firstName())  // "Diana"
```

## Seeding with CLI

Generate reproducible data from the command line:

```bash
# Generate with a specific seed
ts-mocker generate person fullName --seed 12345

# Generate multiple items with the same seed
ts-mocker generate person fullName --count 5 --seed 42

# Batch generation with seed
ts-mocker batch 10 --template user --seed 9999
```

## Seed Types

ts-mocker accepts various seed types:

```typescript
// Numeric seed
faker.seed(12345)

// Large numbers work too
faker.seed(9999999999)

// Use a timestamp for unique-per-run seeds
faker.seed(Date.now())

// Use a hash-like seed for test identification
faker.seed(hashCode('test-user-registration'))

function hashCode(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash)
}
```

## Best Practices

### 1. Seed Per Test Suite

Use a consistent seed for each test file:

```typescript
// users.test.ts
beforeAll(() => faker.seed(1001))

// products.test.ts
beforeAll(() => faker.seed(1002))
```

### 2. Document Expected Values

When testing with seeds, document the expected values:

```typescript
it('creates test user with seed 42', () => {
  faker.seed(42)
  // Expected values with seed 42:
  // - fullName: "Jane Doe"
  // - email: "jane.doe@example.com"
  const user = createTestUser()
  expect(user.name).toBe('Jane Doe')
})
```

### 3. Use Different Seeds for Different Scenarios

```typescript
const SEEDS = {
  VALID_USER: 1000,
  INVALID_EMAIL: 2000,
  LONG_NAME: 3000,
  SPECIAL_CHARS: 4000
}

it('handles valid user', () => {
  faker.seed(SEEDS.VALID_USER)
  // ...
})

it('handles long names', () => {
  faker.seed(SEEDS.LONG_NAME)
  // ...
})
```

### 4. Avoid Seed in Production

Seeding is primarily for testing. In production, let faker generate truly random data:

```typescript
const faker = new Faker({
  locale: 'en',
  // No seed in production - truly random data
  seed: process.env.NODE_ENV === 'test' ? 12345 : undefined
})
```

## Reproducibility Guarantees

When using the same seed:

- Same locale produces same results
- Same method calls in same order produce same results
- Results are consistent across ts-mocker versions (within major versions)

Note: Changing the locale or method call order will produce different results even with the same seed.
