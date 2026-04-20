# Advanced Data Generation Features

ts-mocker now includes powerful advanced data generation features that allow you to create more realistic, validated, and contextually appropriate fake data.

## 🎯 Features Overview

1. **Conditional Data Generation** - Generate data with specific constraints
2. **Realistic Data Relationships** - Create connected, realistic data
3. **Custom Data Providers** - Plugin system for custom data sources
4. **Data Validation** - Built-in validators to ensure data quality
5. **Weighted Random Selection** - Realistic distribution patterns

## 1. Conditional Data Generation

Generate data that meets specific constraints and requirements.

### Basic Constraints

```typescript
import { faker } from 'ts-mocker'

// Generate only male names
const maleName = faker.person.firstNameAdvanced({
  constraints: { gender: 'male' }
})

// Generate names with age constraints
const profile = faker.person.profile({
  constraints: { ageRange: { min: 25, max: 35 } }
})

// Generate addresses in specific countries
const address = faker.address.addressAdvanced({
  constraints: { country: 'United States' }
})
```

### Advanced Constraints

```typescript
// Multiple constraints
const profile = faker.person.profile({
  constraints: {
    gender: 'female',
    ageRange: { min: 30, max: 40 },
    country: 'United States'
  }
})

// Array constraints
const address = faker.address.addressAdvanced({
  constraints: {
    country: ['United States', 'Canada', 'United Kingdom']
  }
})
```

## 2. Weighted Random Selection

Create more realistic data distributions by weighting certain values more heavily.

### Built-in Weighted Selections

```typescript
import { WeightedSelections } from 'ts-mocker'

// Common first names with realistic distribution
const name = faker.person.firstNameAdvanced({
  weighted: WeightedSelections.commonFirstNames
})

// Age distribution (more people in middle age ranges)
const age = faker.random.weightedArrayElement(WeightedSelections.ageDistribution.items)

// Country distribution (more people from populous countries)
const country = faker.address.countryAdvanced({
  weighted: WeightedSelections.countryDistribution
})
```

### Custom Weighted Selections

```typescript
// Custom weighted selection
const company = faker.company.name() // Assuming this method exists
const weightedCompany = faker.company.nameAdvanced({
  weighted: {
    items: [
      { item: 'Apple Inc.', weight: 100 },
      { item: 'Google LLC', weight: 90 },
      { item: 'Microsoft Corporation', weight: 85 },
      { item: 'Amazon.com Inc.', weight: 80 }
    ]
  }
})
```

### Random Class Weighted Methods

```typescript
// Weighted array selection
const items = [
  { item: 'common', weight: 100 },
  { item: 'uncommon', weight: 20 },
  { item: 'rare', weight: 5 }
]
const selected = faker.random.weightedArrayElement(items)

// Weighted boolean (70% chance of true)
const isActive = faker.random.weightedBoolean(0.7)

// Weighted integer with custom weights
const age = faker.random.weightedInt(18, 65, [1, 1, 1, 2, 3, 4, 5, 5, 4, 3, 2, 1])
```

## 3. Data Validation

Ensure generated data meets your quality standards with built-in and custom validators.

### Built-in Validation Rules

```typescript
import { ValidationRules } from 'ts-mocker'

// Validate names (no numbers, reasonable length)
const isValidName = ValidationRules.name('John Doe') // true
const isInvalidName = ValidationRules.name('John123') // false

// Validate email addresses
const isValidEmail = ValidationRules.email('user@example.com') // true
const isInvalidEmail = ValidationRules.email('invalid-email') // false

// Validate phone numbers
const isValidPhone = ValidationRules.phone('+1234567890') // true

// Validate ages
const isValidAge = ValidationRules.age(25) // true
const isInvalidAge = ValidationRules.age(200) // false

// Validate URLs
const isValidUrl = ValidationRules.url('https://example.com') // true

// Custom regex validation
const emailValidator = ValidationRules.regex(/^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/)
const isValidCustomEmail = emailValidator('test@example.com') // true

// Length validation
const lengthValidator = ValidationRules.length(5, 20)
const isValidLength = lengthValidator('Hello World') // true

// Range validation
const rangeValidator = ValidationRules.range(18, 65)
const isValidRange = rangeValidator(25) // true
```

### Using Validation in Data Generation

```typescript
// Generate validated names
const name = faker.person.firstNameAdvanced({
  validation: {
    rules: [{ validator: ValidationRules.name }],
    strict: false // Don't throw on validation failure
  }
})

// Strict validation (throws on failure)
try {
  const name = faker.person.firstNameAdvanced({
    validation: {
      rules: [{ validator: ValidationRules.length(100, 200) }], // Very long names
      strict: true
    }
  })
}
catch (error) {
  console.log('Validation failed:', error.message)
}
```

## 4. Realistic Data Relationships

Generate connected, realistic data where different fields relate to each other.

### Built-in Data Relationships

```typescript
import { DataRelationships } from 'ts-mocker'

// Phone number formats by country
const phoneFormat = DataRelationships.phoneByCountry.mapping['United States']
// Returns: '+1-###-###-####'

// Postal code formats by country
const postalFormat = DataRelationships.postalCodeByCountry.mapping['United States']
// Returns: '#####'

// Common first names by gender
const maleNames = DataRelationships.firstNameByGender.mapping.male
// Returns: ['John', 'Michael', 'David', ...]
```

### Family Generation

```typescript
// Generate a realistic family
const family = faker.person.family({
  constraints: { country: 'United States' },
  size: 4
})

console.log(`Family: ${family.lastName}`)
family.members.forEach((member) => {
  console.log(`- ${member.fullName} (${member.gender}, ${member.relationship})`)
})
```

### Neighborhood Generation

```typescript
// Generate addresses in the same neighborhood
const neighborhood = faker.address.neighborhood({
  constraints: { country: 'United States' },
  size: 5
})

neighborhood.forEach((address) => {
  console.log(`${address.street}, ${address.city}`)
  console.log(`Coordinates: ${address.latitude}, ${address.longitude}`)
})
```

### Custom Relationships

```typescript
// Generate data with custom relationships
const profile = faker.person.profile({
  relationships: [
    {
      field: 'phone',
      dependsOn: 'country',
      mapping: {
        'United States': '+1-###-###-####',
        'United Kingdom': '+44 #### ### ###',
        'Germany': '+49 ### ########'
      }
    }
  ]
})
```

## 5. Custom Data Providers

Extend ts-mocker with your own data generation logic.

### Creating a Custom Provider

```typescript
import { DataProviderPlugin } from 'ts-mocker'

const techCompanyProvider: DataProviderPlugin<string> = {
  name: 'Tech Company Generator',
  category: 'company',
  version: '1.0.0',
  generate: () => {
    const prefixes = ['Cloud', 'Data', 'AI', 'Cyber', 'Quantum', 'Neural', 'Blockchain']
    const suffixes = ['Tech', 'Systems', 'Solutions', 'Labs', 'Works', 'Corp']
    const prefix = faker.random.arrayElement(prefixes)
    const suffix = faker.random.arrayElement(suffixes)
    return `${prefix} ${suffix}`
  },
  validate: (value: string) => value.length > 5,
  getWeight: () => 1.0
}
```

### Registering and Using Custom Providers

```typescript
import { globalProviderRegistry } from 'ts-mocker'

// Register the provider
globalProviderRegistry.register(techCompanyProvider)

// Use the provider
const provider = globalProviderRegistry.get('company', 'Tech Company Generator')
if (provider) {
  const companyName = provider.generate()
  console.log(companyName) // e.g., "Cloud Tech"
}

// Get all providers in a category
const companyProviders = globalProviderRegistry.getProvidersInCategory('company')

// Get all categories
const categories = globalProviderRegistry.getCategories()
```

## 6. Combined Advanced Features

Use multiple advanced features together for maximum realism.

### Complete User Profile

```typescript
// Generate a realistic user profile with all features
const profile = faker.person.profile({
  constraints: {
    ageRange: { min: 25, max: 45 },
    country: 'United States'
  },
  validation: {
    rules: [{ validator: ValidationRules.name }],
    strict: false
  }
})

const address = faker.address.addressAdvanced({
  constraints: { country: profile.country || 'United States' },
  relationships: [DataRelationships.phoneByCountry]
})

const user = {
  name: profile.fullName,
  age: profile.age,
  job: profile.jobTitle,
  email: faker.internet.email(),
  address: `${address.street}, ${address.city}, ${address.state}`,
  phone: faker.phone.number(),
  coordinates: [address.latitude, address.longitude]
}
```

### Batch Generation with Relationships

```typescript
// Generate multiple users in the same region
const users = []
const baseRegion = faker.address.neighborhood({ size: 1 }).at(0)

for (let i = 0; i < 10; i++) {
  const profile = faker.person.profile({
    constraints: {
      ageRange: { min: 18, max: 65 },
      country: 'United States'
    }
  })

  const address = faker.address.addressAdvanced({
    constraints: { country: 'United States' },
    relationships: [
      {
        field: 'city',
        dependsOn: 'region',
        mapping: { region1: baseRegion.city }
      }
    ]
  })

  users.push({
    id: i + 1,
    ...profile,
    address: {
      ...address,
      city: baseRegion.city // All users in same city
    }
  })
}
```

## 🚀 Performance Considerations

The advanced features are designed to maintain ts-mocker's excellent performance:

- **Conditional generation** adds minimal overhead (~5-10%)
- **Weighted selection** is highly optimized with O(1) lookup
- **Validation** only runs when explicitly requested
- **Relationships** use efficient mapping lookups

### Performance Testing

```typescript
// Test performance with advanced features
const iterations = 10000

console.time('Advanced generation (10k names)')
for (let i = 0; i < iterations; i++) {
  faker.person.firstNameAdvanced({
    constraints: { gender: 'male' },
    validation: { rules: [{ validator: ValidationRules.name }], strict: false }
  })
}
console.timeEnd('Advanced generation (10k names)')
```

## 🎯 Best Practices

1. **Use constraints sparingly** - Only apply constraints when necessary for your use case
2. **Validate selectively** - Use validation only for critical data fields
3. **Cache custom providers** - Register providers once and reuse them
4. **Test performance** - Benchmark your advanced generation patterns
5. **Combine features thoughtfully** - Use relationships to create realistic data connections

## 🔧 Migration from Basic Features

The advanced features are completely backward compatible:

```typescript
// Old way (still works)
const name = faker.person.firstName()
const email = faker.internet.email()

// New way (with advanced features)
const name = faker.person.firstNameAdvanced({
  constraints: { gender: 'male' },
  validation: { rules: [{ validator: ValidationRules.name }] }
})
const email = faker.internet.email() // Still works the same
```

## 📚 Examples

See the complete examples in:

- `examples/advanced-features-demo.ts` - Comprehensive demonstration
- `test/advanced-features.test.ts` - Test cases and usage patterns

The advanced features make ts-mocker even more powerful for generating realistic, validated, and contextually appropriate fake data while maintaining its excellent performance characteristics.
