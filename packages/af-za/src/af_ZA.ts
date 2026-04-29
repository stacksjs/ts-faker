import type { DeepPartial, LocaleDefinition } from '@stacksjs/ts-faker'

export const af_ZA: DeepPartial<LocaleDefinition> = {
  title: 'Afrikaans (South Africa)',

  address: {
    city: ['Kaapstad', 'Pretoria', 'Johannesburg', 'Durban', 'Bloemfontein', 'Port Elizabeth', 'Kimberley', 'Polokwane'],
    state: ['Wes-Kaap', 'Oos-Kaap', 'KwaZulu-Natal', 'Gauteng', 'Vrystaat', 'Limpopo', 'Mpumalanga', 'Noord-Wes', 'Noord-Kaap'],
    country: ['Suid-Afrika'],
    countryCode: ['ZA'],
    zipCode: ['####'],
  },

  phone: {
    formats: ['0## ### ####', '+27 ## ### ####'],
  },

  food: {
    dish: ['Braai', 'Boerewors', 'Bobotie', 'Melktert', 'Koeksisters', 'Biltong', 'Vetkoek', 'Potjiekos', 'Malva Poeding'],
    cuisine: ['Afrikaans', 'Suid-Afrikaans', 'Kaaps-Maleise'],
  },

  internet: {
    domainSuffix: ['za', 'co.za'],
    freeEmail: ['gmail.com', 'yahoo.co.za', 'webmail.co.za'],
  },
}
