<script lang="ts">
	// Sustainability (research P2-2) — honest mock claims only: paper bags,
	// EV pilots, local sourcing, no plastic in fresh produce.
	import { Bike, Leaf, Recycle, ShoppingBag } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
</script>

<svelte:head>
	<title>Sustainability — GreenBasket</title>
	<meta name="description" content="How GreenBasket keeps groceries kinder to the planet — paper bags, EV delivery pilots, local farms and less plastic." />
</svelte:head>

<PageHero
	eyebrow="Sustainability"
	title="Fresh for you, lighter on the planet"
	sub="Small choices, every order — because the city we deliver in is the city we live in."
/>

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
	<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
		<article class="rounded-3xl border border-line bg-white p-6">
			<ShoppingBag size={26} class="text-leaf-dark" aria-hidden="true" />
			<h2 class="mt-3 font-display text-lg font-extrabold text-ink">Paper, not plastic</h2>
			<p class="mt-2 text-sm leading-relaxed text-muted">Fresh produce travels in paper bags. No single-use plastic in your vegetable order, ever.</p>
		</article>
		<article class="rounded-3xl border border-line bg-white p-6">
			<Bike size={26} class="text-leaf-dark" aria-hidden="true" />
			<h2 class="mt-3 font-display text-lg font-extrabold text-ink">EV delivery pilots</h2>
			<p class="mt-2 text-sm leading-relaxed text-muted">Electric two-wheelers already run our Bandra and Juhu routes, with more areas joining every quarter.</p>
		</article>
		<article class="rounded-3xl border border-line bg-white p-6">
			<Leaf size={26} class="text-leaf-dark" aria-hidden="true" />
			<h2 class="mt-3 font-display text-lg font-extrabold text-ink">Local farms first</h2>
			<p class="mt-2 text-sm leading-relaxed text-muted">We buy from farms around Nashik and Pune, cutting food miles and paying farmers directly.</p>
		</article>
		<article class="rounded-3xl border border-line bg-white p-6">
			<Recycle size={26} class="text-leaf-dark" aria-hidden="true" />
			<h2 class="mt-3 font-display text-lg font-extrabold text-ink">Return the packaging</h2>
			<p class="mt-2 text-sm leading-relaxed text-muted">Hand your paper bags and crates back to the rider on your next order — we reuse them.</p>
		</article>
	</div>
	<p class="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-muted">
		This page describes our demo store's stated policies. Figures shown here are illustrative mock content for design review, not audited claims.
	</p>
</section>
