# Migration Guide

Migrating to ts-mocker from other faker libraries is straightforward. This guide helps you transition from popular alternatives.

## From Faker.js / @faker-js/faker

### Installation

```bash
# Remove old package
npm uninstall faker
# or
npm uninstall @faker-js/faker

# Install ts-mocker
npm install ts-mocker
```

### Import Changes

**Before (faker.js):**

```ts
import { faker } from '@faker-js/faker'
```

**After (ts-mocker):**

```ts
import { faker } from 'ts-mocker'
```

### API Differences

Most APIs are compatible, but here are the key differences:

#### Locale Setting

**Before:**

```ts
import { faker } from '@faker-js/faker'
import { es } from '@faker-js/faker/locale/es'

faker.locale = es
```

**After:**

```ts
import { faker } from 'ts-mocker'

faker.setLocale('es')
// or create new instance
const esFaker = new Faker({ locale: 'es' })
```

#### Seeding

**Before:**

```ts
faker.seed(123)
```

**After:**

```ts
faker.seed(123) // Same!
```

#### Common Methods

Most methods work the same:

| faker.js | ts-mocker | Notes |
|----------|-----------|-------|
| `faker.name.firstName()` | `faker.person.firstName()` | Use `person` instead of `name` |
| `faker.name.lastName()` | `faker.person.lastName()` | Use `person` instead of `name` |
| `faker.name.fullName()` | `faker.person.fullName()` | Use `person` instead of `name` |
| `faker.internet.email()` | `faker.internet.email()` | ✓ Same |
| `faker.address.city()` | `faker.address.city()` | ✓ Same |
| `faker.datatype.number()` | `faker.number.int()` | Use `number.int()` |
| `faker.datatype.boolean()` | `faker.helpers.boolean()` | Moved to helpers |
| `faker.random.arrayElement()` | `faker.helpers.arrayElement()` | Moved to helpers |
| `faker.random.word()` | `faker.word.noun()` | More specific |

### Migration Example

**Before (faker.js):**

```ts
import { faker } from '@faker-js/faker'

const user = {
  id: faker.datatype.uuid(),
  name: faker.name.fullName(),
  email: faker.internet.email(),
  age: faker.datatype.number({ min: 18, max: 80 }),
  city: faker.address.city(),
  isActive: faker.datatype.boolean(),
}
```

**After (ts-mocker):**

```ts
import { faker } from 'ts-mocker'

const user = {
  id: crypto.randomUUID(), // Use native crypto
  name: faker.person.fullName(),
  email: faker.internet.email(),
  age: faker.number.int({ min: 18, max: 80 }),
  city: faker.address.city(),
  isActive: faker.helpers.boolean(),
}
```

### Not Yet Supported

Some faker.js features aren't in ts-mocker yet:

- `faker.datatype.uuid()` → Use `crypto.randomUUID()`
- `faker.datatype.datetime()` → Use `faker.date.*` methods
- `faker.image.*()` → Use `faker.image.*()` (limited)
- Custom locales at runtime → Locales are built-in

## From Laravel Faker (PHP)

### Basic Usage

**Before (Laravel/PHP):**

```php
$faker = Faker\Factory::create();
$name = $faker->name;
$email = $faker->email;
```

**After (ts-mocker/TypeScript):**

```ts
import { faker } from 'ts-mocker'

const name = faker.person.fullName()
const email = faker.internet.email()
```

### Locale

**Before:**

```php
$faker = Faker\Factory::create('es*ES');
```

**After:**

```ts
const faker = new Faker({ locale: 'es' })
```

### Common Methods

| Laravel Faker (PHP) | ts-mocker (TypeScript) |
|---------------------|------------------------|
| `$faker->name` | `faker.person.fullName()` |
| `$faker->firstName` | `faker.person.firstName()` |
| `$faker->email` | `faker.internet.email()` |
| `$faker->phoneNumber` | `faker.phone.number()` |
| `$faker->address` | `faker.address.street()` |
| `$faker->city` | `faker.address.city()` |
| `$faker->country` | `faker.address.country()` |
| `$faker->company` | `faker.company.name()` |
| `$faker->randomElement($array)` | `faker.helpers.arrayElement(array)` |
| `$faker->boolean` | `faker.helpers.boolean()` |
| `$faker->numberBetween(1, 100)` | `faker.number.int({ min: 1, max: 100 })` |
| `$faker->word` | `faker.word.noun()` |
| `$faker->sentence` | `faker.lorem.sentence()` |

### Formatters

**Before:**

```php
$faker->numerify('###-###');
$faker->lexify('???');
$faker->bothify('##??##');
```

**After:**

```ts
faker.helpers.numerify('###-###')
faker.helpers.lexify('???')
faker.helpers.bothify('##??##')
```

### Database Seeding

**Before (Laravel):**

```php
User::factory()->count(50)->create();

// or manual
for ($i = 0; $i < 50; $i++) {
    User::create([
        'name' => $faker->name,
        'email' => $faker->email,
    ]);
}
```

**After (TypeScript/Node.js):**

```ts
import { faker } from 'ts-mocker'

// Generate data
const users = Array.from({ length: 50 }, () => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
}))

// Insert into database
await db.users.insertMany(users)
```

## From Chance.js

### Installation

```bash
npm uninstall chance
npm install ts-mocker
```

### API Mapping

| Chance.js | ts-mocker |
|-----------|-----------|
| `chance.name()` | `faker.person.fullName()` |
| `chance.first()` | `faker.person.firstName()` |
| `chance.last()` | `faker.person.lastName()` |
| `chance.email()` | `faker.internet.email()` |
| `chance.phone()` | `faker.phone.number()` |
| `chance.address()` | `faker.address.street()` |
| `chance.city()` | `faker.address.city()` |
| `chance.state()` | `faker.address.state()` |
| `chance.country()` | `faker.address.country()` |
| `chance.bool()` | `faker.helpers.boolean()` |
| `chance.integer({ min, max })` | `faker.number.int({ min, max })` |
| `chance.pickone(array)` | `faker.helpers.arrayElement(array)` |
| `chance.shuffle(array)` | `faker.helpers.shuffle(array)` |

## From Casual

### Basic Usage

**Before (Casual):**

```ts
import casual from 'casual'

const name = casual.full*name
const email = casual.email
```

**After (ts-mocker):**

```ts
import { faker } from 'ts-mocker'

const name = faker.person.fullName()
const email = faker.internet.email()
```

### Common Methods

| Casual | ts-mocker |
|--------|-----------|
| `casual.full*name` | `faker.person.fullName()` |
| `casual.first*name` | `faker.person.firstName()` |
| `casual.email` | `faker.internet.email()` |
| `casual.phone` | `faker.phone.number()` |
| `casual.city` | `faker.address.city()` |
| `casual.country` | `faker.address.country()` |
| `casual.random*element(array)` | `faker.helpers.arrayElement(array)` |
| `casual.integer(1, 100)` | `faker.number.int({ min: 1, max: 100 })` |
| `casual.coin*flip` | `faker.helpers.boolean()` |

## Common Migration Patterns

### Factory Pattern

**Before (any library):**

```ts
class UserFactory {
  static create() {
    return {
      name: oldFaker.name(),
      email: oldFaker.email(),
    }
  }
}
```

**After:**

```ts
import { faker } from 'ts-mocker'

class UserFactory {
  static create() {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email(),
    }
  }
}
```

### Seeding Databases

**Before:**

```ts
const users = []
for (let i = 0; i < 100; i++) {
  users.push({
    name: oldFaker.name(),
    email: oldFaker.email(),
  })
}
```

**After:**

```ts
import { faker } from 'ts-mocker'

const users = Array.from({ length: 100 }, () => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
}))
```

### Test Fixtures

**Before:**

```ts
beforeEach(() => {
  testUser = {
    name: oldFaker.name(),
    email: oldFaker.email(),
  }
})
```

**After:**

```ts
import { faker } from 'ts-mocker'

beforeEach(() => {
  faker.seed(12345) // Reproducible!
  testUser = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
  }
})
```

## Tips for Migration

### 1. Start with Core Data

Migrate your most common data first:

- Names → `faker.person.*`
- Emails → `faker.internet.email()`
- Addresses → `faker.address.*`

### 2. Use Find & Replace

Most migrations can be done with find & replace:

- `faker.name.` → `faker.person.`
- `faker.datatype.number` → `faker.number.int`
- `faker.random.arrayElement` → `faker.helpers.arrayElement`

### 3. Test Incrementally

Migrate one module at a time and test:

```ts
// Step 1: Migrate imports
import { faker } from 'ts-mocker'

// Step 2: Migrate one function
function createUser() {
  return {
    name: faker.person.fullName(), // ✓ Migrated
    email: faker.internet.email(), // ✓ Migrated
  }
}

// Step 3: Test
const user = createUser()
console.log(user)

// Step 4: Migrate next function
```

### 4. Create Adapters for Complex Cases

If you have complex legacy code:

```ts
// adapter.ts
import { faker } from 'ts-mocker'

export const legacyFaker = {
  name: () => faker.person.fullName(),
  email: () => faker.internet.email(),
  // Map your old API to new API
}

// Then gradually replace the adapter
```

### 5. Update Tests

Ensure your tests work with the new library:

```ts
import { describe, expect, test } from 'bun:test'
import { faker } from 'ts-mocker'

describe('Migration tests', () => {
  test('generates valid user data', () => {
    faker.seed(123) // Reproducible

    const user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
    }

    expect(user.name).toBeTruthy()
    expect(user.email).toContain('@')
  })
})
```

## Benefits After Migration

After migrating to ts-mocker, you'll get:

✅ **Smaller bundle size** - Significantly lighter than faker.js
✅ **Better performance** - Faster data generation
✅ **Complete locale coverage** - All 16 locales fully translated
✅ **Full TypeScript support** - Better IDE autocomplete
✅ **Simpler API** - Less configuration needed
✅ **CLI tool** - Command-line data generation

## Need Help

If you encounter issues during migration:

1. Check the [API Reference](/advanced/api-reference)
2. See [Usage Examples](/examples)
3. Ask on [GitHub Discussions](https://github.com/stacksjs/ts-mocker/discussions)
4. Join the [Discord](https://discord.gg/stacksjs)

Happy migrating! 🚀
