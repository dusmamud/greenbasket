<script lang="ts">
	// Stores — Mumbai delivery areas (research P1-4): each area its own page
	// with pincode checker, ETA, hours, fees. Local-SEO surface.
	import { Clock, MapPin } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { storeAreas } from '#lib/data/site.ts';

	let pincode = $state('');
	let checkResult = $state<string | null>(null);

	function check() {
		const hit = storeAreas.find((a) => a.pincode === pincode.trim());
		checkResult = hit
			? `Yes! We deliver to ${hit.name} (${hit.pincode}) in about ${hit.eta}.`
			: pincode.trim().length === 6
				? `We don't serve ${pincode.trim()} yet — Bandra West (400050) is our nearest area. More areas are coming soon.`
				: 'Enter a 6-digit Mumbai pincode to check delivery.';
	}
</script>

<svelte:head>
	<title>Stores & Delivery Areas — GreenBasket Mumbai</title>
	<meta name="description" content="GreenBasket delivers across Mumbai — Bandra, Andheri, Powai, Juhu, Dadar, Borivali. Check your pincode and delivery time." />
</svelte:head>

<PageHero
	eyebrow="Stores"
	title="We deliver across Mumbai"
	sub="Six dark stores, one promise: fresh groceries at your door in about 30 minutes, 6 am to 11 pm."
/>

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
	<!-- Pincode checker -->
	<form
		onsubmit={(e) => {
			e.preventDefault();
			check();
		}}
		class="mx-auto max-w-xl rounded-3xl border border-line bg-white p-6 shadow-sm"
	>
		<label for="pincode" class="font-display text-lg font-extrabold text-ink">Check delivery to your pincode</label>
		<div class="mt-3 flex gap-2">
			<input
				id="pincode"
				type="text"
				inputmode="numeric"
				maxlength="6"
				bind:value={pincode}
				placeholder="e.g. 400050"
				class="min-w-0 flex-1 rounded-full border border-line bg-leaf-pale/60 px-5 py-3 text-base outline-none focus:border-leaf"
			/>
			<button type="submit" class="shrink-0 rounded-full bg-leaf px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-leaf-dark">Check</button>
		</div>
		{#if checkResult}
			<p role="status" class="mt-3 rounded-2xl bg-leaf-pale px-4 py-3 text-sm font-bold text-leaf-dark">{checkResult}</p>
		{/if}
	</form>

	<div class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each storeAreas as area}
			<article class="rounded-3xl border border-line bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
				<h2 class="flex items-center gap-2 font-display text-xl font-extrabold text-ink"><MapPin size={19} class="text-leaf-dark" aria-hidden="true" /> {area.name}</h2>
				<p class="mt-1 text-sm text-muted">{area.address} · {area.pincode}</p>
				<dl class="mt-4 space-y-2 text-sm">
					<div class="flex justify-between"><dt class="text-muted">Delivery in</dt><dd class="font-bold text-ink">{area.eta}</dd></div>
					<div class="flex justify-between"><dt class="text-muted">Hours</dt><dd class="font-bold text-ink">{area.hours}</dd></div>
					<div class="flex justify-between"><dt class="text-muted">Phone</dt><dd class="font-bold text-ink">{area.phone}</dd></div>
				</dl>
				<a
					href={`/stores/${area.slug}`}
					class="mt-5 block rounded-full bg-leaf px-5 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-leaf-dark"
					>Shop in {area.name}</a
				>
			</article>
		{/each}
	</div>
</section>
