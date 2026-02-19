import { describe, expect, it } from 'bun:test'
import { Faker, faker } from '../packages/core/src'

describe('Faker Library', () => {
  describe('Person Module', () => {
    it('should generate a first name', () => {
      const name = faker.person.firstName()
      expect(typeof name).toBe('string')
      expect(name.length).toBeGreaterThan(0)
    })

    it('should generate a last name', () => {
      const name = faker.person.lastName()
      expect(typeof name).toBe('string')
      expect(name.length).toBeGreaterThan(0)
    })

    it('should generate a full name', () => {
      const name = faker.person.fullName()
      expect(typeof name).toBe('string')
      expect(name).toContain(' ')
    })

    it('should generate a full name with prefix and suffix', () => {
      const name = faker.person.fullName({ prefix: true, suffix: true })
      expect(typeof name).toBe('string')
      expect(name.split(' ').length).toBeGreaterThanOrEqual(3)
    })

    it('should generate a job title', () => {
      const title = faker.person.jobTitle()
      expect(typeof title).toBe('string')
      expect(title.length).toBeGreaterThan(0)
    })
  })

  describe('Address Module', () => {
    it('should generate a street address', () => {
      const street = faker.address.streetAddress()
      expect(typeof street).toBe('string')
      expect(street.length).toBeGreaterThan(0)
    })

    it('should generate a city', () => {
      const city = faker.address.city()
      expect(typeof city).toBe('string')
      expect(city.length).toBeGreaterThan(0)
    })

    it('should generate a zip code', () => {
      const zip = faker.address.zipCode()
      expect(typeof zip).toBe('string')
      expect(zip).toMatch(/\d/)
    })

    it('should generate latitude within bounds', () => {
      const lat = faker.address.latitude()
      expect(lat).toBeGreaterThanOrEqual(-90)
      expect(lat).toBeLessThanOrEqual(90)
    })

    it('should generate longitude within bounds', () => {
      const lon = faker.address.longitude()
      expect(lon).toBeGreaterThanOrEqual(-180)
      expect(lon).toBeLessThanOrEqual(180)
    })
  })

  describe('Internet Module', () => {
    it('should generate an email', () => {
      const email = faker.internet.email()
      expect(typeof email).toBe('string')
      expect(email).toMatch(/^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/)
    })

    it('should generate a URL', () => {
      const url = faker.internet.url()
      expect(typeof url).toBe('string')
      expect(url).toMatch(/^https?:\/\//)
    })

    it('should generate an IPv4 address', () => {
      const ip = faker.internet.ipv4()
      expect(typeof ip).toBe('string')
      expect(ip).toMatch(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)
    })

    it('should generate an IPv6 address', () => {
      const ip = faker.internet.ipv6()
      expect(typeof ip).toBe('string')
      expect(ip).toMatch(/^[0-9a-f:]+$/)
    })

    it('should generate a username', () => {
      const username = faker.internet.username()
      expect(typeof username).toBe('string')
      expect(username.length).toBeGreaterThan(0)
    })

    it('should generate a password', () => {
      const password = faker.internet.password()
      expect(typeof password).toBe('string')
      expect(password.length).toBeGreaterThanOrEqual(12)
    })
  })

  describe('Phone Module', () => {
    it('should generate a phone number', () => {
      const phone = faker.phone.number()
      expect(typeof phone).toBe('string')

      expect(phone).toMatch(/[\d-()+ ]/)
    })
  })

  describe('Company Module', () => {
    it('should generate a company name', () => {
      const name = faker.company.name()
      expect(typeof name).toBe('string')
      expect(name.length).toBeGreaterThan(0)
    })

    it('should generate a catchphrase', () => {
      const catchphrase = faker.company.catchphrase()
      expect(typeof catchphrase).toBe('string')
      expect(catchphrase).toContain(' ')
    })

    it('should generate a buzzword', () => {
      const buzzword = faker.company.buzzword()
      expect(typeof buzzword).toBe('string')
      expect(buzzword.length).toBeGreaterThan(0)
    })
  })

  describe('Lorem Module', () => {
    it('should generate a word', () => {
      const word = faker.lorem.word()
      expect(typeof word).toBe('string')
      expect(word.length).toBeGreaterThan(0)
    })

    it('should generate multiple words', () => {
      const words = faker.lorem.words(5)
      expect(typeof words).toBe('string')
      expect(words.split(' ').length).toBe(5)
    })

    it('should generate a sentence', () => {
      const sentence = faker.lorem.sentence()
      expect(typeof sentence).toBe('string')
      expect(sentence).toMatch(/\.$/)
    })

    it('should generate a paragraph', () => {
      const paragraph = faker.lorem.paragraph()
      expect(typeof paragraph).toBe('string')
      expect(paragraph.length).toBeGreaterThan(20)
    })
  })

  describe('Date Module', () => {
    it('should generate a past date', () => {
      const date = faker.date.past()
      expect(date).toBeInstanceOf(Date)
      expect(date.getTime()).toBeLessThan(Date.now())
    })

    it('should generate a future date', () => {
      const date = faker.date.future()
      expect(date).toBeInstanceOf(Date)
      expect(date.getTime()).toBeGreaterThan(Date.now())
    })

    it('should generate a date between two dates', () => {
      const from = new Date(2020, 0, 1)
      const to = new Date(2025, 0, 1)
      const date = faker.date.between({ from, to })
      expect(date).toBeInstanceOf(Date)
      expect(date.getTime()).toBeGreaterThanOrEqual(from.getTime())
      expect(date.getTime()).toBeLessThanOrEqual(to.getTime())
    })

    it('should generate a recent date', () => {
      const date = faker.date.recent({ days: 7 })
      expect(date).toBeInstanceOf(Date)
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      expect(date.getTime()).toBeGreaterThanOrEqual(sevenDaysAgo.getTime())
    })
  })

  describe('Number Module', () => {
    it('should generate an integer', () => {
      const num = faker.number.int({ min: 1, max: 100 })
      expect(typeof num).toBe('number')
      expect(Number.isInteger(num)).toBe(true)
      expect(num).toBeGreaterThanOrEqual(1)
      expect(num).toBeLessThanOrEqual(100)
    })

    it('should generate a float', () => {
      const num = faker.number.float({ min: 0, max: 1, precision: 2 })
      expect(typeof num).toBe('number')
      expect(num).toBeGreaterThanOrEqual(0)
      expect(num).toBeLessThanOrEqual(1)
    })

    it('should generate a bigint', () => {
      const num = faker.number.bigInt({ min: 0n, max: 1000n })
      expect(typeof num).toBe('bigint')
      expect(num).toBeGreaterThanOrEqual(0n)
      expect(num).toBeLessThanOrEqual(1000n)
    })

    it('should generate a hex number', () => {
      const hex = faker.number.hex({ length: 6 })
      expect(typeof hex).toBe('string')
      expect(hex.length).toBe(6)
      expect(hex).toMatch(/^[0-9A-F]+$/)
    })
  })

  describe('String Module', () => {
    it('should generate a UUID', () => {
      const uuid = faker.string.uuid()
      expect(typeof uuid).toBe('string')
      expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/)
    })

    it('should generate a nanoid', () => {
      const id = faker.string.nanoid(21)
      expect(typeof id).toBe('string')
      expect(id.length).toBe(21)
    })

    it('should generate an alpha string', () => {
      const str = faker.string.alpha({ length: 10, casing: 'lower' })
      expect(typeof str).toBe('string')
      expect(str.length).toBe(10)
      expect(str).toMatch(/^[a-z]+$/)
    })

    it('should generate an alphanumeric string', () => {
      const str = faker.string.alphanumeric({ length: 10 })
      expect(typeof str).toBe('string')
      expect(str.length).toBe(10)
      expect(str).toMatch(/^[a-z0-9]+$/i)
    })
  })

  describe('Color Module', () => {
    it('should generate a hex color', () => {
      const color = faker.color.hex()
      expect(typeof color).toBe('string')
      expect(color).toMatch(/^#[0-9A-F]{6}$/)
    })

    it('should generate an RGB color', () => {
      const color = faker.color.rgb()
      expect(typeof color).toBe('string')
      expect(color).toMatch(/^rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)$/)
    })

    it('should generate an HSL color', () => {
      const color = faker.color.hsl()
      expect(typeof color).toBe('string')
      expect(color).toMatch(/^hsl\(\d{1,3}, \d{1,3}%, \d{1,3}%\)$/)
    })

    it('should generate RGB color as array', () => {
      const color = faker.color.rgb({ format: 'array' })
      expect(Array.isArray(color)).toBe(true)
      expect(color.length).toBe(3)
    })
  })

  describe('Finance Module', () => {
    it('should generate a financial amount', () => {
      const amount = faker.finance.amount({ min: 10, max: 1000, dec: 2 })
      expect(typeof amount).toBe('string')
      expect(amount).toMatch(/^\d+\.\d{2}$/)
    })

    it('should generate an account number', () => {
      const account = faker.finance.account(10)
      expect(typeof account).toBe('string')
      expect(account.length).toBe(10)
      expect(account).toMatch(/^\d+$/)
    })

    it('should generate a credit card number', () => {
      const cc = faker.finance.creditCardNumber({ formatted: true })
      expect(typeof cc).toBe('string')
      expect(cc).toMatch(/[\d-]+/)
    })

    it('should generate an IBAN', () => {
      const iban = faker.finance.iban()
      expect(typeof iban).toBe('string')
      expect(iban.length).toBeGreaterThan(10)
    })

    it('should generate a Bitcoin address', () => {
      const btc = faker.finance.bitcoin()
      expect(typeof btc).toBe('string')
      expect(btc).toMatch(/^[13]/)
      expect(btc.length).toBe(34)
    })

    it('should generate an Ethereum address', () => {
      const eth = faker.finance.ethereum()
      expect(typeof eth).toBe('string')
      expect(eth).toMatch(/^0x[0-9a-f]{40}$/)
    })
  })

  describe('Helpers Module', () => {
    it('should pick a random element from array', () => {
      const arr = ['a', 'b', 'c']
      const elem = faker.helpers.arrayElement(arr)
      expect(arr).toContain(elem)
    })

    it('should shuffle an array', () => {
      const arr = [1, 2, 3, 4, 5]
      const shuffled = faker.helpers.shuffle(arr)
      expect(shuffled.length).toBe(arr.length)
      expect(shuffled).not.toBe(arr)
    })

    it('should numerify a string', () => {
      const result = faker.helpers.numerify('###')
      expect(result).toMatch(/^\d{3}$/)
    })

    it('should lexify a string', () => {
      const result = faker.helpers.lexify('???')
      expect(result).toMatch(/^[a-z]{3}$/)
    })

    it('should bothify a string', () => {
      const result = faker.helpers.bothify('##??')
      expect(result).toMatch(/^\d{2}[a-z]{2}$/)
    })

    it('should generate a boolean', () => {
      const bool = faker.helpers.boolean()
      expect(typeof bool).toBe('boolean')
    })
  })

  describe('Seeding', () => {
    it('should generate reproducible results with seed', () => {
      const faker1 = new Faker({ seed: 12345 })
      const faker2 = new Faker({ seed: 12345 })

      const name1 = faker1.person.firstName()
      const name2 = faker2.person.firstName()

      expect(name1).toBe(name2)
    })

    it('should generate different results without seed', () => {
      const faker1 = new Faker()
      const faker2 = new Faker()

      const names1 = Array.from({ length: 10 }, () => faker1.person.firstName())
      const names2 = Array.from({ length: 10 }, () => faker2.person.firstName())

      // Very unlikely to match all 10
      const allMatch = names1.every((name, i) => name === names2[i])
      expect(allMatch).toBe(false)
    })
  })

  describe('Localization', () => {
    it('should support English locale', () => {
      const enFaker = new Faker({ locale: 'en' })
      const name = enFaker.person.firstName()
      expect(typeof name).toBe('string')
    })

    it('should support Spanish locale', () => {
      const esFaker = new Faker({ locale: 'es' })
      const name = esFaker.person.firstName()
      expect(typeof name).toBe('string')
    })

    it('should support French locale', () => {
      const frFaker = new Faker({ locale: 'fr' })
      const name = frFaker.person.firstName()
      expect(typeof name).toBe('string')
    })

    it('should support German locale', () => {
      const deFaker = new Faker({ locale: 'de' })
      const name = deFaker.person.firstName()
      expect(typeof name).toBe('string')
      expect(name.length).toBeGreaterThan(0)
    })

    it('should support Italian locale', () => {
      const itFaker = new Faker({ locale: 'it' })
      const name = itFaker.person.firstName()
      expect(typeof name).toBe('string')
      expect(name.length).toBeGreaterThan(0)
    })

    it('should support Portuguese locale', () => {
      const ptFaker = new Faker({ locale: 'pt' })
      const name = ptFaker.person.firstName()
      expect(typeof name).toBe('string')
      expect(name.length).toBeGreaterThan(0)
    })

    it('should support Japanese locale', () => {
      const jaFaker = new Faker({ locale: 'ja' })
      const name = jaFaker.person.firstName()
      expect(typeof name).toBe('string')
      expect(name.length).toBeGreaterThan(0)
    })

    it('should support Filipino/Tagalog locale', () => {
      const tlFaker = new Faker({ locale: 'tl' })
      const name = tlFaker.person.firstName()
      expect(typeof name).toBe('string')
      expect(name.length).toBeGreaterThan(0)
    })

    it('should list available locales', () => {
      const locales = Faker.availableLocales
      expect(Array.isArray(locales)).toBe(true)
      expect(locales).toContain('en')
      expect(locales).toContain('es')
      expect(locales).toContain('fr')
      expect(locales).toContain('de')
      expect(locales).toContain('it')
      expect(locales).toContain('pt')
      expect(locales).toContain('ja')
      expect(locales).toContain('tl')
    })

    it('should have all locales available (base + variants)', () => {
      const locales = Faker.availableLocales
      expect(locales.length).toBeGreaterThanOrEqual(20) // 20 base + variants
      expect(locales).toContain('en')
      expect(locales).toContain('es')
      expect(locales).toContain('en_US')
      expect(locales).toContain('en_GB')
      expect(locales).toContain('es_MX')
    })
  })

  describe('Comprehensive Locale Testing', () => {
    const locales = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'tl'] as const

    locales.forEach((locale) => {
      describe(`${locale.toUpperCase()} locale`, () => {
        const localeFaker = new Faker({ locale })

        it(`should generate person data in ${locale}`, () => {
          const firstName = localeFaker.person.firstName()
          const lastName = localeFaker.person.lastName()
          const fullName = localeFaker.person.fullName()
          const jobTitle = localeFaker.person.jobTitle()

          expect(typeof firstName).toBe('string')
          expect(firstName.length).toBeGreaterThan(0)
          expect(typeof lastName).toBe('string')
          expect(lastName.length).toBeGreaterThan(0)
          expect(typeof fullName).toBe('string')
          expect(fullName).toContain(' ')
          expect(typeof jobTitle).toBe('string')
          expect(jobTitle.length).toBeGreaterThan(0)
        })

        it(`should generate address data in ${locale}`, () => {
          const street = localeFaker.address.streetAddress()
          const city = localeFaker.address.city()
          const state = localeFaker.address.state()
          const country = localeFaker.address.country()
          const zipCode = localeFaker.address.zipCode()

          expect(typeof street).toBe('string')
          expect(street.length).toBeGreaterThan(0)
          expect(typeof city).toBe('string')
          expect(city.length).toBeGreaterThan(0)
          expect(typeof state).toBe('string')
          expect(state.length).toBeGreaterThan(0)
          expect(typeof country).toBe('string')
          expect(country.length).toBeGreaterThan(0)
          expect(typeof zipCode).toBe('string')
          expect(zipCode.length).toBeGreaterThan(0)
        })

        it(`should generate company data in ${locale}`, () => {
          const companyName = localeFaker.company.name()
          const catchphrase = localeFaker.company.catchphrase()
          const industry = localeFaker.company.industry()

          expect(typeof companyName).toBe('string')
          expect(companyName.length).toBeGreaterThan(0)
          expect(typeof catchphrase).toBe('string')
          expect(catchphrase.length).toBeGreaterThan(0)
          expect(typeof industry).toBe('string')
          expect(industry.length).toBeGreaterThan(0)
        })

        it(`should generate internet data in ${locale}`, () => {
          const email = localeFaker.internet.email()
          const domainName = localeFaker.internet.domainName()

          expect(typeof email).toBe('string')
          expect(email).toMatch(/@/)
          expect(typeof domainName).toBe('string')
          expect(domainName).toContain('.')
        })

        it(`should generate phone data in ${locale}`, () => {
          const phone = localeFaker.phone.number()

          expect(typeof phone).toBe('string')
          expect(phone.length).toBeGreaterThan(0)
    
          expect(phone).toMatch(/[\d-()+ ]/)
        })
      })
    })
  })

  describe('Locale Switching', () => {
    it('should switch locales and generate different locale-specific data', () => {
      const enFaker = new Faker({ locale: 'en' })
      const esFaker = new Faker({ locale: 'es' })

      const enCity = enFaker.address.city()
      const esCity = esFaker.address.city()

      expect(typeof enCity).toBe('string')
      expect(typeof esCity).toBe('string')
      // Different instances should be able to generate data
      expect(enCity.length).toBeGreaterThan(0)
      expect(esCity.length).toBeGreaterThan(0)
    })

    it('should maintain locale consistency within instance', () => {
      const jaFaker = new Faker({ locale: 'ja' })

      const name1 = jaFaker.person.firstName()
      const name2 = jaFaker.person.firstName()
      const city1 = jaFaker.address.city()
      const city2 = jaFaker.address.city()

      // All should be valid strings
      expect(typeof name1).toBe('string')
      expect(typeof name2).toBe('string')
      expect(typeof city1).toBe('string')
      expect(typeof city2).toBe('string')
    })

    it('should generate reproducible results with same seed across locales', () => {
      const enFaker1 = new Faker({ locale: 'en', seed: 99999 })
      const enFaker2 = new Faker({ locale: 'en', seed: 99999 })

      const name1 = enFaker1.person.firstName()
      const name2 = enFaker2.person.firstName()

      expect(name1).toBe(name2)
    })
  })

  describe('Vehicle Module', () => {
    it('should generate a vehicle manufacturer', () => {
      const manufacturer = faker.vehicle.manufacturer()
      expect(typeof manufacturer).toBe('string')
      expect(manufacturer.length).toBeGreaterThan(0)
    })

    it('should generate a vehicle model', () => {
      const model = faker.vehicle.model()
      expect(typeof model).toBe('string')
      expect(model.length).toBeGreaterThan(0)
    })

    it('should generate a vehicle type', () => {
      const type = faker.vehicle.type()
      expect(typeof type).toBe('string')
      expect(type.length).toBeGreaterThan(0)
    })

    it('should generate a VIN', () => {
      const vin = faker.vehicle.vin()
      expect(typeof vin).toBe('string')
      expect(vin.length).toBe(17)
    })

    it('should generate a vehicle registration', () => {
      const plate = faker.vehicle.registration()
      expect(typeof plate).toBe('string')
      expect(plate.length).toBeGreaterThan(0)
    })
  })

  describe('Image Module', () => {
    it('should generate an image URL', () => {
      const url = faker.image.url()
      expect(typeof url).toBe('string')
      expect(url).toMatch(/^https?:\/\//)
    })

    it('should generate an avatar URL', () => {
      const url = faker.image.avatar()
      expect(typeof url).toBe('string')
      expect(url).toMatch(/^https?:\/\//)
    })

    it('should generate a custom size image URL', () => {
      const url = faker.image.url({ width: 640, height: 480 })
      expect(typeof url).toBe('string')
      expect(url).toMatch(/640/)
      expect(url).toMatch(/480/)
    })
  })

  describe('Git Module', () => {
    it('should generate a git branch name', () => {
      const branch = faker.git.branch()
      expect(typeof branch).toBe('string')
      expect(branch.length).toBeGreaterThan(0)
    })

    it('should generate a commit SHA', () => {
      const sha = faker.git.commitSha()
      expect(typeof sha).toBe('string')
      expect(sha.length).toBe(40)
      expect(sha).toMatch(/^[0-9a-f]+$/)
    })

    it('should generate a commit message', () => {
      const message = faker.git.commitMessage()
      expect(typeof message).toBe('string')
      expect(message.length).toBeGreaterThan(0)
    })
  })

  describe('Science Module', () => {
    it('should generate a chemical element', () => {
      const element = faker.science.chemicalElement()
      expect(typeof element).toBe('string')
      expect(element.length).toBeGreaterThan(0)
    })

    it('should generate a unit', () => {
      const unit = faker.science.unit()
      expect(typeof unit).toBe('string')
      expect(unit.length).toBeGreaterThan(0)
    })

    it('should generate a DNA sequence', () => {
      const dna = faker.science.dnaSequence(20)
      expect(typeof dna).toBe('string')
      expect(dna.length).toBe(20)
      expect(dna).toMatch(/^[ATCG]+$/)
    })
  })

  describe('Music Module', () => {
    it('should generate a music genre', () => {
      const genre = faker.music.genre()
      expect(typeof genre).toBe('string')
      expect(genre.length).toBeGreaterThan(0)
    })

    it('should generate a song name', () => {
      const song = faker.music.songName()
      expect(typeof song).toBe('string')
      expect(song.length).toBeGreaterThan(0)
    })
  })

  describe('Database Module', () => {
    it('should generate a database column name', () => {
      const column = faker.database.column()
      expect(typeof column).toBe('string')
      expect(column.length).toBeGreaterThan(0)
    })

    it('should generate a database type', () => {
      const type = faker.database.type()
      expect(typeof type).toBe('string')
      expect(type.length).toBeGreaterThan(0)
    })

    it('should generate a MongoDB ObjectId', () => {
      const id = faker.database.mongodbObjectId()
      expect(typeof id).toBe('string')
      expect(id.length).toBe(24)
      expect(id).toMatch(/^[0-9a-f]+$/)
    })
  })

  describe('Food Module', () => {
    it('should generate a dish name', () => {
      const dish = faker.food.dish()
      expect(typeof dish).toBe('string')
      expect(dish.length).toBeGreaterThan(0)
    })

    it('should generate an ingredient', () => {
      const ingredient = faker.food.ingredient()
      expect(typeof ingredient).toBe('string')
      expect(ingredient.length).toBeGreaterThan(0)
    })

    it('should generate a cuisine type', () => {
      const cuisine = faker.food.ethnicCategory()
      expect(typeof cuisine).toBe('string')
      expect(cuisine.length).toBeGreaterThan(0)
    })
  })

  describe('Commerce Module', () => {
    it('should generate a product name', () => {
      const product = faker.commerce.productName()
      expect(typeof product).toBe('string')
      expect(product.length).toBeGreaterThan(0)
    })

    it('should generate a price', () => {
      const price = faker.commerce.price()
      expect(typeof price).toBe('string')
      expect(price).toMatch(/^\d+\.\d{2}$/)
    })

    it('should generate a department', () => {
      const dept = faker.commerce.department()
      expect(typeof dept).toBe('string')
      expect(dept.length).toBeGreaterThan(0)
    })
  })

  describe('Book Module', () => {
    it('should generate a book title', () => {
      const title = faker.book.title()
      expect(typeof title).toBe('string')
      expect(title.length).toBeGreaterThan(0)
    })

    it('should generate an author name', () => {
      const author = faker.book.author()
      expect(typeof author).toBe('string')
      expect(author.length).toBeGreaterThan(0)
    })

    it('should generate an ISBN', () => {
      const isbn = faker.book.isbn()
      expect(typeof isbn).toBe('string')
      expect(isbn).toMatch(/[\d-]+/)
    })
  })

  describe('Animal Module', () => {
    it('should generate a dog breed', () => {
      const dog = faker.animal.dog()
      expect(typeof dog).toBe('string')
      expect(dog.length).toBeGreaterThan(0)
    })

    it('should generate a cat breed', () => {
      const cat = faker.animal.cat()
      expect(typeof cat).toBe('string')
      expect(cat.length).toBeGreaterThan(0)
    })

    it('should generate an animal type', () => {
      const animal = faker.animal.type()
      expect(typeof animal).toBe('string')
      expect(animal.length).toBeGreaterThan(0)
    })
  })

  describe('Sport Module', () => {
    it('should generate a sport name', () => {
      const sport = faker.sport.sport()
      expect(typeof sport).toBe('string')
      expect(sport.length).toBeGreaterThan(0)
    })

    it('should generate a team name', () => {
      const team = faker.sport.team()
      expect(typeof team).toBe('string')
      expect(team.length).toBeGreaterThan(0)
    })

    it('should generate an athlete name', () => {
      const athlete = faker.sport.athlete()
      expect(typeof athlete).toBe('string')
      expect(athlete.length).toBeGreaterThan(0)
    })
  })

  describe('Hacker Module', () => {
    it('should generate a hacker phrase', () => {
      const phrase = faker.hacker.phrase()
      expect(typeof phrase).toBe('string')
      expect(phrase.length).toBeGreaterThan(0)
    })

    it('should generate a hacker abbreviation', () => {
      const abbr = faker.hacker.abbreviation()
      expect(typeof abbr).toBe('string')
      expect(abbr.length).toBeGreaterThan(0)
    })
  })

  describe('System Module', () => {
    it('should generate a file name', () => {
      const file = faker.system.fileName()
      expect(typeof file).toBe('string')
      expect(file).toContain('.')
    })

    it('should generate a file path', () => {
      const path = faker.system.filePath()
      expect(typeof path).toBe('string')
      expect(path).toContain('/')
    })

    it('should generate a MIME type', () => {
      const mime = faker.system.mimeType()
      expect(typeof mime).toBe('string')
      expect(mime).toContain('/')
    })
  })

  describe('Word Module', () => {
    it('should generate an adjective', () => {
      const adj = faker.word.adjective()
      expect(typeof adj).toBe('string')
      expect(adj.length).toBeGreaterThan(0)
    })

    it('should generate a noun', () => {
      const noun = faker.word.noun()
      expect(typeof noun).toBe('string')
      expect(noun.length).toBeGreaterThan(0)
    })

    it('should generate a verb', () => {
      const verb = faker.word.verb()
      expect(typeof verb).toBe('string')
      expect(verb.length).toBeGreaterThan(0)
    })
  })

  describe('Laravel Compatibility', () => {
    it('should support Laravel-style name()', () => {
      const name = faker.name()
      expect(typeof name).toBe('string')
      expect(name).toContain(' ')
    })

    it('should support Laravel-style email()', () => {
      const email = faker.email()
      expect(typeof email).toBe('string')
      expect(email).toMatch(/@/)
    })

    it('should support randomElement()', () => {
      const arr = ['a', 'b', 'c']
      const elem = faker.helpers.randomElement(arr)
      expect(arr).toContain(elem)
    })
  })
})
