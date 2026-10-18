// ══════════════════════════════════════
//  NAVEED & ARFA — WEDDING DATA
//  Host Family: Mr & Mrs Haji Abdul Waheed
//  City: Mian Channu
// ══════════════════════════════════════

export const couple = {
  groom: 'Naveed',
  bride: 'Arfa',
  groomFull: 'Muhammad Naveed',
  brideFull: 'Arfa',
  hashtag: '#NaveedWedsArfa',
  weddingDate: '2026-12-31',
  logo: '/logo.svg',

  // Host family info (from invitation card)
  groomParents: 'Mr & Mrs Haji Abdul Waheed',
  brideParents: 'Mr & Mrs Dr Sohail Munim',
  hostedBy: 'Mr & Mrs Haji Abdul Waheed',
  city: 'Mian Channu',
  // Grandparents (زیرِ سایۂ عاطفت)
  grandparents: [
    'MR & Mrs Ch. Lal Din Tabassum (Late)',
    'MR & Mrs Haji Nazir',
  ],
  grandparentsTitle: 'Under the Loving Guidance & Auspicious Blessings of Grandparents',
  grandparentsTitleUrdu: 'زیرِ سایۂ عاطفت — بزرگاںِ گرامی',

  rsvpEmail: 'naveedchishti1997@gmail.com',

  // Optional EmailJS settings (if using EmailJS service)
  emailjs: {
    serviceId: '',   // e.g. 'service_abc123xyz'
    templateId: '',  // e.g. 'template_xxxxxxx'
    publicKey: '',   // e.g. 'your_public_key'
  },

  // Contact numbers for enquiries & WhatsApp RSVP
  contacts: [
    { label: 'Haji Abdul Waheed', phone: '+92 301 7601725', raw: '923017601725', isPrimary: true },
    { label: 'Dr. Umar Waheed', phone: '+92 331 6250000', raw: '923316250000' },
  ],

  // Family & Relatives Looking Forward (چشمِ براہ)
  family: {
    hostedBy: 'Mr & Mrs Haji Abdul Waheed',
    lookingForwardTitle: 'With Best Compliments & Looking Forward',
    lookingForwardTitleUrdu: 'چشمِ براہ — منتظرینِ کرم',
    lookingForward: [
      'Mr & Mrs Junaid Waheed',
      'Mr & Mrs Dr. Umar Waheed',
      'Mr & Mrs Yasir Mehmood',
      'Mr & Mrs Bilal Rasheed',
    ],
    childrenTitle: 'Our Little Welcomers (Little Angels)',
    childrenTitleUrdu: 'نورِ نظر — ننھے منتظرین',
    children: [
      'Muhammad Abu Bakar',
      'Muhammad Azlan',
      'Muhammad Affan',
      'Arwa Umar',
      'Amal Umar',
      'Rahima Yasir',
      'Usman Yasir',
      'Hareem Fatima',
      'Haider Ali',
      'Muhammad Usman',
      'Muhammad Hassan',
      'Muhammad Ans',
    ],
  },
};

// Mian Channu, Punjab, Pakistan base coordinates
const MIAN_CHANNU_EMBED = (query) =>
  `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54913.6!2d72.3520!3d30.4453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393b575f94b8b79d%3A0xabcdef123456!2s${encodeURIComponent(query)}!5e0!3m2!1sen!2spk!4v1699999999990!5m2!1sen!2spk`;

export const events = [
  {
    id: 'mehndi',
    name: 'Mehndi',
    urdu: 'مہندی',
    tagline: 'An Evening Painted in Colour & Love',
    taglineUrdu: 'رنگوں اور محبت کی شام',

    // ── From the invitation card ──
    date: 'Thursday, 31st December 2026',
    dayName: 'Thursday',
    dayShort: 'On Thursday',
    dateNum: '31st',
    month: 'December 2026',
    time: '07:00 PM',
    isoDate: '2026-12-31T19:00:00',

    // Programme (from card)
    programme: [
      { label: 'Mehndi', time: '07:00 PM' },
    ],

    venue: {
      name: 'Wyne Marriage Hall',
      hall: 'Mehndi Hall',
      address: 'Molvi Hadyatullah Road, Mian Channu',
      addressLine2: 'Mian Channu, Punjab, Pakistan',
      city: 'Mian Channu',
      googleMapsUrl: 'https://maps.google.com/?q=Mian+Channu+Punjab+Pakistan',
      embedUrl: MIAN_CHANNU_EMBED('Wyne Marriage Hall, Molvi Hadyatullah Road, Mian Channu'),
    },

    description: `Mr & Mrs Haji Abdul Waheed request the pleasure of your company at the Mehndi Ceremony of their beloved son Naveed. Join us for a magical evening where the fragrance of fresh flowers mingles with the earthy sweetness of henna, dhol beats fill the air, and joyful traditions come alive. Our family gathers in this vibrant celebration to shower Naveed with prayers, ubtan, and auspicious blessings, surrounded by song, laughter, and the warmth of those we hold dearest.`,

    descriptionUrdu: `آپ کو پرخلوص دعوت دی جاتی ہے کہ آپ ہمارے لختِ جگر نوید کی پُرمسرت رسمِ مہندی میں شرکت فرما کر ہماری خوشیوں کو دوبالا کریں اور دلہے کو اپنی دعاؤں سے نوازیں۔`,

    schedule: [
      { time: '07:00 PM', event: 'Mehndi Ceremony Begins' },
      { time: '07:30 PM', event: 'Dhol & Geet — Musical Celebration' },
      { time: '08:30 PM', event: 'Grand Dinner Buffet' },
      { time: '09:30 PM', event: 'Dholki Night & Dance' },
      { time: '11:00 PM', event: 'Evening Concludes' },
    ],

    dressCode: {
      ladies: 'Vibrant Mehndi Colours — Yellows, Greens & Oranges. Gharara, Sharara or Anarkali preferred.',
      gents: 'Traditional Kurta Shalwar — Mustard, Olive or Ivory tones.',
    },

    theme: {
      bg: '#061a0f',
      dark: '#031008',
      mid: '#0e3820',
      accent: '#f59e0b',
      accent2: '#fbbf24',
      secondary: '#10b981',
      accentRgb: '245, 158, 11',
      text: '#f0fdf4',
      gradient: 'linear-gradient(135deg, #031008 0%, #061f12 35%, #0b341f 70%, #04140b 100%)',
      lightGradient: 'linear-gradient(135deg, #f7faf7 0%, #edf5ee 40%, #e2efe4 75%, #f7faf7 100%)',
      radialGradient: 'radial-gradient(ellipse 90% 70% at 50% 0%, rgba(16, 185, 129, 0.18) 0%, rgba(245, 158, 11, 0.1) 40%, transparent 75%)',
      cardBg: 'rgba(11, 46, 26, 0.52)',
      lightCardBg: 'rgba(255, 255, 255, 0.9)',
      navBg: 'rgba(4, 18, 10, 0.95)',
      badgeBg: 'rgba(245, 158, 11, 0.14)',
      border: 'rgba(245, 158, 11, 0.32)',
      glow: 'rgba(245, 158, 11, 0.25)',
      btnGradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #d97706 100%)',
      btnText: '#1b1002',
      taglineBadge: 'Henna & Rhythms of Joy',
    },

    petals: ['🌿', '🌼', '🍃', '🏵️', '💛', '🌸'],
    emoji: '🌿',
    icon: '🪷',
    navIcon: '🌿',
  },

  {
    id: 'barat',
    name: 'Barat',
    urdu: 'بارات',
    tagline: 'The Royal Procession — A Sacred Union',
    taglineUrdu: 'مقدس اتحاد کا شاندار جشن',

    // ── From the invitation card ──
    date: 'Friday, 1st January 2027',
    dayName: 'Friday',
    dayShort: 'On Friday',
    dateNum: '1st',
    month: 'January 2027',
    time: 'Sehra Bandi: 11:00 AM · Lunch: 03:00 PM · Rukhsati: 05:00 PM',
    isoDate: '2027-01-01T11:00:00',

    // Programme (from card)
    programme: [
      { label: 'Sehra Bandi', time: '11:00 AM', icon: '🎩' },
      { label: 'Departure', time: '12:30 PM', icon: '🐎' },
      { label: 'Arrival Burewala', time: '02:00 PM', icon: '🏛️' },
      { label: 'Nikkah', time: '02:30 PM', icon: '💍' },
      { label: 'Royal Lunch', time: '03:00 PM', icon: '🍽️' },
      { label: 'Rukhsati', time: '05:00 PM', icon: '✨' },
    ],

    venue: {
      name: 'Grand Barat Hall',
      hall: 'Barat & Nikkah Hall',
      address: 'Burewala, Punjab, Pakistan',
      addressLine2: 'District Vehari, Punjab, Pakistan',
      city: 'Burewala',
      googleMapsUrl: 'https://maps.google.com/?q=Burewala+Punjab+Pakistan',
      embedUrl: 'https://www.google.com/maps?q=Burewala+Punjab+Pakistan&output=embed',
    },

    description: `Mr & Mrs Haji Abdul Waheed request the pleasure of your company at the Barat Ceremony of their beloved son Naveed weds Arfa. With hearts full of gratitude and joy, we invite you to witness the sacred Nikkah and grand Barat in Burewala. The groom's procession will depart from Mian Channu and arrive with the thundering of dhols and the glow of a thousand lights, as two souls are joined in the holy bond of matrimony. The afternoon will be adorned with the recitation of Quran, the exchange of vows, joyful traditional rasams, and a grand royal lunch that will remain etched in your memories forever.`,

    descriptionUrdu: `آپ کو پُرتپاک دعوت دی جاتی ہے کہ ہمارے پیارے بیٹے نوید کے ہمراہ عرفہ کے نکاح و بارات کی بوریوالا میں منعقدہ مقدس تقریب میں شرکت فرما کر اس مبارک گھڑی کو یادگار بنائیں۔`,

    schedule: [
      { time: '11:00 AM', event: "Sehra Bandi — Groom's Ceremony (Mian Channu)" },
      { time: '12:30 PM', event: 'Baraat Departure Procession to Burewala' },
      { time: '02:00 PM', event: 'Baraat Arrives at Venue & Warm Welcome (Burewala)' },
      { time: '02:30 PM', event: 'Sacred Nikkah Ceremony & Ijab-o-Qubool' },
      { time: '03:00 PM', event: 'Royal Wedding Lunch Buffet' },
      { time: '03:45 PM', event: 'Traditional Rasam — Doodh Pilai' },
      { time: '04:15 PM', event: 'Family Portraits & Blessings (Duas)' },
      { time: '05:00 PM', event: "Rukhsati — Bride's Emotional Farewell" },
    ],

    dressCode: {
      ladies: 'Bridal Crimson & Ruby Red — Formal Lehengas, Ghararas or Maxis adorned with regal gold and zardozi embroidery.',
      gents: 'Royal Jet Black Sherwani, Black Prince Coat or Formal Black Tuxedo.',
    },

    theme: {
      bg: '#0c0205',
      dark: '#050102',
      mid: '#1c0308',
      accent: '#f5c563',
      accent2: '#ff4d6d',
      secondary: '#dc2626',
      accentRgb: '245, 197, 99',
      text: '#fff1f2',
      gradient: 'linear-gradient(135deg, #070103 0%, #170308 35%, #2a050f 70%, #0a0104 100%)',
      lightGradient: 'linear-gradient(135deg, #fdf7f8 0%, #fbeff1 40%, #f7e2e6 75%, #fdf7f8 100%)',
      radialGradient: 'radial-gradient(ellipse 90% 70% at 50% 0%, rgba(220, 38, 38, 0.28) 0%, rgba(245, 197, 99, 0.15) 40%, transparent 75%)',
      cardBg: 'rgba(38, 5, 13, 0.58)',
      lightCardBg: 'rgba(255, 255, 255, 0.9)',
      navBg: 'rgba(10, 2, 5, 0.96)',
      badgeBg: 'rgba(220, 38, 38, 0.2)',
      border: 'rgba(245, 197, 99, 0.35)',
      glow: 'rgba(220, 38, 38, 0.32)',
      btnGradient: 'linear-gradient(135deg, #f5c563 0%, #e11d48 50%, #b91c1c 100%)',
      btnText: '#ffffff',
      taglineBadge: 'Bridal Crimson & Jet Black Majesty',
    },

    petals: ['🌹', '🖤', '✨', '👑', '🥀', '💍', '❤️'],
    emoji: '🐎',
    icon: '💍',
    navIcon: '🐎',
  },

  {
    id: 'walima',
    name: 'Walima',
    urdu: 'ولیمہ',
    tagline: 'A Feast of Gratitude & New Beginnings',
    taglineUrdu: 'شکرگزاری اور نئی شروعات کا جشن',

    // ── From the invitation card ──
    date: 'Saturday, 2nd January 2027',
    dayName: 'Saturday',
    dayShort: 'On Saturday',
    dateNum: '2nd',
    month: 'January 2027',
    time: 'Reception: 1:00 PM · Lunch: 4:00 PM',
    isoDate: '2027-01-02T13:00:00',

    // Programme (from card)
    programme: [
      { label: 'Reception', time: '1:00 PM', icon: '🥂' },
      { label: 'Lunch', time: '4:00 PM', icon: '🍽️' },
    ],

    venue: {
      name: 'Mughal-e-Azam Marriage Hall',
      hall: 'Walima Banquet Hall',
      address: 'G.T. Road, Mian Channu',
      addressLine2: 'Mian Channu, Punjab, Pakistan',
      city: 'Mian Channu',
      googleMapsUrl: 'https://maps.google.com/?q=Mughal+e+Azam+Marriage+Hall+GT+Road+Mian+Channu',
      embedUrl: MIAN_CHANNU_EMBED('Mughal e Azam Marriage Hall, GT Road, Mian Channu'),
    },

    description: `Mr & Mrs Haji Abdul Waheed request the pleasure of your company at the Walima Ceremony of their beloved son Naveed weds Arfa. We joyfully invite you to join us for the Walima — a blessed gathering to celebrate the new beginning of their journey together as husband and wife. The Walima is a Sunnah of the Prophet (PBUH), a feast of gratitude and sharing. Come, break bread with us, shower the newlyweds with your duas and blessings, and let us together celebrate this most beautiful chapter of love, faith, and family.`,

    descriptionUrdu: `آپ کو ولیمے کی پُرمسرت دعوت ہے۔ نوید اور ان کی اہلیہ عرفہ کی خوشیوں میں شریک ہو کر نوبیاہتا جوڑے کو اپنی نیک تمناؤں اور دعاؤں سے نوازیں۔`,

    schedule: [
      { time: '01:00 PM', event: 'Reception of Guests & Welcome Drinks' },
      { time: '02:30 PM', event: 'Grand Entrance of the Newlyweds' },
      { time: '03:15 PM', event: 'Stage Photography & Family Greetings' },
      { time: '04:00 PM', event: 'Royal Walima Lunch Buffet' },
    ],

    dressCode: {
      ladies: 'Pastel Sage Green, Mint Silver & Dusty Pistachio — Delicate silver zardozi, pearls & crystals (Lehenga, Maxi or Gown).',
      gents: 'Matching Sage/Pistachio Sherwani, Prince Coat or Sophisticated Silver-Sage Suit.',
    },

    theme: {
      bg: '#08140f',
      dark: '#040b08',
      mid: '#0f241b',
      accent: '#9dd4b3',
      accent2: '#d8ebe0',
      secondary: '#609a77',
      accentRgb: '157, 212, 179',
      text: '#f0fdf4',
      gradient: 'linear-gradient(135deg, #040c08 0%, #0b1f16 35%, #143425 70%, #06110c 100%)',
      lightGradient: 'linear-gradient(135deg, #f6faf8 0%, #ebf4f0 40%, #dcebe3 75%, #f6faf8 100%)',
      radialGradient: 'radial-gradient(ellipse 90% 70% at 50% 0%, rgba(157, 212, 179, 0.24) 0%, rgba(216, 235, 224, 0.15) 40%, transparent 75%)',
      cardBg: 'rgba(15, 38, 28, 0.58)',
      lightCardBg: 'rgba(255, 255, 255, 0.9)',
      navBg: 'rgba(6, 17, 12, 0.96)',
      badgeBg: 'rgba(157, 212, 179, 0.16)',
      border: 'rgba(157, 212, 179, 0.35)',
      glow: 'rgba(157, 212, 179, 0.28)',
      btnGradient: 'linear-gradient(135deg, #8ec7a5 0%, #c4e6d3 50%, #68a381 100%)',
      btnText: '#04170e',
      taglineBadge: 'Pastel Sage Green & Silver Shimmer',
    },

    petals: ['🌿', '✨', '🤍', '🪷', '💎', '🌸', '🕊️'],
    emoji: '🌿',
    icon: '✨',
    navIcon: '🌿',
  },
];

export const getEvent = (id) => events.find(e => e.id === id);
