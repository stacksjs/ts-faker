import { faker as fakerjs } from '@faker-js/faker'
import { randCity, randCompanyName, randCountry, randEmail, randFullName, randPhoneNumber, randProduct, randUuid } from '@ngneat/falso'
import casual from 'casual'
import Chance from 'chance'
import { Bench } from 'tinybench'
// @ts-expect-error ts-mocker is typed
import { faker } from '../../core/dist/src/index.js'

const chance = new Chance()

// ANSI color codes for pretty output
const colors = {
  reset: '\x1B[0m',
  bright: '\x1B[1m',
  green: '\x1B[32m',
  yellow: '\x1B[33m',
  blue: '\x1B[34m',
  cyan: '\x1B[36m',
  red: '\x1B[31m',
}

function formatOpsPerSec(ops: number): string {
  if (ops >= 1_000_000) {
    return `${(ops / 1_000_000).toFixed(2)}M ops/s`
  }
  if (ops >= 1_000) {
    return `${(ops / 1_000).toFixed(2)}K ops/s`
  }
  return `${ops.toFixed(2)} ops/s`
}

function printResults(bench: Bench, title: string) {
  console.log(`\n${colors.bright}${colors.cyan}${title}${colors.reset}`)
  console.log('─'.repeat(80))

  const tasks = bench.tasks.sort((a, b) => (b.result?.hz || 0) - (a.result?.hz || 0))
  const fastest = tasks[0]

  tasks.forEach((task, index) => {
    const result = task.result
    if (!result)
      return

    const isTsMocker = task.name.includes('@stacksjs/ts-faker')
    const isFastest = task === fastest
    const color = isFastest ? colors.green : isTsMocker ? colors.yellow : colors.reset

    const opsPerSec = formatOpsPerSec(result.hz)
    const avgTime = `${(result.mean * 1000).toFixed(4)}ms`
    const margin = `±${result.rme.toFixed(2)}%`

    const speedup = fastest.result ? (result.hz / fastest.result.hz) : 1
    const speedupText = isFastest ? '(fastest)' : `(${speedup.toFixed(2)}x)`

    console.log(
      `${index + 1}. ${color}${task.name.padEnd(20)}${colors.reset} `
      + `${opsPerSec.padEnd(15)} ${avgTime.padEnd(12)} ${margin.padEnd(8)} ${isFastest ? colors.green : ''}${speedupText}${colors.reset}`,
    )
  })
}

async function runBenchmarks() {
  console.log(`${colors.bright}${colors.blue}`)
  console.log('╔════════════════════════════════════════════════════════════════════════════╗')
  console.log('║                    ts-mocker Performance Benchmarks                        ║')
  console.log('║              Comparing against popular JS/TS faker libraries               ║')
  console.log('╚════════════════════════════════════════════════════════════════════════════╝')
  console.log(colors.reset)

  // Benchmark 1: Full Name Generation
  const nameBench = new Bench({ time: 750 })
  nameBench
    .add('@stacksjs/ts-faker', () => {
      faker.person.fullName()
    })
    .add('@faker-js/faker', () => {
      fakerjs.person.fullName()
    })
    .add('chance', () => {
      chance.name()
    })
    .add('casual', () => {
      casual.full_name
    })
    .add('@ngneat/falso', () => {
      randFullName()
    })

  await nameBench.run()
  printResults(nameBench, '📛 Full Name Generation')

  // Benchmark 2: Email Generation
  const emailBench = new Bench({ time: 750 })
  emailBench
    .add('@stacksjs/ts-faker', () => {
      faker.internet.email()
    })
    .add('@faker-js/faker', () => {
      fakerjs.internet.email()
    })
    .add('chance', () => {
      chance.email()
    })
    .add('casual', () => {
      casual.email
    })
    .add('@ngneat/falso', () => {
      randEmail()
    })

  await emailBench.run()
  printResults(emailBench, '📧 Email Generation')

  // Benchmark 3: Phone Number Generation
  const phoneBench = new Bench({ time: 750 })
  phoneBench
    .add('@stacksjs/ts-faker', () => {
      faker.phone.number()
    })
    .add('@faker-js/faker', () => {
      fakerjs.phone.number()
    })
    .add('chance', () => {
      chance.phone()
    })
    .add('casual', () => {
      casual.phone
    })
    .add('@ngneat/falso', () => {
      randPhoneNumber()
    })

  await phoneBench.run()
  printResults(phoneBench, '📞 Phone Number Generation')

  // Benchmark 4: City Generation
  const cityBench = new Bench({ time: 750 })
  cityBench
    .add('@stacksjs/ts-faker', () => {
      faker.address.city()
    })
    .add('@faker-js/faker', () => {
      fakerjs.location.city()
    })
    .add('chance', () => {
      chance.city()
    })
    .add('casual', () => {
      casual.city
    })
    .add('@ngneat/falso', () => {
      randCity()
    })

  await cityBench.run()
  printResults(cityBench, '🏙️  City Generation')

  // Benchmark 5: Country Generation
  const countryBench = new Bench({ time: 750 })
  countryBench
    .add('@stacksjs/ts-faker', () => {
      faker.address.country()
    })
    .add('@faker-js/faker', () => {
      fakerjs.location.country()
    })
    .add('chance', () => {
      chance.country({ full: true })
    })
    .add('casual', () => {
      casual.country
    })
    .add('@ngneat/falso', () => {
      randCountry()
    })

  await countryBench.run()
  printResults(countryBench, '🌍 Country Generation')

  // Benchmark 6: Company Name Generation
  const companyBench = new Bench({ time: 750 })
  companyBench
    .add('@stacksjs/ts-faker', () => {
      faker.company.name()
    })
    .add('@faker-js/faker', () => {
      fakerjs.company.name()
    })
    .add('chance', () => {
      chance.company()
    })
    .add('casual', () => {
      casual.company_name
    })
    .add('@ngneat/falso', () => {
      randCompanyName()
    })

  await companyBench.run()
  printResults(companyBench, '🏢 Company Name Generation')

  // Benchmark 7: Product Generation
  const productBench = new Bench({ time: 750 })
  productBench
    .add('@stacksjs/ts-faker', () => {
      faker.commerce.product()
    })
    .add('@faker-js/faker', () => {
      fakerjs.commerce.product()
    })
    .add('casual', () => {
      casual.word
    })
    .add('@ngneat/falso', () => {
      randProduct()
    })

  await productBench.run()
  printResults(productBench, '🛍️  Product Generation')

  // Benchmark 8: UUID Generation
  const uuidBench = new Bench({ time: 750 })
  uuidBench
    .add('@stacksjs/ts-faker', () => {
      faker.string.uuid()
    })
    .add('@faker-js/faker', () => {
      fakerjs.string.uuid()
    })
    .add('chance', () => {
      chance.guid()
    })
    .add('casual', () => {
      casual.uuid
    })
    .add('@ngneat/falso', () => {
      randUuid()
    })

  await uuidBench.run()
  printResults(uuidBench, '🔑 UUID Generation')

  // Benchmark 9: Complex User Object (10,000 iterations)
  console.log(`\n${colors.bright}${colors.cyan}📊 Complex User Object (10,000 records)${colors.reset}`)
  console.log('─'.repeat(80))

  const iterations = 10_000

  // ts-mocker
  const nanoStart = performance.now()
  for (let i = 0; i < iterations; i++) {
    const _user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      city: faker.address.city(),
      country: faker.address.country(),
    }
  }
  const nanoDuration = performance.now() - nanoStart

  // @faker-js/faker
  const fakerjsStart = performance.now()
  for (let i = 0; i < iterations; i++) {
    const _user = {
      name: fakerjs.person.fullName(),
      email: fakerjs.internet.email(),
      phone: fakerjs.phone.number(),
      city: fakerjs.location.city(),
      country: fakerjs.location.country(),
    }
  }
  const fakerjsDuration = performance.now() - fakerjsStart

  // chance
  const chanceStart = performance.now()
  for (let i = 0; i < iterations; i++) {
    const _user = {
      name: chance.name(),
      email: chance.email(),
      phone: chance.phone(),
      city: chance.city(),
      country: chance.country({ full: true }),
    }
  }
  const chanceDuration = performance.now() - chanceStart

  // casual
  const casualStart = performance.now()
  for (let i = 0; i < iterations; i++) {
    const _user = {
      name: casual.full_name,
      email: casual.email,
      phone: casual.phone,
      city: casual.city,
      country: casual.country,
    }
  }
  const casualDuration = performance.now() - casualStart

  // @ngneat/falso
  const falsoStart = performance.now()
  for (let i = 0; i < iterations; i++) {
    const _user = {
      name: randFullName(),
      email: randEmail(),
      phone: randPhoneNumber(),
      city: randCity(),
      country: randCountry(),
    }
  }
  const falsoDuration = performance.now() - falsoStart

  const results = [
    { name: '@stacksjs/ts-faker', duration: nanoDuration },
    { name: '@faker-js/faker', duration: fakerjsDuration },
    { name: 'chance', duration: chanceDuration },
    { name: 'casual', duration: casualDuration },
    { name: '@ngneat/falso', duration: falsoDuration },
  ].sort((a, b) => a.duration - b.duration)

  results.forEach((result, index) => {
    const isTsMocker = result.name === '@stacksjs/ts-faker'
    const isFastest = index === 0
    const color = isFastest ? colors.green : isTsMocker ? colors.yellow : colors.reset

    const speedup = results[0].duration / result.duration
    const speedupText = isFastest ? '(fastest)' : `(${speedup.toFixed(2)}x)`
    const perRecord = (result.duration / iterations * 1000).toFixed(4)

    console.log(
      `${index + 1}. ${color}${result.name.padEnd(20)}${colors.reset} ${
        `${result.duration.toFixed(2)}ms`.padEnd(15)
      }${`${perRecord}μs/record`.padEnd(18)
      }${isFastest ? colors.green : ''}${speedupText}${colors.reset}`,
    )
  })

  // Summary
  console.log(`\n${colors.bright}${colors.blue}`)
  console.log('╔════════════════════════════════════════════════════════════════════════════╗')
  console.log('║                              Summary                                       ║')
  console.log('╚════════════════════════════════════════════════════════════════════════════╝')
  console.log(colors.reset)

  const nanoWins = [
    nameBench,
    emailBench,
    phoneBench,
    cityBench,
    countryBench,
    companyBench,
    productBench,
    uuidBench,
  ].filter((bench) => {
    const sorted = bench.tasks.sort((a, b) => (b.result?.hz || 0) - (a.result?.hz || 0))
    return sorted[0]?.name === '@stacksjs/ts-faker'
  }).length

  const totalBenchmarks = 9 // 8 single + 1 complex
  const nanoWinsTotal = results[0].name === '@stacksjs/ts-faker' ? nanoWins + 1 : nanoWins

  console.log(`${colors.green}✓ ts-mocker won ${nanoWinsTotal} out of ${totalBenchmarks} benchmarks${colors.reset}`)
  console.log(`${colors.cyan}ℹ Average performance advantage: ${(fakerjsDuration / nanoDuration).toFixed(2)}x faster than @faker-js/faker${colors.reset}`)

  console.log(`\n${colors.bright}Run with ${colors.cyan}bun run bench${colors.reset} to see these benchmarks anytime!\n`)
}

runBenchmarks().catch(console.error)
