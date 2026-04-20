# Seeding

Seeding allows you to generate reproducible random data. This is useful for testing, debugging, and creating consistent datasets.

## What is Seeding

Seeding sets the initial state of the random number generator, ensuring that the same sequence of "random" values is generated each time you run your code with the same seed.

## Why Use Seeding

### 1. Reproducible Tests

Create consistent test data across test runs:

```ts
import { faker } from 'ts-mocker'

// Without seeding - different data each time
test('user validation', () => {
  const user = {
    name: faker.person.fullName(), // Changes every run
    email: faker.internet.email(), // Changes every run
  }
  // Test assertions...
})

// With seeding - same data every time
test('user validation', () => {
  faker.seed(12345)
  const user = {
    name: faker.person.fullName(), // Always "John Doe"
    email: faker.internet.email(), // Always "john.doe@example.com"
  }
  // Test assertions...
})
```

### 2. Debugging

Reproduce bugs consistently:

```ts
import { faker } from 'ts-mocker'

// When you find a bug, you can reproduce it exactly
faker.seed(42)
const problematicData = generateTestData()
// Now you can debug with the exact same data every time
```

### 3. Consistent Datasets

Generate the same dataset for demos or documentation:

```ts
import { faker } from 'ts-mocker'

// Always generate the same demo users
faker.seed(1000)
const demoUsers = Array.from({ length: 10 }, () => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  city: faker.address.city(),
}))
```

## Using Seeds

### Basic Seeding

```ts
import { faker } from 'ts-mocker'

// Set a seed
faker.seed(12345)

// Generate data - will be the same every time with this seed
console.log(faker.person.fullName()) // Always returns the same name
console.log(faker.person.fullName()) // Always returns the same name (different from above)
```

### Different Seeds, Different Data

```ts
import { faker } from 'ts-mocker'

// Seed 1
faker.seed(100)
const name1 = faker.person.fullName() // "Alice Johnson"

// Seed 2
faker.seed(200)
const name2 = faker.person.fullName() // "Bob Smith"

// Back to Seed 1
faker.seed(100)
const name3 = faker.person.fullName() // "Alice Johnson" (same as name1)
```

## Seeding Strategies

### 1. Per-Test Seeding

Use different seeds for each test:

```ts
import { faker } from 'ts-mocker'

describe('User tests', () => {
  test('test 1', () => {
    faker.seed(1)
    // Test with seed 1 data
  })

  test('test 2', () => {
    faker.seed(2)
    // Test with seed 2 data
  })
})
```

### 2. Per-Suite Seeding

Use the same seed for all tests in a suite:

```ts
import { faker } from 'ts-mocker'

describe('User validation suite', () => {
  beforeEach(() => {
    faker.seed(12345)
  })

  test('validates name', () => {
    const name = faker.person.fullName()
    // Same name in every test
  })

  test('validates email', () => {
    const email = faker.internet.email()
    // Same email in every test
  })
})
```

### 3. Date-Based Seeding

Use the current date as a seed for daily-changing data:

```ts
import { faker } from 'ts-mocker'

// Changes once per day
const today = new Date().toISOString().split('T').at(0)
const seed = today.split('-').join('') // "20250103"
faker.seed(Number(seed))

const dailyData = generateData()
```

### 4. Environment-Based Seeding

Different seeds for different environments:

```ts
import { faker } from 'ts-mocker'

const seeds = {
  development: 1000,
  staging: 2000,
  testing: 3000,
}

faker.seed(seeds[process.env.NODE_ENV || 'development'])
```

## Advanced Patterns

### Resetting Seeds

Reset to a specific point in the sequence:

```ts
import { faker } from 'ts-mocker'

faker.seed(100)
const name1 = faker.person.fullName()
const name2 = faker.person.fullName()

// Reset to get the same sequence again
faker.seed(100)
const name3 = faker.person.fullName() // Same as name1
const name4 = faker.person.fullName() // Same as name2
```

### Multiple Seeded Instances

Use different seeds for different faker instances:

```ts
import { faker } from 'ts-mocker'

const faker1 = faker.locale('en')
faker1.seed(100)

const faker2 = faker.locale('es')
faker2.seed(200)

// Each instance has its own reproducible sequence
const enName = faker1.person.fullName()
const esName = faker2.person.fullName()
```

### Snapshot Testing

Use seeding with snapshot tests:

```ts
import { faker } from 'ts-mocker'

test('generates user snapshot', () => {
  faker.seed(42)

  const user = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    city: faker.address.city(),
  }

  expect(user).toMatchSnapshot()
  // Snapshot will always match because seed is consistent
})
```

## Best Practices

### 1. Use Meaningful Seeds

```ts
// Good - Meaningful seed values
faker.seed(12345) // Easy to remember and type
faker.seed(2024) // Year-based seed

// Avoid - Random or hard-to-remember seeds
faker.seed(938475029) // Too long and random
```

### 2. Document Your Seeds

```ts
// Good - Explain why you're using this seed
// Seed 42: Generates "John Doe" as first user for demo
faker.seed(42)
const demoUser = faker.person.fullName()

// Bad - No context
faker.seed(42)
```

### 3. Reset Seeds in Tests

```ts
describe('Tests', () => {
  beforeEach(() => {
    // Reset to known state before each test
    faker.seed(1000)
  })

  // Tests...
})
```

### 4. Don't Mix Seeded and Unseeded

```ts
// Good - Consistent approach
faker.seed(100)
const user1 = generateUser()
const user2 = generateUser()

// Avoid - Mixing seeded and unseeded
faker.seed(100)
const user3 = generateUser()
faker.seed(undefined) // Unseeded
const user4 = generateUser() // Inconsistent!
```

## Limitations

### Locale Changes Reset Sequence

Changing locales may affect the sequence:

```ts
faker.seed(100)
const enName = faker.person.fullName()

faker.locale = 'es'
const esName = faker.person.fullName()

// Sequence may be different due to locale change
```

### Not Cryptographically Secure

Seeds are for reproducibility, not security:

```ts
// Good - Test data generation
faker.seed(12345)
const testPassword = faker.internet.email()

// Bad - Don't use for security
faker.seed(12345)
const realPassword = faker.internet.email() // NOT SECURE!
```

## Common Use Cases

### Test Fixtures

```ts
import { faker } from 'ts-mocker'

export function createTestUsers(count: number) {
  faker.seed(1000)
  return Array.from({ length: count }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
  }))
}

// Always returns the same 10 users
const users = createTestUsers(10)
```

### Demo Data

```ts
import { faker } from 'ts-mocker'

export function generateDemoData() {
  faker.seed(2024)
  return {
    users: Array.from({ length: 5 }, () => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
    })),
    products: Array.from({ length: 10 }, () => ({
      name: faker.commerce.product(),
      price: Math.random() * 100,
    })),
  }
}
```

### Regression Testing

```ts
import { faker } from 'ts-mocker'

test('data transformation regression', () => {
  faker.seed(42)

  const input = generateInputData()
  const output = transformData(input)

  expect(output).toMatchSnapshot()
})
```

Seeding is a powerful feature for creating reproducible, consistent test data and debugging data-related issues in your applications.
