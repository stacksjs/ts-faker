import type { DeepPartial, LocaleDefinition } from '@stacksjs/ts-faker'

/**
 * English (United Kingdom) locale
 * Extends the base 'en' locale with UK-specific data
 */
export const en_GB: DeepPartial<LocaleDefinition> = {
  title: 'English (United Kingdom)',

  // UK-specific address data
  address: {
    city: [
      'London',
      'Birmingham',
      'Manchester',
      'Liverpool',
      'Leeds',
      'Sheffield',
      'Bristol',
      'Glasgow',
      'Edinburgh',
      'Cardiff',
      'Newcastle',
      'Belfast',
      'Leicester',
      'Nottingham',
      'Southampton',
      'Brighton',
      'Oxford',
      'Cambridge',
      'York',
      'Bath',
    ],
    state: [
      'England',
      'Scotland',
      'Wales',
      'Northern Ireland',
    ],
    country: ['United Kingdom', 'UK', 'Great Britain', 'Britain'],
    zipCode: ['??## #??', '?## #??', '??# #??', '?# #??'],
    buildingNumber: ['###', '##', '#'],
  },

  // UK phone number formats
  phone: {
    formats: [
      '0#### ######',
      '0### ### ####',
      '+44 #### ######',
      '+44 ### ### ####',
      '(0####) ######',
    ],
  },

  // British cuisine
  food: {
    dish: [
      'Fish and Chips',
      'Full English Breakfast',
      'Roast Beef and Yorkshire Pudding',
      'Shepherd\'s Pie',
      'Cottage Pie',
      'Bangers and Mash',
      'Toad in the Hole',
      'Cornish Pasty',
      'Steak and Kidney Pie',
      'Chicken Tikka Masala',
      'Beef Wellington',
      'Ploughman\'s Lunch',
      'Scotch Eggs',
      'Bubble and Squeak',
      'Black Pudding',
      'Haggis',
      'Welsh Rarebit',
      'Eton Mess',
      'Sticky Toffee Pudding',
      'Spotted Dick',
      'Trifle',
      'Scones with Clotted Cream',
      'Victoria Sponge',
      'Bread and Butter Pudding',
      'Apple Crumble',
      'Mince Pies',
      'Christmas Pudding',
    ],
    cuisine: [
      'British',
      'English',
      'Scottish',
      'Welsh',
      'Irish',
      'Modern British',
      'Traditional British',
      'Gastropub',
    ],
  },
}
