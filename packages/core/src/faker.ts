import type { LocaleDefinition, MockOptions } from './types'
import { LocaleLoader } from './locale-loader'
import { AddressModule } from './modules/address'
import { AnimalModule } from './modules/animal'
import { BookModule } from './modules/book'
import { ColorModule } from './modules/color'
import { CommerceModule } from './modules/commerce'
import { CompanyModule } from './modules/company'
import { DatabaseModule } from './modules/database'
import { DateModule } from './modules/date'
import { FinanceModule } from './modules/finance'
import { FoodModule } from './modules/food'
import { GitModule } from './modules/git'
import { HackerModule } from './modules/hacker'
import { HelpersModule } from './modules/helpers'
import { ImageModule } from './modules/image'
import { InternetModule } from './modules/internet'
import { LoremModule } from './modules/lorem'
import { MusicModule } from './modules/music'
import { NumberModule } from './modules/number'
import { PersonModule } from './modules/person'
import { PhoneModule } from './modules/phone'
import { ScienceModule } from './modules/science'
import { SportModule } from './modules/sport'
import { StringModule } from './modules/string'
import { SystemModule } from './modules/system'
import { VehicleModule } from './modules/vehicle'
import { WordModule } from './modules/word'
import { Random } from './random'

/**
 * Main Faker class - the entry point for generating fake data
 *
 * @example
 * ```ts
 * import { Faker } from '@stacksjs/ts-faker'
 *
 * const faker = new Faker()
 * console.log(faker.person.firstName()) // 'John'
 * console.log(faker.internet.email()) // 'john.doe@example.com'
 * ```
 */
export class Faker {
  public random: Random
  private _locale: LocaleDefinition
  private _autoInstallLocales: boolean

  public readonly person: PersonModule
  public readonly address: AddressModule
  public readonly internet: InternetModule
  public readonly phone: PhoneModule
  public readonly company: CompanyModule
  public readonly lorem: LoremModule
  public readonly date: DateModule
  public readonly number: NumberModule
  public readonly string: StringModule
  public readonly color: ColorModule
  public readonly finance: FinanceModule
  public readonly helpers: HelpersModule
  public readonly vehicle: VehicleModule
  public readonly image: ImageModule
  public readonly git: GitModule
  public readonly science: ScienceModule
  public readonly music: MusicModule
  public readonly database: DatabaseModule
  public readonly food: FoodModule
  public readonly commerce: CommerceModule
  public readonly book: BookModule
  public readonly animal: AnimalModule
  public readonly sport: SportModule
  public readonly hacker: HackerModule
  public readonly system: SystemModule
  public readonly word: WordModule

  constructor(options?: MockOptions) {
    const locale = options?.locale ?? 'en'
    const seed = options?.seed
    this._autoInstallLocales = options?.autoInstallLocales ?? false

    // For non-English locales, warn about async loading
    if (locale !== 'en' && !LocaleLoader.isCached(locale)) {
      console.warn(
        `[ts-mocker] Locale '${locale}' requires async loading. Use 'await Faker.create({ locale: "${locale}" })' for better performance. Falling back to English.`,
      )
      this._locale = LocaleLoader.loadSync('en')
    }
    else {
      this._locale = LocaleLoader.loadSync(locale)
    }

    this.random = new Random(seed)

    // Initialize all modules
    this.person = new PersonModule(this.random, this._locale)
    this.address = new AddressModule(this.random, this._locale)
    this.internet = new InternetModule(this.random, this._locale)
    this.phone = new PhoneModule(this.random, this._locale)
    this.company = new CompanyModule(this.random, this._locale)
    this.lorem = new LoremModule(this.random)
    this.date = new DateModule(this.random)
    this.number = new NumberModule(this.random)
    this.string = new StringModule(this.random)
    this.color = new ColorModule(this.random, this._locale)
    this.finance = new FinanceModule(this.random)
    this.helpers = new HelpersModule(this.random)
    this.image = new ImageModule(this.random)
    this.git = new GitModule(this.random)
    this.science = new ScienceModule(this.random, this._locale)
    this.music = new MusicModule(this.random, this._locale)
    this.database = new DatabaseModule(this.random)
    this.food = new FoodModule(this.random, this._locale)
    this.commerce = new CommerceModule(this.random, this._locale)
    this.book = new BookModule(this.random, this._locale)
    this.animal = new AnimalModule(this.random, this._locale)
    this.sport = new SportModule(this.random, this._locale)
    this.hacker = new HackerModule(this.random, this._locale)
    this.system = new SystemModule(this.random, this._locale)
    this.word = new WordModule(this.random, this._locale)
    this.vehicle = new VehicleModule(this.random, this._locale)
  }

  /**
   * Create a Faker instance with async locale loading
   * @example await Faker.create({ locale: 'es' })
   */
  static async create(options?: MockOptions): Promise<Faker> {
    const locale = options?.locale ?? 'en'

    // Preload the locale if needed (this handles normalization internally)
    await LocaleLoader.load(locale)

    return new Faker(options)
  }

  /**
   * Set a seed for reproducible results
   * @example faker.seed(12345)
   */
  seed(seed: number): this {
    this.random = new Random(seed)

    // Reinitialize all modules with new random instance
    Object.assign(this.person, new PersonModule(this.random, this._locale))
    Object.assign(this.address, new AddressModule(this.random, this._locale))
    Object.assign(this.internet, new InternetModule(this.random, this._locale))
    Object.assign(this.phone, new PhoneModule(this.random, this._locale))
    Object.assign(this.company, new CompanyModule(this.random, this._locale))
    Object.assign(this.lorem, new LoremModule(this.random))
    Object.assign(this.date, new DateModule(this.random))
    Object.assign(this.number, new NumberModule(this.random))
    Object.assign(this.string, new StringModule(this.random))
    Object.assign(this.color, new ColorModule(this.random, this._locale))
    Object.assign(this.finance, new FinanceModule(this.random))
    Object.assign(this.helpers, new HelpersModule(this.random))
    Object.assign(this.image, new ImageModule(this.random))
    Object.assign(this.git, new GitModule(this.random))
    Object.assign(this.science, new ScienceModule(this.random, this._locale))
    Object.assign(this.music, new MusicModule(this.random, this._locale))
    Object.assign(this.database, new DatabaseModule(this.random))
    Object.assign(this.food, new FoodModule(this.random, this._locale))
    Object.assign(this.commerce, new CommerceModule(this.random, this._locale))
    Object.assign(this.book, new BookModule(this.random, this._locale))
    Object.assign(this.animal, new AnimalModule(this.random, this._locale))
    Object.assign(this.sport, new SportModule(this.random, this._locale))
    Object.assign(this.hacker, new HackerModule(this.random, this._locale))
    Object.assign(this.system, new SystemModule(this.random, this._locale))
    Object.assign(this.word, new WordModule(this.random, this._locale))
    Object.assign(this.vehicle, new VehicleModule(this.random, this._locale))

    return this
  }

  /**
   * Set the locale asynchronously (recommended for non-English locales)
   * @example await faker.setLocale('es')
   */
  async setLocale(locale: string): Promise<this> {
    this._locale = await LocaleLoader.load(locale)

    // Reinitialize modules that depend on locale
    this.reinitializeLocaleModules()

    return this
  }

  /**
   * Set the locale synchronously (only works for cached locales)
   * @deprecated Use async setLocale() instead
   * @example faker.setLocaleSync('es') // Only works if 'es' is already loaded
   */
  setLocaleSync(locale: string): this {
    if (!LocaleLoader.isCached(locale) && locale !== 'en') {
      console.warn(
        `[ts-mocker] Locale '${locale}' is not loaded. Use 'await faker.setLocale("${locale}")' or preload it first.`,
      )
      return this
    }

    this._locale = LocaleLoader.loadSync(locale)
    this.reinitializeLocaleModules()

    return this
  }

  /**
   * Preload locales for offline usage
   * @example await faker.preloadLocales(['es', 'fr', 'de'])
   */
  async preloadLocales(locales: string[]): Promise<this> {
    await LocaleLoader.preload(locales)
    return this
  }

  /**
   * Reinitialize all modules that depend on locale
   */
  private reinitializeLocaleModules(): void {
    Object.assign(this.person, new PersonModule(this.random, this._locale))
    Object.assign(this.address, new AddressModule(this.random, this._locale))
    Object.assign(this.internet, new InternetModule(this.random, this._locale))
    Object.assign(this.phone, new PhoneModule(this.random, this._locale))
    Object.assign(this.company, new CompanyModule(this.random, this._locale))
    Object.assign(this.food, new FoodModule(this.random, this._locale))
    Object.assign(this.animal, new AnimalModule(this.random, this._locale))
    Object.assign(this.sport, new SportModule(this.random, this._locale))
    Object.assign(this.music, new MusicModule(this.random, this._locale))
    Object.assign(this.commerce, new CommerceModule(this.random, this._locale))
    Object.assign(this.book, new BookModule(this.random, this._locale))
    Object.assign(this.vehicle, new VehicleModule(this.random, this._locale))
    Object.assign(this.word, new WordModule(this.random, this._locale))
    Object.assign(this.hacker, new HackerModule(this.random, this._locale))
    Object.assign(this.system, new SystemModule(this.random, this._locale))
    Object.assign(this.color, new ColorModule(this.random, this._locale))
    Object.assign(this.science, new ScienceModule(this.random, this._locale))
  }

  /**
   * Get current locale
   */
  get locale(): string {
    return this._locale.title
  }

  /**
   * Get available locales
   */
  static get availableLocales(): readonly string[] {
    return LocaleLoader.getAvailableLocales()
  }

  /**
   * Check if a locale is currently loaded/cached
   */
  static isLocaleLoaded(locale: string): boolean {
    return LocaleLoader.isCached(locale)
  }

  /**
   * Preload multiple locales statically
   * @example await Faker.preloadLocales(['es', 'fr', 'de'])
   */
  static async preloadLocales(locales: string[]): Promise<void> {
    await LocaleLoader.preload(locales)
  }

  /**
   * Laravel-compatible: Generate a random name
   * @example faker.name() // 'John Doe'
   */
  name(): string {
    return this.person.name()
  }

  /**
   * Laravel-compatible: Generate a random email
   * @example faker.email() // 'john.doe@example.com'
   */
  email(): string {
    return this.internet.email()
  }
}
