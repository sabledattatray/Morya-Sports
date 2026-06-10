export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  ageGroup: string;
  brand: string;
  images: string[];
  videoUrl?: string;
  inStock: boolean;
  stockCount: number;
  description: string;
  specifications: Record<string, string>;
  isNew?: boolean;
  isBestSeller?: boolean;
  isTrending?: boolean;
  isOffer?: boolean;
  deliveryDays: number;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
  response?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
  author: string;
}

export const CATEGORIES = [
  { id: 'cricket', name: 'Cricket', slug: 'cricket', image: '🏏', count: 18, desc: 'Cricket bats, balls, pads, gloves, helmets, kits & accessories.' },
  { id: 'football', name: 'Football', slug: 'football', image: '⚽', count: 14, desc: 'Footballs, shin guards, boots, goalkeeper gloves & training gear.' },
  { id: 'badminton', name: 'Badminton', slug: 'badminton', image: '🏸', count: 12, desc: 'Rackets, shuttlecocks, grips, bags & badminton accessories.' },
  { id: 'jerseys-sportswear', name: 'Jerseys & Sportswear', slug: 'jerseys-sportswear', image: '👕', count: 20, desc: 'Custom printed jerseys, track suits, sports shorts & team uniforms.' },
  { id: 'kabaddi-wrestling', name: 'Kabaddi & Wrestling', slug: 'kabaddi-wrestling', image: '🤼', count: 8, desc: 'Kabaddi costumes, wrestling gear, mats & traditional sports equipment.' },
  { id: 'athletics-running', name: 'Athletics & Running', slug: 'athletics-running', image: '🏃', count: 10, desc: 'Running shoes, track spikes, relay batons, stopwatches & training cones.' },
  { id: 'trophies-medals', name: 'Trophies & Medals', slug: 'trophies-medals', image: '🏆', count: 15, desc: 'Custom trophies, gold/silver medals, shields & award plaques for events.' },
  { id: 'gym-fitness', name: 'Gym & Fitness', slug: 'gym-fitness', image: '🏋️', count: 12, desc: 'Dumbbells, skipping ropes, resistance bands, gym gloves & fitness accessories.' },
  { id: 'outdoor-sports', name: 'Outdoor Sports', slug: 'outdoor-sports', image: '🎽', count: 10, desc: 'Volleyball, basketball, throwball, handball & outdoor recreational gear.' },
  { id: 'school-sports', name: 'School Sports Kits', slug: 'school-sports', image: '🎒', count: 16, desc: 'Complete school sports kits, PT uniforms & inter-school tournament supplies.' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'SS Ton Reserve Edition Cricket Bat',
    category: 'Cricket',
    price: 3499,
    originalPrice: 4299,
    rating: 4.8,
    reviewsCount: 34,
    ageGroup: 'Adults',
    brand: 'SS Ton',
    images: [
      'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1593766788306-28561086694e?auto=format&fit=crop&w=600&q=80',
    ],
    inStock: true,
    stockCount: 15,
    description: 'Premium English willow cricket bat with a thick edge, full spine profile and fine grain pressing. Ideal for hard-ball cricket on turf wickets. Comes with a grip and stickers.',
    specifications: {
      'Willow': 'Grade 1 English Willow',
      'Weight': '1.2 – 1.3 kg',
      'Handle': 'Round cane handle with rubber grip',
      'Recommended': 'Senior Hard Ball Cricket',
    },
    isNew: true,
    isBestSeller: true,
    deliveryDays: 1,
  },
  {
    id: 'prod-2',
    name: 'Nivia Storm Football (Size 5)',
    category: 'Football',
    price: 699,
    originalPrice: 899,
    rating: 4.6,
    reviewsCount: 56,
    ageGroup: 'All Ages',
    brand: 'Nivia',
    images: [
      'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=600&q=80',
    ],
    inStock: true,
    stockCount: 30,
    description: 'Nivia Storm machine-stitched football with butyl rubber bladder for superior air retention. Durable PVC outer for all-weather play. FIFA-approved size 5.',
    specifications: {
      'Size': 'Size 5 (Senior)',
      'Material': 'PVC outer, Butyl bladder',
      'Panels': '32 panel design',
      'Surface': 'Grass & artificial turf',
    },
    isBestSeller: true,
    isTrending: true,
    deliveryDays: 1,
  },
  {
    id: 'prod-3',
    name: 'Yonex GR 303i Badminton Racket',
    category: 'Badminton',
    price: 799,
    originalPrice: 999,
    rating: 4.7,
    reviewsCount: 88,
    ageGroup: 'All Ages',
    brand: 'Yonex',
    images: [
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=600&q=80',
    ],
    inStock: true,
    stockCount: 40,
    description: 'Yonex GR 303i lightweight aluminum badminton racket with full cover. Pre-strung with Yonex BG string. Great for beginners and intermediate players.',
    specifications: {
      'Frame': 'Aluminium',
      'Shaft': 'Steel shaft',
      'Weight': '85g (approx.)',
      'String Tension': 'Pre-strung',
    },
    isTrending: true,
    deliveryDays: 1,
  },
  {
    id: 'prod-4',
    name: 'Custom Printed Sports Jersey (Team Order)',
    category: 'Jerseys & Sportswear',
    price: 499,
    originalPrice: 649,
    rating: 4.9,
    reviewsCount: 112,
    ageGroup: 'All Ages',
    brand: 'Morya Sports',
    images: [
      'https://images.unsplash.com/photo-1580087256394-dc596e1c8f4f?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=600&q=80',
    ],
    inStock: true,
    stockCount: 200,
    description: 'Custom team jerseys with your club name, number, and logo printed using high-quality sublimation printing. Available in cricket, football, kabaddi and athletics cuts. Minimum order 10 pcs.',
    specifications: {
      'Fabric': 'Polyester Dry-Fit',
      'Printing': 'Sublimation / Screen Print',
      'Minimum Order': '10 jerseys per design',
      'Delivery': '5–7 working days',
    },
    isNew: true,
    isBestSeller: true,
    deliveryDays: 5,
  },
  {
    id: 'prod-5',
    name: 'SG Batting Pads (Adult)',
    category: 'Cricket',
    price: 1299,
    originalPrice: 1699,
    rating: 4.7,
    reviewsCount: 43,
    ageGroup: 'Adults',
    brand: 'SG',
    images: [
      'https://images.unsplash.com/photo-1593766788306-28561086694e?auto=format&fit=crop&w=600&q=80',
    ],
    inStock: true,
    stockCount: 20,
    description: 'SG adult batting leg pads with high-density foam protection, flexible knee roll, and secure velcro strapping. Lightweight and durable for hard-ball cricket.',
    specifications: {
      'Size': 'Adult (one size fits most)',
      'Material': 'PVC outer with high-density foam',
      'Straps': '3 velcro straps',
      'Weight': '0.9 kg per pair',
    },
    isBestSeller: true,
    deliveryDays: 1,
  },
  {
    id: 'prod-6',
    name: 'Champion Gold Medal (Pack of 10)',
    category: 'Trophies & Medals',
    price: 599,
    originalPrice: 799,
    rating: 4.8,
    reviewsCount: 67,
    ageGroup: 'All Ages',
    brand: 'Morya Sports',
    images: [
      'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=600&q=80',
    ],
    inStock: true,
    stockCount: 100,
    description: 'Premium zinc-alloy gold medals with ribbon. Ideal for school sports days, inter-college tournaments, marathons and annual athletic meets. Custom engraving available.',
    specifications: {
      'Pack Size': '10 medals',
      'Material': 'Zinc alloy with gold plating',
      'Ribbon': 'Tricolor / Custom ribbon',
      'Engraving': 'Available on request',
    },
    isBestSeller: true,
    isTrending: true,
    deliveryDays: 2,
  },
  {
    id: 'prod-7',
    name: 'Grand Championship Trophy (45cm)',
    category: 'Trophies & Medals',
    price: 899,
    originalPrice: 1199,
    rating: 4.9,
    reviewsCount: 38,
    ageGroup: 'All Ages',
    brand: 'Morya Sports',
    images: [
      'https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?auto=format&fit=crop&w=600&q=80',
    ],
    inStock: true,
    stockCount: 25,
    description: 'Impressive 45cm championship trophy with gold-silver finish. Heavy marble base with engraving plate. Perfect for cricket, football, kabaddi and school annual sports prize distribution.',
    specifications: {
      'Height': '45 cm',
      'Base': 'Marble base',
      'Finish': 'Gold & Silver',
      'Engraving': 'Included (name + event + year)',
    },
    isBestSeller: true,
    deliveryDays: 2,
  },
  {
    id: 'prod-8',
    name: 'Kabaddi Costume Set (Team Kit)',
    category: 'Kabaddi & Wrestling',
    price: 349,
    originalPrice: 449,
    rating: 4.6,
    reviewsCount: 29,
    ageGroup: 'All Ages',
    brand: 'Morya Sports',
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80',
    ],
    inStock: true,
    stockCount: 50,
    description: 'Professional kabaddi shorts and vest set made from high-stretch polyester. Available in multiple colors. Quick-dry and lightweight for maximum mobility on the kabaddi mat.',
    specifications: {
      'Material': 'High-stretch Polyester',
      'Fit': 'Athletic fit',
      'Colors': 'Multiple available',
      'Sizes': 'S, M, L, XL, XXL',
    },
    isTrending: true,
    deliveryDays: 2,
  },
  {
    id: 'prod-9',
    name: 'Cosco Champion Volleyball',
    category: 'Outdoor Sports',
    price: 549,
    originalPrice: 699,
    rating: 4.5,
    reviewsCount: 33,
    ageGroup: 'All Ages',
    brand: 'Cosco',
    images: [
      'https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=600&q=80',
    ],
    inStock: true,
    stockCount: 20,
    description: 'Cosco Champion volleyball with 18-panel construction, butyl rubber bladder and waterproof PU outer. Approved for indoor and outdoor matches.',
    specifications: {
      'Panels': '18 panels',
      'Circumference': '65–67 cm',
      'Bladder': 'Butyl rubber',
      'Weight': '260–280g',
    },
    isOffer: true,
    deliveryDays: 1,
  },
  {
    id: 'prod-10',
    name: 'School Sports Kit (Complete Set)',
    category: 'School Sports Kits',
    price: 1999,
    originalPrice: 2599,
    rating: 4.8,
    reviewsCount: 51,
    ageGroup: 'Children',
    brand: 'Morya Sports',
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80',
    ],
    inStock: true,
    stockCount: 30,
    description: 'A complete school sports kit — includes PT uniform, sports shoes bag, cricket/football/badminton choice of one item, and a water bottle. Ideal for annual school sports days & inter-school competitions.',
    specifications: {
      'Kit Includes': 'PT Uniform, Bag, Sport Item (choice), Bottle',
      'Sizes': 'Age 6–16 years',
      'Customization': 'School name printing available',
      'Min Order': '20 sets for school bulk pricing',
    },
    isOffer: true,
    deliveryDays: 3,
  },
  {
    id: 'prod-11',
    name: 'Track Suit (Full Set – Dry Fit)',
    category: 'Athletics & Running',
    price: 899,
    originalPrice: 1199,
    rating: 4.7,
    reviewsCount: 45,
    ageGroup: 'All Ages',
    brand: 'Morya Sports',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
    ],
    inStock: true,
    stockCount: 35,
    description: 'Full track suit with jacket and pants in quick-dry polyester fabric. Ideal for morning running, athletics training and school PT. Available in team bulk with custom printing.',
    specifications: {
      'Fabric': 'Polyester Dry-Fit',
      'Set': 'Jacket + Pants',
      'Sizes': 'S, M, L, XL, XXL',
      'Colors': 'Navy, Black, Royal Blue, Red',
    },
    isBestSeller: true,
    deliveryDays: 2,
  },
  {
    id: 'prod-12',
    name: 'Cricket Helmet (Adult – Steel Grill)',
    category: 'Cricket',
    price: 1499,
    originalPrice: 1899,
    rating: 4.8,
    reviewsCount: 27,
    ageGroup: 'Adults',
    brand: 'SG',
    images: [
      'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=600&q=80',
    ],
    inStock: true,
    stockCount: 18,
    description: 'SG adult cricket helmet with stainless steel grille, adjustable rear strap, and high-density foam inner padding. Protects temples, forehead, and face from fast-ball impact.',
    specifications: {
      'Size': 'Adult (55–60cm)',
      'Grille': 'Stainless steel',
      'Foam': 'High-density shock-absorbing foam',
      'Standard': 'BIS Certified',
    },
    isNew: true,
    deliveryDays: 1,
  },
  {
    id: 'prod-gym-1',
    name: 'Skipping Rope (Steel Wire, Adjustable)',
    category: 'Gym & Fitness',
    price: 199,
    originalPrice: 249,
    rating: 4.5,
    reviewsCount: 62,
    ageGroup: 'All Ages',
    brand: 'Nivia',
    images: [
      'https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=600&q=80',
    ],
    inStock: true,
    stockCount: 80,
    description: 'Nivia speed skipping rope with steel wire cable and ball-bearing handles for smooth, fast rotation. Adjustable length up to 9 feet. Great for boxing conditioning and fitness training.',
    specifications: {
      'Cable': 'Coated steel wire',
      'Handles': 'Foam grip with ball bearings',
      'Adjustable': 'Up to 9 feet',
      'Best For': 'Speed training, fitness, boxing',
    },
    isTrending: true,
    deliveryDays: 1,
  },
  {
    id: 'prod-gym-2',
    name: 'Rubber Dumbbell Set (5kg x 2)',
    category: 'Gym & Fitness',
    price: 999,
    originalPrice: 1299,
    rating: 4.6,
    reviewsCount: 38,
    ageGroup: 'Adults',
    brand: 'Cosco',
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80',
    ],
    inStock: true,
    stockCount: 15,
    description: 'Pair of 5kg rubber-coated hex dumbbells with chrome handles. Non-slip and floor-friendly rubber coating. Ideal for home gym workouts, strength training and rehabilitation.',
    specifications: {
      'Weight': '5kg × 2 (10kg total)',
      'Coating': 'Rubber hex coating',
      'Handle': 'Chrome knurled',
      'Shape': 'Hexagonal (non-roll)',
    },
    isOffer: true,
    deliveryDays: 2,
  },
  {
    id: 'prod-bd-2',
    name: 'Mavis 350 Shuttlecock (Pack of 6)',
    category: 'Badminton',
    price: 299,
    originalPrice: 379,
    rating: 4.7,
    reviewsCount: 91,
    ageGroup: 'All Ages',
    brand: 'Yonex',
    images: [
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=600&q=80',
    ],
    inStock: true,
    stockCount: 100,
    description: 'Yonex Mavis 350 nylon shuttlecock — perfect flight, durable and consistent. Ideal for outdoor and indoor recreational badminton. Available in slow, medium, and fast speed.',
    specifications: {
      'Pack': '6 shuttlecocks',
      'Type': 'Nylon feathers',
      'Speed': 'Medium (blue cap)',
      'Best For': 'Recreational & club play',
    },
    isBestSeller: true,
    deliveryDays: 1,
  },
  {
    id: 'prod-cr-2',
    name: 'Cricket Kit Bag (Senior, Wheelie)',
    category: 'Cricket',
    price: 1799,
    originalPrice: 2299,
    rating: 4.7,
    reviewsCount: 22,
    ageGroup: 'Adults',
    brand: 'SG',
    images: [
      'https://images.unsplash.com/photo-1593766788306-28561086694e?auto=format&fit=crop&w=600&q=80',
    ],
    inStock: true,
    stockCount: 12,
    description: 'SG senior wheelie cricket kit bag with large main compartment, separate bat sleeve, shoe pocket and multiple accessory pockets. Durable polyester with padded shoulder straps and wheels.',
    specifications: {
      'Type': 'Wheelie (rolling bag)',
      'Size': '90 x 36 x 36 cm',
      'Bat Slots': 'Up to 4 bats',
      'Pockets': '6 compartments',
    },
    isNew: true,
    isOffer: true,
    deliveryDays: 2,
  },
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Sanika Salunkhe',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    date: '6 months ago',
    text: 'Best sport material for all sports available here. Best quality at reasonable price. Nice supportive staff. Really satisfied with service and product. Please visit.',
  },
  {
    id: 'rev-2',
    author: 'Mahendrakumar Yadav',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    date: 'A year ago',
    text: 'It is good — I bought a jersey from this sports shop and my sir took 4 trophies from Morya Sports. I like the shop and the shop uncle\'s behavior — he is very honest. I am supporting you!',
    response: 'Thank you so much ❤️'
  },
  {
    id: 'rev-3',
    author: 'Rahul Jadhav',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    date: 'A year ago',
    text: 'Nice shop, quality 1 number, low price bat & cricket kit. I am happy with Morya Sports, thank you so much ❤️',
    response: 'Thank you sir for your support ❤️'
  },
  {
    id: 'rev-4',
    author: 'Umesh Pandhare',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    date: '4 years ago',
    text: 'The best sports material — this shop, please visit. Good quality best product branded material. Staff are very good. ✌️✨',
    response: 'Thank you ❤️'
  },
  {
    id: 'rev-5',
    author: 'Vicky Nimbalkar',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    date: '4 years ago',
    text: 'One of the best shops in Badlapur. You\'ll get good quality sportswear at budget price.',
    response: 'Thank you ❤️'
  },
  {
    id: 'rev-6',
    author: 'Ashish Dhuri',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    date: '4 years ago',
    text: 'Best service and fast. If you have any urgent requirement these guys are your only option in Badlapur... Thank you.',
    response: 'Thank you sir ❤️'
  },
];

export const BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'How to Choose the Right Cricket Bat for Your Game',
    slug: 'choose-right-cricket-bat',
    category: 'Cricket Tips',
    excerpt: 'Confused between English Willow and Kashmir Willow? Here\'s a complete guide to picking the perfect bat for your level and style of play.',
    content: '',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80',
    date: 'May 10, 2026',
    readTime: '5 min',
    author: 'Morya Sports Team',
  },
  {
    id: 'blog-2',
    title: 'Custom Jersey Printing for Your Cricket Team — A Complete Guide',
    slug: 'custom-jersey-printing-guide',
    category: 'Jerseys & Kits',
    excerpt: 'Everything you need to know about ordering custom sublimation jerseys — design, turnaround, pricing and minimum quantities.',
    content: '',
    image: 'https://images.unsplash.com/photo-1580087256394-dc596e1c8f4f?auto=format&fit=crop&w=800&q=80',
    date: 'April 2, 2026',
    readTime: '4 min',
    author: 'Morya Sports Team',
  },
  {
    id: 'blog-3',
    title: 'Top 5 Sports Trophies to Award at School Annual Sports Day',
    slug: 'top-trophies-school-sports-day',
    category: 'Trophies & Awards',
    excerpt: 'Make your school sports day memorable. From grand championship trophies to participation medals — what to order and in what quantities.',
    content: '',
    image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800&q=80',
    date: 'March 15, 2026',
    readTime: '3 min',
    author: 'Morya Sports Team',
  },
];
