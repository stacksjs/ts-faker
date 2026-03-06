# Data Types

ts-mocker provides comprehensive fake data generation across 16+ categories. Each category contains multiple methods for generating specific types of data.

## Person

Generate realistic personal information including names, genders, and job titles.

```typescript
import { faker } from 'ts-mocker'

// Names
faker.person.firstName()                    // Random first name
faker.person.firstName({ gender: 'male' })  // Random male first name
faker.person.firstName({ gender: 'female' }) // Random female first name
faker.person.firstNameNeutral()             // Random neutral first name
faker.person.lastName()                     // Random last name
faker.person.fullName()                     // Random full name
faker.person.fullName({ prefix: true })     // Full name with prefix
faker.person.fullName({ suffix: true })     // Full name with suffix

// Personal details
faker.person.gender()    // Random gender
faker.person.jobTitle()  // Random job title
faker.person.prefix()    // Random prefix (Mr., Mrs., etc.)
faker.person.suffix()    // Random suffix (Jr., Sr., etc.)
```

## Address

Generate location-related data including streets, cities, countries, and postal codes.

```typescript
faker.address.street()     // Random street name
faker.address.city()       // Random city
faker.address.state()      // Random state/province
faker.address.country()    // Random country
faker.address.zipCode()    // Random ZIP/postal code
faker.address.direction()  // Random direction (North, South, etc.)
```

## Company

Generate business-related fake data.

```typescript
faker.company.name()      // Random company name
faker.company.industry()  // Random industry
faker.company.buzzword()  // Random business buzzword
```

## Internet

Generate web-related data including emails, domains, and URLs.

```typescript
faker.internet.email()       // Random email address
faker.internet.domainName()  // Random domain name
faker.internet.url()         // Random URL
```

## Phone

Generate phone numbers with locale-specific formatting.

```typescript
faker.phone.number()  // Random phone number
```

## Food

Generate food-related data including dishes, ingredients, and cuisines.

```typescript
faker.food.dish()        // Random dish name
faker.food.ingredient()  // Random ingredient
faker.food.cuisine()     // Random cuisine type
faker.food.dessert()     // Random dessert
faker.food.fruit()       // Random fruit
faker.food.vegetable()   // Random vegetable
faker.food.meat()        // Random meat
faker.food.spice()       // Random spice
```

## Animal

Generate animal-related data across various species.

```typescript
faker.animal.dog()     // Random dog breed
faker.animal.cat()     // Random cat breed
faker.animal.bird()    // Random bird species
faker.animal.fish()    // Random fish species
faker.animal.horse()   // Random horse breed
faker.animal.rabbit()  // Random rabbit breed
faker.animal.insect()  // Random insect
```

## Sport

Generate sports-related data.

```typescript
faker.sport.sport()    // Random sport name
faker.sport.team()     // Random team name
faker.sport.athlete()  // Random athlete name
```

## Music

Generate music-related data.

```typescript
faker.music.genre()       // Random music genre
faker.music.artist()      // Random artist name
faker.music.song()        // Random song title
faker.music.instrument()  // Random instrument
```

## Commerce

Generate e-commerce and retail data.

```typescript
faker.commerce.product()     // Random product name
faker.commerce.adjective()   // Random product adjective
faker.commerce.material()    // Random material
faker.commerce.department()  // Random department
faker.commerce.color()       // Random color
```

## Book

Generate book-related data.

```typescript
faker.book.title()      // Random book title
faker.book.author()     // Random author name
faker.book.publisher()  // Random publisher
faker.book.genre()      // Random book genre
faker.book.series()     // Random book series
faker.book.review()     // Random book review
```

## Vehicle

Generate vehicle-related data.

```typescript
faker.vehicle.manufacturer()  // Random vehicle manufacturer
faker.vehicle.model()         // Random vehicle model
faker.vehicle.type()          // Random vehicle type
faker.vehicle.fuel()          // Random fuel type
faker.vehicle.bicycle()       // Random bicycle type
```

## Word

Generate random words by type.

```typescript
faker.word.adjective()     // Random adjective
faker.word.adverb()        // Random adverb
faker.word.conjunction()   // Random conjunction
faker.word.interjection()  // Random interjection
faker.word.noun()          // Random noun
faker.word.preposition()   // Random preposition
faker.word.verb()          // Random verb
```

## Hacker/Tech

Generate technology-related terminology.

```typescript
faker.hacker.abbreviation()  // Random tech abbreviation
faker.hacker.adjective()     // Random tech adjective
faker.hacker.noun()          // Random tech noun
faker.hacker.verb()          // Random tech verb
faker.hacker.ingverb()       // Random tech -ing verb
faker.hacker.phrase()        // Random tech phrase
```

## System

Generate system-related data.

```typescript
faker.system.fileName()  // Random file name
faker.system.fileType()  // Random file type
```

## Science

Generate scientific data.

```typescript
faker.science.chemicalElement()  // Random chemical element
faker.science.unit()             // Random unit of measurement
faker.science.constant()         // Random scientific constant
faker.science.field()            // Random scientific field
```

## Advanced Options

Many methods support advanced options for more controlled data generation:

```typescript
import { faker, ValidationRules, WeightedSelections } from 'ts-mocker'

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
```
