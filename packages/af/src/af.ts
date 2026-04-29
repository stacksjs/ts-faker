import type { LocaleDefinition } from '@stacksjs/ts-faker'

export const af: LocaleDefinition = {
  title: 'Afrikaans',

  person: {
    firstNameMale: ['Jan', 'Pieter', 'Johannes', 'Hendrik', 'Andries', 'Willem', 'Jacobus', 'Gert', 'Dirk', 'Frans', 'Christiaan', 'Petrus', 'Stephanus', 'Daniel', 'Marthinus'],
    firstNameFemale: ['Anna', 'Maria', 'Elizabeth', 'Johanna', 'Susanna', 'Hester', 'Aletta', 'Catharina', 'Margaretha', 'Hendrina', 'Cornelia', 'Francina', 'Sophia', 'Jacoba', 'Christina'],
    firstNameNeutral: ['Alex', 'Chris', 'Pat', 'Sam', 'Jordan'],
    lastName: ['Van der Merwe', 'De Wet', 'Van Wyk', 'Botha', 'Pretorius', 'Nel', 'Fourie', 'Du Plessis', 'Venter', 'Meyer', 'Kruger', 'Steyn', 'Smit', 'Van Zyl', 'Marais'],
    prefix: ['Mnr.', 'Mev.', 'Dr.', 'Prof.'],
    suffix: ['Jr.', 'Sr.', 'II', 'III'],
    gender: ['Man', 'Vrou', 'Ander'],
    jobTitle: ['Programmeerder', 'Ingenieur', 'Onderwyser', 'Dokter', 'Prokureur', 'Argitek', 'Bestuurder', 'Verpleegster', 'Apteker', 'Rekenmeester'],
  },

  address: {
    street: ['Kerk', 'Hoof', 'Mark', 'Voortrekker', 'Andries', 'Paul Kruger', 'Jan Smuts', 'Loop', 'Pretorius', 'Van der Walt'],
    city: ['Kaapstad', 'Pretoria', 'Johannesburg', 'Durban', 'Bloemfontein', 'Port Elizabeth', 'Kimberley', 'Polokwane', 'Nelspruit', 'Pietermaritzburg'],
    state: ['Wes-Kaap', 'Oos-Kaap', 'KwaZulu-Natal', 'Gauteng', 'Vrystaat', 'Limpopo', 'Mpumalanga', 'Noord-Wes', 'Noord-Kaap'],
    stateAbbr: ['WK', 'OK', 'KZN', 'GT', 'VS', 'LP', 'MP', 'NW', 'NK'],
    country: ['Suid-Afrika', 'Namibië'],
    countryCode: ['ZA', 'NA'],
    zipCode: ['####'],
    buildingNumber: ['###', '##', '#'],
    direction: ['Noord', 'Suid', 'Oos', 'Wes'],
    streetSuffix: ['straat', 'laan', 'weg', 'plein', 'rylaan'],
  },

  company: {
    name: ['Suid-Afrikaanse Maatskappy', 'Afrikaanse Besigheid', 'Kaapse Groep', 'Vrystaat Handel', 'Gauteng Korporasie'],
    suffix: ['Edms. Bpk.', 'BK', 'Maatskappy', 'Besigheid'],
    industry: ['Tegnologie', 'Onderwys', 'Gesondheid', 'Handel', 'Vervoer', 'Mynbou', 'Landbou'],
    buzzwords: ['optimaliseer', 'transformeer', 'innoveer', 'digitaliseer'],
    adjective: ['nuwe', 'slim', 'doeltreffend', 'moderne'],
    descriptor: ['wêreldwye', 'digitale', 'volhoubare'],
    noun: ['oplossing', 'platform', 'stelsel', 'diens'],
  },

  internet: {
    domainSuffix: ['co.za', 'org.za', 'ac.za', 'gov.za', 'net.za'],
    freeEmail: ['gmail.com', 'yahoo.co.za', 'webmail.co.za', 'mweb.co.za'],
  },

  phone: {
    formats: ['0## ### ####', '+27 ## ### ####', '(0##) ### ####'],
  },

  food: {
    dish: ['Braai', 'Boerewors', 'Bobotie', 'Melktert', 'Koeksisters', 'Biltong', 'Vetkoek', 'Potjiekos', 'Malva Poeding', 'Sosaties', 'Waterblommetjiebredie'],
    ingredient: ['Vleis', 'Mielie', 'Pampoen', 'Rys', 'Botter', 'Melk', 'Eiers', 'Sout', 'Suiker'],
    cuisine: ['Afrikaans', 'Suid-Afrikaans', 'Kaaps-Maleise', 'Tradisioneel'],
    dessert: ['Melktert', 'Koeksisters', 'Malva Poeding', 'Hertzoggies', 'Crunchies'],
    fruit: ['Appel', 'Piesang', 'Lemoen', 'Perske', 'Druiwe'],
    vegetable: ['Tamatie', 'Wortel', 'Kool', 'Aartappel', 'Uie'],
    meat: ['Beesvleis', 'Skaapvleis', 'Varkvleis', 'Hoender', 'Vis'],
    spice: ['Sout', 'Peper', 'Kaneel', 'Borrie', 'Kerrie'],
  },

  animal: {
    dog: ['Hond', 'Boerboel', 'Rhodesian Ridgeback'],
    cat: ['Kat', 'Persiese Kat'],
    bird: ['Voël', 'Arend', 'Duif', 'Mossie'],
    fish: ['Vis', 'Karp', 'Forel'],
    horse: ['Perd', 'Ponie'],
    rabbit: ['Konyn'],
    insect: ['Skoenlapper', 'By', 'Mier', 'Sprinkaan'],
    type: ['Hond', 'Kat', 'Voël', 'Vis', 'Perd'],
  },

  sport: {
    sport: ['Rugby', 'Krieket', 'Sokker', 'Atletiek', 'Swem', 'Tennis'],
    team: ['Springbokke', 'Proteas', 'Bafana Bafana'],
    athlete: ['Springbok Speler', 'Krieket Speler'],
  },

  music: {
    genre: ['Rock', 'Pop', 'Sokkie', 'Boeremusiek', 'Klassiek'],
    artist: ['Musikant', 'Sanger'],
    song: ['Lied', 'Treffer'],
    instrument: ['Klavier', 'Kitaar', 'Viool', 'Konsertina'],
  },

  commerce: {
    product: ['Stoel', 'Tafel', 'Lamp', 'Bank', 'Bed'],
    productAdjective: ['Mooi', 'Groot', 'Klein', 'Nuwe'],
    productMaterial: ['Hout', 'Metaal', 'Plastiek', 'Glas'],
    department: ['Elektronika', 'Klere', 'Huishouding', 'Sport'],
    color: ['Rooi', 'Blou', 'Groen', 'Geel', 'Swart', 'Wit'],
  },

  book: {
    title: ['Die Groot Avontuur', 'Skilpad', 'Kringe in \'n Bos'],
    author: ['Afrikaanse Skrywer'],
    publisher: ['Afrikaanse Uitgewers'],
    genre: ['Fiksie', 'Nie-fiksie', 'Poësie', 'Biografie'],
    series: ['Reeks Een', 'Reeks Twee'],
    review: ['Uitstekende boek', 'Baie goed'],
  },

  vehicle: {
    manufacturer: ['Toyota', 'BMW', 'Volkswagen', 'Mercedes-Benz', 'Ford'],
    model: ['Model A', 'Model B', 'Sedan', 'Bakkie'],
    type: ['Motor', 'Bakkie', 'SUV', 'Motorfiets'],
    fuel: ['Petrol', 'Diesel', 'Elektries'],
    bicycle: ['Fiets', 'Bergfiets'],
  },

  word: {
    adjective: ['goed', 'sleg', 'groot', 'klein', 'mooi', 'lelik'],
    adverb: ['vinnig', 'stadig', 'goed', 'sleg'],
    conjunction: ['en', 'of', 'maar', 'want'],
    interjection: ['ag', 'sjoe', 'haai'],
    noun: ['persoon', 'huis', 'tyd', 'dag', 'jaar'],
    preposition: ['in', 'op', 'onder', 'by', 'met'],
    verb: ['is', 'het', 'gaan', 'kom', 'maak', 'sien'],
  },

  hacker: {
    abbreviation: ['TCP', 'IP', 'HTTP', 'API', 'SQL', 'HTML', 'CSS', 'JS'],
    adjective: ['veilig', 'vinnig', 'betroubaar'],
    noun: ['stelsel', 'protokol', 'databasis'],
    verb: ['programmeer', 'kompileer', 'implementeer'],
    ingverb: ['programmering', 'kompilering'],
    phrase: ['Die stelsel werk', 'Kode is skoon'],
  },

  system: {
    fileName: ['dokument', 'lêer', 'beeld', 'data'],
    fileType: ['teks', 'beeld', 'video', 'oudio'],
  },

  science: {
    chemicalElement: ['Waterstof', 'Suurstof', 'Koolstof', 'Stikstof', 'Yster'],
    unit: ['meter', 'kilogram', 'sekonde', 'liter'],
    constant: ['Spoed van lig', 'Gravitasie'],
    field: ['Fisika', 'Chemie', 'Biologie', 'Wiskunde'],
  },
}
