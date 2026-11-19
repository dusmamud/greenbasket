<script lang="ts">
	import { Package, RefreshCcw, Truck } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { site } from '#lib/data/site.ts';
</script>

<svelte:head>
	<title>Shipping & Delivery — GreenBasket | 30-Minute Delivery, Easy Returns</title>
	<meta name="description" content="GreenBasket delivery: 30–45 minutes across Mumbai, free over ₹499, scheduled slots, and no-questions-asked returns within 24 hours." />
	<link rel="canonical" href="https://greenbasket-4yz.pages.dev/shipping" />
</svelte:head>

<PageHero
	eyebrow="Fast & honest"
	title="Shipping & delivery"
	sub="Groceries at your door in about 30 minutes — or scheduled for the morning fresh slot. Returns are simple: tell us within 24 hours."
/>

<section class="bg-white py-10 sm:py-14" aria-label="Shipping and returns">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid gap-4 md:grid-cols-3">
			<div class="rounded-3xl bg-leaf-pale p-6 ring-1 ring-line">
				<Truck size={26} class="text-leaf-dark" aria-hidden="true" />
				<h2 class="mt-3 font-display text-xl font-extrabold text-ink">Delivery</h2>
				<ul class="mt-2 space-y-2 text-sm leading-relaxed text-muted">
					<li>Most orders arrive in 30–45 minutes across Mumbai.</li>
					<li>Free delivery on orders above ₹499; ₹40 below that.</li>
					<li>Delivery runs 6:00 AM – 10:30 PM, every day.</li>
					<li>Choose a 2-hour slot at checkout, or the 6–8 AM fresh slot for tomorrow.</li>
				</ul>
			</div>
			<div class="rounded-3xl bg-leaf-pale p-6 ring-1 ring-line">
				<Package size={26} class="text-leaf-dark" aria-hidden="true" />
				<h2 class="mt-3 font-display text-xl font-extrabold text-ink">Packing</h2>
				<ul class="mt-2 space-y-2 text-sm leading-relaxed text-muted">
					<li>Vegetables in paper and cloth bags — no loose plastic.</li>
					<li>Milk, curd and eggs travel chilled in insulated boxes.</li>
					<li>Every item is weighed twice before it leaves the store.</li>
					<li>Your rider’s name and number are shared on WhatsApp.</li>
				</ul>
			</div>
			<div class="rounded-3xl bg-leaf-pale p-6 ring-1 ring-line">
				<RefreshCcw size={26} class="text-leaf-dark" aria-hidden="true" />
				<h2 class="mt-3 font-display text-xl font-extrabold text-ink">Returns & refunds</h2>
				<ul class="mt-2 space-y-2 text-sm leading-relaxed text-muted">
					<li>Wrong, damaged or stale item? Tell us within 24 hours.</li>
					<li>We replace it on the next run, or refund you — your choice.</li>
					<li>Refunds go back to your UPI/card in 1–3 working days.</li>
					<li>No return pickup needed for fresh produce — just send a photo.</li>
				</ul>
			</div>
		</div>

		<div class="mt-10 rounded-3xl bg-leaf p-8 text-center text-white sm:p-10">
			<h2 class="font-display text-3xl font-extrabold">Need help with an order?</h2>
			<p class="mx-auto mt-3 max-w-xl leading-relaxed text-white/90">
				Call {site.phoneDisplay} any time, or message us on WhatsApp. A human picks up — 24/7.
			</p>
			<div class="mt-5 flex flex-wrap justify-center gap-3">
				<a href="/track-order" class="flex min-h-12 items-center rounded-full bg-white px-7 text-sm font-bold text-leaf-dark">Track my order</a>
				<a href="/contact" class="flex min-h-12 items-center rounded-full border-2 border-white px-7 text-sm font-bold text-white">Contact us</a>
			</div>
		</div>
	</div>
</section>
