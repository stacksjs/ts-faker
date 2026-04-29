#!/usr/bin/env bun

import { existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const locales = ['cs', 'da', 'de', 'en', 'es', 'fi', 'fr', 'hi', 'it', 'ja', 'ko', 'nl', 'no', 'pl', 'pt', 'sv', 'tl', 'tr', 'uk', 'zh']

const packagesDir = join(import.meta.dir, '../packages')
const coreLocalesDir = join(import.meta.dir, '../src/locales')

for (const locale of locales) {
  const localeDir = join(packagesDir, locale)
  const srcDir = join(localeDir, 'src')

  // Create directories
  if (!existsSync(localeDir))
    mkdirSync(localeDir, { recursive: true })
  if (!existsSync(srcDir))
    mkdirSync(srcDir, { recursive: true })

  // Copy locale file from core
  const localeFile = join(coreLocalesDir, `${locale}.ts`)
  const destLocaleFile = join(srcDir, `${locale}.ts`)

  if (existsSync(localeFile)) {
    await Bun.write(destLocaleFile, await Bun.file(localeFile).text())
    console.log(`✓ Copied ${locale}.ts`)
  }

  // Create index.ts
  const indexContent = `export { ${locale} } from './${locale}'\nexport type { LocaleDefinition } from '@stacksjs/ts-faker'\n`
  await Bun.write(join(srcDir, 'index.ts'), indexContent)

  // Create package.json
  const packageJson = {
    name: `@mock-locale/${locale}`,
    type: 'module',
    version: '0.0.0',
    description: `${locale.toUpperCase()} locale data for ts-mocker`,
    author: 'Chris Breuer <chris@stacksjs.org>',
    license: 'MIT',
    homepage: 'https://github.com/stacksjs/ts-mocker#readme',
    repository: {
      type: 'git',
      url: 'git+https://github.com/stacksjs/ts-mocker.git',
    },
    bugs: {
      url: 'https://github.com/stacksjs/ts-mocker/issues',
    },
    keywords: ['@stacksjs/ts-faker', 'locale', locale, 'fake-data', 'test-data'],
    exports: {
      '.': {
        types: './dist/index.d.ts',
        import: './dist/index.js',
      },
    },
    module: './dist/index.js',
    types: './dist/index.d.ts',
    files: ['dist'],
    scripts: {
      build: 'bun --bun build.ts',
      typecheck: 'bun --bun tsc --noEmit',
    },
    peerDependencies: {
      '@stacksjs/ts-faker': 'workspace:*',
    },
    devDependencies: {
      '@types/bun': '^1.2.23',
      'bun-plugin-dtsx': '0.9.5',
      'bunfig': '^0.15.0',
      'typescript': '^5.9.3',
    },
  }

  await Bun.write(join(localeDir, 'package.json'), `${JSON.stringify(packageJson, null, 2)}\n`)

  // Create build.ts
  const buildContent = `import { dts } from 'bun-plugin-dtsx'

await Bun.build({
  entrypoints: ['src/index.ts'],
  outdir: './dist',
  plugins: [dts()],
})
`
  await Bun.write(join(localeDir, 'build.ts'), buildContent)

  // Create tsconfig.json
  const tsconfigContent = {
    extends: '../../tsconfig.json',
    compilerOptions: {
      outDir: './dist',
      rootDir: './src',
    },
    include: ['src/**/*'],
  }
  await Bun.write(join(localeDir, 'tsconfig.json'), `${JSON.stringify(tsconfigContent, null, 2)}\n`)

  console.log(`✓ Created package @mock-locale/${locale}`)
}

console.log(`\n✨ Successfully created ${locales.length} locale packages!`)
