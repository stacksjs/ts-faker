import type { LocaleDefinition } from '@stacksjs/ts-faker'

export const az: LocaleDefinition = {
  title: 'Azerbaijani',

  person: {
    firstNameMale: ['Əli', 'Mahir', 'Elvin', 'Rəşad', 'Orxan', 'Murad', 'Elçin', 'Kamran', 'Turan', 'Sənan', 'Emin', 'Fərid', 'Nicat', 'Vüsal', 'Ramil'],
    firstNameFemale: ['Aysel', 'Günel', 'Lamiyə', 'Nigar', 'Səbinə', 'Leyla', 'Arzu', 'Günay', 'Səma', 'Aida', 'Sevda', 'Könül', 'Nərgiz', 'Zülfiyyə', 'Vəfa'],
    firstNameNeutral: ['Səid', 'Rəvan', 'Aytən', 'Nihal', 'Təhminə'],
    lastName: ['Əliyev', 'Məmmədov', 'Həsənov', 'İsmayılov', 'Quliyev', 'Rəhmanov', 'Əhmədov', 'Məhərrəmov', 'Şükürəliyev', 'Cəfərov', 'Babayev', 'Mustafayev', 'Nəsibov', 'Paşayev'],
    prefix: ['Cənab', 'Xanım', 'Dr.', 'Prof.'],
    suffix: ['Kiçik', 'Böyük'],
    gender: ['Kişi', 'Qadın', 'Digər'],
    jobTitle: ['Proqramçı', 'Mühəndis', 'Müəllim', 'Həkim', 'Hüquqşünas', 'Memar', 'Meneger', 'Tibb bacısı', 'Əczaçı', 'Mühasib'],
  },

  address: {
    street: ['Nizami', 'Azadlıq', 'Atatürk', 'Nəsimi', 'Rəsul Rza', 'Əhmədli', 'Həsən bəy Zərdabi', 'Bakıxanov', 'Mərdanov', 'Cavadxan'],
    city: ['Bakı', 'Gəncə', 'Sumqayıt', 'Mingəçevir', 'Şəki', 'Qəbələ', 'Lənkəran', 'Naxçıvan', 'Quba', 'Şamaxı'],
    state: ['Bakı', 'Gəncə', 'Sumqayıt', 'Abşeron', 'Ağdam', 'Ağstafa', 'Lənkəran', 'Şəki', 'Qəbələ'],
    stateAbbr: ['BA', 'GA', 'SM', 'AB', 'AG', 'AS', 'LA', 'SA', 'QB'],
    country: ['Azərbaycan', 'Türkiyə', 'Gürcüstan', 'Rusiya', 'İran'],
    countryCode: ['AZ', 'TR', 'GE', 'RU', 'IR'],
    zipCode: ['AZ ####'],
    buildingNumber: ['###', '##', '#'],
    direction: ['Şimal', 'Cənub', 'Şərq', 'Qərb'],
    streetSuffix: ['küçəsi', 'prospekti', 'döngəsi', 'meydanı'],
  },

  company: {
    name: ['Azərbaycan Şirkəti', 'Bakı Qrupu', 'Xəzər Korporasiyası', 'Qafqaz Holdinq', 'Mil Ticarət'],
    suffix: ['MMC', 'ASC', 'QSC', 'Şirkəti'],
    industry: ['Texnologiya', 'Təhsil', 'Səhiyyə', 'Ticarət', 'Nəqliyyat', 'Neft və Qaz', 'Turizm'],
    buzzwords: ['optimallaşdırmaq', 'transformasiya', 'innovasiya', 'rəqəmsallaşdırma'],
    adjective: ['yeni', 'ağıllı', 'effektiv', 'müasir'],
    descriptor: ['qlobal', 'rəqəmsal', 'dayanıqlı'],
    noun: ['həll', 'platforma', 'sistem', 'xidmət'],
  },

  internet: {
    domainSuffix: ['az', 'com.az', 'net.az', 'org.az', 'edu.az'],
    freeEmail: ['gmail.com', 'mail.ru', 'yandex.az', 'azeri.az'],
  },

  phone: {
    formats: ['(0##) ### ## ##', '+994 ## ### ## ##', '0## ### ## ##'],
  },

  food: {
    dish: ['Plov', 'Dolma', 'Qutab', 'Lülə Kabab', 'Piti', 'Düşbərə', 'Şəkərbura', 'Badımcan Dolması', 'Lavangi', 'Çığırtma'],
    ingredient: ['Düyü', 'Ət', 'Soğan', 'Yağ', 'Duz', 'İstiot', 'Zəfəran', 'Alma', 'Badımcan'],
    cuisine: ['Azərbaycan', 'Türk', 'Qafqaz', 'Şərq'],
    dessert: ['Şəkərbura', 'Paxlava', 'Badambura', 'Şor Qoğal', 'Firni'],
    fruit: ['Alma', 'Armud', 'Üzüm', 'Nar', 'Alça'],
    vegetable: ['Pomidor', 'Badımcan', 'Bibər', 'Kartof', 'Soğan'],
    meat: ['Mal əti', 'Qoyun əti', 'Toyuq əti', 'Balıq'],
    spice: ['Duz', 'İstiot', 'Zəfəran', 'Kəklikotu', 'Darçın'],
  },

  animal: {
    dog: ['İt', 'Çoban İti', 'Qafqaz İti'],
    cat: ['Pişik', 'Fars Pişiyi'],
    bird: ['Quş', 'Qartal', 'Göyərçin', 'Sərçə'],
    fish: ['Balıq', 'Kəpər', 'Qızılbalıq'],
    horse: ['At', 'Qarabağ Atı'],
    rabbit: ['Dovşan'],
    insect: ['Kəpənək', 'Arı', 'Qarışqa'],
    type: ['İt', 'Pişik', 'Quş', 'Balıq', 'At'],
  },

  sport: {
    sport: ['Futbol', 'Basketbol', 'Güləş', 'Şahmat', 'Üzgüçülük', 'Voleybol'],
    team: ['Qarabağ', 'Neftçi', 'Milli Komanda'],
    athlete: ['İdmançı', 'Futbolçu'],
  },

  music: {
    genre: ['Muğam', 'Pop', 'Rock', 'Xalq', 'Klassik'],
    artist: ['Musiqiçi', 'Müğənni'],
    song: ['Mahnı', 'Muğam'],
    instrument: ['Tar', 'Kamança', 'Ud', 'Balaban', 'Qaval'],
  },

  commerce: {
    product: ['Stul', 'Masa', 'Lampa', 'Divan', 'Çarpayı'],
    productAdjective: ['Gözəl', 'Böyük', 'Kiçik', 'Yeni'],
    productMaterial: ['Ağac', 'Metal', 'Plastik', 'Şüşə'],
    department: ['Elektronika', 'Geyim', 'Ev əşyaları', 'İdman'],
    color: ['Qırmızı', 'Mavi', 'Yaşıl', 'Sarı', 'Qara', 'Ağ'],
  },

  book: {
    title: ['Kitabi-Dədə Qorqud', 'Koroğlu', 'Leyli və Məcnun'],
    author: ['Azərbaycan Yazıçısı'],
    publisher: ['Azərbaycan Nəşriyyatı'],
    genre: ['Bədii', 'Elmi', 'Poeziya', 'Tarix'],
    series: ['Seriya Bir', 'Seriya İki'],
    review: ['Əla kitab', 'Çox yaxşı'],
  },

  vehicle: {
    manufacturer: ['Mercedes-Benz', 'BMW', 'Toyota', 'Hyundai', 'Lada'],
    model: ['Model A', 'Model B', 'Sedan', 'SUV'],
    type: ['Avtomobil', 'Yük Maşını', 'SUV', 'Motosiklet'],
    fuel: ['Benzin', 'Dizel', 'Elektrik'],
    bicycle: ['Velosiped', 'Dağ Velosipedi'],
  },

  word: {
    adjective: ['yaxşı', 'pis', 'böyük', 'kiçik', 'gözəl'],
    adverb: ['tez', 'yavaş', 'yaxşı', 'pis'],
    conjunction: ['və', 'və ya', 'amma', 'çünki'],
    interjection: ['ah', 'oh', 'vay'],
    noun: ['insan', 'ev', 'vaxt', 'gün', 'il'],
    preposition: ['də', 'üzərində', 'altında', 'yanında'],
    verb: ['olmaq', 'etmək', 'getmək', 'gəlmək', 'görmək'],
  },

  hacker: {
    abbreviation: ['TCP', 'IP', 'HTTP', 'API', 'SQL', 'HTML', 'CSS', 'JS'],
    adjective: ['təhlükəsiz', 'sürətli', 'etibarlı'],
    noun: ['sistem', 'protokol', 'verilənlər bazası'],
    verb: ['proqramlaşdırmaq', 'kompilyasiya', 'tətbiq'],
    ingverb: ['proqramlaşdırma', 'kompilyasiya'],
    phrase: ['Sistem işləyir', 'Kod təmizdir'],
  },

  system: {
    fileName: ['sənəd', 'fayl', 'şəkil', 'məlumat'],
    fileType: ['mətn', 'şəkil', 'video', 'audio'],
  },

  science: {
    chemicalElement: ['Hidrogen', 'Oksigen', 'Karbon', 'Azot', 'Dəmir'],
    unit: ['metr', 'kiloqram', 'saniyə', 'litr'],
    constant: ['İşıq sürəti', 'Cazibə qüvvəsi'],
    field: ['Fizika', 'Kimya', 'Biologiya', 'Riyaziyyat'],
  },
}
