<script lang="ts">
	import { page } from '$app/state';
	import PageHero from '#lib/components/PageHero.svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import { categories, products } from '#lib/data/site.ts';

	// searchParams are unavailable during prerender — read them only in the
	// browser ($effect never runs on the server), defaults render first.
	let category = $state('all');
	let query = $state('');
	let vegOnly = $state(false);
	let sort = $state('popular');

	$effect(() => {
		category = page.url.searchParams.get('category') ?? 'all';
		query = page.url.searchParams.get('search') ?? '';
	});

	const filtered = $derived.by(() => {
		let list = [...products];
		if (category !== 'all') list = list.filter((p) => p.category === category);
		const term = query.trim().toLowerCase();
		if (term) {
			list = list.filter(
				(p) =>
					p.name.toLowerCase().includes(term) ||
					p.brand.toLowerCase().includes(term) ||
					p.category.toLowerCase().includes(term)
			);
		}
		if (vegOnly) list = list.filter((p) => p.veg);
		if (sort === 'price-low') list.sort((a, b) => a.price - b.price);
		else if (sort === 'price-high') list.sort((a, b) => b.price - a.price);
		else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
		else list.sort((a, b) => b.reviews - a.reviews);
		return list;
	});

	const activeCategory = $derived(categories.find((c) => c.slug === category));
</script>

<svelte:head>
	<title>Shop Groceries — GreenBasket | Fruits, Vegetables, Dairy & More</title>
	<meta
		name="description"
		content="Shop fresh groceries online at GreenBasket — fruits, vegetables, dairy, snacks, beverages and daily essentials with 30-minute delivery across Mumbai."
	/>
</svelte:head>

<PageHero
	eyebrow="Fresh groceries"
	title={activeCategory ? activeCategory.name : 'Shop all groceries'}
	sub={activeCategory ? activeCategory.tagline + ' — farm fresh, handpicked daily, delivered in about 30 minutes.' : 'Fruits, vegetables, dairy, snacks and daily essentials — farm fresh, handpicked daily, delivered in about 30 minutes.'}
/>

<section class="bg-white py-10 sm:py-12" aria-label="Products">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- Filters -->
		<div class="flex flex-col gap-4">
			<div class="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
				<a
					href="/shop"
					class="rounded-full px-4 py-2.5 text-sm font-bold transition-colors {category === 'all' ? 'bg-leaf text-white' : 'bg-leaf-pale text-ink hover:bg-leaf-soft'}"
					aria-current={category === 'all' ? 'page' : undefined}>All</a
				>
				{#each categories as cat}
					<a
						href={`/shop?category=${cat.slug}`}
						class="rounded-full px-4 py-2.5 text-sm font-bold transition-colors {category === cat.slug ? 'bg-leaf text-white' : 'bg-leaf-pale text-ink hover:bg-leaf-soft'}"
						aria-current={category === cat.slug ? 'page' : undefined}>{cat.name}</a
					>
				{/each}
			</div>
			<div class="flex flex-wrap items-center gap-3">
				<label class="flex min-w-0 flex-1 items-center overflow-hidden rounded-full border border-line bg-leaf-pale/60 focus-within:border-leaf focus-within:bg-white sm:max-w-sm">
					<span class="sr-only">Search products</span>
					<input
						type="search"
						bind:value={query}
						placeholder="Search products or brands..."
						class="min-w-0 flex-1 bg-transparent px-5 py-3 text-sm outline-none placeholder:text-muted"
					/>
				</label>
				<label class="flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-line px-4 text-sm font-bold text-ink select-none">
					<input type="checkbox" bind:checked={vegOnly} class="h-4 w-4 accent-[#22a447]" />
					Veg only
				</label>
				<label class="flex min-h-11 items-center gap-2 text-sm font-bold text-ink">
					Sort
					<select bind:value={sort} class="min-h-11 rounded-full border border-line bg-white px-3 text-sm font-semibold outline-none focus:border-leaf">
						<option value="popular">Most popular</option>
						<option value="price-low">Price: low to high</option>
						<option value="price-high">Price: high to low</option>
						<option value="rating">Top rated</option>
					</select>
				</label>
				<p class="ml-auto text-sm font-semibold text-muted" aria-live="polite">
					{filtered.length} product{filtered.length === 1 ? '' : 's'}
				</p>
			</div>
		</div>

		{#if filtered.length === 0}
			<div class="mt-12 rounded-3xl bg-leaf-pale px-6 py-14 text-center">
				<p class="font-display text-2xl font-extrabold text-ink">Nothing matches that search</p>
				<p class="mt-2 text-muted">Try a different word, or browse a category above.</p>
				<a href="/shop" class="mt-5 inline-flex min-h-12 items-center rounded-full bg-leaf px-7 text-sm font-bold text-white">See all products</a>
			</div>
		{:else}
			<div class="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
				{#each filtered as product (product.slug)}
					<ProductCard {product} />
				{/each}
			</div>
		{/if}
	</div>
</section>
