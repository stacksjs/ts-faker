# Localization Support

ts-mocker provides comprehensive locale support with 28 languages and 22+ regional variants, generating culturally appropriate data for each locale.

## Setting the Locale

### Global Locale

```typescript
import { faker } from 'ts-mocker'

// Set locale globally
faker.setLocale('es')
console.log(faker.person.fullName())  // "Maria Garcia"

// Async method (recommended for non-English locales)
await faker.setLocale('ja')
console.log(faker.person.fullName())  // "Tanaka Yuki"
```

### Per-Instance Locale

```typescript
import { Faker } from 'ts-mocker'

// Sync creation (English only for best performance)
const englishFaker = new Faker({ locale: 'en' })

// Async creation (recommended for other locales)
const japaneseFaker = await Faker.create({ locale: 'ja' })
const spanishFaker = await Faker.create({ locale: 'es' })

console.log(englishFaker.person.fullName())   // "John Smith"
console.log(japaneseFaker.person.fullName())  // "Tanaka Taro"
console.log(spanishFaker.person.fullName())   // "Carlos Rodriguez"
```

## Supported Locales

### Primary Languages

| Code | Language | Example Name |
|------|----------|--------------|
| `af` | Afrikaans | "Pieter van der Merwe" |
| `ar` | Arabic | "Mohammed Al-Rashid" |
| `az` | Azerbaijani | "Eldar Mammadov" |
| `cs` | Czech | "Jan Novak" |
| `da` | Danish | "Lars Jensen" |
| `de` | German | "Hans Mueller" |
| `en` | English | "John Smith" |
| `eo` | Esperanto | "Johano Esperanto" |
| `es` | Spanish | "Carlos Garcia" |
| `fa` | Persian/Farsi | "Ali Hosseini" |
| `fi` | Finnish | "Matti Virtanen" |
| `fr` | French | "Jean Dupont" |
| `he` | Hebrew | "David Cohen" |
| `hi` | Hindi | "Raj Sharma" |
| `it` | Italian | "Marco Rossi" |
| `ja` | Japanese | "Tanaka Taro" |
| `ko` | Korean | "Kim Min-jun" |
| `nl` | Dutch | "Jan de Vries" |
| `no` | Norwegian | "Erik Hansen" |
| `pl` | Polish | "Jan Kowalski" |
| `pt` | Portuguese | "Joao Silva" |
| `sv` | Swedish | "Erik Johansson" |
| `tl` | Filipino | "Juan dela Cruz" |
| `tr` | Turkish | "Ahmet Yilmaz" |
| `uk` | Ukrainian | "Taras Shevchenko" |
| `zh-cn` | Chinese (Simplified) | "Wang Wei" |
| `zh-tw` | Chinese (Traditional) | "Chen Xiao-ming" |
| `zu` | Zulu | "Sipho Zulu" |

### Regional Variants

Regional variants include country-specific data such as local cities, addresses, phone formats, and cultural references.

#### English Variants

```typescript
const usFaker = await Faker.create({ locale: 'en-us' })
const ukFaker = await Faker.create({ locale: 'en-gb' })
const canaFaker = await Faker.create({ locale: 'en-ca' })

console.log(usFaker.address.city())    // "New York"
console.log(ukFaker.address.city())    // "London"
console.log(canaFaker.address.city())  // "Toronto"
```

| Code | Region |
|------|--------|
| `en-us` | English (United States) |
| `en-gb` | English (United Kingdom) |
| `en-ca` | English (Canada) |
| `en-ie` | English (Ireland) |
| `en-in` | English (India) |
| `en-za` | English (South Africa) |
| `en-gh` | English (Ghana) |
| `en-ng` | English (Nigeria) |
| `en-hk` | English (Hong Kong) |

#### French Variants

```typescript
const frFaker = await Faker.create({ locale: 'fr' })
const frCaFaker = await Faker.create({ locale: 'fr-ca' })
const frChFaker = await Faker.create({ locale: 'fr-ch' })

console.log(frFaker.address.city())    // "Paris"
console.log(frCaFaker.address.city())  // "Montreal"
console.log(frChFaker.address.city())  // "Geneve"
```

| Code | Region |
|------|--------|
| `fr-ca` | French (Canada) |
| `fr-ch` | French (Switzerland) |
| `fr-be` | French (Belgium) |
| `fr-lu` | French (Luxembourg) |
| `fr-sn` | French (Senegal) |

#### German Variants

```typescript
const deFaker = await Faker.create({ locale: 'de' })
const deAtFaker = await Faker.create({ locale: 'de-at' })
const deChFaker = await Faker.create({ locale: 'de-ch' })

console.log(deFaker.address.city())     // "Berlin"
console.log(deAtFaker.address.city())   // "Wien"
console.log(deChFaker.address.city())   // "Zurich"
```

| Code | Region |
|------|--------|
| `de-at` | German (Austria) |
| `de-ch` | German (Switzerland) |

#### Other Regional Variants

| Code | Region |
|------|--------|
| `es-mx` | Spanish (Mexico) |
| `pt-mz` | Portuguese (Mozambique) |
| `af-za` | Afrikaans (South Africa) |
| `zu-za` | Zulu (South Africa) |

## Preloading Locales

For applications that need multiple locales, preload them for better performance:

```typescript
import { Faker } from 'ts-mocker'

// Preload multiple locales at startup
await Faker.preloadLocales(['en', 'es', 'fr', 'de', 'ja', 'zh-cn'])

// Now create instances synchronously
const spanishFaker = new Faker({ locale: 'es' })
const japaneseFaker = new Faker({ locale: 'ja' })
```

## Checking Locale Status

```typescript
import { Faker } from 'ts-mocker'

// Check if a locale is already loaded
console.log(Faker.isLocaleLoaded('en'))  // true (always loaded)
console.log(Faker.isLocaleLoaded('ja'))  // false (until loaded)

// Get all available locales
console.log(Faker.availableLocales)
// ['af', 'ar', 'az', 'cs', 'da', 'de', 'en', ...]
```

## Locale-Specific Data

Different locales provide culturally appropriate data:

### Names

```typescript
const ja = await Faker.create({ locale: 'ja' })
const ar = await Faker.create({ locale: 'ar' })
const hi = await Faker.create({ locale: 'hi' })

console.log(ja.person.fullName())  // "Yamamoto Kenji"
console.log(ar.person.fullName())  // "Ahmed Al-Farsi"
console.log(hi.person.fullName())  // "Vikram Patel"
```

### Addresses

```typescript
const de = await Faker.create({ locale: 'de' })
const jp = await Faker.create({ locale: 'ja' })

console.log(de.address.city())     // "Frankfurt"
console.log(de.address.street())   // "Hauptstrasse 42"

console.log(jp.address.city())     // "Tokyo"
```

### Phone Numbers

```typescript
const us = await Faker.create({ locale: 'en-us' })
const uk = await Faker.create({ locale: 'en-gb' })
const de = await Faker.create({ locale: 'de' })

console.log(us.phone.number())  // "(555) 123-4567"
console.log(uk.phone.number())  // "020 1234 5678"
console.log(de.phone.number())  // "030 123456"
```

### Food

```typescript
const it = await Faker.create({ locale: 'it' })
const ja = await Faker.create({ locale: 'ja' })
const mx = await Faker.create({ locale: 'es-mx' })

console.log(it.food.dish())  // "Spaghetti alla Carbonara"
console.log(ja.food.dish())  // "Ramen"
console.log(mx.food.dish())  // "Tacos al Pastor"
```

## Fallback Behavior

When a locale doesn't have specific data for a category, ts-mocker falls back to English:

```typescript
const esperanto = await Faker.create({ locale: 'eo' })

// Esperanto-specific names
console.log(esperanto.person.firstName())  // Esperanto name

// Falls back to English for categories without Esperanto data
console.log(esperanto.food.dish())  // English dish name
```

## Runtime Locale Switching

```typescript
const faker = new Faker({ locale: 'en' })
console.log(faker.person.fullName())  // "John Smith"

// Switch locale (async recommended)
await faker.setLocale('de')
console.log(faker.person.fullName())  // "Hans Mueller"

await faker.setLocale('ja')
console.log(faker.person.fullName())  // "Tanaka Yuki"
```

## Best Practices

1. **Use async loading for non-English locales** - Better performance and no fallback warnings.

2. **Preload locales at app startup** - Avoid async operations during data generation.

3. **Use regional variants for accuracy** - `en-gb` for UK data, `en-us` for US data.

4. **Test with multiple locales** - Ensure your app handles different character sets.

```typescript
// Recommended setup for multilingual apps
async function initializeFakers() {
  const locales = ['en-us', 'en-gb', 'es', 'fr', 'de', 'ja', 'zh-cn']
  await Faker.preloadLocales(locales)

  return {
    us: new Faker({ locale: 'en-us' }),
    uk: new Faker({ locale: 'en-gb' }),
    spain: new Faker({ locale: 'es' }),
    france: new Faker({ locale: 'fr' }),
    germany: new Faker({ locale: 'de' }),
    japan: new Faker({ locale: 'ja' }),
    china: new Faker({ locale: 'zh-cn' })
  }
}
```
