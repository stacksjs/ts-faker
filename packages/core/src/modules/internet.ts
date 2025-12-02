import type { Random } from '../random'
import type { LocaleDefinition, PasswordOptions } from '../types'

/** Email username separators */
const SEPARATORS = ['.', '_', '-', '']

export class InternetModule {
  private domainWordsCache: string[] | null = null

  constructor(
    private random: Random,
    private locale: LocaleDefinition,
  ) {}

  /**
   * Get cached lowercase domain words
   */
  private getDomainWords(): string[] {
    if (!this.domainWordsCache) {
      const companyNames = this.locale.company.name ?? ['company', 'tech', 'digital']
      this.domainWordsCache = companyNames.map(name =>
        name.toLowerCase().replace(/[^a-z0-9]/g, ''),
      ).filter(name => name.length > 0)
    }
    return this.domainWordsCache
  }

  /**
   * Generate a random email address
   * @example faker.internet.email() // 'john.doe@example.com'
   */
  email(options?: { firstName?: string, lastName?: string, provider?: string }): string {
    // Optimized: avoid array spreading by selecting from combined length
    let firstName: string
    if (options?.firstName) {
      firstName = options.firstName.toLowerCase()
    }
    else {
      const maleLen = this.locale.person.firstNameMale.length
      const femaleLen = this.locale.person.firstNameFemale.length
      const neutralLen = this.locale.person.firstNameNeutral?.length || 0
      const totalLen = maleLen + femaleLen + neutralLen
      const index = this.random.int(0, totalLen - 1)

      if (index < maleLen) {
        firstName = this.locale.person.firstNameMale[index].toLowerCase()
      }
      else if (index < maleLen + femaleLen) {
        firstName = this.locale.person.firstNameFemale[index - maleLen].toLowerCase()
      }
      else {
        firstName = this.locale.person.firstNameNeutral![index - maleLen - femaleLen].toLowerCase()
      }
    }

    const lastName = options?.lastName ?? this.random.arrayElement(this.locale.person.lastName).toLowerCase()
    const provider = options?.provider ?? this.random.arrayElement(this.locale.internet.domainSuffix ?? ['com', 'net', 'org'])
    const separator = this.random.arrayElement(SEPARATORS)
    const domain = this.random.arrayElement(this.getDomainWords())

    return `${firstName}${separator}${lastName}@${domain}.${provider}`
  }

  /**
   * Generate a safe/example email address
   * @example faker.internet.safeEmail() // 'john.doe@example.org'
   */
  safeEmail(): string {
    return this.email({ provider: this.random.arrayElement(['example.com', 'example.org', 'example.net']) })
  }

  /**
   * Generate a free email address (Gmail, Yahoo, etc.)
   * @example faker.internet.freeEmail() // 'john.doe@gmail.com'
   */
  freeEmail(): string {
    // Optimized: avoid array spreading by selecting from combined length
    const maleLen = this.locale.person.firstNameMale.length
    const femaleLen = this.locale.person.firstNameFemale.length
    const neutralLen = this.locale.person.firstNameNeutral?.length || 0
    const totalLen = maleLen + femaleLen + neutralLen
    const index = this.random.int(0, totalLen - 1)

    let firstName: string
    if (index < maleLen) {
      firstName = this.locale.person.firstNameMale[index].toLowerCase()
    }
    else if (index < maleLen + femaleLen) {
      firstName = this.locale.person.firstNameFemale[index - maleLen].toLowerCase()
    }
    else {
      firstName = this.locale.person.firstNameNeutral![index - maleLen - femaleLen].toLowerCase()
    }

    const lastName = this.random.arrayElement(this.locale.person.lastName).toLowerCase()
    const provider = this.random.arrayElement(this.locale.internet.freeEmail ?? ['gmail.com', 'yahoo.com', 'hotmail.com'])

    const separators = ['.', '_', '']
    const separator = this.random.arrayElement(separators)

    return `${firstName}${separator}${lastName}@${provider}`
  }

  /**
   * Generate a random username
   * @example faker.internet.username() // 'john_doe123'
   */
  username(options?: { firstName?: string, lastName?: string }): string {
    // Optimized: avoid array spreading by selecting from combined length
    let firstName: string
    if (options?.firstName) {
      firstName = options.firstName.toLowerCase()
    }
    else {
      const maleLen = this.locale.person.firstNameMale.length
      const femaleLen = this.locale.person.firstNameFemale.length
      const neutralLen = this.locale.person.firstNameNeutral?.length || 0
      const totalLen = maleLen + femaleLen + neutralLen
      const index = this.random.int(0, totalLen - 1)

      if (index < maleLen) {
        firstName = this.locale.person.firstNameMale[index].toLowerCase()
      }
      else if (index < maleLen + femaleLen) {
        firstName = this.locale.person.firstNameFemale[index - maleLen].toLowerCase()
      }
      else {
        firstName = this.locale.person.firstNameNeutral![index - maleLen - femaleLen].toLowerCase()
      }
    }

    const lastName = options?.lastName?.toLowerCase() ?? this.random.arrayElement(this.locale.person.lastName).toLowerCase()

    const patterns = [
      `${firstName}${lastName}`,
      `${firstName}_${lastName}`,
      `${firstName}.${lastName}`,
      `${firstName}${this.random.int(10, 999)}`,
      `${firstName}_${lastName}${this.random.int(10, 99)}`,
    ]

    return this.random.arrayElement(patterns)
  }

  /**
   * Generate a random password
   * @example faker.internet.password() // 'aB3$kL9mP'
   */
  password(options?: PasswordOptions): string {
    const length = options?.length ?? 12
    const memorable = options?.memorable ?? false
    const prefix = options?.prefix ?? ''

    if (memorable) {
      // Generate a memorable password using words
      // Use all gendered names combined
      const allFirstNames = [
        ...this.locale.person.firstNameMale,
        ...this.locale.person.firstNameFemale,
        ...(this.locale.person.firstNameNeutral || []),
      ]
      const words = []
      for (let i = 0; i < 3; i++) {
        words.push(this.random.arrayElement(allFirstNames))
      }
      return prefix + words.join('-') + this.random.int(10, 999)
    }

    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
    let password = prefix

    for (let i = prefix.length; i < length; i++) {
      password += chars[this.random.int(0, chars.length - 1)]
    }

    return password
  }

  /**
   * Generate a random URL
   * @example faker.internet.url() // 'https://example.com'
   */
  url(options?: { protocol?: 'http' | 'https', domain?: string }): string {
    const protocol = options?.protocol ?? this.random.arrayElement(['http', 'https'])
    const domain = options?.domain ?? this.domainName()
    return `${protocol}://${domain}`
  }

  /**
   * Generate a random domain name
   * @example faker.internet.domainName() // 'example.com'
   */
  domainName(): string {
    return `${this.domainWord()}.${this.domainSuffix()}`
  }

  /**
   * Generate a random domain word
   * @example faker.internet.domainWord() // 'example'
   */
  domainWord(): string {
    return this.random.arrayElement(this.getDomainWords())
  }

  /**
   * Generate a random domain suffix
   * @example faker.internet.domainSuffix() // 'com'
   */
  domainSuffix(): string {
    return this.random.arrayElement(this.locale.internet.domainSuffix ?? ['com', 'net', 'org'])
  }

  /**
   * Generate a random IPv4 address
   * @example faker.internet.ipv4() // '192.168.1.1'
   */
  ipv4(): string {
    return `${this.random.int(0, 255)}.${this.random.int(0, 255)}.${this.random.int(0, 255)}.${this.random.int(0, 255)}`
  }

  /**
   * Generate a random IPv6 address
   * @example faker.internet.ipv6() // '2001:0db8:85a3:0000:0000:8a2e:0370:7334'
   */
  ipv6(): string {
    const segments: string[] = []
    for (let i = 0; i < 8; i++) {
      segments.push(this.random.int(0, 65535).toString(16).padStart(4, '0'))
    }
    return segments.join(':')
  }

  /**
   * Generate a random MAC address
   * @example faker.internet.mac() // '00:1A:2B:3C:4D:5E'
   */
  mac(separator = ':'): string {
    const segments: string[] = []
    for (let i = 0; i < 6; i++) {
      segments.push(this.random.int(0, 255).toString(16).padStart(2, '0').toUpperCase())
    }
    return segments.join(separator)
  }

  /**
   * Generate a random user agent string
   * @example faker.internet.userAgent() // 'Mozilla/5.0...'
   */
  userAgent(): string {
    const agents = [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/120.0',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 14.0; rv:109.0) Gecko/20100101 Firefox/120.0',
    ]
    return this.random.arrayElement(agents)
  }

  /**
   * Generate a random slug
   * @example faker.internet.slug() // 'hello-world-123'
   */
  slug(wordCount = 3): string {
    const words: string[] = []
    for (let i = 0; i < wordCount; i++) {
      words.push(this.random.arrayElement(this.locale.company.buzzwords ?? ['innovation', 'technology', 'solution']))
    }
    return words.join('-').toLowerCase()
  }

  /**
   * Laravel-compatible: Generate a random IP address (defaults to IPv4)
   * @example faker.internet.ip() // '192.168.1.1'
   */
  ip(): string {
    return this.ipv4()
  }
}
