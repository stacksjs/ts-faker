export interface MockConfig {
  verbose: boolean
  locale: string
  seed?: number
  /**
   * Automatically install missing locale packages when needed
   * @default false
   */
  autoInstallLocales?: boolean
}

export type MockOptions = Partial<MockConfig>

// Deep partial type utility for locale variants
export type DeepPartial<T> = T extends any[] ? T : {
  [P in keyof T]?: T[P] extends any[] ? T[P] : T[P] extends object ? DeepPartial<T[P]> : T[P]
}

// Locale types
export interface LocaleDefinition {
  title: string
  person: PersonLocale
  address: AddressLocale
  company: CompanyLocale
  internet: InternetLocale
  phone: PhoneLocale
  food?: FoodLocale
  animal?: AnimalLocale
  sport?: SportLocale
  music?: MusicLocale
  commerce?: CommerceLocale
  book?: BookLocale
  vehicle?: VehicleLocale
  word?: WordLocale
  hacker?: HackerLocale
  system?: SystemLocale
  science?: ScienceLocale
  color?: ColorLocale
}

export interface PersonLocale {
  firstNameMale: string[]
  firstNameFemale: string[]
  firstNameNeutral?: string[]
  lastName: string[]
  prefix: string[]
  suffix: string[]
  gender: string[]
  jobTitle: string[]
}

export interface PersonNameOptions {
  gender?: 'male' | 'female' | 'neutral'
}

export interface PersonFullNameOptions extends PersonNameOptions {
  prefix?: boolean
  suffix?: boolean
}

export interface AddressLocale {
  street: string[]
  city: string[]
  state: string[]
  stateAbbr?: string[]
  country: string[]
  countryCode?: string[]
  zipCode: string[]
  buildingNumber?: string[]
  direction?: string[]
  streetSuffix?: string[]
}

export interface CompanyLocale {
  name?: string[]
  suffix?: string[]
  industry?: string[]
  buzzwords?: string[]
  buzzword?: string[] // Alias for buzzwords
  adjective?: string[]
  descriptor?: string[]
  noun?: string[]
}

export interface InternetLocale {
  domainSuffix?: string[]
  domainName?: string[] // Alias for domainSuffix
  freeEmail?: string[]
  exampleEmail?: string[] // Alias for freeEmail
}

export interface PhoneLocale {
  formats?: string[]
  format?: string[] // Alias for formats
  number?: string[] // Alias for formats
}

export interface FoodLocale {
  dish?: string[]
  ingredient?: string[]
  cuisine?: string[]
  dessert?: string[]
  fruit?: string[]
  vegetable?: string[]
  meat?: string[]
  spice?: string[]
}

export interface AnimalLocale {
  dog?: string[]
  cat?: string[]
  bird?: string[]
  fish?: string[]
  horse?: string[]
  rabbit?: string[]
  insect?: string[]
  type?: string[]
}

export interface SportLocale {
  sport?: string[]
  team?: string[]
  athlete?: string[]
}

export interface MusicLocale {
  genre?: string[]
  artist?: string[]
  song?: string[]
  instrument?: string[]
}

export interface CommerceLocale {
  product?: string[]
  productName?: string[] // Alias for product
  productAdjective?: string[]
  adjective?: string[] // Alias for productAdjective
  productMaterial?: string[]
  material?: string[] // Alias for productMaterial
  department?: string[]
  color?: string[]
}

export interface BookLocale {
  title?: string[]
  author?: string[]
  publisher?: string[]
  genre?: string[]
  series?: string[]
  review?: string[]
}

export interface VehicleLocale {
  manufacturer?: string[]
  model?: string[]
  type?: string[]
  fuel?: string[]
  bicycle?: string[]
}

export interface WordLocale {
  adjective?: string[]
  adverb?: string[]
  conjunction?: string[]
  interjection?: string[]
  noun?: string[]
  preposition?: string[]
  verb?: string[]
}

export interface HackerLocale {
  abbreviation?: string[]
  adjective?: string[]
  noun?: string[]
  verb?: string[]
  ingverb?: string[]
  phrase?: string[]
}

export interface SystemLocale {
  fileName?: string[]
  fileType?: string[]
}

export interface ScienceLocale {
  chemicalElement?: string[]
  unit?: string[]
  constant?: string[]
  field?: string[]
}

export interface ColorLocale {
  human?: string[]
  name?: string[] // Alias for human
}

// Module option types
export interface NumberOptions {
  min?: number
  max?: number
  precision?: number
}

/**
 * A boundary for the date helpers.
 *
 * A `Date`, or anything `new Date()` understands: an ISO string and a
 * millisecond timestamp are what callers reach for first, and rejecting them
 * with `from.getTime is not a function` from three frames down is a poor
 * answer to an unambiguous request.
 */
export type DateBound = Date | string | number

export interface DateOptions {
  from?: DateBound
  to?: DateBound
}

export interface StringOptions {
  length?: number
  casing?: 'upper' | 'lower' | 'mixed'
}

export interface PasswordOptions {
  length?: number
  memorable?: boolean
  prefix?: string
  pattern?: RegExp
}

export interface ColorOptions {
  format?: 'hex' | 'rgb' | 'hsl'
}

export interface FinanceOptions {
  min?: number
  max?: number
  dec?: number
  symbol?: string
}

// Advanced Data Generation Types

/**
 * Weighted selection options for more realistic data generation
 */
export interface WeightedItem<T> {
  item: T
  weight: number
}

export interface WeightedSelectionOptions<T> {
  items: WeightedItem<T>[]
}

/**
 * Conditional generation constraints
 */
export interface ConditionalConstraints {
  gender?: 'male' | 'female' | 'neutral'
  country?: string | string[]
  region?: string | string[]
  locale?: string
  ageRange?: { min: number, max: number }
  [key: string]: any
}

/**
 * Data validation rules
 */
export interface ValidationRule<T> {
  validator: (value: T) => boolean
  errorMessage?: string
}

export interface ValidationOptions<T> {
  rules: ValidationRule<T>[]
  strict?: boolean // If true, throws on validation failure
}

/**
 * Realistic data relationship configuration
 */
export interface DataRelationship {
  field: string
  dependsOn: string
  mapping: Record<string, any>
}

export interface RealisticDataOptions {
  relationships?: DataRelationship[]
  constraints?: ConditionalConstraints
}

/**
 * Custom data provider interface
 */
export interface DataProvider<T> {
  name: string
  generate: (options?: any) => T
  validate?: (value: T) => boolean
  getWeight?: (options?: any) => number
}

/**
 * Plugin system for custom data providers
 */
export interface DataProviderPlugin<T> extends DataProvider<T> {
  category: string
  version: string
  dependencies?: string[]
  init?: (faker: any) => void
}

/**
 * Extended options for person generation with constraints
 */
export interface PersonAdvancedOptions extends PersonFullNameOptions {
  constraints?: ConditionalConstraints
  relationships?: DataRelationship[]
  validation?: ValidationOptions<string>
  weighted?: WeightedSelectionOptions<string>
}

/**
 * Extended options for address generation with constraints
 */
export interface AddressAdvancedOptions {
  country?: string | string[]
  region?: string | string[]
  constraints?: ConditionalConstraints
  relationships?: DataRelationship[]
  validation?: ValidationOptions<string>
  weighted?: WeightedSelectionOptions<string>
}
