import { describe, expect, test } from 'bun:test'
import { spawn } from 'node:child_process'
import { dirname, join } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = join(__dirname, '..')

function execCLI(args: string[]): Promise<{ stdout: string, stderr: string, exitCode: number }> {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, ['run', './packages/core/bin/cli.ts', ...args], {
      cwd: projectRoot,
    })
    let stdout = ''
    let stderr = ''

    child.stdout.on('data', (data) => {
      stdout += data.toString()
    })

    child.stderr.on('data', (data) => {
      stderr += data.toString()
    })

    child.on('close', (code) => {
      resolve({ stdout, stderr, exitCode: code || 0 })
    })
  })
}

describe('CLI', () => {
  describe('version command', () => {
    test('shows version number', async () => {
      const { stdout, exitCode } = await execCLI(['version'])
      expect(exitCode).toBe(0)
      expect(stdout).toContain('ts-mocker v')
    })

    test('--version flag shows version', async () => {
      const { stdout, exitCode } = await execCLI(['--version'])
      expect(exitCode).toBe(0)
      expect(stdout).toMatch(/\d+\.\d+\.\d+/)
    })
  })

  describe('help command', () => {
    test('--help shows help information', async () => {
      const { stdout, exitCode } = await execCLI(['--help'])
      expect(exitCode).toBe(0)
      expect(stdout).toContain('@stacksjs/ts-faker')
      expect(stdout).toContain('generate')
      expect(stdout).toContain('categories')
      expect(stdout).toContain('locales')
    })

    test('help for generate command', async () => {
      const { stdout, exitCode } = await execCLI(['generate', '--help'])
      expect(exitCode).toBe(0)
      expect(stdout).toContain('--locale')
      expect(stdout).toContain('--count')
      expect(stdout).toContain('--seed')
      expect(stdout).toContain('--json')
    })
  })

  describe('categories command', () => {
    test('lists all available categories', async () => {
      const { stdout, exitCode } = await execCLI(['categories'])
      expect(exitCode).toBe(0)
      expect(stdout).toContain('person')
      expect(stdout).toContain('address')
      expect(stdout).toContain('company')
      expect(stdout).toContain('internet')
      expect(stdout).toContain('food')
      expect(stdout).toContain('animal')
      expect(stdout).toContain('sport')
      expect(stdout).toContain('music')
      expect(stdout).toContain('commerce')
      expect(stdout).toContain('book')
      expect(stdout).toContain('vehicle')
      expect(stdout).toContain('word')
      expect(stdout).toContain('hacker')
      expect(stdout).toContain('system')
      expect(stdout).toContain('science')
    })

    test('shows category descriptions', async () => {
      const { stdout, exitCode } = await execCLI(['categories'])
      expect(exitCode).toBe(0)
      expect(stdout).toContain('Names, genders')
      expect(stdout).toContain('Streets, cities')
    })
  })

  describe('locales command', () => {
    test('lists all available locales', async () => {
      const { stdout, exitCode } = await execCLI(['locales'])
      expect(exitCode).toBe(0)
      expect(stdout).toContain('en - English')
      expect(stdout).toContain('es - Spanish')
      expect(stdout).toContain('fr - French')
      expect(stdout).toContain('de - German')
      expect(stdout).toContain('it - Italian')
      expect(stdout).toContain('pt - Portuguese')
      expect(stdout).toContain('ja - Japanese')
      expect(stdout).toContain('tl - Filipino')
      expect(stdout).toContain('zh - Chinese')
    })

    test('shows usage example', async () => {
      const { stdout, exitCode } = await execCLI(['locales'])
      expect(exitCode).toBe(0)
      expect(stdout).toContain('--locale')
      expect(stdout).toContain('Example:')
    })
  })

  describe('methods command', () => {
    test('lists methods for person category', async () => {
      const { stdout, exitCode } = await execCLI(['methods', 'person'])
      expect(exitCode).toBe(0)
      expect(stdout).toContain('firstName')
      expect(stdout).toContain('lastName')
      expect(stdout).toContain('fullName')
      expect(stdout).toContain('gender')
      expect(stdout).toContain('jobTitle')
    })

    test('lists methods for food category', async () => {
      const { stdout, exitCode } = await execCLI(['methods', 'food'])
      expect(exitCode).toBe(0)
      expect(stdout).toContain('dish')
      expect(stdout).toContain('ingredient')
      expect(stdout).toContain('ethnicCategory')
      expect(stdout).toContain('dessert')
    })

    test('shows error for invalid category', async () => {
      const { stderr, exitCode } = await execCLI(['methods', 'invalid'])
      expect(exitCode).toBe(1)
      expect(stderr).toContain('not found')
    })

    test('shows live examples', async () => {
      const { stdout, exitCode } = await execCLI(['methods', 'person'])
      expect(exitCode).toBe(0)
      // Should show actual generated examples, not just method names
      expect(stdout).toMatch(/\/\/.*".*"/)
    })
  })

  describe('generate command', () => {
    test('generates a single value', async () => {
      const { stdout, exitCode } = await execCLI(['generate', 'person', 'firstName'])
      expect(exitCode).toBe(0)
      expect(stdout.trim().length).toBeGreaterThan(0)
    })

    test('generates full name', async () => {
      const { stdout, exitCode } = await execCLI(['generate', 'person', 'fullName'])
      expect(exitCode).toBe(0)
      expect(stdout.trim()).toMatch(/\w+/)
    })

    test('generates email', async () => {
      const { stdout, exitCode } = await execCLI(['generate', 'internet', 'email'])
      expect(exitCode).toBe(0)
      expect(stdout.trim()).toContain('@')
    })

    test('generates with --count option', async () => {
      const { stdout, exitCode } = await execCLI(['generate', 'person', 'firstName', '--count', '3'])
      expect(exitCode).toBe(0)
      const lines = stdout.trim().split('\n')
      expect(lines.length).toBe(3)
    })

    test('generates with --json option (single)', async () => {
      const { stdout, exitCode } = await execCLI(['generate', 'person', 'firstName', '--json'])
      expect(exitCode).toBe(0)
      const result = JSON.parse(stdout)
      expect(typeof result).toBe('string')
    })

    test('generates with --json option (multiple)', async () => {
      const { stdout, exitCode } = await execCLI(['generate', 'person', 'firstName', '--count', '3', '--json'])
      expect(exitCode).toBe(0)
      const result = JSON.parse(stdout)
      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBe(3)
    })

    test('generates with --locale option', async () => {
      const { stdout, exitCode } = await execCLI(['generate', 'person', 'fullName', '--locale', 'es'])
      expect(exitCode).toBe(0)
      expect(stdout.trim().length).toBeGreaterThan(0)
    })

    test('generates with --seed for reproducibility', async () => {
      const { stdout: stdout1 } = await execCLI(['generate', 'person', 'fullName', '--seed', '12345'])
      const { stdout: stdout2 } = await execCLI(['generate', 'person', 'fullName', '--seed', '12345'])
      expect(stdout1).toBe(stdout2)
    })

    test('different seeds produce different results', async () => {
      const { stdout: stdout1 } = await execCLI(['generate', 'person', 'fullName', '--seed', '100'])
      const { stdout: stdout2 } = await execCLI(['generate', 'person', 'fullName', '--seed', '200'])
      expect(stdout1).not.toBe(stdout2)
    })

    test('shows error for invalid category', async () => {
      const { stderr, exitCode } = await execCLI(['generate', 'invalid', 'method'])
      expect(exitCode).toBe(1)
      expect(stderr).toContain('Category')
      expect(stderr).toContain('not found')
    })

    test('shows error for invalid method', async () => {
      const { stderr, exitCode } = await execCLI(['generate', 'person', 'invalid'])
      expect(exitCode).toBe(1)
      expect(stderr).toContain('Method')
      expect(stderr).toContain('not found')
    })

    test('shows available methods on error', async () => {
      const { stderr, exitCode } = await execCLI(['generate', 'person', 'invalid'])
      expect(exitCode).toBe(1)
      expect(stderr).toContain('Available methods')
      expect(stderr).toContain('firstName')
    })
  })

  describe('batch command', () => {
    test('generates batch with default template (user)', async () => {
      const { stdout, exitCode } = await execCLI(['batch', '3'])
      expect(exitCode).toBe(0)
      const result = JSON.parse(stdout)
      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBe(3)
      expect(result[0]).toHaveProperty('name')
      expect(result[0]).toHaveProperty('email')
      expect(result[0]).toHaveProperty('phone')
      expect(result[0]).toHaveProperty('city')
      expect(result[0]).toHaveProperty('country')
    })

    test('generates batch with user template', async () => {
      const { stdout, exitCode } = await execCLI(['batch', '2', '--template', 'user'])
      expect(exitCode).toBe(0)
      const result = JSON.parse(stdout)
      expect(result.length).toBe(2)
      expect(result[0]).toHaveProperty('name')
      expect(result[0]).toHaveProperty('email')
    })

    test('generates batch with product template', async () => {
      const { stdout, exitCode } = await execCLI(['batch', '2', '--template', 'product'])
      expect(exitCode).toBe(0)
      const result = JSON.parse(stdout)
      expect(result.length).toBe(2)
      expect(result[0]).toHaveProperty('name')
      expect(result[0]).toHaveProperty('description')
      expect(result[0]).toHaveProperty('price')
      expect(result[0]).toHaveProperty('category')
      expect(result[0]).toHaveProperty('sku')
    })

    test('generates batch with address template', async () => {
      const { stdout, exitCode } = await execCLI(['batch', '2', '--template', 'address'])
      expect(exitCode).toBe(0)
      const result = JSON.parse(stdout)
      expect(result.length).toBe(2)
      expect(result[0]).toHaveProperty('street')
      expect(result[0]).toHaveProperty('city')
      expect(result[0]).toHaveProperty('state')
      expect(result[0]).toHaveProperty('country')
      expect(result[0]).toHaveProperty('zipCode')
    })

    test('generates batch with company template', async () => {
      const { stdout, exitCode } = await execCLI(['batch', '2', '--template', 'company'])
      expect(exitCode).toBe(0)
      const result = JSON.parse(stdout)
      expect(result.length).toBe(2)
      expect(result[0]).toHaveProperty('name')
      expect(result[0]).toHaveProperty('industry')
      expect(result[0]).toHaveProperty('buzzword')
      expect(result[0]).toHaveProperty('email')
      expect(result[0]).toHaveProperty('website')
    })

    test('generates batch with locale', async () => {
      const { stdout, exitCode } = await execCLI(['batch', '2', '--locale', 'es'])
      expect(exitCode).toBe(0)
      const result = JSON.parse(stdout)
      expect(result.length).toBe(2)
    })

    test('generates batch with seed for reproducibility', async () => {
      const { stdout: stdout1 } = await execCLI(['batch', '3', '--seed', '12345'])
      const { stdout: stdout2 } = await execCLI(['batch', '3', '--seed', '12345'])
      expect(stdout1).toBe(stdout2)
    })

    test('shows error for invalid template', async () => {
      const { stderr, exitCode } = await execCLI(['batch', '2', '--template', 'invalid'])
      expect(exitCode).toBe(1)
      expect(stderr).toContain('Template')
      expect(stderr).toContain('not found')
    })
  })

  describe('seed command', () => {
    test('generates with seed', async () => {
      const { stdout, exitCode } = await execCLI(['seed', '12345'])
      expect(exitCode).toBe(0)
      expect(stdout).toContain('Generating with seed 12345')
      expect(stdout).toContain('same results')
    })

    test('seed produces reproducible results', async () => {
      const { stdout: stdout1 } = await execCLI(['seed', '42'])
      const { stdout: stdout2 } = await execCLI(['seed', '42'])
      expect(stdout1).toBe(stdout2)
    })

    test('different seeds produce different results', async () => {
      const { stdout: stdout1 } = await execCLI(['seed', '100'])
      const { stdout: stdout2 } = await execCLI(['seed', '200'])
      expect(stdout1).not.toBe(stdout2)
    })

    test('generates with custom category', async () => {
      const { stdout, exitCode } = await execCLI(['seed', '12345', '--category', 'food'])
      expect(exitCode).toBe(0)
      expect(stdout).toContain('Generating with seed 12345')
    })

    test('generates with custom method', async () => {
      const { stdout, exitCode } = await execCLI(['seed', '12345', '--category', 'person', '--method', 'firstName'])
      expect(exitCode).toBe(0)
      expect(stdout).toContain('Generating with seed 12345')
    })

    test('generates with custom count', async () => {
      const { stdout, exitCode } = await execCLI(['seed', '12345', '--count', '3'])
      expect(exitCode).toBe(0)
      const lines = stdout.split('\n').filter(line => line.match(/^\d+\./))
      expect(lines.length).toBe(3)
    })

    test('generates food dishes with seed', async () => {
      const { stdout, exitCode } = await execCLI(['seed', '42', '--category', 'food', '--method', 'dish', '--count', '3'])
      expect(exitCode).toBe(0)
      expect(stdout).toContain('1.')
      expect(stdout).toContain('2.')
      expect(stdout).toContain('3.')
    })

    test('shows error for invalid category', async () => {
      const { stderr, exitCode } = await execCLI(['seed', '12345', '--category', 'invalid'])
      expect(exitCode).toBe(1)
      expect(stderr).toContain('Category')
      expect(stderr).toContain('not found')
    })

    test('shows error for invalid method', async () => {
      const { stderr, exitCode } = await execCLI(['seed', '12345', '--category', 'person', '--method', 'invalid'])
      expect(exitCode).toBe(1)
      expect(stderr).toContain('Method')
      expect(stderr).toContain('not found')
    })
  })

  describe('comprehensive functionality', () => {
    test('all categories work with generate', async () => {
      const categories = [
        ['person', 'firstName'],
        ['address', 'city'],
        ['company', 'name'],
        ['internet', 'email'],
        ['phone', 'number'],
        ['food', 'dish'],
        ['animal', 'dog'],
        ['sport', 'sport'],
        ['music', 'genre'],
        ['commerce', 'product'],
        ['book', 'title'],
        ['vehicle', 'manufacturer'],
        ['word', 'noun'],
        ['hacker', 'noun'],
        ['system', 'fileName'],
        ['science', 'chemicalElement'],
      ]

      for (const [category, method] of categories) {
        const { stdout, exitCode } = await execCLI(['generate', category, method])
        expect(exitCode).toBe(0)
        expect(stdout.trim().length).toBeGreaterThan(0)
      }
    })

    test('all locales work with generate', async () => {
      const locales = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'tl', 'zh']

      for (const locale of locales) {
        const { stdout, exitCode } = await execCLI(['generate', 'person', 'fullName', '--locale', locale])
        expect(exitCode).toBe(0)
        expect(stdout.trim().length).toBeGreaterThan(0)
      }
    })

    test('combines multiple options', async () => {
      const { stdout, exitCode } = await execCLI([
        'generate',
        'person',
        'fullName',
        '--locale',
        'es',
        '--count',
        '3',
        '--seed',
        '12345',
        '--json',
      ])
      expect(exitCode).toBe(0)
      const result = JSON.parse(stdout)
      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBe(3)
    })

    test('JSON output is valid', async () => {
      const { stdout, exitCode } = await execCLI(['batch', '5', '--template', 'user'])
      expect(exitCode).toBe(0)
      const result = JSON.parse(stdout)
      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBe(5)
      result.forEach((item: any) => {
        expect(item).toHaveProperty('name')
        expect(item).toHaveProperty('email')
        expect(typeof item.email).toBe('string')
        expect(item.email).toContain('@')
      })
    })
  })

  describe('error handling', () => {
    test('handles missing arguments gracefully', async () => {
      const { exitCode } = await execCLI(['generate'])
      expect(exitCode).toBe(1)
    })

    test('handles invalid count values', async () => {
      const { exitCode } = await execCLI(['generate', 'person', 'firstName', '--count', 'invalid'])
      // Should either error or default to 1
      expect([0, 1]).toContain(exitCode)
    })

    test('handles invalid seed values', async () => {
      const { exitCode } = await execCLI(['generate', 'person', 'firstName', '--seed', 'invalid'])
      // Should handle gracefully
      expect([0, 1]).toContain(exitCode)
    })
  })
})
