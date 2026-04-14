# Testing with ts-mocker

Learn how to use ts-mocker effectively in your test suites for unit tests, integration tests, and end-to-end tests.

## Why Use ts-mocker for Testing

1. **Realistic data** - Generate data that looks authentic
2. **Reproducible** - Use seeding for consistent test results
3. **Fast** - Generate thousands of records quickly
4. **Comprehensive** - 16 data categories cover most testing needs
5. **Type-safe** - Full TypeScript support catches errors early

## Unit Testing

### Basic Example

```ts
import { describe, expect, test } from 'bun:test'
import { faker } from 'ts-mocker'

describe('User validation', () => {
  test('validates email format', () => {
    const email = faker.internet.email()
    const isValid = validateEmail(email)
    expect(isValid).toBe(true)
  })

  test('validates name length', () => {
    const name = faker.person.fullName()
    const isValid = name.length >= 2 && name.length <= 100
    expect(isValid).toBe(true)
  })
})
```

### Seeded Tests for Consistency

```ts
import { beforeEach, describe, expect, test } from 'bun:test'
import { faker } from 'ts-mocker'

describe('User service', () => {
  beforeEach(() => {
    // Reset to known state before each test
    faker.seed(1000)
  })

  test('creates user with valid data', () => {
    const userData = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
    }

    const user = createUser(userData)
    expect(user.name).toBe('John Doe') // Always the same with seed 1000
  })

  test('rejects invalid email', () => {
    const userData = {
      name: faker.person.fullName(),
      email: 'invalid-email',
    }

    expect(() => createUser(userData)).toThrow()
  })
})
```

## Integration Testing

### Database Testing

```ts
import { afterEach, beforeEach, describe, expect, test } from 'bun:test'
import { faker } from 'ts-mocker'

describe('User repository', () => {
  let db: Database

  beforeEach(async () => {
    db = await setupTestDatabase()
  })

  afterEach(async () => {
    await cleanupTestDatabase(db)
  })

  test('saves and retrieves user', async () => {
    const user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      city: faker.address.city(),
    }

    await db.users.create(user)
    const retrieved = await db.users.findByEmail(user.email)

    expect(retrieved?.name).toBe(user.name)
  })

  test('handles bulk insert', async () => {
    const users = Array.from({ length: 100 }, () => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      city: faker.address.city(),
    }))

    await db.users.bulkCreate(users)
    const count = await db.users.count()

    expect(count).toBe(100)
  })
})
```

### API Testing

```ts
import { describe, expect, test } from 'bun:test'
import { faker } from 'ts-mocker'

describe('User API', () => {
  test('POST /users creates new user', async () => {
    const userData = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: 'SecurePass123!',
    }

    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })

    expect(response.status).toBe(201)
    const data = await response.json()
    expect(data.name).toBe(userData.name)
  })

  test('GET /users returns user list', async () => {
    // Create test users
    const users = Array.from({ length: 5 }, () => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
    }))

    for (const user of users) {
      await createUser(user)
    }

    const response = await fetch('http://localhost:3000/users')
    const data = await response.json()

    expect(data.length).toBeGreaterThanOrEqual(5)
  })
})
```

## Test Fixtures

### Creating Reusable Fixtures

```ts
import { faker } from 'ts-mocker'

export class UserFixture {
  static create(overrides: Partial<User> = {}): User {
    return {
      id: crypto.randomUUID(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      city: faker.address.city(),
      createdAt: new Date(),
      ...overrides,
    }
  }

  static createMany(count: number, overrides: Partial<User> = {}): User[] {
    return Array.from({ length: count }, () => this.create(overrides))
  }

  static createWithLocale(locale: string): User {
    faker.locale = locale as any
    return this.create()
  }
}

// Usage in tests
test('user service', () => {
  const user = UserFixture.create({ email: 'test@example.com' })
  const users = UserFixture.createMany(10)
  const spanishUser = UserFixture.createWithLocale('es')
})
```

### Factory Builder Pattern

```ts
import { faker } from 'ts-mocker'

class ProductBuilder {
  private product: Partial<Product> = {
    id: crypto.randomUUID(),
    name: faker.commerce.product(),
    price: Math.random() * 1000,
    category: faker.commerce.department(),
  }

  withName(name: string): this {
    this.product.name = name
    return this
  }

  withPrice(price: number): this {
    this.product.price = price
    return this
  }

  withCategory(category: string): this {
    this.product.category = category
    return this
  }

  build(): Product {
    return this.product as Product
  }
}

// Usage
test('product pricing', () => {
  const product = new ProductBuilder()
    .withName('Laptop')
    .withPrice(999.99)
    .build()

  expect(calculateTax(product)).toBe(99.99)
})
```

## Snapshot Testing

### Basic Snapshots

```ts
import { expect, test } from 'bun:test'
import { faker } from 'ts-mocker'

test('user profile matches snapshot', () => {
  faker.seed(42) // Always use same seed for snapshots

  const profile = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    bio: `${faker.person.jobTitle()} from ${faker.address.city()}`,
  }

  expect(profile).toMatchSnapshot()
})
```

### Dynamic Snapshots

```ts
import { expect, test } from 'bun:test'
import { faker } from 'ts-mocker'

test('generates consistent user list', () => {
  faker.seed(100)

  const users = Array.from({ length: 5 }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
  }))

  expect(users).toMatchSnapshot()
})
```

## Performance Testing

### Load Testing

```ts
import { test } from 'bun:test'
import { faker } from 'ts-mocker'

test('handles 10,000 user creation', async () => {
  const startTime = performance.now()

  const users = Array.from({ length: 10000 }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    city: faker.address.city(),
  }))

  const endTime = performance.now()
  const duration = endTime - startTime

  console.log(`Generated 10,000 users in ${duration}ms`)
  expect(duration).toBeLessThan(500) // Should be fast
})
```

### Memory Testing

```ts
import { test } from 'bun:test'
import { faker } from 'ts-mocker'

test('memory usage remains stable', () => {
  const initialMemory = process.memoryUsage().heapUsed

  // Generate large dataset
  for (let i = 0; i < 100000; i++) {
    faker.person.fullName()
  }

  const finalMemory = process.memoryUsage().heapUsed
  const memoryIncrease = finalMemory - initialMemory

  // Memory increase should be minimal
  expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024) // Less than 50MB
})
```

## Edge Cases

### Testing with Edge Data

```ts
import { expect, test } from 'bun:test'
import { faker } from 'ts-mocker'

test('handles various name formats', () => {
  faker.seed(1)

  const names = Array.from({ length: 100 }, () =>
    faker.person.fullName())

  // Test that all names are valid
  names.forEach((name) => {
    expect(name.length).toBeGreaterThan(0)
    expect(name).not.toContain('undefined')
    expect(name).not.toContain('null')
  })
})

test('handles all locales', () => {
  const locales = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'tl', 'zh']

  locales.forEach((locale) => {
    faker.locale = locale as any
    const name = faker.person.fullName()

    expect(name).toBeTruthy()
    expect(name.length).toBeGreaterThan(0)
  })
})
```

## Mocking with ts-mocker

### Mock API Responses

```ts
import { faker } from 'ts-mocker'

function mockUserAPI() {
  return {
    getUser: async (id: string) => ({
      id,
      name: faker.person.fullName(),
      email: faker.internet.email(),
    }),

    getUsers: async () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: `user-${i}`,
        name: faker.person.fullName(),
        email: faker.internet.email(),
      })),
  }
}

test('component displays user data', async () => {
  const api = mockUserAPI()
  const user = await api.getUser('123')

  expect(user.name).toBeTruthy()
  expect(user.email).toContain('@')
})
```

## Best Practices

### 1. Use Seeds for Reproducibility

```ts
// Good - Consistent results
beforeEach(() => {
  faker.seed(1000)
})

// Avoid - Random results every time
// (no seeding)
```

### 2. Create Reusable Fixtures

```ts
// Good - Reusable across tests
const userFixture = {
  create: () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
  }),
}

// Avoid - Duplicating faker calls everywhere
```

### 3. Clean Up After Tests

```ts
afterEach(async () => {
  await cleanupDatabase()
  faker.seed(undefined) // Reset faker state
})
```

### 4. Test with Multiple Locales

```ts
test('handles international users', () => {
  ['en', 'es', 'ja'].forEach((locale) => {
    faker.locale = locale as any
    const user = createUser()
    expect(validateUser(user)).toBe(true)
  })
})
```

### 5. Combine with Property-Based Testing

```ts
import { faker } from 'ts-mocker'

test('email validation works for all generated emails', () => {
  const emails = Array.from({ length: 100 }, () =>
    faker.internet.email())

  emails.forEach((email) => {
    expect(validateEmail(email)).toBe(true)
  })
})
```

ts-mocker makes testing easier by providing realistic, reproducible, and comprehensive test data across all your testing needs.
