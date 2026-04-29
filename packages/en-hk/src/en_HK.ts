import type { DeepPartial, LocaleDefinition } from '@stacksjs/ts-faker'

export const en_HK: DeepPartial<LocaleDefinition> = {
  title: 'English (Hong Kong)',

  address: {
    city: [
      'Hong Kong',
      'Kowloon',
      'Tsuen Wan',
      'Yuen Long',
      'Tuen Mun',
      'Tai Po',
      'Sha Tin',
      'Kwun Tong',
      'Sham Shui Po',
      'Wong Tai Sin',
      'Mong Kok',
      'Central',
      'Causeway Bay',
      'Wan Chai',
      'Aberdeen',
      'Stanley',
    ],
    state: ['Hong Kong Island', 'Kowloon', 'New Territories'],
    country: ['Hong Kong', 'Hong Kong SAR'],
    countryCode: ['HK'],
    zipCode: [''],
  },

  phone: {
    formats: [
      '#### ####',
      '+852 #### ####',
      '9### ####',
      '6### ####',
    ],
  },

  food: {
    dish: [
      'Dim Sum',
      'Char Siu',
      'Roast Goose',
      'Wonton Noodles',
      'Egg Tart',
      'Pineapple Bun',
      'Milk Tea',
      'Snake Soup',
      'Congee',
      'Siu Mai',
      'Har Gow',
      'Cheung Fun',
      'Egg Waffle',
      'Fish Balls',
      'Curry Fish Balls',
    ],
    cuisine: [
      'Cantonese',
      'Hong Kong',
      'Chinese',
      'Cha Chaan Teng',
      'Dim Sum',
      'Asian Fusion',
    ],
  },

  internet: {
    domainSuffix: ['hk', 'com.hk', 'org.hk', 'edu.hk', 'gov.hk'],
    freeEmail: ['gmail.com', 'yahoo.com.hk', 'hotmail.com'],
  },
}
