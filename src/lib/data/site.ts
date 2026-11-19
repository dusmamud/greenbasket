// GreenBasket — mock data (frontend only). Swap with real data after the
// client approves the design. Prices in INR, Indian context, en-IN.
export const site = {
	name: 'GreenBasket',
	tagline: 'Fresh To You',
	description:
		'GreenBasket — fresh groceries delivered fast. Farm-fresh fruits, vegetables, dairy and daily essentials at your door in as little as 30 minutes.',
	url: 'https://greenbasket.pages.dev',
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
