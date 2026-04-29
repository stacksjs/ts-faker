import process from 'node:process'
import { CLI } from '@stacksjs/clapp'
import { version } from '../package.json'
import { Faker, faker } from '../src/index'

const cli = new CLI('fake')

// Generate command - generate random data
cli
  .command('generate <category> <method>', 'Generate random data')
  .option('--locale <locale>', 'Locale to use', { default: 'en' })
  .option('--count <count>', 'Number of items to generate', { default: 1 })
  .option('--seed <seed>', 'Seed for reproducible results')
  .option('--json', 'Output as JSON')
  .example('fake generate person fullName')
  .example('fake generate person fullName --locale es --count 5')
  .example('fake generate address city --seed 12345 --json')
  .action(async (category: string, method: string, options: any) => {
    try {
      // Create faker with async locale loading
      const faker = await Faker.create({
        locale: options.locale || 'en',
        seed: options.seed ? Number(options.seed) : undefined,
      })

      // Get the category and method
      const fakerCategory = (faker as any)[category]
      if (!fakerCategory) {
        console.error(`Error: Category '${category}' not found`)
        console.log('\nAvailable categories: person, address, company, internet, phone, food, animal, sport, music, commerce, book, vehicle, word, hacker, system, science')
        process.exit(1)
      }

      const fakerMethod = fakerCategory[method]
      if (!fakerMethod || typeof fakerMethod !== 'function') {
        console.error(`Error: Method '${method}' not found in category '${category}'`)
        const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(fakerCategory))
          .filter(key => key !== 'constructor' && typeof fakerCategory[key] === 'function')
        console.error(`\nAvailable methods in ${category}:`, methods.join(', '))
        process.exit(1)
      }

      // Generate data
      const count = Number(options.count) || 1
      const results = Array.from({ length: count }, () => fakerMethod.call(fakerCategory))

      // Output
      if (options.json) {
        console.log(JSON.stringify(count === 1 ? results[0] : results, null, 2))
      }
      else {
        results.forEach(result => console.log(result))
      }
    }
    catch (error) {
      console.error('Error:', error instanceof Error ? error.message : error)
      process.exit(1)
    }
  })

// Categories command - list all available categories
cli
  .command('categories', 'List all available categories')
  .action(() => {
    const categories = [
      'person      - Names, genders, job titles, prefixes, suffixes',
      'address     - Streets, cities, states, countries, postal codes',
      'company     - Names, industries, buzzwords, descriptors',
      'internet    - Email addresses, domains, URLs',
      'phone       - Phone numbers',
      'food        - Dishes, ingredients, cuisines, desserts, fruits, vegetables, meats, spices',
      'animal      - Dogs, cats, birds, fish, horses, rabbits, insects',
      'sport       - Sports names, teams, athletes',
      'music       - Genres, artists, songs, instruments',
      'commerce    - Products, adjectives, materials, departments, colors',
      'book        - Titles, authors, publishers, genres, series, reviews',
      'vehicle     - Manufacturers, models, types, fuel types, bicycles',
      'word        - Adjectives, adverbs, conjunctions, interjections, nouns, prepositions, verbs',
      'hacker      - Technical abbreviations, terms, phrases',
      'system      - File names, file types',
      'science     - Chemical elements, units, constants, scientific fields',
    ]

    console.log('\nAvailable Categories:\n')
    categories.forEach(cat => console.log(`  ${cat}`))
    console.log('\nUse "fake methods <category>" to see available methods for a category')
  })

// Methods command - list methods for a category
cli
  .command('methods <category>', 'List all methods for a category')
  .example('fake methods person')
  .example('fake methods food')
  .action((category: string) => {
    const fakerCategory = (faker as any)[category]
    if (!fakerCategory) {
      console.error(`Error: Category '${category}' not found`)
      console.log('\nUse "fake categories" to see all available categories')
      process.exit(1)
    }

    const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(fakerCategory))
      .filter(key => key !== 'constructor' && typeof fakerCategory[key] === 'function')

    console.log(`\nAvailable methods in '${category}':\n`)

    if (methods.length === 0) {
      console.log('  No methods found')
    }
    else {
      methods.forEach((method) => {
        try {
          const example = fakerCategory[method]()
          console.log(`  ${method.padEnd(20)} // "${example}"`)
        }
        catch (e) {
          console.log(`  ${method.padEnd(20)} // Error: ${e}`)
        }
      })
    }
  })

// Locales command - list all available locales
cli
  .command('locales', 'List all available locales')
  .option('--loaded', 'Show only loaded locales')
  .action((options: any) => {
    if (options.loaded) {
      const availableLocales = Faker.availableLocales
      const loadedLocales = availableLocales.filter(locale => Faker.isLocaleLoaded(locale))

      console.log('\nLoaded Locales:\n')
      if (loadedLocales.length === 0) {
        console.log('  No locales loaded yet')
      }
      else {
        loadedLocales.forEach(locale => console.log(`  ✓ ${locale}`))
      }
    }
    else {
      const locales = [
        'en - English',
        'es - Spanish',
        'fr - French',
        'de - German',
        'it - Italian',
        'pt - Portuguese',
        'ja - Japanese',
        'tl - Filipino',
        'zh - Chinese',
        'nl - Dutch',
        'ko - Korean',
        'no - Norwegian',
        'sv - Swedish',
        'da - Danish',
        'uk - Ukrainian',
        'hi - Hindi',
        'fi - Finnish',
        'tr - Turkish',
        'pl - Polish',
        'cs - Czech',
      ]

      console.log('\nAvailable Locales (20 total):\n')
      locales.forEach(locale => console.log(`  ${locale}`))
      console.log('\nℹ️  Only English (en) is bundled by default.')
      console.log('   Other locales are loaded dynamically when first used.')
      console.log('\nUse --locale <code> with the generate command')
      console.log('Example: fake generate person fullName --locale es')
    }
  })

// Preload locales command
cli
  .command('locales:preload [locales...]', 'Preload specific locales for faster access')
  .example('fake locales:preload es fr de')
  .example('fake locales:preload all')
  .action(async (locales: string[]) => {
    try {
      const localesToLoad = locales.includes('all')
        ? Faker.availableLocales.filter(l => l !== 'en')
        : locales

      if (localesToLoad.length === 0) {
        console.error('Error: Please specify locales to preload or use "all"')
        console.log('\nExample: fake locales:preload es fr de')
        console.log('Example: fake locales:preload all')
        process.exit(1)
      }

      console.log(`\nPreloading ${localesToLoad.length} locale(s)...`)

      await Faker.preloadLocales(localesToLoad as string[])

      console.log('✓ Locales preloaded successfully:')
      localesToLoad.forEach(locale => console.log(`  ✓ ${locale}`))
    }
    catch (error) {
      console.error('Error:', error instanceof Error ? error.message : error)
      process.exit(1)
    }
  })

// Batch command - generate multiple records with multiple fields
cli
  .command('batch <count>', 'Generate multiple complete records')
  .option('--locale <locale>', 'Locale to use', { default: 'en' })
  .option('--seed <seed>', 'Seed for reproducible results')
  .option('--template <template>', 'Template: user, product, address, company', { default: 'user' })
  .example('fake batch 10')
  .example('fake batch 5 --template product --locale es')
  .example('fake batch 3 --template user --seed 12345')
  .action(async (count: string, options: any) => {
    try {
      // Set locale
      if (options.locale && options.locale !== 'en') {
        await faker.setLocale(options.locale)
      }

      // Set seed if provided
      if (options.seed) {
        faker.seed(Number(options.seed))
      }

      const numRecords = Number(count) || 10
      const template = options.template || 'user'

      const templates: Record<string, () => any> = {
        user: () => ({
          name: faker.person.fullName(),
          email: faker.internet.email(),
          phone: faker.phone.number(),
          city: faker.address.city(),
          country: faker.address.country(),
        }),
        product: () => ({
          name: faker.commerce.product(),
          description: faker.commerce.productDescription(),
          price: faker.commerce.price(),
          category: faker.commerce.department(),
          sku: faker.commerce.sku(),
        }),
        address: () => ({
          street: faker.address.street(),
          city: faker.address.city(),
          state: faker.address.state(),
          country: faker.address.country(),
          zipCode: faker.address.zipCode(),
        }),
        company: () => ({
          name: faker.company.name(),
          industry: faker.company.industry(),
          buzzword: faker.company.buzzword(),
          email: faker.internet.email(),
          website: faker.internet.url(),
        }),
      }

      const templateFn = templates[template]
      if (!templateFn) {
        console.error(`Error: Template '${template}' not found`)
        console.log('\nAvailable templates: user, product, address, company')
        process.exit(1)
      }

      const results = Array.from({ length: numRecords }, () => templateFn())
      console.log(JSON.stringify(results, null, 2))
    }
    catch (error) {
      console.error('Error:', error instanceof Error ? error.message : error)
      process.exit(1)
    }
  })

// Seed command - demonstrate seeding
cli
  .command('seed <seed>', 'Generate data with a specific seed (reproducible)')
  .option('--category <category>', 'Category to use', { default: 'person' })
  .option('--method <method>', 'Method to use')
  .option('--count <count>', 'Number of items to generate', { default: 5 })
  .example('fake seed 12345')
  .example('fake seed 42 --category food --method dish --count 3')
  .action(async (seed: string, options: any) => {
    try {
      faker.seed(Number(seed))

      const category = options.category || 'person'
      const count = Number(options.count) || 5

      const fakerCategory = (faker as any)[category]
      if (!fakerCategory) {
        console.error(`Error: Category '${category}' not found`)
        process.exit(1)
      }

      // Get default method or use provided one
      let method = options.method
      if (!method) {
        const availableMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(fakerCategory))
          .filter(key => key !== 'constructor' && typeof fakerCategory[key] === 'function')
        method = category === 'person' ? 'fullName' : (availableMethods[0] || 'toString')
      }

      const fakerMethod = fakerCategory[method]
      if (!fakerMethod || typeof fakerMethod !== 'function') {
        console.error(`Error: Method '${method}' not found in category '${category}'`)
        process.exit(1)
      }

      console.log(`\nGenerating with seed ${seed}:\n`)
      const results = Array.from({ length: count }, () => fakerMethod.call(fakerCategory))
      results.forEach((result, i) => console.log(`${i + 1}. ${result}`))
      console.log(`\nRun the same command again to get the same results!`)
    }
    catch (error) {
      console.error('Error:', error instanceof Error ? error.message : error)
      process.exit(1)
    }
  })

cli.command('version', 'Show the version of fake').action(() => {
  console.log(`fake v${version}`)
})

cli.version(version)
cli.help()
cli.parse()
