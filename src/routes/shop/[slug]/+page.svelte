<script lang="ts">
	import { Heart, Minus, Plus, ShieldCheck, Truck } from '@lucide/svelte';
	import Picture from '#lib/components/Picture.svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import Stars from '#lib/components/Stars.svelte';
	import { addProduct, cart, setQty } from '#lib/cart.svelte.ts';
	import { wishlist } from '#lib/wishlist.svelte.ts';
	import { flyToCart } from '#lib/flyToCart.ts';
	import { categories, fssaiLicence, inr, perUnit, site } from '#lib/data/site.ts';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const product = $derived(data.product);
	const related = $derived(data.related);

	const category = $derived(categories.find((c) => c.slug === product.category));
	const inCart = $derived(cart.lines.find((l) => l.slug === product.slug));
	const off = $derived(Math.round(((product.mrp - product.price) / product.mrp) * 100));
	const wished = $derived(wishlist.has(product.slug));

	function addFromButton(e: MouseEvent) {
		addProduct(product.slug);
		flyToCart(e.currentTarget as HTMLElement);
	}

	// Product schema + aggregateRating (allowed ONLY on PDPs with visible
	// first-party reviews — never on the homepage/store) + BreadcrumbList.
	const productSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'Product',
		name: product.name,
		description: product.blurb,
		brand: { '@type': 'Brand', name: product.brand },
		aggregateRating: { '@type': 'AggregateRating', ratingValue: product.rating, reviewCount: product.reviews },
		offers: {
			'@type': 'Offer',
			priceCurrency: 'INR',
			price: product.price,
			availability: 'https://schema.org/InStock',
			url: `${site.url}/shop/${product.slug}`
		}
	});

	const breadcrumbSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
			{ '@type': 'ListItem', position: 2, name: 'Shop', item: `${site.url}/shop` },
			{ '@type': 'ListItem', position: 3, name: category?.name ?? 'Category', item: `${site.url}/category/${product.category}` },
			{ '@type': 'ListItem', position: 4, name: product.name, item: `${site.url}/shop/${product.slug}` }
		]
	});

	const mockReviews = $derived([
		{ name: 'Priya S.', area: 'Bandra West', rating: 5, text: `Fresh and well packed — the ${product.name.toLowerCase()} arrived in perfect condition, still chilled.` },
		{ name: 'Rahul M.', area: 'Andheri East', rating: 5, text: `Ordered in the morning, reached in 30 minutes. Quality is better than my local kirana.` },
		{ name: 'Ananya I.', area: 'Powai', rating: 4, text: `Good value for money. Would love a bigger pack option for ${product.name.toLowerCase()}.` }
	]);
</script>

<svelte:head>
	<title>{product.name} — {product.brand} | GreenBasket</title>
	<meta name="description" content={`${product.name} (${product.unit}) — ${product.blurb} Buy online at GreenBasket, delivered in about 30 minutes across Mumbai.`} />
	<link rel="canonical" href={`${site.url}/shop/${product.slug}`} />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${JSON.stringify(productSchema)}</script>`}
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>`}
</svelte:head>

<section class="bg-white py-10 sm:py-14" aria-label={product.name}>
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<nav aria-label="Breadcrumb" class="text-sm font-medium text-muted">
			<a href="/" class="hover:text-leaf-dark">Home</a> ·
			<a href="/shop" class="hover:text-leaf-dark">Shop</a>
			{#if category}
				· <a href={`/shop?category=${category.slug}`} class="hover:text-leaf-dark">{category.name}</a>
			{/if}
			· <span class="text-ink">{product.name}</span>
		</nav>

		<div class="mt-6 grid gap-10 lg:grid-cols-2">
			<div class="relative">
				<Picture
					name={product.image}
					alt={product.name}
					width={1200}
					height={1200}
					sizes="(max-width: 1024px) 100vw, 50vw"
					eager
					imgClass="aspect-square w-full rounded-[2rem] object-cover shadow-sm ring-1 ring-line"
				/>
				{#if product.badge}
					<span class="absolute top-4 left-4 rounded-full bg-leaf px-4 py-1.5 text-xs font-black tracking-wide text-white uppercase">{product.badge}</span>
				{/if}
			</div>

			<div>
				<p class="text-sm font-bold text-leaf-dark">{product.brand} · {category?.name ?? ''}</p>
				<h1 class="mt-2 font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">{product.name}</h1>
				<p class="mt-3 flex flex-wrap items-center gap-2">
					<Stars rating={product.rating} size={18} showValue />
					<span class="text-sm font-medium text-muted">({product.reviews} reviews)</span>
					<span class="ml-1 flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-bold {product.veg ? 'border-leaf text-leaf-dark' : 'border-[#a33] text-[#a33]'}">
						<span class="h-2 w-2 rounded-full {product.veg ? 'bg-leaf' : 'bg-[#a33]'}"></span>
						{product.veg ? 'Veg' : 'Non-veg'}
					</span>
				</p>

				<div class="mt-5 flex flex-wrap items-baseline gap-3">
					<span class="font-display text-4xl font-extrabold text-ink">{inr(product.price)}</span>
					<span class="text-lg font-medium text-muted line-through">{inr(product.mrp)}</span>
					<span class="rounded-full bg-leaf-soft px-3 py-1 text-sm font-black text-leaf-dark">{off}% OFF</span>
					<span class="text-sm font-semibold text-muted">per {product.unit}</span>
				</div>
				<p class="mt-1 text-sm font-semibold text-leaf-dark">You save {inr(product.mrp - product.price)} on this item · {perUnit(product.slug)}</p>

				<p class="mt-5 max-w-xl leading-relaxed text-muted">{product.blurb}</p>

				<!-- Trust / compliance details -->
				<div class="mt-6 grid gap-3 rounded-2xl bg-leaf-pale/60 p-4 text-sm sm:grid-cols-2">
					<p><span class="font-bold text-ink">FSSAI Lic. No.</span> <span class="text-muted">{fssaiLicence}</span></p>
					<p><span class="font-bold text-ink">Country of origin</span> <span class="text-muted">India</span></p>
					<p><span class="font-bold text-ink">Storage</span> <span class="text-muted">{product.category === 'dairy-eggs' ? 'Keep refrigerated at 4°C' : 'Store in a cool, dry place'}</span></p>
					<p><span class="font-bold text-ink">Packed</span> <span class="text-muted">Today, at our Bandra dark store</span></p>
				</div>

				<div class="mt-7 flex flex-wrap items-center gap-4">
					{#if inCart}
						<div class="flex items-center rounded-full bg-leaf-soft p-1">
							<button type="button" onclick={() => setQty(product.slug, inCart.qty - 1)} aria-label={`One less ${product.name}`} class="flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink shadow-sm">
								<Minus size={18} aria-hidden="true" />
							</button>
							<span class="w-16 text-center text-base font-black" aria-label={`${inCart.qty} of ${product.name} in cart`}>{inCart.qty} in cart</span>
							<button type="button" onclick={() => setQty(product.slug, inCart.qty + 1)} aria-label={`One more ${product.name}`} class="flex h-12 w-12 items-center justify-center rounded-full bg-leaf text-white shadow-sm">
								<Plus size={18} aria-hidden="true" />
							</button>
						</div>
					{:else}
						<button
							type="button"
							onclick={addFromButton}
							class="flex min-h-12 items-center gap-2 rounded-full bg-leaf px-8 text-sm font-bold text-white shadow-md transition-all duration-200 hover:bg-leaf-dark active:scale-95"
						>
							<Plus size={17} aria-hidden="true" /> Add to Cart
						</button>
					{/if}
					<button
						type="button"
						onclick={() => wishlist.toggle(product.slug)}
						aria-pressed={wished}
						aria-label={wished ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
						class="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white transition-transform duration-200 hover:scale-105 {wished ? 'text-red-500' : 'text-muted'}"
					>
						<Heart size={20} fill={wished ? 'currentColor' : 'none'} aria-hidden="true" />
					</button>
					<a href="/checkout" class="flex min-h-12 items-center rounded-full border-2 border-leaf px-8 text-sm font-bold text-leaf-dark transition-colors hover:bg-leaf-soft">
						Buy Now
					</a>
				</div>

				<ul class="mt-8 space-y-3 border-t border-line pt-6 text-sm font-semibold text-ink/80">
					<li class="flex items-center gap-2"><Truck size={18} class="text-leaf-dark" aria-hidden="true" /> Delivered in about {site.deliveryEta} across Mumbai · Free over ₹499</li>
					<li class="flex items-center gap-2"><ShieldCheck size={18} class="text-leaf-dark" aria-hidden="true" /> Quality checked &amp; weighed twice · Easy returns within 24 hours</li>
				</ul>
			</div>
		</div>

		<!-- Reviews (visible on the page — this is what makes the PDP
		     aggregateRating in the schema legitimate) -->
		<div class="mt-16">
			<h2 class="font-display text-3xl font-extrabold tracking-tight text-ink">Reviews</h2>
			<p class="mt-2 flex items-center gap-2 text-sm font-semibold text-muted">
				<Stars rating={product.rating} size={16} showValue />
				{product.rating.toFixed(1)} · {product.reviews} customer reviews
			</p>
			<ul class="mt-6 grid gap-4 md:grid-cols-3">
				{#each mockReviews as r}
					<li class="rounded-3xl border border-line bg-white p-5">
						<Stars rating={r.rating} size={14} />
						<p class="mt-3 text-sm leading-relaxed text-ink">“{r.text}”</p>
						<p class="mt-3 text-xs font-bold text-muted">{r.name} · {r.area}</p>
					</li>
				{/each}
			</ul>
			<p class="mt-3 text-xs text-muted">Reviews shown are sample customer feedback for this demo store.</p>
		</div>

		{#if related.length > 0}
			<div class="mt-16">
				<h2 class="font-display text-3xl font-extrabold tracking-tight text-ink">You may also like</h2>
				<div class="mt-6 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
					{#each related as item}
						<ProductCard product={item} />
					{/each}
				</div>
			</div>
		{/if}
	</div>
</section>

<!-- Sticky mobile add-to-cart bar (research P0-1): price + ATC within
     thumb reach, above the bottom nav. Desktop hides it. -->
<div class="fixed inset-x-0 bottom-14 z-40 border-t border-line bg-white/95 px-4 py-3 shadow-[0_-4px_20px_rgba(20,38,26,0.08)] backdrop-blur lg:hidden">
	<div class="mx-auto flex max-w-7xl items-center justify-between gap-3">
		<div class="min-w-0">
			<p class="truncate text-sm font-bold text-ink">{product.name} · {product.unit}</p>
			<p class="text-base font-black text-ink">{inr(product.price)} <span class="text-xs font-semibold text-muted line-through">{inr(product.mrp)}</span></p>
		</div>
		{#if inCart}
			<div class="flex shrink-0 items-center rounded-full bg-leaf-soft p-1">
				<button type="button" onclick={() => setQty(product.slug, inCart.qty - 1)} aria-label={`One less ${product.name}`} class="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink shadow-sm">
					<Minus size={17} aria-hidden="true" />
				</button>
				<span class="w-10 text-center text-sm font-black">{inCart.qty}</span>
				<button type="button" onclick={() => setQty(product.slug, inCart.qty + 1)} aria-label={`One more ${product.name}`} class="flex h-11 w-11 items-center justify-center rounded-full bg-leaf text-white shadow-sm">
					<Plus size={17} aria-hidden="true" />
				</button>
			</div>
		{:else}
			<button
				type="button"
				onclick={addFromButton}
				class="flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-leaf px-6 text-sm font-bold text-white shadow-md active:scale-95"
			>
				<Plus size={17} aria-hidden="true" /> Add · {inr(product.price)}
			</button>
		{/if}
	</div>
</div>
<!-- Spacer so the sticky bar never covers content on mobile -->
<div class="h-16 lg:hidden" aria-hidden="true"></div>
