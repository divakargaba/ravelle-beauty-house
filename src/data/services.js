export const serviceCategories = [
  {
    id: 'waxing',
    name: 'Waxing',
    icon: 'Sparkles',
    description: 'Smooth, flawless skin with expert waxing services delivered to your door.',
    image: '/images/placeholder-waxing.jpg',
  },
  {
    id: 'lashes',
    name: 'Lashes',
    icon: 'Eye',
    description: 'Stunning lash extensions crafted to enhance your natural beauty.',
    image: '/images/placeholder-lashes.jpg',
  },
  {
    id: 'henna',
    name: 'Henna',
    icon: 'Flower2',
    description: 'Intricate henna artistry for every occasion, from bridal to casual.',
    image: '/images/placeholder-henna.jpg',
  },
  {
    id: 'eyebrows',
    name: 'Eyebrows',
    icon: 'Brush',
    description: 'Perfectly shaped brows tailored to complement your unique features.',
    image: '/images/placeholder-eyebrows.jpg',
  },
];

export const waxingServices = {
  individual: [
    { name: 'Brazilian Wax', price: 75 },
    { name: 'Full Legs', price: 70 },
    { name: 'Half Legs', price: 45 },
    { name: 'Underarms', price: 25 },
    { name: 'Arms', price: 45 },
    { name: 'Bikini Line', price: 40 },
    { name: 'Face (Any Area)', price: 20, priceNote: '+' },
  ],
  bundles: [
    { name: 'Brazilian + Full Legs', price: 135, savings: 10 },
    { name: 'Brazilian + Underarms', price: 95, savings: 5 },
    { name: 'Full Legs + Arms', price: 105, savings: 10 },
  ],
  packages: [
    {
      name: 'Smooth Essentials Package',
      description: 'Brazilian + Full Legs + Underarms',
      price: 160,
      savings: 10,
    },
  ],
  specials: [
    {
      name: 'Full Body Wax',
      description: 'Legs, Arms, Underarms, Bikini/Brazilian, Stomach/Back',
      price: 199,
      note: '*',
    },
    {
      name: 'Full Body + Face',
      description: 'Complete full body wax plus face',
      price: 215,
    },
  ],
};

export const lashServices = {
  fullSets: [
    { name: 'Classic Full Set', price: 100, duration: '2 hrs' },
    { name: 'YY Full Set', price: 130, duration: '2 hrs' },
    { name: 'Hybrid Full Set', price: 110, duration: '2 hrs' },
    { name: 'Volume Full Set', price: 130, duration: '2 hrs' },
    { name: 'Wet Full Set', price: 130, duration: '2 hrs' },
    { name: 'Anime Full Set', price: 135, duration: '2 hrs' },
    { name: 'Wet Wispy Full Set', price: 135, duration: '2 hrs' },
    { name: 'Mega Volume Full Set', price: 150, duration: '2 hrs' },
  ],
  fills: [
    { name: 'Classic Fill', price: 70, duration: '1 hr 15 mins' },
    { name: 'YY Fill', price: 85, duration: '1 hr 15 mins' },
    { name: 'Hybrid Fill', price: 75, duration: '1 hr 15 mins' },
    { name: 'Volume Fill', price: 85, duration: '1 hr 15 mins' },
    { name: 'Mega Volume Fill', price: 95, duration: '1 hr 15 mins' },
    { name: 'Anime Fill', price: 90, duration: '1 hr 15 mins' },
    { name: 'Wet Set Fill', price: 80, duration: '1 hr 15 mins' },
  ],
  foreignFills: [
    { name: 'Classic (Foreign Fill)', price: 80, duration: '1 hr 15 mins' },
    { name: 'YY (Foreign Fill)', price: 95, duration: '1 hr 15 mins' },
    { name: 'Hybrid (Foreign Fill)', price: 85, duration: '1 hr 15 mins' },
    { name: 'Volume (Foreign Fill)', price: 95, duration: '1 hr 15 mins' },
    { name: 'Megavolume (Foreign Fill)', price: 105, duration: '1 hr 15 mins' },
    { name: 'Anime (Foreign Fill)', price: 100, duration: '1 hr 15 mins' },
    { name: 'Wet Set (Foreign Fill)', price: 95, duration: '1 hr 15 mins' },
    { name: 'Wispy Wet (Foreign Fill)', price: 100, duration: '1 hr 15 mins' },
  ],
  other: [
    { name: 'Lash Removal + Lash Bath', price: 30, duration: '30 mins' },
  ],
};

export const hennaServices = {
  note: 'Pricing available upon consultation. Contact us for custom henna designs for weddings, parties, and special occasions.',
  services: [],
};

export const eyebrowServices = {
  note: 'Pricing available upon consultation. Contact us for eyebrow shaping, threading, and tinting services.',
  services: [],
};

export const allServicesFlat = [
  // Waxing
  ...waxingServices.individual.map(s => ({ ...s, category: 'waxing' })),
  ...waxingServices.bundles.map(s => ({ ...s, category: 'waxing' })),
  ...waxingServices.packages.map(s => ({ ...s, category: 'waxing' })),
  ...waxingServices.specials.map(s => ({ ...s, category: 'waxing' })),
  // Lashes
  ...lashServices.fullSets.map(s => ({ ...s, category: 'lashes' })),
  ...lashServices.fills.map(s => ({ ...s, category: 'lashes' })),
  ...lashServices.foreignFills.map(s => ({ ...s, category: 'lashes' })),
  ...lashServices.other.map(s => ({ ...s, category: 'lashes' })),
  // Henna
  { name: 'Henna (Consultation Required)', category: 'henna' },
  // Eyebrows
  { name: 'Eyebrows (Consultation Required)', category: 'eyebrows' },
];
