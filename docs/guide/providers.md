# Data Providers

ts-mocker includes 20+ data provider modules, each containing multiple methods for generating realistic fake data.

## Person Module

Generate names, titles, and personal information:

```typescript
import { faker } from 'ts-mocker'

// Names
faker.person.firstName()              // "John"
faker.person.firstName({ gender: 'male' })    // Male-specific name
faker.person.firstName({ gender: 'female' })  // Female-specific name
faker.person.firstNameMale()          // "Michael"
faker.person.firstNameFemale()        // "Sarah"
faker.person.firstNameNeutral()       // "Jordan"
faker.person.lastName()               // "Smith"
faker.person.fullName()               // "John Smith"
faker.person.fullName({ prefix: true })  // "Mr. John Smith"
faker.person.fullName({ suffix: true })  // "John Smith Jr."

// Titles and roles
faker.person.jobTitle()               // "Senior Software Engineer"
faker.person.gender()                 // "Male"
faker.person.prefix()                 // "Mr."
faker.person.suffix()                 // "Jr."

// Convenience alias
faker.name()                          // "John Doe" (Laravel-compatible)
```

## Address Module

Generate location and address data:

```typescript
// Street addresses
faker.address.street()                // "123 Main Street"
faker.address.city()                  // "New York"
faker.address.state()                 // "California"
faker.address.country()               // "United States"
faker.address.zipCode()               // "10001"
faker.address.direction()             // "North"
```

## Internet Module

Generate web-related data:

```typescript
// Email and usernames
faker.internet.email()                // "john.doe@gmail.com"
faker.internet.userName()             // "johndoe123"
faker.internet.password()             // "aB3$kL9mN2"

// Domains and URLs
faker.internet.domainName()           // "example.com"
faker.internet.domainSuffix()         // "com"
faker.internet.url()                  // "https://example.com/path"

// Convenience alias
faker.email()                         // "john@example.com" (Laravel-compatible)
```

## Phone Module

Generate phone numbers:

```typescript
faker.phone.number()                  // "(555) 123-4567"
faker.phone.number({ format: 'international' })  // "+1-555-123-4567"
```

## Company Module

Generate business-related data:

```typescript
faker.company.name()                  // "Acme Corporation"
faker.company.industry()              // "Technology"
faker.company.buzzword()              // "synergize"
faker.company.catchPhrase()           // "Innovative solutions for tomorrow"
```

## Commerce Module

Generate product and e-commerce data:

```typescript
faker.commerce.product()              // "Laptop"
faker.commerce.productName()          // "Ergonomic Steel Chair"
faker.commerce.adjective()            // "Sleek"
faker.commerce.material()             // "Granite"
faker.commerce.department()           // "Electronics"
faker.commerce.color()                // "Azure"
faker.commerce.price()                // "99.99"
```

## Finance Module

Generate financial data:

```typescript
faker.finance.accountNumber()         // "12345678"
faker.finance.creditCardNumber()      // "4532015112830366"
faker.finance.creditCardCVV()         // "123"
faker.finance.currencyCode()          // "USD"
faker.finance.currencyName()          // "US Dollar"
faker.finance.amount()                // "542.23"
faker.finance.transactionType()       // "payment"
faker.finance.bitcoinAddress()        // "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
faker.finance.ethereumAddress()       // "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
```

## Date Module

Generate dates and times:

```typescript
faker.date.past()                     // Date in the past
faker.date.future()                   // Date in the future
faker.date.recent()                   // Recent date (within days)
faker.date.soon()                     // Upcoming date
faker.date.between({ from: '2020-01-01', to: '2024-12-31' })
faker.date.birthdate()                // Realistic birthdate
faker.date.month()                    // "January"
faker.date.weekday()                  // "Monday"
```

## Number Module

Generate numeric data:

```typescript
faker.number.int()                    // Random integer
faker.number.int({ min: 1, max: 100 }) // 1-100
faker.number.float()                  // Random float
faker.number.float({ min: 0, max: 1, precision: 2 })
faker.number.binary()                 // "10110101"
faker.number.hex()                    // "A3F2"
faker.number.octal()                  // "0o755"
```

## String Module

Generate string data:

```typescript
faker.string.uuid()                   // "550e8400-e29b-41d4-a716-446655440000"
faker.string.alpha()                  // "xYzAbc"
faker.string.alpha({ length: 10 })    // 10-character string
faker.string.alphanumeric()           // "a1b2c3"
faker.string.numeric()                // "12345"
faker.string.hexadecimal()            // "0xA3F2B1"
faker.string.nanoid()                 // "V1StGXR8_Z5jdHi6B-myT"
faker.string.sample()                 // Random string sample
```

## Lorem Module

Generate placeholder text:

```typescript
faker.lorem.word()                    // "lorem"
faker.lorem.words()                   // "lorem ipsum dolor"
faker.lorem.words(5)                  // 5 words
faker.lorem.sentence()                // Full sentence
faker.lorem.sentences(3)              // 3 sentences
faker.lorem.paragraph()               // Full paragraph
faker.lorem.paragraphs(2)             // 2 paragraphs
faker.lorem.text()                    // Block of text
faker.lorem.slug()                    // "lorem-ipsum-dolor"
```

## Food Module

Generate food-related data:

```typescript
faker.food.dish()                     // "Spaghetti Carbonara"
faker.food.ingredient()               // "Parmesan cheese"
faker.food.cuisine()                  // "Italian"
faker.food.dessert()                  // "Tiramisu"
faker.food.fruit()                    // "Apple"
faker.food.vegetable()                // "Broccoli"
faker.food.meat()                     // "Chicken"
faker.food.spice()                    // "Oregano"
```

## Animal Module

Generate animal-related data:

```typescript
faker.animal.dog()                    // "Labrador Retriever"
faker.animal.cat()                    // "Persian"
faker.animal.bird()                   // "Eagle"
faker.animal.fish()                   // "Salmon"
faker.animal.horse()                  // "Arabian"
faker.animal.rabbit()                 // "Holland Lop"
faker.animal.insect()                 // "Butterfly"
faker.animal.bear()                   // "Grizzly Bear"
faker.animal.lion()                   // "African Lion"
faker.animal.cetacean()               // "Blue Whale"
faker.animal.snake()                  // "Python"
faker.animal.crocodilia()             // "Nile Crocodile"
```

## Book Module

Generate book-related data:

```typescript
faker.book.title()                    // "The Great Gatsby"
faker.book.author()                   // "F. Scott Fitzgerald"
faker.book.publisher()                // "Penguin Books"
faker.book.genre()                    // "Fiction"
faker.book.series()                   // "Harry Potter"
faker.book.format()                   // "Hardcover"
```

## Music Module

Generate music-related data:

```typescript
faker.music.genre()                   // "Rock"
faker.music.artist()                  // "The Beatles"
faker.music.song()                    // "Hey Jude"
faker.music.instrument()              // "Guitar"
```

## Vehicle Module

Generate vehicle-related data:

```typescript
faker.vehicle.manufacturer()          // "Toyota"
faker.vehicle.model()                 // "Camry"
faker.vehicle.type()                  // "Sedan"
faker.vehicle.fuel()                  // "Gasoline"
faker.vehicle.color()                 // "Red"
faker.vehicle.vin()                   // "1HGBH41JXMN109186"
faker.vehicle.vrm()                   // "AB12 CDE"
faker.vehicle.bicycle()               // "Mountain Bike"
```

## Sport Module

Generate sports-related data:

```typescript
faker.sport.sport()                   // "Football"
faker.sport.team()                    // "Manchester United"
faker.sport.athlete()                 // "Lionel Messi"
```

## Science Module

Generate science-related data:

```typescript
faker.science.chemicalElement()       // { symbol: "H", name: "Hydrogen", atomicNumber: 1 }
faker.science.unit()                  // { name: "meter", symbol: "m" }
faker.science.constant()              // { name: "Speed of Light", value: "299792458", unit: "m/s" }
faker.science.field()                 // "Physics"
```

## Hacker Module

Generate tech/hacker-related phrases:

```typescript
faker.hacker.abbreviation()           // "HTTP"
faker.hacker.adjective()              // "virtual"
faker.hacker.noun()                   // "bandwidth"
faker.hacker.verb()                   // "parse"
faker.hacker.ingverb()                // "parsing"
faker.hacker.phrase()                 // "Try to bypass the TCP matrix..."
```

## System Module

Generate system-related data:

```typescript
faker.system.fileName()               // "document.pdf"
faker.system.fileType()               // "application/pdf"
faker.system.fileExt()                // "pdf"
faker.system.mimeType()               // "image/jpeg"
faker.system.directoryPath()          // "/usr/local/bin"
faker.system.filePath()               // "/home/user/file.txt"
```

## Word Module

Generate individual words:

```typescript
faker.word.adjective()                // "beautiful"
faker.word.adverb()                   // "quickly"
faker.word.conjunction()              // "and"
faker.word.interjection()             // "wow"
faker.word.noun()                     // "table"
faker.word.preposition()              // "under"
faker.word.verb()                     // "run"
```

## Color Module

Generate color data:

```typescript
faker.color.human()                   // "red"
faker.color.rgb()                     // "rgb(255, 0, 0)"
faker.color.hex()                     // "#FF0000"
faker.color.hsl()                     // "hsl(0, 100%, 50%)"
faker.color.cmyk()                    // "cmyk(0%, 100%, 100%, 0%)"
```

## Image Module

Generate image URLs:

```typescript
faker.image.url()                     // Random image URL
faker.image.avatar()                  // Avatar image URL
faker.image.urlLoremFlickr()          // Lorem Flickr image
faker.image.dataUri()                 // Data URI for image
```

## Git Module

Generate git-related data:

```typescript
faker.git.branch()                    // "feature/user-auth"
faker.git.commitSha()                 // "a1b2c3d4e5f6g7h8i9j0"
faker.git.shortSha()                  // "a1b2c3d"
faker.git.commitMessage()             // "fix: resolve login bug"
faker.git.commitEntry()               // Full commit entry
```

## Database Module

Generate database-related data:

```typescript
faker.database.column()               // "id"
faker.database.type()                 // "varchar"
faker.database.collation()            // "utf8_general_ci"
faker.database.engine()               // "InnoDB"
faker.database.mongodbObjectId()      // "507f1f77bcf86cd799439011"
```

## Helpers Module

Utility methods for data generation:

```typescript
// Array helpers
faker.helpers.arrayElement(['a', 'b', 'c'])     // Random element
faker.helpers.arrayElements(['a', 'b', 'c'], 2) // 2 random elements
faker.helpers.shuffle(['a', 'b', 'c'])          // Shuffled array

// Object helpers
faker.helpers.objectKey({ a: 1, b: 2 })         // Random key
faker.helpers.objectValue({ a: 1, b: 2 })       // Random value

// Other helpers
faker.helpers.maybe(() => 'value')              // 50% chance to return
faker.helpers.slugify('Hello World')            // "hello-world"
faker.helpers.unique(faker.person.firstName)    // Unique value generator
faker.helpers.rangeToNumber('1-10')             // Random in range
```
