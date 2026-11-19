<script lang="ts">
	// Category landing page — one stable URL per department + the under-₹99
	// collection (research P1-3): unique copy below the grid, BreadcrumbList
	// JSON-LD, filters + sort. Prerendered per category.
	import { Leaf } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import { categories, products } from '#lib/data/site.ts';
	import { site } from '#lib/data/site.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const copy: Record<string, { title: string; sub: string; body: string }> = {
		'fruits-vegetables': {
			title: 'Fruits & Vegetables',
			sub: 'Farm fresh, picked at dawn, packed the same day.',
			body: 'From Shimla apples to desi tomatoes, every fruit and vegetable is hand-sorted at our Bandra dark store each morning. We buy directly from farms around Nashik and Pune, so prices stay low and the produce stays crisp. Order by 7 pm and it is at your door in about 30 minutes — washed, sorted and ready to cook.'
		},
		'dairy-eggs': {
			title: 'Dairy & Eggs',
			sub: 'Fresh every morning — milk, curd, eggs and more.',
			body: 'Pasteurised milk chilled from farm to door, thick set curd, and free-range eggs checked every morning. Our dairy travels in cold boxes the whole way, so your milk arrives at 4°C, never warm. Subscribe and the morning essentials reach you before 7 am, every day.'
		},
		'snacks-munchies': {
			title: 'Snacks & Munchies',
			sub: 'Crunchy cravings, solved in 30 minutes.',
			body: 'Dark chocolate, namkeen, biscuits and more for the 4 pm slump or the midnight movie. Everything is packed fresh with clear expiry dates, and our snack deals refresh every Friday.'
		},
		beverages: {
			title: 'Beverages',
			sub: 'Juices, tea, honey and more.',
			body: 'Cold-pressed juices, raw honey and everyday brews. Sweeten your chai with unprocessed honey, or start the morning with fresh oranges — all delivered chilled where it matters.'
		},
		'instant-food': {
			title: 'Instant Food',
			sub: 'Ready in minutes, made with real ingredients.',
			body: 'Atta, basmati and oats — the backbone of every Indian kitchen, plus quick breakfasts that take three minutes flat. Chakki-ground atta, aged basmati, wholegrain oats: pantry staples, done right.'
		},
		household: {
			title: 'Household Care',
			sub: 'Clean home, happy home.',
			body: 'Everyday essentials from trusted Indian brands — iodised salt and more household staples at honest prices, delivered with your groceries so you never run out mid-week.'
		},
		'personal-care': {
			title: 'Personal Care',
			sub: 'Everyday essentials for the whole family.',
			body: 'Gentle, everyday personal-care picks — including pure honey for skin and hair rituals — at prices that make the weekly shop easy.'
		},
		bakery: {
			title: 'Bakery',
			sub: 'Freshly baked at 6 am, every morning.',
			body: 'Whole wheat loaves baked at dawn with no preservatives. Order the night before and warm bread is at your door with the morning milk.'
		},
		'under-99': {
			title: 'Everything Under ₹99',
			sub: 'Daily essentials that never break the budget.',
			body: 'Milk, salt, spinach, tomatoes and more — every item here costs less than ₹99. Perfect for topping up the weekly shop without thinking twice.'
		}
	};

	const info = $derived(copy[data.slug] ?? { title: data.slug, sub: '', body: '' });
	const list = $derived(data.slug === 'under-99' ? products.filter((p) => p.price < 99) : products.filter((p) => p.category === data.slug));

	let vegOnly = $state(false);
	let sort = $state('relevance');
	const shown = $derived.by(() => {
		let l = vegOnly ? list.filter((p) => p.veg) : list;
		if (sort === 'price-low') l = [...l].sort((a, b) => a.price - b.price);
		else if (sort === 'price-high') l = [...l].sort((a, b) => b.price - a.price);
		else if (sort === 'discount') l = [...l].sort((a, b) => b.mrp - b.price - (a.mrp - a.price));
		else if (sort === 'rating') l = [...l].sort((a, b) => b.rating - a.rating);
		return l;
	});

	const breadcrumb = $derived({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
			{ '@type': 'ListItem', position: 2, name: 'Shop', item: `${site.url}/shop` },
			{ '@type': 'ListItem', position: 3, name: info.title, item: `${site.url}/category/${data.slug}` }
		]
	});
</script>

<svelte:head>
	<title>{info.title} — GreenBasket Mumbai</title>
	<meta name="description" content="{info.title} at GreenBasket — {info.sub} Delivered in 30 minutes across Mumbai." />
	<link rel="canonical" href="{site.url}/category/{data.slug}" />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${JSON.stringify(breadcrumb)}</script>`}
</svelte:head>

<PageHero eyebrow="Category" title={info.title} sub={info.sub} />

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
	<nav aria-label="Breadcrumb" class="mb-6 text-sm font-semibold text-muted">
		<a href="/" class="hover:text-leaf-dark">Home</a> <span aria-hidden="true">/</span>
		<a href="/shop" class="hover:text-leaf-dark">Shop</a> <span aria-hidden="true">/</span>
		<span class="text-ink">{info.title}</span>
	</nav>

	<div class="flex flex-wrap items-center justify-between gap-3">
		<h2 class="font-display text-xl font-extrabold text-ink">{shown.length} products</h2>
		<div class="flex items-center gap-2">
			<button
				type="button"
				onclick={() => (vegOnly = !vegOnly)}
				aria-pressed={vegOnly}
				class="flex min-h-11 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-bold transition-colors {vegOnly
					? 'border-leaf bg-leaf text-white'
					: 'border-line bg-white text-ink hover:border-leaf'}"
			>
				<Leaf size={15} aria-hidden="true" /> Veg only
			</button>
			<label class="sr-only" for="sort">Sort products</label>
			<select
				id="sort"
				bind:value={sort}
				class="min-h-11 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink outline-none focus:border-leaf"
			>
				<option value="relevance">Relevance</option>
				<option value="price-low">Price: low to high</option>
				<option value="price-high">Price: high to low</option>
				<option value="discount">Biggest discount</option>
				<option value="rating">Top rated</option>
			</select>
		</div>
	</div>

	<div class="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
		{#each shown as product (product.slug)}
			<ProductCard {product} />
		{/each}
	</div>

	<p class="mx-auto mt-12 max-w-3xl text-center leading-relaxed text-muted">{info.body}</p>

	<div class="mt-10 flex flex-wrap justify-center gap-2">
		{#each categories as c}
			<a
				href={`/category/${c.slug}`}
				class="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-leaf hover:text-leaf-dark"
				>{c.name}</a
			>
		{/each}
		<a href="/category/under-99" class="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-leaf hover:text-leaf-dark">Under ₹99</a>
	</div>
</section>
