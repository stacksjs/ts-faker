import type { MockConfig } from '@stacksjs/ts-faker'

const config: MockConfig = {
  // Automatically install missing locale packages when needed
  // When enabled, ts-mocker will automatically run `bun add @mock-locale/{code}`
  // when you try to use a locale that isn't installed
  autoInstallLocales: true,

  // Default locale to use
  locale: 'en',

  // Enable verbose logging
  verbose: false,

  // Optional: Set a global seed for reproducible results
  // seed: 12345,
}

export default config
