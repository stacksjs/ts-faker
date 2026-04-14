<p align="center"><img src=".github/art/cover.jpg" alt="Social Card of this repo"></p>

[![npm version][npm-version-src]][npm-version-href]
[![GitHub Actions][github-actions-src]][github-actions-href]
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
<!-- [![npm downloads][npm-downloads-src]][npm-downloads-href] -->
<!-- [![Codecov][codecov-src]][codecov-href] -->

# ts-mocker

A performance-focused and lightweight faker library for TypeScript with comprehensive locale support.

## Features

- ⚡️ **Performance-focused** - Built with speed and efficiency in mind
- 🌍 **Multi-locale Support** - Complete translations for 28 languages with 22+ regional variants:
  - Afrikaans _(af)_, Arabic _(ar)_, Azerbaijani _(az)_, Czech _(cs)_, Danish _(da)_, German _(de)_, English _(en)_, Esperanto _(eo)_, Spanish _(es)_, Persian/Farsi _(fa)_, Finnish _(fi)_, French _(fr)_, Hebrew _(he)_, Hindi _(hi)_, Italian _(it)_, Japanese _(ja)_, Korean _(ko)_, Dutch _(nl)_, Norwegian _(no)_, Polish _(pl)_, Portuguese _(pt)_, Swedish _(sv)_, Filipino _(tl)_, Turkish _(tr)_, Ukrainian _(uk)_, Chinese Simplified _(zh-cn)_, Chinese Traditional _(zh-tw)_, Zulu _(zu)_
  - Plus regional variants: `en-us`, `en-gb`, `en-ca`, `en-ie`, `en-in`, `en-za`, `en-gh`, `en-ng`, `en-hk`, `fr-ca`, `fr-ch`, `fr-be`, `fr-lu`, `fr-sn`, `de-at`, `de-ch`, `es-mx`, `pt-mz`, `af-za`, `zu-za`, and more!
- 📦 **Lightweight** - Minimal dependencies and small bundle size
- 💪 **Fully Typed** - Written in TypeScript with comprehensive type definitions
- 🎯 **Comprehensive Data** - 16+ data categories including:
  - Person _(names, job titles, genders)_
  - Address _(streets, cities, countries)_
  - Company _(names, industries, buzzwords)_
  - Internet _(emails, domains)_
  - Phone numbers _(numbers)_
  - Food _(dishes, ingredients, cuisines)_
  - Animals _(dogs, cats, birds, fish, etc.)_
  - Sports _(teams, athletes)_
  - Music _(genres, artists, songs)_
  - Commerce _(products, colors, materials)_
  - Books _(titles, authors, publishers)_
  - Vehicles _(manufacturers, models, types)_
  - Words _(adjectives, verbs, nouns, etc.)_
  - Hacker/Tech _(abbreviations, phrases)_
  - System _(file names, file types)_
  - Science _(elements, units, constants)_

## Installation

```bash
# npm
npm install ts-mocker

# pnpm
pnpm add ts-mocker

# bun
bun add ts-mocker

# yarn
yarn add ts-mocker
```

## Usage

### Basic Usage

```typescript
import { faker } from 'ts-mocker'

// Generate random data with default locale (English)
const name = faker.person.fullName()
const email = faker.internet.email()
const address = faker.address.city()

console.log(name) // "John Doe"
console.log(email) // "john.doe@example.com"
console.log(address) // "New York"
```

### Advanced Features

ts-mocker includes powerful advanced data generation features:

```typescript
import { faker, globalProviderRegistry, ValidationRules, WeightedSelections } from 'ts-mocker'

// Conditional generation with constraints
const maleName = faker.person.firstNameAdvanced({
  constraints: { gender: 'male' }
})

// Weighted selection for realistic distribution
const commonName = faker.person.firstNameAdvanced({
  weighted: WeightedSelections.commonFirstNames
})

// Data validation
const validatedName = faker.person.firstNameAdvanced({
  validation: {
    rules: [{ validator: ValidationRules.name }],
    strict: false
  }
})

// Realistic relationships
const family = faker.person.family({
  constraints: { country: 'United States' },
  size: 4
})
const customProvider = {
  name: 'Tech Company Generator',
  category: 'company',
  version: '1.0.0',
  generate: () => 'Cloud Tech Solutions'
}
globalProviderRegistry.register(customProvider)
```

See [Advanced Features Documentation](docs/advanced-features.md) for complete details.

### Using Different Locales

```typescript
import { faker } from 'ts-mocker'

// Set locale globally
faker.setLocale('es') // Spanish
console.log(faker.person.fullName()) // "María García"

// Or create a new instance with a specific locale
const spanishFaker = new Faker({ locale: 'es' })
const japaneseFaker = new Faker({ locale: 'ja' })
const chineseSimplifiedFaker = new Faker({ locale: 'zh-cn' })
const chineseTraditionalFaker = new Faker({ locale: 'zh-tw' })

console.log(spanishFaker.person.fullName()) // "Carlos López"
console.log(japaneseFaker.person.fullName()) // "田中太郎"
console.log(chineseSimplifiedFaker.person.fullName()) // "王伟"
console.log(chineseTraditionalFaker.person.fullName()) // "陳小明"

// Regional variants provide localized data
const usFaker = new Faker({ locale: 'en-us' })
const ukFaker = new Faker({ locale: 'en-gb' })
const canadianFrenchFaker = new Faker({ locale: 'fr-ca' })

console.log(usFaker.address.city()) // "New York"
console.log(ukFaker.address.city()) // "London"
console.log(canadianFrenchFaker.address.city()) // "Montréal"
```

### Available Locales

- `af` - Afrikaans
- `ar` - Arabic
- `az` - Azerbaijani
- `cs` - Czech
- `da` - Danish
- `de` - German
- `en` - English
- `eo` - Esperanto
- `es` - Spanish
- `fa` - Persian/Farsi
- `fi` - Finnish
- `fr` - French
- `he` - Hebrew
- `hi` - Hindi
- `it` - Italian
- `ja` - Japanese
- `ko` - Korean
- `nl` - Dutch
- `no` - Norwegian
- `pl` - Polish
- `pt` - Portuguese
- `sv` - Swedish
- `tl` - Filipino
- `tr` - Turkish
- `uk` - Ukrainian
- `zh-cn` - Chinese (Simplified)
- `zh-tw` - Chinese (Traditional)
- `zu` - Zulu

#### Regional Variants

Many languages also have regional variants with localized data for specific countries:

**English Variants:**

- `en-us` - English (United States)
- `en-gb` - English (United Kingdom)
- `en-ca` - English (Canada)
- `en-ie` - English (Ireland)
- `en-in` - English (India)
- `en-za` - English (South Africa)
- `en-gh` - English (Ghana)
- `en-ng` - English (Nigeria)
- `en-hk` - English (Hong Kong)

**French Variants:**

- `fr-ca` - French (Canada)
- `fr-ch` - French (Switzerland)
- `fr-be` - French (Belgium)
- `fr-lu` - French (Luxembourg)
- `fr-sn` - French (Senegal)

**German Variants:**

- `de-at` - German (Austria)
- `de-ch` - German (Switzerland)

**Spanish Variants:**

- `es-mx` - Spanish (Mexico)

**Portuguese Variants:**

- `pt-mz` - Portuguese (Mozambique)

**Afrikaans Variants:**

- `af-za` - Afrikaans (South Africa)

**Zulu Variants:**

- `zu-za` - Zulu (South Africa)

These regional variants include country-specific data such as local cities, addresses, phone formats, and cultural references.

### API Examples

```typescript
import { faker } from 'ts-mocker'

// Person
faker.person.firstName() // Random first name
faker.person.firstName({ gender: 'male' }) // Random male first name
faker.person.firstName({ gender: 'female' }) // Random female first name
faker.person.firstName({ gender: 'neutral' }) // Random neutral first name
faker.person.firstNameMale() // Random male first name
faker.person.firstNameFemale() // Random female first name
faker.person.firstNameNeutral() // Random neutral first name
faker.person.lastName() // Random last name
faker.person.fullName() // Random full name
faker.person.fullName({ gender: 'male' }) // Random full name with male first name
faker.person.fullName({ gender: 'female' }) // Random full name with female first name
faker.person.fullName({ prefix: true }) // Random full name with prefix
faker.person.fullName({ suffix: true }) // Random full name with suffix
faker.person.gender() // Random gender
faker.person.jobTitle() // Random job title
faker.person.prefix() // Random prefix (Mr., Mrs., etc.)
faker.person.suffix() // Random suffix (Jr., Sr., etc.)

// Address
faker.address.street() // Random street name
faker.address.city() // Random city
faker.address.state() // Random state/province
faker.address.country() // Random country
faker.address.zipCode() // Random ZIP/postal code
faker.address.direction() // Random direction (North, South, etc.)

// Company
faker.company.name() // Random company name
faker.company.industry() // Random industry
faker.company.buzzword() // Random business buzzword

// Internet
faker.internet.email() // Random email address
faker.internet.domainName() // Random domain name
faker.internet.url() // Random URL

// Phone
faker.phone.number() // Random phone number

// Food
faker.food.dish() // Random dish name
faker.food.ingredient() // Random ingredient
faker.food.cuisine() // Random cuisine type
faker.food.dessert() // Random dessert
faker.food.fruit() // Random fruit
faker.food.vegetable() // Random vegetable
faker.food.meat() // Random meat
faker.food.spice() // Random spice

// Animal
faker.animal.dog() // Random dog breed
faker.animal.cat() // Random cat breed
faker.animal.bird() // Random bird species
faker.animal.fish() // Random fish species
faker.animal.horse() // Random horse breed
faker.animal.rabbit() // Random rabbit breed
faker.animal.insect() // Random insect

// Sport
faker.sport.sport() // Random sport name
faker.sport.team() // Random team name
faker.sport.athlete() // Random athlete name

// Music
faker.music.genre() // Random music genre
faker.music.artist() // Random artist name
faker.music.song() // Random song title
faker.music.instrument() // Random instrument

// Commerce
faker.commerce.product() // Random product name
faker.commerce.adjective() // Random product adjective
faker.commerce.material() // Random material
faker.commerce.department() // Random department
faker.commerce.color() // Random color

// Book
faker.book.title() // Random book title
faker.book.author() // Random author name
faker.book.publisher() // Random publisher
faker.book.genre() // Random book genre
faker.book.series() // Random book series
faker.book.review() // Random book review

// Vehicle
faker.vehicle.manufacturer() // Random vehicle manufacturer
faker.vehicle.model() // Random vehicle model
faker.vehicle.type() // Random vehicle type
faker.vehicle.fuel() // Random fuel type
faker.vehicle.bicycle() // Random bicycle type

// Word
faker.word.adjective() // Random adjective
faker.word.adverb() // Random adverb
faker.word.conjunction() // Random conjunction
faker.word.interjection() // Random interjection
faker.word.noun() // Random noun
faker.word.preposition() // Random preposition
faker.word.verb() // Random verb

// Hacker/Tech
faker.hacker.abbreviation() // Random tech abbreviation
faker.hacker.adjective() // Random tech adjective
faker.hacker.noun() // Random tech noun
faker.hacker.verb() // Random tech verb
faker.hacker.ingverb() // Random tech -ing verb
faker.hacker.phrase() // Random tech phrase

// System
faker.system.fileName() // Random file name
faker.system.fileType() // Random file type

// Science
faker.science.chemicalElement() // Random chemical element
faker.science.unit() // Random unit of measurement
faker.science.constant() // Random scientific constant
faker.science.field() // Random scientific field
```

## Command Line Interface

ts-mocker includes a powerful CLI for generating fake data from the terminal.

### Installation

```bash
# Global installation
npm install -g ts-mocker

# Or use with npx
npx ts-mocker [command]
```

### Quick Examples

```bash
# Generate a random name
ts-mocker generate person fullName

# Generate 5 emails in Spanish
ts-mocker generate internet email --locale es --count 5

# Generate 10 test users as JSON
ts-mocker batch 10

# List all available categories
ts-mocker categories

# List methods for a category
ts-mocker methods food
```

### Available Commands

- `generate <category> <method>` - Generate random data
- `batch <count>` - Generate multiple complete records
- `categories` - List all available categories
- `methods <category>` - List methods for a category
- `locales` - List all supported locales
- `seed <seed>` - Generate reproducible data with a seed
- `version` - Show version

### Options

- `--locale <locale>` - Use a specific locale (af, ar, az, cs, da, de, en, eo, es, fa, fi, fr, he, hi, it, ja, ko, nl, no, pl, pt, sv, tl, tr, uk, zh-cn, zh-tw, zu)
- `--count <count>` - Number of items to generate
- `--seed <seed>` - Seed for reproducible results
- `--json` - Output as JSON
- `--template <template>` - Template for batch: user, product, address, company

### More Examples

```bash
# Reproducible data with seed
ts-mocker generate person fullName --seed 12345

# Generate products in JSON
ts-mocker batch 5 --template product --json

# Generate Japanese food items
ts-mocker generate food dish --locale ja --count 10

# Save to file
ts-mocker batch 100 --template user > users.json
```

See the [CLI documentation](https://ts-mocker.stacksjs.org/cli) for complete details.

## Performance Benchmarks

ts-mocker is designed for performance and efficiency:

**Performance:**

- ✅ **9 out of 9 benchmarks won**
- ⚡ **9.28x faster than @faker-js/faker** on average
- 🚀 **34.04M ops/s** for country generation
- 🔑 **20.50M ops/s** for UUID generation (41.2x faster!)
- 📧 **10.44M ops/s** for email generation (15.5x faster!)
- 📊 **6.90ms** to generate 10,000 complex user objects

**Package Size:**

- 📦 **174 KB** published (core package only)
- 🎯 **24.7x smaller than @faker-js/faker** (4.29 MB)
- 🪶 **38 files** vs 231 in @faker-js/faker
- 🔌 **Modular locales** - install only what you need

### Quick Comparison

| Operation | ts-mocker | @faker-js/faker | Speedup |
|-----------|-----------|-----------------|---------|
| UUID Generation | 20.50M ops/s | 497.69K ops/s | **41.2x faster** |
| Full Name Generation | 24.76M ops/s | 678.37K ops/s | **36.5x faster** |
| Country Generation | 34.04M ops/s | 1.05M ops/s | **32.4x faster** |
| Email Generation | 10.44M ops/s | 674.02K ops/s | **15.5x faster** |
| Complex Objects (10k) | 6.90ms | 64.04ms | **9.3x faster** |

### Running Benchmarks

```bash
# Run all benchmarks
bun run bench

# Results are compared against
# - @faker-js/faker
# - chance
# - casual
# - @ngneat/falso
```

**Detailed Documentation:**

- 📊 [BENCHMARKS.md](./BENCHMARKS.md) - Complete performance results and methodology

## Testing

```bash
bun test
```

## Development

```bash
# Install dependencies
bun install

# Run tests
bun test

# Build the library
bun run build

# Lint code
bun run lint
```

## Changelog

Please see our [releases](https://github.com/stacksjs/ts-mocker/releases) page for more information on what has changed recently.

## Contributing

We welcome contributions! Please see [CONTRIBUTING](.github/CONTRIBUTING.md) for details.

## Community

For help, discussion about best practices, or any other conversation that would benefit from being searchable:

[Discussions on GitHub](https://github.com/stacksjs/ts-mocker/discussions)

For casual chit-chat with others using this package:

[Join the Stacks Discord Server](https://discord.gg/stacksjs)

## Postcardware

“Software that is free, but hopes for a postcard.” We love receiving postcards from around the world showing where Stacks is being used! We showcase them on our website too.

Our address: Stacks.js, 12665 Village Ln #2306, Playa Vista, CA 90094, United States 🌎

## Sponsors

We would like to extend our thanks to the following sponsors for funding Stacks development. If you are interested in becoming a sponsor, please reach out to us.

- [JetBrains](https://www.jetbrains.com/)
- [The Solana Foundation](https://solana.com/)

## License

The MIT License (MIT). Please see [LICENSE](LICENSE.md) for more information.

Made with 💙

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/ts-mocker?style=flat-square
[npm-version-href]: https://npmjs.com/package/ts-mocker
[github-actions-src]: https://img.shields.io/github/actions/workflow/status/stacksjs/ts-mocker/ci.yml?style=flat-square&branch=main
[github-actions-href]: https://github.com/stacksjs/ts-mocker/actions?query=workflow%3Aci

<!-- [codecov-src]: https://img.shields.io/codecov/c/gh/stacksjs/ts-mocker/main?style=flat-square
[codecov-href]: https://codecov.io/gh/stacksjs/ts-mocker -->
