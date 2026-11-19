<script lang="ts">
	// Product card: photo, veg mark, rating, price + MRP + % off + ₹/unit,
	// freshness line, wishlist heart, add-to-cart that turns into a qty
	// stepper once the item is in the cart (with fly-to-cart feedback).
	import { Heart, Minus, Plus } from '@lucide/svelte';
	import Picture from '#lib/components/Picture.svelte';
	import Stars from '#lib/components/Stars.svelte';
	import { addProduct, cart, setQty } from '#lib/cart.svelte.ts';
	import { wishlist } from '#lib/wishlist.svelte.ts';
	import { flyToCart } from '#lib/flyToCart.ts';
	import { inr, perUnit, type Product } from '#lib/data/site.ts';

	let { product }: { product: Product } = $props();

	const inCart = $derived(cart.lines.find((l) => l.slug === product.slug));
	const off = $derived(Math.round(((product.mrp - product.price) / product.mrp) * 100));
	const wished = $derived(wishlist.has(product.slug));

	function addFromButton(e: MouseEvent) {
		addProduct(product.slug);
		flyToCart(e.currentTarget as HTMLElement);
	}
</script>

<article class="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
	<a href={`/shop/${product.slug}`} class="relative block bg-white" aria-label={product.name}>
		<Picture
			name={product.image}
			alt={product.name}
			width={800}
			height={800}
			sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
			imgClass="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
		/>
		{#if product.badge}
			<span class="absolute top-3 left-3 rounded-full bg-leaf px-3 py-1 text-[0.65rem] font-black tracking-wide text-white uppercase">{product.badge}</span>
		{/if}
		<span class="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-md border bg-white {product.veg ? 'border-leaf' : 'border-[#a33]'} shadow-sm" title={product.veg ? 'Vegetarian' : 'Non-vegetarian'} aria-label={product.veg ? 'Vegetarian' : 'Non-vegetarian'}>
			<span class="h-2.5 w-2.5 rounded-full {product.veg ? 'bg-leaf' : 'bg-[#a33]'}"></span>
		</span>
		<button
			type="button"
			onclick={() => wishlist.toggle(product.slug)}
			aria-pressed={wished}
			aria-label={wished ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
			class="absolute right-3 bottom-3 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-200 hover:scale-110 active:scale-95 {wished ? 'text-red-500' : 'text-muted'}"
		>
			<Heart size={19} fill={wished ? 'currentColor' : 'none'} aria-hidden="true" />
		</button>
	</a>
	<div class="flex flex-1 flex-col p-4">
		<a href={`/shop/${product.slug}`} class="min-w-0">
			<h3 class="truncate font-display text-base font-bold text-ink transition-colors hover:text-leaf-dark">{product.name}</h3>
		</a>
		<p class="mt-0.5 text-xs font-medium text-muted">{product.brand} · {product.unit}</p>
		<p class="mt-1 text-[0.7rem] font-bold tracking-wide text-leaf-dark uppercase">Packed today · {perUnit(product.slug)}</p>
		<p class="mt-2 flex items-center gap-1.5">
			<Stars rating={product.rating} size={13} />
			<span class="text-xs font-semibold text-muted">{product.rating.toFixed(1)} ({product.reviews})</span>
		</p>
		<div class="mt-3 flex items-baseline gap-2">
			<span class="font-display text-lg font-extrabold text-ink">{inr(product.price)}</span>
			<span class="text-sm font-medium text-muted line-through">{inr(product.mrp)}</span>
			<span class="text-xs font-black text-leaf-dark">{off}% OFF</span>
		</div>
		<div class="mt-3 flex-1"></div>
		{#if inCart}
			<div class="flex items-center justify-between rounded-full bg-leaf-soft p-1">
				<button type="button" onclick={() => setQty(product.slug, inCart.qty - 1)} aria-label={`One less ${product.name}`} class="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink shadow-sm">
					<Minus size={16} aria-hidden="true" />
				</button>
				<span class="text-sm font-black text-ink" aria-label={`${inCart.qty} of ${product.name} in cart`}>{inCart.qty} in cart</span>
				<button type="button" onclick={() => setQty(product.slug, inCart.qty + 1)} aria-label={`One more ${product.name}`} class="flex h-10 w-10 items-center justify-center rounded-full bg-leaf text-white shadow-sm">
					<Plus size={16} aria-hidden="true" />
				</button>
			</div>
		{:else}
			<button
				type="button"
				onclick={addFromButton}
				class="flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-leaf text-sm font-bold text-white transition-all duration-200 hover:bg-leaf-dark active:scale-95"
				aria-label={`Add ${product.name} to cart`}
			>
				<Plus size={17} aria-hidden="true" /> Add to Cart
			</button>
		{/if}
	</div>
</article>
