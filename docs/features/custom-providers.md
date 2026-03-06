# Custom Providers

ts-mocker allows you to extend its functionality with custom data providers. Providers are modules that generate specific types of fake data according to your application's needs.

## Creating a Custom Provider

### Basic Provider Structure

```typescript
import { globalProviderRegistry } from 'ts-mocker'

const customProvider = {
  name: 'Tech Company Generator',
  category: 'company',
  version: '1.0.0',
  generate: () => 'Cloud Tech Solutions'
}

// Register the provider
globalProviderRegistry.register(customProvider)
```

### Provider with Options

```typescript
interface TechCompanyOptions {
  includePrefix?: boolean
  suffix?: 'Inc' | 'LLC' | 'Corp'
}

const techCompanyProvider = {
  name: 'Tech Company Provider',
  category: 'company',
  version: '1.0.0',
  generate: (options: TechCompanyOptions = {}) => {
    const prefixes = ['Cloud', 'Cyber', 'Data', 'Digital', 'Smart']
    const names = ['Solutions', 'Systems', 'Labs', 'Tech', 'Works']

    const prefix = options.includePrefix
      ? prefixes[Math.floor(Math.random() * prefixes.length)] + ' '
      : ''
    const name = names[Math.floor(Math.random() * names.length)]
    const suffix = options.suffix ? ` ${options.suffix}` : ''

    return `${prefix}${name}${suffix}`
  }
}

globalProviderRegistry.register(techCompanyProvider)
```

### Provider with Dependencies

```typescript
import { faker } from 'ts-mocker'

const employeeProvider = {
  name: 'Employee Generator',
  category: 'person',
  version: '1.0.0',
  generate: () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    department: faker.commerce.department(),
    jobTitle: faker.person.jobTitle(),
    hireDate: faker.date.past()
  })
}

globalProviderRegistry.register(employeeProvider)
```

## Provider Categories

Organize your providers by category for better management:

```typescript
// Product provider
const productProvider = {
  name: 'E-Commerce Product',
  category: 'commerce',
  version: '1.0.0',
  generate: () => ({
    sku: `SKU-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    name: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price()),
    category: faker.commerce.department()
  })
}

// Order provider
const orderProvider = {
  name: 'E-Commerce Order',
  category: 'commerce',
  version: '1.0.0',
  generate: () => ({
    orderId: `ORD-${Date.now()}`,
    customer: faker.person.fullName(),
    items: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () => ({
      product: faker.commerce.product(),
      quantity: Math.floor(Math.random() * 10) + 1,
      price: parseFloat(faker.commerce.price())
    })),
    total: parseFloat(faker.commerce.price({ min: 50, max: 500 })),
    status: faker.helpers.arrayElement(['pending', 'processing', 'shipped', 'delivered'])
  })
}
```

## Locale-Aware Providers

Create providers that respect the current locale:

```typescript
import { Faker } from 'ts-mocker'

const addressProvider = {
  name: 'Full Address',
  category: 'address',
  version: '1.0.0',
  generate: (faker: Faker) => {
    const locale = faker.getLocale()

    // Format address based on locale
    if (locale === 'en-us') {
      return `${faker.address.street()}\n${faker.address.city()}, ${faker.address.state()} ${faker.address.zipCode()}`
    } else if (locale === 'de') {
      return `${faker.address.street()}\n${faker.address.zipCode()} ${faker.address.city()}`
    } else if (locale === 'ja') {
      return `${faker.address.zipCode()}\n${faker.address.state()}${faker.address.city()}${faker.address.street()}`
    }

    // Default format
    return `${faker.address.street()}, ${faker.address.city()}`
  }
}
```

## Weighted Providers

Create providers with weighted random selection:

```typescript
const weightedStatusProvider = {
  name: 'Order Status',
  category: 'commerce',
  version: '1.0.0',
  weights: {
    'delivered': 50,    // 50% chance
    'shipped': 25,      // 25% chance
    'processing': 15,   // 15% chance
    'pending': 8,       // 8% chance
    'cancelled': 2      // 2% chance
  },
  generate: function() {
    const totalWeight = Object.values(this.weights).reduce((a, b) => a + b, 0)
    let random = Math.random() * totalWeight

    for (const [status, weight] of Object.entries(this.weights)) {
      random -= weight
      if (random <= 0) return status
    }

    return 'pending' // fallback
  }
}
```

## Provider Registry API

### Registering Providers

```typescript
import { globalProviderRegistry } from 'ts-mocker'

// Register a single provider
globalProviderRegistry.register(myProvider)

// Register multiple providers
globalProviderRegistry.registerMany([
  productProvider,
  orderProvider,
  employeeProvider
])
```

### Using Registered Providers

```typescript
// Get a provider by name
const provider = globalProviderRegistry.get('Tech Company Generator')
const company = provider.generate()

// List all providers in a category
const commerceProviders = globalProviderRegistry.getByCategory('commerce')

// Check if a provider exists
if (globalProviderRegistry.has('My Provider')) {
  // ...
}
```

### Unregistering Providers

```typescript
// Remove a specific provider
globalProviderRegistry.unregister('Tech Company Generator')

// Remove all providers in a category
globalProviderRegistry.unregisterCategory('commerce')

// Clear all custom providers
globalProviderRegistry.clear()
```

## Testing Custom Providers

```typescript
import { describe, it, expect } from 'bun:test'
import { globalProviderRegistry, faker } from 'ts-mocker'

describe('Custom Employee Provider', () => {
  beforeAll(() => {
    globalProviderRegistry.register(employeeProvider)
  })

  afterAll(() => {
    globalProviderRegistry.unregister('Employee Generator')
  })

  it('generates valid employee data', () => {
    faker.seed(42)
    const provider = globalProviderRegistry.get('Employee Generator')
    const employee = provider.generate()

    expect(employee).toHaveProperty('id')
    expect(employee).toHaveProperty('name')
    expect(employee).toHaveProperty('email')
    expect(employee.email).toContain('@')
  })

  it('generates unique employees', () => {
    const provider = globalProviderRegistry.get('Employee Generator')
    const employees = Array.from({ length: 100 }, () => provider.generate())
    const ids = employees.map(e => e.id)
    const uniqueIds = new Set(ids)

    expect(uniqueIds.size).toBe(100)
  })
})
```

## Best Practices

1. **Version your providers** - Include version numbers for tracking changes
2. **Document expected output** - Describe what the provider generates
3. **Handle edge cases** - Consider empty states and error conditions
4. **Test thoroughly** - Ensure providers generate valid data
5. **Use meaningful names** - Make providers easy to identify
6. **Keep providers focused** - Each provider should have a single responsibility
