import type { MockConfig } from './types'
import { loadConfig } from 'bunfig'

export const defaultConfig: MockConfig = {
  verbose: false,
  locale: 'en',
  autoInstallLocales: false,
}

// Lazy-loaded config to avoid top-level await (enables bun --compile)
let _config: MockConfig | null = null

export async function getConfig(): Promise<MockConfig> {
  if (!_config) {
    _config = await loadConfig({
      name: 'faker',
      alias: 'mock',
      defaultConfig,
    })
  }

  return _config
}

// For backwards compatibility - synchronous access with default fallback
export const config: MockConfig = defaultConfig
