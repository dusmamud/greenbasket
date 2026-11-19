<script lang="ts">
	// App page (research P2-2) — PWA install prompt mock + QR mock.
	import { Bell, Smartphone, Zap } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';

	let installed = $state(false);
</script>

<svelte:head>
	<title>Get the App — GreenBasket</title>
	<meta name="description" content="GreenBasket on your phone — install the app, get order updates and reorder in one tap." />
</svelte:head>

<PageHero
	eyebrow="Get the App"
	title="GreenBasket in your pocket"
	sub="Install the app from your browser — no app store needed. Order updates, one-tap reorder, and your list always with you."
/>

<section class="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
	<div class="grid gap-6 md:grid-cols-3">
		<article class="rounded-3xl border border-line bg-white p-6 text-center">
			<Zap size={26} class="mx-auto text-leaf-dark" aria-hidden="true" />
			<h2 class="mt-3 font-display text-lg font-extrabold text-ink">Faster than the browser</h2>
			<p class="mt-2 text-sm text-muted">Your cart, addresses and favourites load instantly, even on 4G.</p>
		</article>
		<article class="rounded-3xl border border-line bg-white p-6 text-center">
			<Bell size={26} class="mx-auto text-leaf-dark" aria-hidden="true" />
			<h2 class="mt-3 font-display text-lg font-extrabold text-ink">Live order updates</h2>
			<p class="mt-2 text-sm text-muted">Packed, picked, out for delivery — a ping at every step.</p>
		</article>
		<article class="rounded-3xl border border-line bg-white p-6 text-center">
			<Smartphone size={26} class="mx-auto text-leaf-dark" aria-hidden="true" />
			<h2 class="mt-3 font-display text-lg font-extrabold text-ink">One-tap reorder</h2>
			<p class="mt-2 text-sm text-muted">Last week's basket, back in your cart with a single tap.</p>
		</article>
	</div>

	<div class="mx-auto mt-10 max-w-xl rounded-3xl border border-line bg-white p-6 text-center sm:p-8">
		<h2 class="font-display text-xl font-extrabold text-ink">Install in 10 seconds</h2>
		<ol class="mx-auto mt-4 max-w-sm space-y-2 text-left text-sm text-muted">
			<li><strong class="text-ink">1.</strong> Open greenbasket.in in Chrome or Safari on your phone.</li>
			<li><strong class="text-ink">2.</strong> Tap the browser menu → “Add to Home screen”.</li>
			<li><strong class="text-ink">3.</strong> That's it — the GreenBasket icon is on your home screen.</li>
		</ol>
		<button
			type="button"
			onclick={() => (installed = true)}
			class="mt-6 rounded-full bg-leaf px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-leaf-dark"
		>
			{#if installed}✓ Added to home screen (demo){:else}Add to home screen{/if}
		</button>
	</div>
</section>
