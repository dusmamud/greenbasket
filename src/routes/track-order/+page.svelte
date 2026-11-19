<script lang="ts">
	import { page } from '$app/state';
	import PageHero from '#lib/components/PageHero.svelte';

	let orderId = $state('');
	let lookedUp = $state(false);
	let error = $state('');

	// searchParams are unavailable during prerender — read them only in the
	// browser ($effect never runs on the server).
	$effect(() => {
		const o = page.url.searchParams.get('order');
		if (o) {
			orderId = o;
			lookedUp = true;
		}
	});

	const steps = [
		{ label: 'Order placed', time: 'Just now', done: true },
		{ label: 'Packed', time: '5 mins later', done: true },
		{ label: 'Out for delivery', time: 'On the way', done: false, active: true },
		{ label: 'Delivered', time: 'ETA 30–45 mins', done: false }
	];

	function track(e: SubmitEvent) {
		e.preventDefault();
		if (!orderId.trim()) {
			error = 'Please enter your order ID (for example GB-248136).';
			return;
		}
		error = '';
		lookedUp = true;
	}
</script>

<svelte:head>
	<title>Track My Order — GreenBasket</title>
	<meta name="description" content="Track your GreenBasket grocery order — from packing to your door, live." />
	<link rel="canonical" href="https://greenbasket-4yz.pages.dev/track-order" />
</svelte:head>

<PageHero
	eyebrow="Where is my order?"
	title="Track my order"
	sub="Enter your order ID (from your confirmation) to see where your groceries are. This is a mock tracker — the status shown is a demo."
/>

<section class="bg-white py-10 sm:py-14" aria-label="Order tracking">
	<div class="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
		<form onsubmit={track} class="flex flex-col gap-3 sm:flex-row">
			<label class="sr-only" for="order-id">Order ID</label>
			<input
				id="order-id"
				type="text"
				bind:value={orderId}
				placeholder="GB-248136"
				class="min-h-12 min-w-0 flex-1 rounded-full border border-line bg-leaf-pale/50 px-5 text-base font-semibold outline-none placeholder:text-muted focus:border-leaf focus:bg-white"
			/>
			<button type="submit" class="flex min-h-12 items-center justify-center rounded-full bg-leaf px-8 text-sm font-bold text-white transition-colors hover:bg-leaf-dark">
				Track order
			</button>
		</form>
		{#if error}
			<p role="alert" class="mt-3 rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</p>
		{/if}
		<p class="mt-3 text-center text-sm text-muted">Demo order ID: <button type="button" class="font-bold text-leaf-dark underline underline-offset-2" onclick={() => { orderId = 'GB-248136'; lookedUp = true; }}>GB-248136</button></p>

		{#if lookedUp && orderId.trim()}
			<div class="mt-8 rounded-3xl bg-leaf-pale p-6 ring-1 ring-line sm:p-8">
				<div class="flex flex-wrap items-baseline justify-between gap-2">
					<h2 class="font-display text-2xl font-extrabold text-ink">Order {orderId.trim().toUpperCase()}</h2>
					<p class="text-sm font-bold text-leaf-dark">Arriving in ~20 mins</p>
				</div>
				<ol class="mt-8 space-y-0">
					{#each steps as s, i}
						<li class="relative flex gap-4 pb-8 last:pb-0">
							{#if i < steps.length - 1}
								<span class="absolute top-9 left-[17px] h-[calc(100%-2rem)] w-0.5 {s.done ? 'bg-leaf' : 'bg-line'}" aria-hidden="true"></span>
							{/if}
							<span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-black {s.done ? 'bg-leaf text-white' : s.active ? 'bg-white text-leaf-dark ring-2 ring-leaf' : 'bg-white text-muted ring-2 ring-line'}">
								{s.done ? '✓' : i + 1}
							</span>
							<div>
								<p class="font-bold text-ink">{s.label}</p>
								<p class="text-sm text-muted">{s.time}</p>
							</div>
						</li>
					{/each}
				</ol>
				<p class="mt-6 border-t border-line pt-4 text-sm leading-relaxed text-muted">
					Your rider is on the way with your order. Keep your phone handy — they will call if they cannot find your building.
				</p>
			</div>
		{/if}
	</div>
</section>
