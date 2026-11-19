<script lang="ts">
	// Returns & refunds policy (research P1-6 / P2-1) — plain, honest rules:
	// perishables refunded not collected, 24h window, wallet/bank timelines.
	import PageHero from '#lib/components/PageHero.svelte';
</script>

<svelte:head>
	<title>Returns & Refunds — GreenBasket</title>
	<meta name="description" content="GreenBasket returns & refunds — damaged or wrong items replaced or refunded within 24 hours, no questions asked." />
</svelte:head>

<PageHero
	eyebrow="Policy"
	title="Returns & refunds"
	sub="If something arrives damaged or wrong, we fix it — replacement or refund, your choice, within 24 hours."
/>

<section class="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
	<div class="space-y-4">
		<article class="rounded-3xl border border-line bg-white p-6">
			<h2 class="font-display text-lg font-extrabold text-ink">The 24-hour promise</h2>
			<p class="mt-2 text-sm leading-relaxed text-muted">
				Report a problem within 24 hours of delivery — from the Orders page, the Help centre, or WhatsApp — and we will replace the item or refund you. No questions asked, no forms, no return pickup for perishables.
			</p>
		</article>
		<article class="rounded-3xl border border-line bg-white p-6">
			<h2 class="font-display text-lg font-extrabold text-ink">Perishables: refunded, not collected</h2>
			<p class="mt-2 text-sm leading-relaxed text-muted">
				Milk, vegetables, bread, eggs and other fresh items are never collected back — for hygiene, we refund instead. Send us a photo if you can; it helps us fix the source, but it is not required for the refund.
			</p>
		</article>
		<article class="rounded-3xl border border-line bg-white p-6">
			<h2 class="font-display text-lg font-extrabold text-ink">Non-perishables: replacement or pickup</h2>
			<p class="mt-2 text-sm leading-relaxed text-muted">
				Packaged goods (atta, rice, salt, snacks) in unopened, undamaged packing can be picked up and replaced within 7 days of delivery. Opened packs with a quality issue are refunded, not collected.
			</p>
		</article>
		<article class="rounded-3xl border border-line bg-white p-6">
			<h2 class="font-display text-lg font-extrabold text-ink">Refund timelines</h2>
			<ul class="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted">
				<li>GreenBasket wallet — instantly, usable on your next order.</li>
				<li>UPI / card / netbanking — 3–5 working days to the source account.</li>
				<li>Cash on delivery — refunded to your wallet instantly, or to your bank in 3–5 days on request.</li>
			</ul>
		</article>
		<article class="rounded-3xl border border-line bg-white p-6">
			<h2 class="font-display text-lg font-extrabold text-ink">Substitutions</h2>
			<p class="mt-2 text-sm leading-relaxed text-muted">
				We never silently swap an item. At checkout you choose: allow a similar substitute, refund the item, or call me first. If a substitute was delivered, you can reject it from the tracking screen and we refund it in full.
			</p>
		</article>
	</div>
	<p class="mt-8 text-center text-sm text-muted">
		Questions? <a href="/help" class="font-bold text-leaf-dark hover:underline">Visit the Help centre</a> or call <a href="tel:+919876543210" class="font-bold text-leaf-dark">+91 98765 43210</a>.
	</p>
</section>
