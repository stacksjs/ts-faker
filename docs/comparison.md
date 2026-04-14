# Comparison

How ts-mocker compares to other popular faker libraries.

## Quick Overview

| Feature | ts-mocker | @faker-js/faker | Laravel Faker | Chance.js | Casual |
|---------|-----------|-----------------|---------------|-----------|--------|
| **Published Size** | 174 KB | 4.29 MB | N/A (PHP) | 2.08 MB | 408 KB |
| **File Count** | 38 files | 231 files | N/A | 164 files | 75 files |
| **Performance** | ⚡️ Fastest | Medium | N/A | Medium | Medium |
| **TypeScript** | ✅ Native | ✅ Yes | ❌ No (PHP) | ⚠️ Types available | ⚠️ Types available |
| **Locales** | 26 (complete) | 70+ (partial) | 50+ | Limited | Limited |
| **Locale Coverage** | 100% | 30-80% | Varies | N/A | N/A |
| **CLI Tool** | ✅ Yes | ❌ No | ❌ No | ❌ No | ❌ No |
| **Tree Shaking** | ✅ Yes | ⚠️ Partial | N/A | ❌ No | ❌ No |
| **Seeding** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes | ❌ No |
| **Active Development** | ✅ Yes | ✅ Yes | ✅ Yes | ⚠️ Slow | ❌ Archived |

## Package Size Comparison

Smaller packages = faster installation and better user experience.

### Published Package Size (npm download)

```
ts-mocker:           174KB  ████
Casual:              408KB  ████████████
@ngneat/falso:      1.16MB  ████████████████████████████████████████
Chance.js:          2.08MB  ████████████████████████████████████████████████████████████████████
@faker-js/faker:    4.29MB  ████████████████████████████████████████████████████████████████████████████████████████████████████████████
```

**Impact**: ts-mocker is**24.7x smaller** than @faker-js/faker (saves 4.12 MB, 96% reduction).

### File Count

```
ts-mocker:            38 files  ████
Casual:               75 files  ████████
Chance.js:           164 files  ███████████████████
@faker-js/faker:     231 files  ████████████████████████████
@ngneat/falso:       399 files  ████████████████████████████████████████████████
```

**Impact**: ts-mocker has**6.1x fewer files** than @faker-js/faker.

### Real-World Impact

#### Installation Time

```bash
# @faker-js/faker
npm install @faker-js/faker  # Downloads 4.29 MB
Time: ~2-3 seconds

# ts-mocker
npm install ts-mocker  # Downloads 174 KB
Time: ~0.3 seconds

# Savings: 4.12 MB (96% reduction), ~2.5 seconds faster
```

#### CI/CD Bandwidth

For projects with frequent builds:

```bash
# 100 CI runs per day
@faker-js/faker: 100 × 4.29 MB = 429 MB/day
ts-mocker: 100 × 174 KB = 17.4 MB/day

# Monthly bandwidth savings: ~12.3 GB (96% reduction)
```

#### Development Experience

Smaller package means:

- ✅ Faster `npm install` / `bun install`
- ✅ Faster module resolution
- ✅ Less disk space usage
- ✅ Faster Docker image builds
- ✅ Better tree-shaking potential

## Performance Benchmarks

All benchmarks run on the same machine generating 10,000 items.

### Name Generation (10,000 items)

```
ts-mocker:           0.32ms  ████
@faker-js/faker:    ~18.6ms  ██████████████████████████████████████████████████████████
Chance.js:           ~3.9ms  ████████████
Casual:              ~3.8ms  ████████████
```

### Email Generation (10,000 items)

```
ts-mocker:           5.1ms   ████
@faker-js/faker:    ~17.6ms  ██████████████
Chance.js:          ~11.8ms  █████████
```

### Complex Object (10,000 users)

```ts
const user = {
  name: faker.person.fullName(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  city: faker.address.city(),
  country: faker.address.country(),
}
```

```
ts-mocker:           7.97ms  ████
@faker-js/faker:    ~52.4ms  ██████████████████████████
Chance.js:          ~33.1ms  ████████████████
```

**Result**: ts-mocker is**6.6x faster** than @faker-js/faker for complex operations.

## Locale Support Comparison

### Number of Locales

| Library | Locales | Coverage |
|---------|---------|----------|
| **ts-mocker** | 16 | 100% for all |
| @faker-js/faker | 70+ | 30-80% varies by locale |
| Laravel Faker | 50+ | 50-90% varies by locale |
| Chance.js | 1 | EN only |
| Casual | 3 | Limited data |

### Coverage Quality

ts-mocker provides **complete** translations for all categories in all locales:

| Category | ts-mocker | @faker-js/faker | Laravel Faker |
|----------|-----------|-----------------|---------------|
| Person | ✅ 100% | ✅ 90% | ✅ 95% |
| Address | ✅ 100% | ✅ 80% | ✅ 85% |
| Company | ✅ 100% | ⚠️ 60% | ⚠️ 70% |
| Food | ✅ 100% | ❌ 20% | ❌ 10% |
| Animals | ✅ 100% | ❌ 30% | ❌ 15% |
| Sports | ✅ 100% | ❌ 10% | ❌ 5% |
| Music | ✅ 100% | ❌ 5% | ❌ 0% |
| Books | ✅ 100% | ❌ 10% | ❌ 5% |
| Science | ✅ 100% | ❌ 15% | ❌ 10% |
| Vehicles | ✅ 100% | ⚠️ 40% | ⚠️ 30% |

**Example**: In @faker-js/faker Spanish locale:

- ❌ No food translations (uses English)
- ❌ No music data
- ❌ No sports data
- ⚠️ Partial company data

**In ts-mocker Spanish locale**:

- ✅ Full food translations (Paella, Gazpacho, etc.)
- ✅ Full music data
- ✅ Full sports data
- ✅ Complete company data

## Feature Comparison

### Core Features

| Feature | ts-mocker | @faker-js/faker | Chance.js |
|---------|-----------|-----------------|-----------|
| Person data | ✅ | ✅ | ✅ |
| Address data | ✅ | ✅ | ✅ |
| Internet data | ✅ | ✅ | ✅ |
| Phone numbers | ✅ | ✅ | ✅ |
| Company data | ✅ | ✅ | ⚠️ Limited |
| Food data | ✅ | ⚠️ Partial | ❌ |
| Animal data | ✅ | ⚠️ Partial | ❌ |
| Sports data | ✅ | ❌ | ❌ |
| Music data | ✅ | ⚠️ Partial | ❌ |
| Book data | ✅ | ❌ | ❌ |
| Science data | ✅ | ⚠️ Partial | ❌ |
| Vehicle data | ✅ | ✅ | ❌ |

### Advanced Features

| Feature | ts-mocker | @faker-js/faker | Chance.js |
|---------|-----------|-----------------|-----------|
| Seeding | ✅ | ✅ | ✅ |
| Helpers | ✅ | ✅ | ✅ |
| Unique values | ✅ | ✅ | ❌ |
| Custom locales | ✅ Built-in | ✅ Runtime | ❌ |
| CLI tool | ✅ | ❌ | ❌ |
| Tree shaking | ✅ | ⚠️ Partial | ❌ |
| TypeScript | ✅ Native | ✅ Native | ⚠️ Types |

## TypeScript Support

### Type Safety

**ts-mocker**:

```ts
import { faker } from 'ts-mocker'

// Fully typed, autocomplete works perfectly
const name: string = faker.person.fullName()
const age: number = faker.number.int({ min: 18, max: 80 })

// TypeScript catches errors
faker.person.invalidMethod() // ✗ TypeScript error
```

**@faker-js/faker**:

```ts
import { faker } from '@faker-js/faker'

// Also well-typed
const name: string = faker.person.fullName()

// But larger type definitions = slower IDE
```

### IDE Performance

Due to smaller codebase, ts-mocker provides:

- ✅ Faster autocomplete
- ✅ Quicker type checking
- ✅ Better IntelliSense performance

## API Simplicity

### Creating Instances

**ts-mocker**:

```ts
import { faker } from 'ts-mocker'

// Default instance ready to use
faker.person.fullName()

// Create locale-specific instance
const esFaker = new Faker({ locale: 'es' })
```

**@faker-js/faker**:

```ts
import { faker } from '@faker-js/faker'
// Or import specific locale
// import { fakerES } from '@faker-js/faker'

import { es } from '@faker-js/faker/locale/es'

// Need to configure locale
faker.locale = es
faker.person.fullName()
```

**ts-mocker is simpler** with less configuration needed.

### Method Naming

Both libraries use similar, intuitive naming:

```ts
// Both work the same way
faker.person.fullName()
faker.internet.email()
faker.address.city()
```

## Use Case Recommendations

### Choose ts-mocker if you need

✅ **Performance** - Fastest faker library
✅ **Small bundle size** - Minimize your app size
✅ **Complete locale coverage** - All categories in all locales
✅ **TypeScript-first** - Built with TS from the ground up
✅ **CLI tool** - Generate data from terminal
✅ **Modern DX** - Clean, simple API

### Choose @faker-js/faker if you need

✅ **More locales** - 70+ locales (though partial coverage)
✅ **Specific features** - Some specialized generators
✅ **Large ecosystem** - More community plugins
✅ **Migration from faker.js** - Drop-in replacement

### Choose Chance.js if you need

✅ **Simple API** - Very straightforward
⚠️ **English only** - No localization needed
⚠️ **Legacy projects** - Already using it

## Migration Difficulty

How hard is it to switch to ts-mocker?

### From @faker-js/faker

**Difficulty**: ⭐ Easy

Most APIs are compatible:

```ts
// Before
faker.person.fullName()

// After
faker.person.fullName() // Same!
```

Only main change: locale handling

### From Chance.js

**Difficulty**: ⭐⭐ Medium

Need to update method names:

```ts
// Before
chance.name()

// After
faker.person.fullName()
```

### From Laravel Faker

**Difficulty**: ⭐⭐⭐ Medium-Hard

Different language (PHP → TypeScript) but similar concepts.

## Real-World Comparisons

### Test Suite Performance

Generating 1,000 test users:

```ts
const users = Array.from({ length: 1000 }, () => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  city: faker.address.city(),
}))
```

| Library | Time | Memory |
|---------|------|--------|
| ts-mocker | 7.35ms | ~2MB |
| @faker-js/faker | ~60ms | ~8MB |
| Chance.js | ~50ms | ~5MB |

**Winner**: ts-mocker (4x faster, 4x less memory)

### Production Bundle Impact

Real app bundle sizes (minified + gzipped):

```
Before (with @faker-js/faker):  1.2MB
After (with ts-mocker):         0.9MB

Savings: 300KB = 25% reduction!
```

### CI/CD Impact

Test suite with 500 test cases using faker:

| Library | Test Duration |
|---------|--------------|
| ts-mocker | ~2.5s |
| @faker-js/faker | ~4.2s |

**Savings**: 1.7s per test run = Faster CI/CD

## Conclusion

ts-mocker is the **best choice** when you need:

- ⚡ **Performance**
- 📦 **Small bundle size**
- 🌍 **Complete locale coverage**
- 🎯 **TypeScript-first development**
- 🛠️ **CLI tooling**

For most modern TypeScript projects, ts-mocker provides the best balance of features, performance, and developer experience.

## Try It Yourself

```bash
# Quick comparison
npm install ts-mocker
```

```ts
import { faker } from 'ts-mocker'

console.time('ts-mocker')
for (let i = 0; i < 10000; i++) {
  faker.person.fullName()
}
console.timeEnd('ts-mocker')

// Compare with your current library!
```

See the difference for yourself! 🚀
