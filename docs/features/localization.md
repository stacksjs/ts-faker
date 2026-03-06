# Localization

ts-mocker supports 28 languages with 22+ regional variants, providing locale-specific data for names, addresses, phone formats, and more.

## Setting the Locale

### Global Locale

Set the locale globally for all faker instances:

```typescript
import { faker } from 'ts-mocker'

// Set locale globally
faker.setLocale('es')  // Spanish
console.log(faker.person.fullName())  // "Maria Garcia"
```

### Per-Instance Locale

Create faker instances with specific locales:

```typescript
import { Faker } from 'ts-mocker'

const spanishFaker = new Faker({ locale: 'es' })
const japaneseFaker = new Faker({ locale: 'ja' })
const chineseSimplifiedFaker = new Faker({ locale: 'zh-cn' })
const chineseTraditionalFaker = new Faker({ locale: 'zh-tw' })

console.log(spanishFaker.person.fullName())           // "Carlos Lopez"
console.log(japaneseFaker.person.fullName())          // "田中太郎"
console.log(chineseSimplifiedFaker.person.fullName()) // "王伟"
console.log(chineseTraditionalFaker.person.fullName()) // "陳小明"
```

## Supported Languages

| Code | Language |
|------|----------|
| `af` | Afrikaans |
| `ar` | Arabic |
| `az` | Azerbaijani |
| `cs` | Czech |
| `da` | Danish |
| `de` | German |
| `en` | English |
| `eo` | Esperanto |
| `es` | Spanish |
| `fa` | Persian/Farsi |
| `fi` | Finnish |
| `fr` | French |
| `he` | Hebrew |
| `hi` | Hindi |
| `it` | Italian |
| `ja` | Japanese |
| `ko` | Korean |
| `nl` | Dutch |
| `no` | Norwegian |
| `pl` | Polish |
| `pt` | Portuguese |
| `sv` | Swedish |
| `tl` | Filipino |
| `tr` | Turkish |
| `uk` | Ukrainian |
| `zh-cn` | Chinese (Simplified) |
| `zh-tw` | Chinese (Traditional) |
| `zu` | Zulu |

## Regional Variants

Regional variants provide country-specific data such as local cities, addresses, phone formats, and cultural references.

### English Variants

```typescript
const usFaker = new Faker({ locale: 'en-us' })
const ukFaker = new Faker({ locale: 'en-gb' })

console.log(usFaker.address.city())   // "New York"
console.log(ukFaker.address.city())   // "London"
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

### French Variants

```typescript
const frenchFaker = new Faker({ locale: 'fr' })
const canadianFrenchFaker = new Faker({ locale: 'fr-ca' })

console.log(canadianFrenchFaker.address.city())  // "Montreal"
```

| Code | Region |
|------|--------|
| `fr-ca` | French (Canada) |
| `fr-ch` | French (Switzerland) |
| `fr-be` | French (Belgium) |
| `fr-lu` | French (Luxembourg) |
| `fr-sn` | French (Senegal) |

### German Variants

| Code | Region |
|------|--------|
| `de-at` | German (Austria) |
| `de-ch` | German (Switzerland) |

### Other Variants

| Code | Region |
|------|--------|
| `es-mx` | Spanish (Mexico) |
| `pt-mz` | Portuguese (Mozambique) |
| `af-za` | Afrikaans (South Africa) |
| `zu-za` | Zulu (South Africa) |

## Locale-Specific Data

Each locale provides culturally appropriate data:

### Names

```typescript
import { Faker } from 'ts-mocker'

// German names
const deFaker = new Faker({ locale: 'de' })
console.log(deFaker.person.firstName())  // "Hans", "Petra", etc.

// Japanese names
const jaFaker = new Faker({ locale: 'ja' })
console.log(jaFaker.person.firstName())  // "太郎", "花子", etc.

// Arabic names
const arFaker = new Faker({ locale: 'ar' })
console.log(arFaker.person.firstName())  // "محمد", "فاطمة", etc.
```

### Addresses

```typescript
// US addresses
const usFaker = new Faker({ locale: 'en-us' })
console.log(usFaker.address.state())    // "California"
console.log(usFaker.address.zipCode())  // "90210"

// UK addresses
const ukFaker = new Faker({ locale: 'en-gb' })
console.log(ukFaker.address.state())    // "Greater London"
console.log(ukFaker.address.zipCode())  // "SW1A 1AA"
```

### Phone Numbers

Phone numbers follow locale-specific formatting:

```typescript
const usFaker = new Faker({ locale: 'en-us' })
const ukFaker = new Faker({ locale: 'en-gb' })
const deFaker = new Faker({ locale: 'de' })

console.log(usFaker.phone.number())  // "(555) 123-4567"
console.log(ukFaker.phone.number())  // "020 1234 5678"
console.log(deFaker.phone.number())  // "+49 30 12345678"
```

## Fallback Behavior

When locale-specific data is not available, ts-mocker falls back to the base locale or English:

```typescript
const myFaker = new Faker({ locale: 'zu' })  // Zulu

// If Zulu-specific data exists, use it
// Otherwise, fall back to English
console.log(myFaker.company.industry())
```

## Best Practices

1. **Set locale early**: Configure the locale at application startup
2. **Use regional variants**: For region-specific data, prefer variants like `en-us` over generic `en`
3. **Test with multiple locales**: Ensure your application handles different character sets
4. **Consider RTL languages**: Arabic, Hebrew, and Persian are right-to-left languages
