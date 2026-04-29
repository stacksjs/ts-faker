import type { DeepPartial, LocaleDefinition } from '@stacksjs/ts-faker'

/**
 * French (Luxembourg) locale
 * Extends the base 'fr' locale with Luxembourg-specific data
 */
export const fr_LU: DeepPartial<LocaleDefinition> = {
  title: 'French (Luxembourg)',

  // Luxembourg-specific address data
  address: {
    city: [
      'Luxembourg',
      'Esch-sur-Alzette',
      'Differdange',
      'Dudelange',
      'Pétange',
      'Sanem',
      'Hesperange',
      'Bettembourg',
      'Schifflange',
      'Ettelbruck',
      'Diekirch',
      'Strassen',
      'Bertrange',
      'Niederanven',
      'Contern',
      'Sandweiler',
      'Steinfort',
      'Walferdange',
      'Bascharage',
      'Wiltz',
      'Echternach',
      'Grevenmacher',
      'Remich',
      'Vianden',
      'Clervaux',
    ],
    state: [
      'Luxembourg',
      'Diekirch',
      'Grevenmacher',
      'Canton de Luxembourg',
      'Canton de Capellen',
      'Canton d\'Esch-sur-Alzette',
      'Canton de Mersch',
      'Canton de Redange',
      'Canton de Remich',
      'Canton de Vianden',
      'Canton de Wiltz',
      'Canton d\'Echternach',
    ],
    country: ['Luxembourg', 'Grand-Duché de Luxembourg'],
    countryCode: ['LU'],
    zipCode: ['L-####', '####'],
  },

  // Luxembourg phone formats
  phone: {
    formats: [
      '### ### ###',
      '+352 ### ### ###',
      '6## ### ###',
      '+352 6## ### ###',
    ],
  },

  // Luxembourg cuisine
  food: {
    dish: [
      'Judd mat Gaardebounen',
      'Bouneschlupp',
      'Gromperekichelcher',
      'F\'rell am Rèisleck',
      'Kuddelfleck',
      'Träipen',
      'Quetscheflued',
      'Äppelflued',
      'Verwurelter',
      'Thuringer',
      'Mettwurst',
      'Bouneschlupp',
      'Gromperezopp',
      'Stäerzelen',
      'Quetschentaart',
      'Äppelkuch',
      'Cassero',
      'Paschtéit',
      'Kniddelen',
    ],
    ingredient: [
      'Pommes de terre',
      'Haricots',
      'Lard fumé',
      'Saucisse',
      'Oignons',
      'Crème',
      'Beurre',
      'Farine',
      'Œufs',
      'Vin de Moselle',
      'Quetsches',
      'Pommes',
      'Fromage',
      'Chou',
      'Betteraves',
    ],
    dessert: [
      'Quetschentaart',
      'Äppelkuch',
      'Verwurelter',
      'Cassero',
      'Beerawecka',
      'Mëtteg',
      'Äppelflued',
      'Quetscheflued',
    ],
    cuisine: [
      'Luxembourgeoise',
      'Allemande',
      'Française',
      'Belge',
      'Traditionnelle',
      'Européenne',
    ],
  },

  // Luxembourg internet domains
  internet: {
    domainSuffix: ['lu', 'com', 'eu'],
    freeEmail: ['gmail.com', 'pt.lu', 'hotmail.lu', 'web.de', 'yahoo.com'],
  },
}
