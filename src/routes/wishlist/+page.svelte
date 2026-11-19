<script lang="ts">
	// Wishlist — saved favourites (research P0-3). Persisted in localStorage
	// via the wishlist store; move to cart in one tap.
	import { Heart, ShoppingCart } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import { addProduct } from '#lib/cart.svelte.ts';
	import { wishlist } from '#lib/wishlist.svelte.ts';
	import { bestsellers, products } from '#lib/data/site.ts';

	const saved = $derived(products.filter((p) => wishlist.has(p.slug)));

	function moveAllToCart() {
		for (const p of saved) addProduct(p.slug);
		wishlist.clear();
	}
</script>

<svelte:head>
	<title>My Wishlist — GreenBasket</title>
	<meta name="description" content="Your saved favourites at GreenBasket — move them to cart in one tap." />
	<meta name="robots" content="noindex" />
</svelte:head>

<PageHero
	eyebrow="Wishlist"
	title="Your favourites"
	sub="Everything you saved for later — one tap to add it to your cart."
/>

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
	{#if saved.length > 0}
		<div class="flex flex-wrap items-center justify-between gap-3">
			<h2 class="font-display text-xl font-extrabold text-ink">{saved.length} saved item{saved.length === 1 ? '' : 's'}</h2>
			<button
				type="button"
				onclick={moveAllToCart}
				class="flex min-h-11 items-center gap-2 rounded-full bg-leaf px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-leaf-dark"
			>
				<ShoppingCart size={16} aria-hidden="true" /> Move all to cart
			</button>
		</div>
		<div class="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
			{#each saved as product (product.slug)}
				<ProductCard {product} />
			{/each}
		</div>
	{:else}
		<div class="rounded-3xl border border-line bg-white px-6 py-14 text-center">
			<Heart size={44} class="mx-auto text-muted" aria-hidden="true" />
			<h2 class="mt-4 font-display text-2xl font-extrabold text-ink">Nothing saved yet</h2>
			<p class="mx-auto mt-2 max-w-md text-sm text-muted">
				Tap the heart on any product to save it here — handy for the weekly shop, or things you want to compare later.
			</p>
			<a href="/shop" class="mt-6 inline-block rounded-full bg-leaf px-6 py-3 text-sm font-bold text-white">Browse bestsellers</a>
		</div>
		<h3 class="mt-12 font-display text-xl font-extrabold text-ink">Bestsellers to start with</h3>
		<div class="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
			{#each bestsellers as product (product.slug)}
				<ProductCard {product} />
			{/each}
		</div>
	{/if}
</section>
