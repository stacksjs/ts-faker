import type { DeepPartial, LocaleDefinition } from '@stacksjs/ts-faker'

/**
 * English (Canada) locale
 * Extends the base 'en' locale with Canada-specific data
 */
export const en_CA: DeepPartial<LocaleDefinition> = {
  title: 'English (Canada)',

  address: {
    city: [
      'Toronto',
      'Vancouver',
      'Calgary',
      'Edmonton',
      'Ottawa',
      'Winnipeg',
      'Hamilton',
      'Kitchener',
      'London',
      'Victoria',
      'Halifax',
      'Oshawa',
      'Windsor',
      'Saskatoon',
      'Regina',
      'St. John\'s',
      'Kelowna',
      'Barrie',
      'Guelph',
      'Kingston',
      'Thunder Bay',
      'Moncton',
      'Fredericton',
    ],
    state: [
      'Ontario',
      'British Columbia',
      'Alberta',
      'Quebec',
      'Manitoba',
      'Saskatchewan',
      'Nova Scotia',
      'New Brunswick',
      'Newfoundland and Labrador',
      'Prince Edward Island',
      'Northwest Territories',
      'Yukon',
      'Nunavut',
    ],
    stateAbbr: ['ON', 'BC', 'AB', 'QC', 'MB', 'SK', 'NS', 'NB', 'NL', 'PE', 'NT', 'YT', 'NU'],
    country: ['Canada'],
    countryCode: ['CA'],
    zipCode: ['?#? #?#'],
  },

  phone: {
    formats: [
      '###-###-####',
      '(###) ###-####',
      '+1 ### ### ####',
    ],
  },

  food: {
    dish: [
      'Poutine',
      'Montreal Smoked Meat',
      'Tourtière',
      'Butter Tarts',
      'Nanaimo Bars',
      'Bannock',
      'Peameal Bacon',
      'Caesar Cocktail',
      'Kraft Dinner',
      'Tim Bits',
      'Beaver Tails',
      'Split Pea Soup',
      'Maple Syrup',
      'Montreal Bagels',
    ],
    cuisine: [
      'Canadian',
      'French Canadian',
      'Indigenous',
      'Maritime',
      'Prairie',
      'West Coast',
      'Arctic',
      'Fusion',
    ],
  },

  internet: {
    domainSuffix: ['ca', 'com', 'net'],
    freeEmail: ['gmail.com', 'yahoo.ca', 'hotmail.ca', 'outlook.com'],
  },
}
