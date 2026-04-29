import type { BunpressConfig } from 'bunpress'

const config: BunpressConfig = {
  name: '@stacksjs/ts-faker',
  description: 'Performance-focused TypeScript faker library with comprehensive locale support',
  url: 'https://ts-mocker.stacksjs.org',
  theme: 'docs',

  nav: [
    { text: 'Guide', link: '/guide' },
    { text: 'Data Types', link: '/data-types' },
    { text: 'Localization', link: '/localization' },
    { text: 'Advanced', link: '/advanced' },
    { text: 'CLI', link: '/cli' },
    { text: 'GitHub', link: 'https://github.com/stacksjs/ts-mocker' },
  ],

  sidebar: {
    '/guide/': [
      { text: 'Introduction', link: '/guide' },
      { text: 'Getting Started', link: '/guide/getting-started' },
      { text: 'Data Providers', link: '/guide/providers' },
      { text: 'Localization', link: '/guide/locales' },
      { text: 'Seeding', link: '/guide/seeding' },
    ],
    '/data-types/': [
      { text: 'Overview', link: '/data-types' },
      { text: 'Person', link: '/data-types/person' },
      { text: 'Address', link: '/data-types/address' },
      { text: 'Company', link: '/data-types/company' },
      { text: 'Internet', link: '/data-types/internet' },
      { text: 'Commerce', link: '/data-types/commerce' },
      { text: 'Food & Animals', link: '/data-types/food-animals' },
      { text: 'Science & Tech', link: '/data-types/science-tech' },
    ],
    '/localization/': [
      { text: 'Overview', link: '/localization' },
      { text: 'Supported Locales', link: '/localization/supported-locales' },
      { text: 'Regional Variants', link: '/localization/regional-variants' },
    ],
    '/advanced/': [
      { text: 'Overview', link: '/advanced' },
      { text: 'Seeding', link: '/advanced/seeding' },
      { text: 'Custom Providers', link: '/advanced/custom-providers' },
      { text: 'Validation', link: '/advanced/validation' },
      { text: 'Performance', link: '/advanced/performance' },
    ],
    '/cli/': [
      { text: 'Overview', link: '/cli' },
      { text: 'Commands', link: '/cli/commands' },
    ],
  },

  search: true,
  editLink: {
    pattern: 'https://github.com/stacksjs/ts-mocker/edit/main/docs/:path',
    text: 'Edit this page on GitHub',
  },

  socialLinks: [
    { icon: 'github', link: 'https://github.com/stacksjs/ts-mocker' },
    { icon: 'discord', link: 'https://discord.gg/stacksjs' },
  ],
}

export default config
