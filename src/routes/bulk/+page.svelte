<script lang="ts">
	// Bulk / B2B (research P2-2) — society, café, office and restaurant
	// packs with GST invoice. Mock quote form only.
	import { Building2, FileText } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { bulkPacks, inr } from '#lib/data/site.ts';

	let org = $state('');
	let quoted = $state(false);
</script>

<svelte:head>
	<title>Bulk & Business — GreenBasket</title>
	<meta name="description" content="GreenBasket for societies, cafés, offices and restaurants — bulk packs, GST invoices and scheduled weekly delivery." />
</svelte:head>

<PageHero
	eyebrow="Bulk & Business"
	title="Groceries for your whole building"
	sub="Societies, cafés, offices and restaurants — bulk packs at wholesale prices, GST invoice included, weekly slots."
/>

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
	<div class="grid gap-6 md:grid-cols-2">
		{#each bulkPacks as pack}
			<article class="rounded-3xl border border-line bg-white p-6 shadow-sm">
				<h2 class="flex items-center gap-2 font-display text-xl font-extrabold text-ink"><Building2 size={19} class="text-leaf-dark" aria-hidden="true" /> {pack.name}</h2>
				<p class="mt-2 text-sm leading-relaxed text-muted">{pack.detail}</p>
				<p class="mt-4 flex items-baseline gap-2">
					<span class="font-display text-2xl font-extrabold text-ink">{inr(pack.price)}</span>
					<span class="text-sm font-medium text-muted line-through">{inr(pack.mrp)}</span>
					<span class="text-xs font-black text-leaf-dark">SAVE {inr(pack.mrp - pack.price)}</span>
				</p>
				<p class="mt-1 flex items-center gap-1.5 text-xs font-semibold text-muted"><FileText size={13} aria-hidden="true" /> GST invoice included</p>
			</article>
		{/each}
	</div>

	<form
		onsubmit={(e) => {
			e.preventDefault();
			quoted = true;
		}}
		class="mx-auto mt-10 max-w-xl rounded-3xl border border-line bg-white p-6 sm:p-8"
	>
		<h2 class="font-display text-xl font-extrabold text-ink">Request a custom quote</h2>
		<p class="mt-1 text-sm text-muted">Tell us your organisation and monthly volume — we reply within one working day.</p>
		<label for="org" class="mt-4 block text-sm font-bold text-ink">Organisation name</label>
		<input
			id="org"
			type="text"
			bind:value={org}
			required
			placeholder="e.g. Sunrise Housing Society"
			class="mt-2 w-full rounded-full border border-line bg-leaf-pale/60 px-5 py-3 text-base outline-none focus:border-leaf"
		/>
		<button type="submit" class="mt-4 w-full rounded-full bg-leaf py-3.5 text-sm font-bold text-white transition-colors hover:bg-leaf-dark">Request quote</button>
		{#if quoted}
			<p role="status" class="mt-4 rounded-2xl bg-leaf-pale px-4 py-3 text-sm font-bold text-leaf-dark">
				✓ Thanks {org}! Your quote request is noted (demo — nothing was submitted).
			</p>
		{/if}
	</form>
</section>
