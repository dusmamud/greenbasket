<script lang="ts">
	// Search — full-screen search experience (research P0-2):
	// autocomplete after 2 chars, Hinglish/typo-tolerant via synonyms,
	// facets (category, veg-only, sort), zero-results recovery.
	// ?q= is read only client-side ($effect) so prerender never breaks.
	import { goto } from '$app/navigation';
	import { Leaf, Search, SearchX } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import { categories, products, searchSynonyms, type Product } from '#lib/data/site.ts';

	let q = $state('');
	let submitted = $state('');
	let vegOnly = $state(false);
	let category = $state('all');
	let sort = $state('relevance');
	let showSuggestions = $state(false);

	$effect(() => {
		const params = new URLSearchParams(window.location.search);
		const initial = params.get('q') ?? '';
		q = initial;
		submitted = initial;
	});

	function normalize(s: string) {
		return s.toLowerCase().trim();
	}

	// Typo tolerance: substring match on name/brand/category, plus synonym
	// map (doodh -> milk, atta -> flour...), plus word-prefix matching.
	function matches(p: Product, term: string): boolean {
		const t = normalize(term);
		if (!t) return true;
		const hay = `${p.name} ${p.brand} ${p.category} ${p.unit}`.toLowerCase();
		if (hay.includes(t)) return true;
		const syn = searchSynonyms[t];
		if (syn?.includes(p.slug)) return true;
		// word-prefix: "tom" matches "tomatoes"
		return hay.split(/[\s-]+/).some((w) => w.startsWith(t) && t.length >= 3);
	}

	const suggestions = $derived.by(() => {
		const t = normalize(q);
		if (t.length < 2 || submitted === q) return [] as Product[];
		const synSlugs = searchSynonyms[t] ?? [];
		const scored = products
			.map((p) => {
				let score = 0;
				if (synSlugs.includes(p.slug)) score += 3;
				if (p.name.toLowerCase().includes(t)) score += 2;
				if (p.brand.toLowerCase().includes(t)) score += 1;
				if (p.name.toLowerCase().split(/[\s-]+/).some((w) => w.startsWith(t))) score += 1;
				return { p, score };
			})
			.filter((x) => x.score > 0)
			.sort((a, b) => b.score - a.score);
		return scored.slice(0, 8).map((x) => x.p);
	});

	const popularSearches = ['milk', 'atta', 'apples', 'rice', 'honey', 'oats'];

	const results = $derived.by(() => {
		let list = products.filter((p) => matches(p, submitted));
		if (vegOnly) list = list.filter((p) => p.veg);
		if (category !== 'all') list = list.filter((p) => p.category === category);
		if (sort === 'price-low') list = [...list].sort((a, b) => a.price - b.price);
		else if (sort === 'price-high') list = [...list].sort((a, b) => b.price - a.price);
		else if (sort === 'discount') list = [...list].sort((a, b) => b.mrp - b.price - (a.mrp - a.price));
		else if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
		return list;
	});

	const bestsellers = $derived(products.filter((p) => p.badge === 'Bestseller'));

	function submit(e: SubmitEvent) {
		e.preventDefault();
		submitted = q.trim();
		showSuggestions = false;
		goto(submitted ? `/search?q=${encodeURIComponent(submitted)}` : '/search', { replaceState: true });
	}

	function pickSuggestion(p: Product) {
		q = p.name;
		submitted = p.name;
		showSuggestions = false;
		goto(`/search?q=${encodeURIComponent(p.name)}`, { replaceState: true });
	}
</script>

<svelte:head>
	<title>{submitted ? `Search: ${submitted} — GreenBasket` : 'Search — GreenBasket'}</title>
	<meta name="description" content="Search fresh groceries at GreenBasket — fruits, vegetables, dairy, staples and more, delivered in 30 minutes across Mumbai." />
	<meta name="robots" content="noindex" />
</svelte:head>

<PageHero
	eyebrow="Search"
	title="Find it in seconds"
	sub="Type in Hindi, Hinglish or English — doodh, atta, apples, we will find it."
/>

<section class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
	<!-- Search box + autocomplete -->
	<form role="search" onsubmit={submit} class="relative mx-auto max-w-2xl">
		<label class="sr-only" for="search-input">Search products</label>
		<div class="flex items-center overflow-hidden rounded-full border-2 border-leaf bg-white shadow-sm focus-within:shadow-md">
			<Search size={20} class="ml-5 shrink-0 text-leaf-dark" aria-hidden="true" />
			<input
				id="search-input"
				type="search"
				bind:value={q}
				onfocus={() => (showSuggestions = true)}
				onblur={() => setTimeout(() => (showSuggestions = false), 150)}
				placeholder="Try 'doodh', 'atta', 'apples'..."
				autocomplete="off"
				class="min-w-0 flex-1 bg-transparent px-3 py-4 text-base outline-none placeholder:text-muted"
			/>
			<button
				type="submit"
				class="mr-1.5 flex h-11 min-w-11 items-center justify-center rounded-full bg-leaf px-5 text-sm font-bold text-white transition-colors hover:bg-leaf-dark"
			>
				Search
			</button>
		</div>
		{#if showSuggestions && suggestions.length > 0}
			<ul class="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-line bg-white shadow-xl" role="listbox">
				{#each suggestions as s}
					<li>
						<button
							type="button"
							onclick={() => pickSuggestion(s)}
							class="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-leaf-pale"
						>
							<span class="text-sm font-bold text-ink">{s.name}</span>
							<span class="text-xs font-medium text-muted">{s.brand} · {s.unit}</span>
							<span class="ml-auto text-sm font-black text-leaf-dark">₹{s.price}</span>
						</button>
					</li>
				{/each}
			</ul>
		{/if}
	</form>

	<!-- Popular searches -->
	{#if !submitted}
		<div class="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-2">
			<span class="text-sm font-semibold text-muted">Popular:</span>
			{#each popularSearches as term}
				<a
					href={`/search?q=${term}`}
					class="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-leaf hover:text-leaf-dark"
					>{term}</a
				>
			{/each}
		</div>
	{/if}

	{#if submitted}
		<div class="mt-10">
			<div class="flex flex-wrap items-center justify-between gap-3">
				<h2 class="font-display text-xl font-extrabold text-ink sm:text-2xl">
					{#if results.length > 0}
						{results.length} result{results.length === 1 ? '' : 's'} for “{submitted}”
					{:else}
						No results for “{submitted}”
					{/if}
				</h2>
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
					<label class="sr-only" for="sort">Sort results</label>
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

			<!-- Category filter chips -->
			<div class="mt-4 flex gap-2 overflow-x-auto pb-1">
				<button
					type="button"
					onclick={() => (category = 'all')}
					aria-pressed={category === 'all'}
					class="shrink-0 rounded-full px-4 py-2 text-sm font-bold whitespace-nowrap {category === 'all' ? 'bg-ink text-white' : 'bg-white text-ink ring-1 ring-line'}"
					>All categories</button
				>
				{#each categories as c}
					<button
						type="button"
						onclick={() => (category = c.slug)}
						aria-pressed={category === c.slug}
						class="shrink-0 rounded-full px-4 py-2 text-sm font-bold whitespace-nowrap {category === c.slug ? 'bg-ink text-white' : 'bg-white text-ink ring-1 ring-line'}"
						>{c.name}</button
					>
				{/each}
			</div>

			{#if results.length > 0}
				<div class="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
					{#each results as product (product.slug)}
						<ProductCard {product} />
					{/each}
				</div>
			{:else}
				<!-- Zero-results recovery -->
				<div class="mt-8 rounded-3xl border border-line bg-white px-6 py-12 text-center">
					<SearchX size={44} class="mx-auto text-muted" aria-hidden="true" />
					<h3 class="mt-4 font-display text-xl font-extrabold text-ink">We couldn't find “{submitted}”</h3>
					<p class="mx-auto mt-2 max-w-md text-sm text-muted">
						Check the spelling, try a simpler word (doodh for milk, atta for flour), or browse our bestsellers below.
					</p>
					<div class="mt-6 flex flex-wrap justify-center gap-2">
						<a href="/shop" class="rounded-full bg-leaf px-5 py-3 text-sm font-bold text-white">Browse all products</a>
						<button
							type="button"
							onclick={() => {
								q = '';
								submitted = '';
								goto('/search', { replaceState: true });
							}}
							class="rounded-full border border-line bg-white px-5 py-3 text-sm font-bold text-ink">Clear search</button
						>
					</div>
				</div>
				<h3 class="mt-10 font-display text-xl font-extrabold text-ink">Bestsellers you may like</h3>
				<div class="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
					{#each bestsellers as product (product.slug)}
						<ProductCard {product} />
					{/each}
				</div>
			{/if}
		</div>
	{/if}
</section>
