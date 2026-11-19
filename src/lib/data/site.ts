// GreenBasket — mock data (frontend only). Swap with real data after the
// client approves the design. Prices in INR, Indian context, en-IN.
export const site = {
	name: 'GreenBasket',
	tagline: 'Fresh To You',
	description:
		'GreenBasket — fresh groceries delivered fast. Farm-fresh fruits, vegetables, dairy and daily essentials at your door in as little as 30 minutes.',
	url: 'https://greenbasket-4yz.pages.dev',
	phoneDisplay: '+91 98765 43210',
	phoneHref: 'tel:+919876543210',
	email: 'hello@greenbasket.in',
	whatsappHref: 'https://wa.me/919876543210?text=Hi%20GreenBasket!%20I%20want%20to%20order%20groceries.',
	address: 'GreenBasket Store, Linking Road, Bandra West, Mumbai 400050',
	city: 'Mumbai',
	pincode: '400050',
	freeDeliveryAbove: 499,
	deliveryFee: 40,
	deliveryEta: '30 mins',
	customers: '50,000+',
	instagram: 'https://www.instagram.com/greenbasket.in',
	facebook: 'https://www.facebook.com/greenbasket.in',
	twitter: 'https://www.twitter.com/greenbasket_in',
	youtube: 'https://www.youtube.com/@greenbasket'
};

export type Category = {
	slug: string;
	name: string;
	tagline: string;
	image: string;
	tint: string; // soft background tint for the tile
};

export const categories: Category[] = [
	{ slug: 'fruits-vegetables', name: 'Fruits & Vegetables', tagline: 'Farm fresh, daily', image: 'product-tomatoes', tint: '#e8f7ee' },
	{ slug: 'dairy-eggs', name: 'Dairy & Eggs', tagline: 'Fresh every morning', image: 'product-milk-pouch', tint: '#eef4ff' },
	{ slug: 'snacks-munchies', name: 'Snacks & Munchies', tagline: 'Crunchy cravings', image: 'product-dark-chocolate', tint: '#fdf3e3' },
	{ slug: 'beverages', name: 'Beverages', tagline: 'Juices, tea & more', image: 'product-oranges', tint: '#fff1e6' },
	{ slug: 'instant-food', name: 'Instant Food', tagline: 'Ready in minutes', image: 'product-oats', tint: '#f3efff' },
	{ slug: 'household', name: 'Household Care', tagline: 'Clean home, happy home', image: 'product-salt', tint: '#e6f6f8' },
	{ slug: 'personal-care', name: 'Personal Care', tagline: 'Everyday essentials', image: 'product-honey', tint: '#fdeef3' },
	{ slug: 'bakery', name: 'Bakery', tagline: 'Freshly baked daily', image: 'product-bread', tint: '#fdf6e3' }
];

export type Product = {
	slug: string;
	name: string;
	brand: string;
	category: string; // category slug
	price: number;
	mrp: number;
	unit: string;
	rating: number;
	reviews: number;
	image: string;
	badge?: string;
	veg: boolean;
	blurb: string;
};

export const products: Product[] = [
	{ slug: 'red-apples', name: 'Red Apples', brand: 'Farm Fresh', category: 'fruits-vegetables', price: 149, mrp: 199, unit: '1 kg', rating: 4.8, reviews: 320, image: 'product-red-apples', badge: 'Bestseller', veg: true, blurb: 'Crisp, sweet Shimla apples, handpicked at dawn and packed the same day.' },
	{ slug: 'banana', name: 'Banana', brand: 'Farm Fresh', category: 'fruits-vegetables', price: 59, mrp: 79, unit: '1 dozen', rating: 4.7, reviews: 210, image: 'product-banana', badge: 'Bestseller', veg: true, blurb: 'Naturally ripened robusta bananas — perfect for breakfast, smoothies and kids’ tiffins.' },
	{ slug: 'fresh-milk', name: 'Fresh Milk', brand: 'Amul', category: 'dairy-eggs', price: 64, mrp: 72, unit: '1 L', rating: 4.9, reviews: 480, image: 'product-milk-pouch', badge: 'Bestseller', veg: true, blurb: 'Pasteurised toned milk, chilled from farm to your door every morning.' },
	{ slug: 'whole-wheat-atta', name: 'Whole Wheat Atta', brand: 'Aashirvaad', category: 'instant-food', price: 289, mrp: 349, unit: '5 kg', rating: 4.8, reviews: 150, image: 'product-atta', badge: 'Bestseller', veg: true, blurb: 'Chakki-ground whole wheat atta for soft, fluffy rotis every single time.' },
	{ slug: 'iodised-salt', name: 'Iodised Salt', brand: 'Tata', category: 'household', price: 28, mrp: 32, unit: '1 kg', rating: 4.7, reviews: 280, image: 'product-salt', badge: 'Bestseller', veg: true, blurb: 'Iodised, free-flowing salt — the everyday essential every Indian kitchen trusts.' },
	{ slug: 'dark-chocolate', name: 'Dark Chocolate', brand: 'Brookside', category: 'snacks-munchies', price: 149, mrp: 199, unit: '100 g', rating: 4.6, reviews: 190, image: 'product-dark-chocolate', badge: 'Bestseller', veg: true, blurb: 'Rich 70% dark chocolate with a smooth, slow melt. A little luxury, every day.' },
	{ slug: 'tomatoes', name: 'Tomatoes', brand: 'Farm Fresh', category: 'fruits-vegetables', price: 39, mrp: 59, unit: '1 kg', rating: 4.7, reviews: 260, image: 'product-tomatoes', veg: true, blurb: 'Firm, ripe desi tomatoes — great for curries, salads and sandwiches.' },
	{ slug: 'onions', name: 'Onions', brand: 'Farm Fresh', category: 'fruits-vegetables', price: 49, mrp: 69, unit: '1 kg', rating: 4.6, reviews: 180, image: 'product-onions', veg: true, blurb: 'Sweet, crunchy red onions, sorted by hand and packed fresh.' },
	{ slug: 'oranges', name: 'Oranges', brand: 'Farm Fresh', category: 'fruits-vegetables', price: 119, mrp: 149, unit: '1 kg', rating: 4.8, reviews: 230, image: 'product-oranges', veg: true, blurb: 'Juicy Nagpur oranges, bursting with vitamin C. Peel, eat, repeat.' },
	{ slug: 'whole-wheat-bread', name: 'Whole Wheat Bread', brand: 'GreenBasket Bakery', category: 'bakery', price: 65, mrp: 80, unit: '400 g', rating: 4.7, reviews: 140, image: 'product-bread', badge: 'Freshly baked', veg: true, blurb: 'Soft whole wheat loaf, baked at 6 am every morning. No preservatives.' },
	{ slug: 'farm-eggs', name: 'Farm Eggs', brand: 'Farm Fresh', category: 'dairy-eggs', price: 89, mrp: 110, unit: '6 pcs', rating: 4.8, reviews: 205, image: 'product-eggs', veg: false, blurb: 'Free-range farm eggs with deep golden yolks, checked and packed daily.' },
	{ slug: 'fresh-curd', name: 'Fresh Curd', brand: 'GreenBasket Dairy', category: 'dairy-eggs', price: 55, mrp: 65, unit: '400 g', rating: 4.8, reviews: 175, image: 'product-curd', veg: true, blurb: 'Thick, creamy set curd — perfect for raita, lassi and dahi rice.' },
	{ slug: 'spinach', name: 'Spinach', brand: 'Farm Fresh', category: 'fruits-vegetables', price: 29, mrp: 45, unit: '1 bunch', rating: 4.6, reviews: 120, image: 'product-spinach', veg: true, blurb: 'Tender palak leaves, washed and ready to cook. Iron-rich and fresh.' },
	{ slug: 'basmati-rice', name: 'Basmati Rice', brand: 'India Gate', category: 'instant-food', price: 189, mrp: 240, unit: '1 kg', rating: 4.9, reviews: 310, image: 'product-rice', badge: 'Premium', veg: true, blurb: 'Long-grain aged basmati — fluffy, fragrant, perfect for biryani and pulao.' },
	{ slug: 'rolled-oats', name: 'Rolled Oats', brand: 'Quaker', category: 'instant-food', price: 149, mrp: 185, unit: '1 kg', rating: 4.7, reviews: 165, image: 'product-oats', veg: true, blurb: '100% wholegrain rolled oats — a wholesome, high-fibre breakfast in 3 minutes.' },
	{ slug: 'pure-honey', name: 'Pure Honey', brand: 'Dabur', category: 'beverages', price: 249, mrp: 299, unit: '500 g', rating: 4.8, reviews: 220, image: 'product-honey', veg: true, blurb: 'Raw, unprocessed honey — nature’s sweetener for tea, toast and warm water.' }
];

export const bestsellers = products.filter((p) => p.badge === 'Bestseller');

export type Deal = {
	title: string;
	subtitle: string;
	detail: string;
	cta: string;
	image: string;
	tint: string;
	link: string;
};

export const deals: Deal[] = [
	{ title: 'Deal of the Day', subtitle: 'UP TO 40% OFF', detail: 'On selected vegetables', cta: 'Shop Now', image: 'deal-veggies', tint: '#e8f7ee', link: '/shop?category=fruits-vegetables' },
	{ title: 'Fresh Fridays', subtitle: 'Flat 20% Off On Fruits', detail: 'Every Friday', cta: 'Shop Now', image: 'deal-fruits', tint: '#fdf3e3', link: '/shop?category=fruits-vegetables' },
	{ title: 'Weekend Special', subtitle: 'Buy 1 Get 1 FREE', detail: 'On selected snacks', cta: 'Shop Now', image: 'deal-snacks', tint: '#fdeef3', link: '/shop?category=snacks-munchies' }
];

export type Article = {
	slug: string;
	tag: string;
	title: string;
	excerpt: string;
	image: string;
	readMins: number;
};

export const articles: Article[] = [
	{ slug: 'superfoods-immunity', tag: 'Nutrition', title: '5 Superfoods to Boost Your Immunity', excerpt: 'From amla to turmeric — the everyday Indian superfoods that actually work, and how to add them to your meals.', image: 'blog-superfoods', readMins: 4 },
	{ slug: 'meal-prep-healthy-week', tag: 'Wellness', title: 'Easy Meal Prep Ideas for a Healthy Week', excerpt: 'One Sunday hour, five wholesome tiffins. Simple prep ideas that keep your week healthy without the stress.', image: 'blog-mealprep', readMins: 5 },
	{ slug: 'small-choices-big-impact', tag: 'Sustainability', title: 'How Small Choices Make a Big Impact', excerpt: 'Reusable bags, seasonal produce, less plastic — tiny swaps that make your grocery run kinder to the planet.', image: 'blog-sustainability', readMins: 3 }
];

export type Testimonial = { name: string; area: string; text: string; rating: number };

export const testimonials: Testimonial[] = [
	{ name: 'Priya Sharma', area: 'Bandra West, Mumbai', text: 'The vegetables genuinely taste like they came from a farm this morning. My 30-minute delivery has never once been late.', rating: 5 },
	{ name: 'Rahul Mehta', area: 'Andheri East, Mumbai', text: 'I compared prices with three other apps — GreenBasket wins on atta, rice and daily milk. The app is simple and the quality is consistent.', rating: 5 },
	{ name: 'Ananya Iyer', area: 'Powai, Mumbai', text: 'Meal prep Sundays are so much easier now. Fresh spinach, curd and eggs at my door before 8 am. The packaging is neat and plastic-free too.', rating: 5 },
	{ name: 'Vikram Nair', area: 'Juhu, Mumbai', text: 'Ordered at 7 pm, biryani rice and everything arrived by 7:35. Customer support actually picks up the phone. Rare these days.', rating: 4 }
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
	{ q: 'How fast is delivery?', a: 'Most orders arrive in 30–45 minutes across Mumbai. You can also pick a 2-hour slot that suits you at checkout.' },
	{ q: 'Is delivery free?', a: 'Yes — delivery is free on all orders above ₹499. Below that, a small ₹40 delivery fee applies.' },
	{ q: 'How do I pay?', a: 'Pay online with UPI, card or netbanking, or choose cash on delivery. This is a demo store, so no real payment is taken.' },
	{ q: 'What if something arrives damaged?', a: 'Tell us within 24 hours from the Orders page or on WhatsApp and we will replace it or refund you — no questions asked.' },
	{ q: 'Can I schedule a delivery?', a: 'Yes. At checkout you can choose same-day slots or schedule for tomorrow morning, including the 6–8 am fresh slot.' },
	{ q: 'Do you deliver outside Mumbai?', a: 'Right now we deliver across Mumbai and Thane. More cities are coming soon — join the newsletter to hear first.' }
];

export const whyChoose = [
	{ title: 'Super Fast Delivery', text: 'In as little as 30 minutes', icon: 'truck' },
	{ title: 'Fresh & Quality Products', text: 'Handpicked with care', icon: 'leaf' },
	{ title: 'Best Prices Guaranteed', text: 'Save more every day', icon: 'tag' },
	{ title: 'Easy Returns', text: 'Hassle-free returns', icon: 'refresh' },
	{ title: '24/7 Customer Support', text: 'We’re here for you', icon: 'headset' }
];

export const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;

export const navLinks = [
	{ label: 'Home', href: '/' },
	{ label: 'Fruits & Vegetables', href: '/shop?category=fruits-vegetables' },
	{ label: 'Dairy & Eggs', href: '/shop?category=dairy-eggs' },
	{ label: 'Snacks & Munchies', href: '/shop?category=snacks-munchies' },
	{ label: 'Beverages', href: '/shop?category=beverages' },
	{ label: 'Household', href: '/shop?category=household' },
	{ label: 'Offers', href: '/offers' }
];

// --- Trust / compliance (mock) ---
export const fssaiLicence = '11523998001234'; // mock licence number for design review

// --- Per-unit price (₹/kg, ₹/100g…) shown on every card ---
const perUnitMap: Record<string, string> = {
	'red-apples': '₹149/kg',
	banana: '₹59/dozen',
	'fresh-milk': '₹64/L',
	'whole-wheat-atta': '₹58/kg',
	'iodised-salt': '₹28/kg',
	'dark-chocolate': '₹149/100 g',
	tomatoes: '₹39/kg',
	onions: '₹49/kg',
	oranges: '₹119/kg',
	'whole-wheat-bread': '₹16/100 g',
	'farm-eggs': '₹15/pc',
	'fresh-curd': '₹14/100 g',
	spinach: '₹29/bunch',
	'basmati-rice': '₹189/kg',
	'rolled-oats': '₹149/kg',
	'pure-honey': '₹50/100 g'
};
export const perUnit = (slug: string) => perUnitMap[slug] ?? '';

// --- Search synonyms (Hinglish / typos) -> product slugs ---
export const searchSynonyms: Record<string, string[]> = {
	doodh: ['fresh-milk'],
	dudh: ['fresh-milk'],
	milk: ['fresh-milk'],
	atta: ['whole-wheat-atta'],
	flour: ['whole-wheat-atta', 'basmati-rice'],
	chawal: ['basmati-rice'],
	rice: ['basmati-rice'],
	namak: ['iodised-salt'],
	salt: ['iodised-salt'],
	seb: ['red-apples'],
	apple: ['red-apples'],
	kela: ['banana'],
	banana: ['banana'],
	tamatar: ['tomatoes'],
	tomato: ['tomatoes'],
	pyaaz: ['onions'],
	onion: ['onions'],
	santra: ['oranges'],
	orange: ['oranges'],
	anda: ['farm-eggs'],
	egg: ['farm-eggs'],
	dahi: ['fresh-curd'],
	curd: ['fresh-curd'],
	palak: ['spinach'],
	spinach: ['spinach'],
	shahad: ['pure-honey'],
	honey: ['pure-honey'],
	bread: ['whole-wheat-bread'],
	oats: ['rolled-oats'],
	chocolate: ['dark-chocolate']
};

// --- Recipes (shoppable) ---
export type Recipe = {
	slug: string;
	title: string;
	time: string;
	servings: number;
	veg: boolean;
	image: string;
	excerpt: string;
	ingredients: { slug: string; qty: string }[];
	steps: string[];
};

export const recipes: Recipe[] = [
	{
		slug: 'banana-honey-overnight-oats',
		title: 'Banana Honey Overnight Oats',
		time: '10 mins + overnight',
		servings: 2,
		veg: true,
		image: 'recipe-overnight-oats',
		excerpt: 'Creamy oats soaked overnight with banana and honey — breakfast ready before you wake up.',
		ingredients: [
			{ slug: 'rolled-oats', qty: '1 cup' },
			{ slug: 'fresh-milk', qty: '1 cup' },
			{ slug: 'banana', qty: '1, sliced' },
			{ slug: 'pure-honey', qty: '2 tbsp' },
			{ slug: 'fresh-curd', qty: '2 tbsp' }
		],
		steps: [
			'Stir oats, milk, curd and honey in a jar.',
			'Layer in banana slices and close the lid.',
			'Refrigerate overnight (at least 6 hours).',
			'Top with extra banana and honey, serve chilled.'
		]
	},
	{
		slug: 'veg-biryani',
		title: 'Weeknight Veg Biryani',
		time: '40 mins',
		servings: 4,
		veg: true,
		image: 'recipe-veg-biryani',
		excerpt: 'Fragrant basmati layered with tomatoes, onions and spinach — one-pot comfort, zero fuss.',
		ingredients: [
			{ slug: 'basmati-rice', qty: '2 cups' },
			{ slug: 'tomatoes', qty: '2, chopped' },
			{ slug: 'onions', qty: '2, sliced' },
			{ slug: 'spinach', qty: '1 bunch' },
			{ slug: 'iodised-salt', qty: 'to taste' }
		],
		steps: [
			'Soak rice 20 minutes, then drain.',
			'Fry onions till golden, add tomatoes and spinach.',
			'Layer rice over the masala with a little water.',
			'Cover and cook on low 20 minutes. Rest 5, fluff and serve.'
		]
	},
	{
		slug: 'masala-oats',
		title: 'Masala Oats Bowl',
		time: '15 mins',
		servings: 2,
		veg: true,
		image: 'recipe-masala-oats',
		excerpt: 'Savoury oats with tomato, onion and spinach — a 15-minute breakfast that actually fills you up.',
		ingredients: [
			{ slug: 'rolled-oats', qty: '1 cup' },
			{ slug: 'tomatoes', qty: '1, chopped' },
			{ slug: 'onions', qty: '1, chopped' },
			{ slug: 'spinach', qty: '1 handful' },
			{ slug: 'iodised-salt', qty: 'to taste' }
		],
		steps: [
			'Heat a little oil; soften onions and tomatoes.',
			'Add spinach till just wilted.',
			'Stir in oats and 2 cups water, simmer 5 minutes.',
			'Season, rest 2 minutes and serve hot.'
		]
	}
];

// --- Stores / delivery areas (Mumbai) ---
export type StoreArea = {
	slug: string;
	name: string;
	pincode: string;
	eta: string;
	address: string;
	hours: string;
	phone: string;
};

export const storeAreas: StoreArea[] = [
	{ slug: 'bandra-west', name: 'Bandra West', pincode: '400050', eta: '30 mins', address: 'Linking Road, Bandra West', hours: '6:00 am – 11:00 pm', phone: '+91 98765 43210' },
	{ slug: 'andheri-east', name: 'Andheri East', pincode: '400069', eta: '35 mins', address: 'Chakala, Andheri East', hours: '6:00 am – 11:00 pm', phone: '+91 98765 43211' },
	{ slug: 'powai', name: 'Powai', pincode: '400076', eta: '40 mins', address: 'Hiranandani Gardens, Powai', hours: '6:00 am – 11:00 pm', phone: '+91 98765 43212' },
	{ slug: 'juhu', name: 'Juhu', pincode: '400049', eta: '30 mins', address: 'Juhu Tara Road, Juhu', hours: '6:00 am – 11:00 pm', phone: '+91 98765 43213' },
	{ slug: 'dadar', name: 'Dadar', pincode: '400014', eta: '45 mins', address: 'Dadar TT, Dadar East', hours: '6:00 am – 11:00 pm', phone: '+91 98765 43214' },
	{ slug: 'borivali-west', name: 'Borivali West', pincode: '400092', eta: '50 mins', address: 'SV Road, Borivali West', hours: '6:00 am – 11:00 pm', phone: '+91 98765 43215' }
];

// --- Subscriptions (daily staples) ---
export type Subscription = {
	slug: string;
	name: string;
	productSlug: string;
	price: number;
	unit: string;
	schedules: string[];
	blurb: string;
};

export const subscriptions: Subscription[] = [
	{ slug: 'milk-daily', name: 'Fresh Milk — Daily', productSlug: 'fresh-milk', price: 64, unit: '1 L / day', schedules: ['Every day', 'Weekdays only', 'Alternate days'], blurb: 'Chilled toned milk at your door before 7 am, every morning.' },
	{ slug: 'eggs-weekly', name: 'Farm Eggs — Weekly', productSlug: 'farm-eggs', price: 89, unit: '6 pcs / week', schedules: ['Every Monday', 'Mon & Thu', 'Every day'], blurb: 'Free-range eggs, checked and packed the same morning.' },
	{ slug: 'bread-daily', name: 'Whole Wheat Bread — Daily', productSlug: 'whole-wheat-bread', price: 65, unit: '400 g / day', schedules: ['Every day', 'Weekdays only'], blurb: 'Baked at 6 am, still warm when it reaches you.' }
];

// --- Membership (GreenBasket Pass) ---
export const pass = {
	name: 'GreenBasket Pass',
	price: 99,
	period: 'per month',
	benefits: [
		'Free delivery on every order, no minimum',
		'Extra 5% off on all fruits & vegetables',
		'Priority delivery slots in peak hours',
		'Free delivery on subscriptions, always',
		'Exclusive member-only deals every Friday'
	]
};

// --- Coupons (mock codes) ---
export type Coupon = { code: string; label: string; detail: string; percent: number; maxOff: number; minOrder: number };

export const coupons: Coupon[] = [
	{ code: 'WELCOME10', label: '10% off your first order', detail: 'Up to ₹100 off · min order ₹299', percent: 10, maxOff: 100, minOrder: 299 },
	{ code: 'FRESH20', label: '20% off fruits & vegetables', detail: 'Up to ₹150 off · min order ₹499', percent: 20, maxOff: 150, minOrder: 499 },
	{ code: 'FLAT50', label: 'Flat ₹50 off', detail: 'Min order ₹799 · one use per customer', percent: 0, maxOff: 50, minOrder: 799 }
];

// --- Mock account ---
export const mockUser = {
	name: 'Priya Sharma',
	email: 'priya.sharma@example.in',
	phone: '+91 98765 12345',
	coins: 240,
	passMember: true,
	passValidTill: '18 Dec 2026',
	addresses: [
		{ id: 'home', label: 'Home', line: '201, Sunrise Apartments, Linking Road, Bandra West, Mumbai 400050', isDefault: true },
		{ id: 'office', label: 'Office', line: '4th Floor, Trade View, Andheri East, Mumbai 400069', isDefault: false }
	],
	payments: [
		{ id: 'upi', label: 'UPI — priya@okhdfc', detail: 'Google Pay · default', isDefault: true },
		{ id: 'card', label: 'Visa •••• 4242', detail: 'Expires 08/28', isDefault: false }
	]
};

export type MockOrder = {
	id: string;
	date: string;
	items: { slug: string; qty: number }[];
	subtotal: number;
	status: 'Delivered' | 'Out for delivery' | 'Packed';
	eta?: string;
};

export const mockOrders: MockOrder[] = [
	{
		id: 'GB-248136',
		date: '18 Nov 2026',
		items: [
			{ slug: 'fresh-milk', qty: 2 },
			{ slug: 'red-apples', qty: 1 },
			{ slug: 'whole-wheat-bread', qty: 1 }
		],
		subtotal: 342,
		status: 'Delivered'
	},
	{
		id: 'GB-248097',
		date: '16 Nov 2026',
		items: [
			{ slug: 'basmati-rice', qty: 1 },
			{ slug: 'tomatoes', qty: 2 },
			{ slug: 'onions', qty: 1 },
			{ slug: 'pure-honey', qty: 1 }
		],
		subtotal: 565,
		status: 'Delivered'
	},
	{
		id: 'GB-248142',
		date: '19 Nov 2026',
		items: [
			{ slug: 'banana', qty: 1 },
			{ slug: 'farm-eggs', qty: 1 },
			{ slug: 'rolled-oats', qty: 1 }
		],
		subtotal: 297,
		status: 'Out for delivery',
		eta: '12 mins'
	}
];

// --- Help centre ---
export type HelpTopic = { slug: string; group: string; title: string; body: string };

export const helpTopics: HelpTopic[] = [
	{ slug: 'delivery-slots', group: 'Delivery', title: 'Delivery slots & timing', body: 'Most orders arrive in 30–45 minutes. At checkout you can also pick a 2-hour slot today or schedule tomorrow morning, including the 6–8 am fresh slot. Slots are free above ₹499.' },
	{ slug: 'track-order', group: 'Delivery', title: 'How do I track my order?', body: 'Open Track Order and enter your order ID (for example GB-248136) and phone number. You will see live status from Packed to Delivered, plus your rider’s name and ETA.' },
	{ slug: 'returns-refunds', group: 'Returns', title: 'Returns & refunds', body: 'Damaged or wrong items? Tell us within 24 hours and we replace or refund — no questions asked. Perishables (milk, vegetables, bread) are refunded, not collected back. Refunds land in your wallet in minutes or your bank in 3–5 days.' },
	{ slug: 'substitutions', group: 'Orders', title: 'What if an item is out of stock?', body: 'We never silently swap. At checkout choose: allow a similar substitute, refund the item, or call me first. You can approve or reject a substitution from the tracking screen.' },
	{ slug: 'payments', group: 'Payments', title: 'Payment options', body: 'UPI (Google Pay, PhonePe, Paytm, BHIM), credit/debit cards, netbanking, wallets and cash on delivery. COD carries no extra fee on prepaid-eligible pincodes; a ₹20 handling note applies only where shown at checkout.' },
	{ slug: 'coupons', group: 'Offers', title: 'Coupons & GreenBasket Pass', body: 'Apply a coupon in the cart — try WELCOME10, FRESH20 or FLAT50. Pass members get free delivery on every order and an extra 5% off fruits & vegetables. Coins earned on every order can be redeemed at checkout.' },
	{ slug: 'subscriptions', group: 'Subscriptions', title: 'Managing a subscription', body: 'Pause, skip or change quantity from Subscriptions — changes apply from the next delivery. Cancel anytime; you are never charged for paused days.' },
	{ slug: 'account', group: 'Account', title: 'My account & addresses', body: 'Save up to 5 addresses and 3 payment methods. Your wallet shows coins, refunds and Pass status. This is a demo store, so no real payment is taken.' }
];

// --- Careers (mock) ---
export const careers = [
	{ title: 'Delivery Partner — Bandra West', type: 'Full-time · On-ground', blurb: 'Ride with us, earn per delivery plus weekly incentives. Two-wheeler and smartphone required.' },
	{ title: 'Dark Store Associate — Powai', type: 'Full-time · Store', blurb: 'Pick, pack and keep the shelves fresh. Morning and evening shifts available.' },
	{ title: 'Customer Happiness Executive', type: 'Full-time · Remote', blurb: 'Help customers on chat and phone, in Hindi and English. Freshers welcome.' },
	{ title: 'Category Manager — Fresh Produce', type: 'Full-time · HQ, Mumbai', blurb: 'Own sourcing and quality for fruits & vegetables across Mumbai. 3+ years in fresh retail.' }
];

// --- Gift cards (mock) ---
export const giftCardAmounts = [250, 500, 1000, 2000];

// --- Bulk / B2B packs (mock) ---
export const bulkPacks = [
	{ name: 'Society Pack — 20 homes', detail: 'Atta 5 kg × 4, Rice 5 kg × 2, Oil 5 L × 2, Salt 1 kg × 5', price: 4999, mrp: 5890 },
	{ name: 'Café Starter Pack', detail: 'Milk 1 L × 20, Bread 400 g × 10, Eggs 30 pcs, Sugar 5 kg', price: 2999, mrp: 3490 },
	{ name: 'Office Pantry Pack', detail: 'Tea, coffee, biscuits, milk & snacks for a 30-person office, one month', price: 7999, mrp: 9290 },
	{ name: 'Restaurant Essentials', detail: 'Onions 25 kg, Tomatoes 20 kg, Rice 25 kg, Atta 25 kg — weekly', price: 6499, mrp: 7490 }
];
