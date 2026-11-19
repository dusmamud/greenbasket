<script lang="ts">
	// Gift cards (research P2-2) — mock: pick an amount, send by email.
	import { Gift, Mail } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { giftCardAmounts, inr } from '#lib/data/site.ts';

	let amount = $state(500);
	let email = $state('');
	let sent = $state(false);

	function send(e: SubmitEvent) {
		e.preventDefault();
		if (!email.includes('@')) return;
		sent = true;
	}
</script>

<svelte:head>
	<title>Gift Cards — GreenBasket</title>
	<meta name="description" content="GreenBasket gift cards — the gift of fresh groceries. Delivered by email, never expires." />
</svelte:head>

<PageHero
	eyebrow="Gift Cards"
	title="Give fresh groceries"
	sub="A GreenBasket gift card never expires, works on everything in the store, and lands in their inbox in minutes."
/>

<section class="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
	<form onsubmit={send} class="rounded-3xl border border-line bg-white p-6 sm:p-8">
		<p class="flex items-center gap-2 font-display text-lg font-extrabold text-ink"><Gift size={20} class="text-leaf-dark" aria-hidden="true" /> Choose an amount</p>
		<div class="mt-4 grid grid-cols-4 gap-2">
			{#each giftCardAmounts as a}
				<button
					type="button"
					onclick={() => (amount = a)}
					aria-pressed={amount === a}
					class="min-h-12 rounded-2xl border-2 text-sm font-black transition-colors {amount === a ? 'border-leaf bg-leaf-pale text-leaf-dark' : 'border-line text-ink'}"
					>{inr(a)}</button
				>
			{/each}
		</div>
		<label for="gift-email" class="mt-6 block text-sm font-bold text-ink">Recipient's email</label>
		<div class="mt-2 flex gap-2">
			<input
				id="gift-email"
				type="email"
				bind:value={email}
				required
				placeholder="friend@example.com"
				class="min-w-0 flex-1 rounded-full border border-line bg-leaf-pale/60 px-5 py-3 text-base outline-none focus:border-leaf"
			/>
			<button type="submit" class="flex shrink-0 items-center gap-2 rounded-full bg-leaf px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-leaf-dark">
				<Mail size={16} aria-hidden="true" /> Send
			</button>
		</div>
		{#if sent}
			<p role="status" class="mt-4 rounded-2xl bg-leaf-pale px-4 py-3 text-sm font-bold text-leaf-dark">
				✓ A {inr(amount)} gift card is on its way to {email} (demo — nothing was sent or charged).
			</p>
		{/if}
		<ul class="mt-6 space-y-2 text-sm text-muted">
			<li>• Never expires, no fees, no minimum order.</li>
			<li>• Covers items, delivery and taxes.</li>
			<li>• Balance can be checked from your account wallet.</li>
		</ul>
	</form>
</section>
