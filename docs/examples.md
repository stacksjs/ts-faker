# Usage Examples

Real-world examples of using ts-mocker in different scenarios.

## Database Seeding

### Basic User Seeding

```ts
import { faker } from 'ts-mocker'
import { db } from './database'

async function seedUsers(count: number) {
  const users = Array.from({ length: count }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: 'hashed_password_here',
    createdAt: faker.date.past(),
    updatedAt: new Date(),
  }))

  await db.users.insertMany(users)
  console.log(`Seeded ${count} users`)
}

seedUsers(100)
```

### Relational Data

```ts
import { faker } from 'ts-mocker'

async function seedDatabase() {
  // Create users first
  const users = Array.from({ length: 50 }, () => ({
    id: crypto.randomUUID(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
  }))

  await db.users.insertMany(users)

  // Create posts for each user
  const posts = users.flatMap(user =>
    Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
      userId: user.id,
      title: faker.word.words(5),
      content: faker.lorem.paragraphs(3),
      published: faker.helpers.boolean(0.7),
      createdAt: faker.date.past(),
    }))
  )

  await db.posts.insertMany(posts)
  console.log(`Seeded ${users.length} users and ${posts.length} posts`)
}
```

### With Locale-Specific Data

```ts
import { faker, Faker } from 'ts-mocker'

async function seedInternationalUsers() {
  const locales = ['en', 'es', 'fr', 'de', 'ja']

  const users = locales.flatMap((locale) => {
    const localeFaker = new Faker({ locale })

    return Array.from({ length: 20 }, () => ({
      locale,
      name: localeFaker.person.fullName(),
      email: localeFaker.internet.email(),
      city: localeFaker.address.city(),
      country: localeFaker.address.country(),
    }))
  })

  await db.users.insertMany(users)
  console.log(`Seeded ${users.length} international users`)
}
```

## Testing

### Unit Test Fixtures

```ts
import { beforeEach, describe, expect, test } from 'bun:test'
import { faker } from 'ts-mocker'

describe('User service', () => {
  beforeEach(() => {
    // Use seeding for reproducible tests
    faker.seed(12345)
  })

  test('creates valid user', () => {
    const userData = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
    }

    const user = createUser(userData)

    expect(user.name).toBe('John Doe') // Always same with seed
    expect(user.email).toBe('john.doe@example.com')
  })

  test('validates email format', () => {
    const invalidEmail = 'not-an-email'
    const validEmail = faker.internet.email()

    expect(validateEmail(invalidEmail)).toBe(false)
    expect(validateEmail(validEmail)).toBe(true)
  })
})
```

### Integration Tests

```ts
import { expect, test } from 'bun:test'
import { faker } from 'ts-mocker'

test('API creates user', async () => {
  const userData = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: 'SecurePass123!',
  }

  const response = await fetch('http://localhost:3000/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  })

  expect(response.status).toBe(201)

  const user = await response.json()
  expect(user.name).toBe(userData.name)
  expect(user.email).toBe(userData.email)
  expect(user.password).toBeUndefined() // Shouldn't return password
})
```

### Factory Pattern for Tests

```ts
import { faker } from 'ts-mocker'

class UserFactory {
  static create(overrides = {}) {
    return {
      id: crypto.randomUUID(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      role: 'user',
      active: true,
      createdAt: new Date(),
      ...overrides,
    }
  }

  static createAdmin(overrides = {}) {
    return this.create({ role: 'admin', ...overrides })
  }

  static createMany(count: number, overrides = {}) {
    return Array.from({ length: count }, () => this.create(overrides))
  }
}

// Usage in tests
test('admin can delete users', () => {
  const admin = UserFactory.createAdmin()
  const users = UserFactory.createMany(5)

  // Test logic...
})
```

## Mock APIs

### REST API Mock

```ts
import express from 'express'
import { faker } from 'ts-mocker'

const app = express()

app.get('/api/users', (req, res) => {
  const users = Array.from({ length: 20 }, () => ({
    id: crypto.randomUUID(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    avatar: `https://i.pravatar.cc/150?u=${crypto.randomUUID()}`,
    city: faker.address.city(),
    company: faker.company.name(),
  }))

  res.json(users)
})

app.get('/api/users/:id', (req, res) => {
  const user = {
    id: req.params.id,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
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
  }

  res.json(user)
})

app.listen(3000, () => {
  console.log('Mock API running on http://localhost:3000')
})
```

### GraphQL Mock

```ts
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { faker } from 'ts-mocker'

const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }
`

const resolvers = {
  Query: {
    users: () => Array.from({ length: 10 }, () => ({
      id: crypto.randomUUID(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
    })),

    user: (_: any, { id }: { id: string }) => ({
      id,
      name: faker.person.fullName(),
      email: faker.internet.email(),
    }),
  },

  User: {
    posts: () => Array.from({ length: 3 }, () => ({
      id: crypto.randomUUID(),
      title: faker.word.words(5),
      content: faker.lorem.paragraphs(2),
    })),
  },
}

const server = new ApolloServer({ typeDefs, resolvers })
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } })
console.log(`Mock GraphQL API running at ${url}`)
```

## CSV Generation

### Simple CSV Export

```ts
import { writeFileSync } from 'node:fs'
import { faker } from 'ts-mocker'

function generateCSV(rows: number) {
  const header = 'Name,Email,Phone,City,Company\n'

  const data = Array.from({ length: rows }, () => {
    return [
      faker.person.fullName(),
      faker.internet.email(),
      faker.phone.number(),
      faker.address.city(),
      faker.company.name(),
    ].join(',')
  }).join('\n')

  writeFileSync('users.csv', header + data)
  console.log(`Generated CSV with ${rows} rows`)
}

generateCSV(1000)
```

### CSV with Quoted Fields

```ts
import { faker } from 'ts-mocker'

function escapeCSV(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}

function generateProductsCSV(count: number) {
  const header = 'SKU,Name,Description,Price,Category\n'

  const rows = Array.from({ length: count }, () => {
    const sku = faker.commerce.sku()
    const name = faker.commerce.product()
    const description = faker.commerce.productDescription()
    const price = faker.commerce.price()
    const category = faker.commerce.department()

    return [sku, name, description, price, category]
      .map(escapeCSV)
      .join(',')
  }).join('\n')

  return header + rows
}

const csv = generateProductsCSV(500)
console.log(csv)
```

## JSON Data Generation

### Nested JSON Structure

```ts
import { faker } from 'ts-mocker'

function generateUser() {
  return {
    id: crypto.randomUUID(),
    personal: {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      fullName: faker.person.fullName(),
      gender: faker.person.gender(),
      birthDate: faker.date.past({ years: 50 }),
    },
    contact: {
      email: faker.internet.email(),
      phone: faker.phone.number(),
      website: faker.internet.url(),
    },
    address: {
      street: faker.address.street(),
      city: faker.address.city(),
      state: faker.address.state(),
      country: faker.address.country(),
      zipCode: faker.address.zipCode(),
    },
    employment: {
      company: faker.company.name(),
      jobTitle: faker.person.jobTitle(),
      industry: faker.company.industry(),
    },
    preferences: {
      favoriteColor: faker.commerce.color(),
      favoriteFood: faker.food.dish(),
      favoriteSport: faker.sport.sport(),
      favoriteMusic: faker.music.genre(),
    },
    metadata: {
      createdAt: new Date(),
      lastLogin: faker.date.recent(),
      isActive: faker.helpers.boolean(0.9),
    },
  }
}

const users = Array.from({ length: 10 }, generateUser)
console.log(JSON.stringify(users, null, 2))
```

### E-commerce Product Data

```ts
import { faker } from 'ts-mocker'

function generateProduct() {
  const basePrice = Number(faker.commerce.price({ min: 10, max: 1000 }))
  const discount = faker.helpers.maybe(() =>
    faker.number.int({ min: 5, max: 50 }), 0.3)

  return {
    id: crypto.randomUUID(),
    sku: faker.commerce.sku(),
    name: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    category: faker.commerce.department(),
    pricing: {
      basePrice,
      discount: discount || 0,
      finalPrice: discount ? basePrice * (1 - discount / 100) : basePrice,
      currency: 'USD',
    },
    inventory: {
      inStock: faker.helpers.boolean(0.8),
      quantity: faker.number.int({ min: 0, max: 1000 }),
      reserved: faker.number.int({ min: 0, max: 50 }),
    },
    attributes: {
      weight: `${faker.number.float({ min: 0.1, max: 50, dec: 2 })} kg`,
      dimensions: {
        length: faker.number.int({ min: 10, max: 100 }),
        width: faker.number.int({ min: 10, max: 100 }),
        height: faker.number.int({ min: 10, max: 100 }),
      },
      colors: faker.helpers.arrayElements(
        ['Red', 'Blue', 'Green', 'Black', 'White'],
        faker.number.int({ min: 1, max: 3 })
      ),
    },
    reviews: {
      rating: faker.number.float({ min: 1, max: 5, dec: 1 }),
      count: faker.number.int({ min: 0, max: 1000 }),
    },
  }
}

const products = Array.from({ length: 50 }, generateProduct)
```

## Bulk Data Scripts

### Multi-Locale Data Generation

```ts
import { writeFileSync } from 'node:fs'
import { Faker } from 'ts-mocker'

async function generateMultiLocaleData() {
  const locales = ['en', 'es', 'fr', 'de', 'ja']

  for (const locale of locales) {
    const faker = new Faker({ locale })

    const users = Array.from({ length: 100 }, () => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      city: faker.address.city(),
      favoriteFood: faker.food.dish(),
      favoriteBook: faker.book.title(),
    }))

    writeFileSync(
      `users-${locale}.json`,
      JSON.stringify(users, null, 2)
    )

    console.log(`Generated users-${locale}.json`)
  }
}

generateMultiLocaleData()
```

### Time-Series Data

```ts
import { faker } from 'ts-mocker'

function generateTimeSeries(days: number) {
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  return Array.from({ length: days }, (_, i) => {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)

    return {
      date: date.toISOString().split('T').at(0),
      users: faker.number.int({ min: 1000, max: 5000 }),
      sessions: faker.number.int({ min: 5000, max: 20000 }),
      revenue: Number(faker.commerce.price({ min: 1000, max: 10000 })),
      conversionRate: faker.number.float({ min: 0.01, max: 0.1, dec: 4 }),
    }
  })
}

const analytics = generateTimeSeries(30)
console.log(JSON.stringify(analytics, null, 2))
```

## Development Tools

### Seed Script for Development

```ts
// scripts/seed.ts
import { faker } from 'ts-mocker'
import { db } from '../src/database'

async function main() {
  console.log('Seeding database...')

  // Clear existing data
  await db.users.deleteMany({})
  await db.posts.deleteMany({})

  // Use seed for reproducible dev data
  faker.seed(12345)

  // Create admin user
  const admin = await db.users.create({
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
  })

  // Create regular users
  const users = await db.users.insertMany(
    Array.from({ length: 20 }, () => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      role: 'user',
    }))
  )

  console.log(`Created ${users.length + 1} users`)

  // Create posts
  const allUsers = [admin, ...users]
  const posts = await db.posts.insertMany(
    allUsers.flatMap(user =>
      Array.from({ length: faker.number.int({ min: 2, max: 8 }) }, () => ({
        userId: user.id,
        title: faker.word.words(5),
        content: faker.lorem.paragraphs(3),
        published: faker.helpers.boolean(0.7),
      }))
    )
  )

  console.log(`Created ${posts.length} posts`)
  console.log('Seeding complete!')
}

main()
```

### Storybook Mock Data

```ts
import { faker } from 'ts-mocker'

export function mockUser(overrides = {}) {
  return {
    id: crypto.randomUUID(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    avatar: `https://i.pravatar.cc/150?u=${crypto.randomUUID()}`,
    ...overrides,
  }
}

export function mockUsers(count: number) {
  return Array.from({ length: count }, () => mockUser())
}

// In your story
export const Default = {
  args: {
    users: mockUsers(5),
  },
}
```

## Advanced Patterns

### Weighted Distribution

```ts
import { faker } from 'ts-mocker'

function generateWithDistribution() {
  const tier = faker.helpers.arrayElement([
    ...Array.from({ length: 70 }).fill('free'),
    ...Array.from({ length: 25 }).fill('pro'),
    ...Array.from({ length: 5 }).fill('enterprise'),
  ])

  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    tier,
    features: tier === 'enterprise'
      ? ['feature-a', 'feature-b', 'feature-c']
      : tier === 'pro'
        ? ['feature-a', 'feature-b']
        : ['feature-a'],
  }
}
```

### Conditional Data

```ts
import { faker } from 'ts-mocker'

function generateOrder() {
  const status = faker.helpers.arrayElement(['pending', 'shipped', 'delivered'])

  return {
    id: crypto.randomUUID(),
    status,
    orderedAt: faker.date.past(),
    shippedAt: status !== 'pending'
      ? faker.date.recent()
      : null,
    deliveredAt: status === 'delivered'
      ? faker.date.recent()
      : null,
    tracking: status !== 'pending'
      ? faker.helpers.numerify('##########')
      : null,
  }
}
```

These examples cover most common use cases. Mix and match patterns to fit your specific needs!
