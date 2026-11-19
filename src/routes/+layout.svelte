<script lang="ts">
	import '@fontsource/plus-jakarta-sans/500.css';
	import '@fontsource/plus-jakarta-sans/700.css';
	import '@fontsource/plus-jakarta-sans/800.css';
	import '@fontsource/inter/400.css';
	import '@fontsource/inter/500.css';
	import '@fontsource/inter/600.css';
	import '@fontsource/inter/700.css';
	import '../app.css';
	import Lenis from 'lenis';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { Phone, ShoppingCart } from '@lucide/svelte';
	import CartDrawer from '#lib/components/CartDrawer.svelte';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import WhatsAppIcon from '#lib/components/WhatsAppIcon.svelte';
	import { cart } from '#lib/cart.svelte.ts';
	import { drawer } from '#lib/drawer.svelte.ts';
	import { site } from '#lib/data/site.ts';

	let { children } = $props();

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'GroceryStore',
		name: site.name,
		slogan: site.tagline,
		description: site.description,
		telephone: site.phoneDisplay,
		email: site.email,
		priceRange: '₹',
		url: site.url,
		address: {
			'@type': 'PostalAddress',
			streetAddress: 'Linking Road, Bandra West',
			addressLocality: 'Mumbai',
			addressRegion: 'Maharashtra',
			postalCode: '400050',
			addressCountry: 'IN'
		},
		openingHoursSpecification: {
			'@type': 'OpeningHoursSpecification',
			dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
			opens: '06:00',
			closes: '23:00'
		},
		hasMap: 'https://www.google.com/maps/search/GreenBasket+Bandra+West+Mumbai',
		geo: { '@type': 'GeoCoordinates', latitude: 19.0596, longitude: 72.8295 },
		sameAs: [site.instagram, site.facebook, site.twitter]
	};

	// Smooth scroll (Lenis) + GSAP ScrollTrigger, one rAF loop, reduced-motion gated.
	$effect(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		gsap.registerPlugin(ScrollTrigger);
		const lenis = new Lenis({
			autoRaf: false,
			lerp: 0.1,
			smoothWheel: true,
			syncTouch: false // native inertia on touch devices
		});
		lenis.on('scroll', ScrollTrigger.update);
		gsap.ticker.add((time) => lenis.raf(time * 1000));
		gsap.ticker.lagSmoothing(0);
		const progress = document.getElementById('scroll-progress');
		if (progress) {
			gsap.to(progress, {
				scaleX: 1,
				ease: 'none',
				scrollTrigger: { start: 0, end: 'max', scrub: 0.3 }
			});
		}
		const onLoad = () => ScrollTrigger.refresh();
		window.addEventListener('load', onLoad);
		return () => {
			window.removeEventListener('load', onLoad);
			lenis.destroy();
		};
	});

	// Reveal-on-scroll: transform + opacity only, 300ms, respects reduced motion via CSS.
	$effect(() => {
		const els = document.querySelectorAll('.reveal');
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) if (e.isIntersecting) e.target.classList.add('is-visible');
			},
			{ threshold: 0.12 }
		);
		els.forEach((el) => io.observe(el));
		return () => io.disconnect();
	});
</script>

<svelte:head>
	<title>GreenBasket — Fresh Groceries Delivered Fast</title>
	<meta
		name="description"
		content="GreenBasket — farm-fresh fruits, vegetables, dairy and daily essentials delivered in as little as 30 minutes across Mumbai. Free delivery over ₹499."
	/>
	<link rel="canonical" href={site.url} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="GreenBasket — Fresh Groceries Delivered Fast" />
	<meta
		property="og:description"
		content="Farm-fresh fruits, vegetables, dairy and daily essentials — delivered in 30 minutes. Free delivery over ₹499."
	/>
	<meta property="og:url" content={site.url} />
	<meta name="twitter:card" content="summary_large_image" />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

<a
	href="#main"
	class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-leaf-deep focus:px-5 focus:py-3 focus:text-white"
>
	Skip to main content
</a>

<!-- Scroll progress (leaf line, transform only) -->
<div
	id="scroll-progress"
	class="fixed top-0 left-0 z-[55] h-[3px] w-full origin-left scale-x-0 bg-leaf"
	aria-hidden="true"
></div>

<Header />
<main id="main">{@render children()}</main>
<Footer />

<!-- Floating WhatsApp (desktop/tablet) -->
<a
	href={site.whatsappHref}
	target="_blank"
	rel="noopener"
	aria-label="Chat with GreenBasket on WhatsApp"
	class="fixed right-5 bottom-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg transition-transform duration-200 hover:scale-105 md:flex"
>
	<WhatsAppIcon size={26} />
</a>

<!-- Sticky mobile bottom bar: Call / WhatsApp / Cart -->
<nav
	aria-label="Quick actions"
	class="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
>
	<a href={site.phoneHref} class="flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs font-semibold text-ink">
		<Phone size={20} class="text-leaf-dark" aria-hidden="true" />
		Call
	</a>
	<a
		href={site.whatsappHref}
		target="_blank"
		rel="noopener"
		class="flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs font-semibold text-ink"
	>
		<span class="text-[#25d366]"><WhatsAppIcon size={20} /></span>
		WhatsApp
	</a>
	<button
		type="button"
		onclick={() => (drawer.open = true)}
		class="flex min-h-14 flex-col items-center justify-center gap-0.5 bg-leaf text-sm font-bold text-white"
	>
		<ShoppingCart size={20} aria-hidden="true" />
		Cart{#if cart.count > 0} ({cart.count}){/if}
	</button>
</nav>
<!-- Spacer so the sticky bar never covers footer content on mobile -->
<div class="h-14 lg:hidden" aria-hidden="true"></div>

<CartDrawer bind:open={drawer.open} />
