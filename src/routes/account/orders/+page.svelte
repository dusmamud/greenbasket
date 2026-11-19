<script lang="ts">
	// Orders list — every order has a 1-tap "Reorder" (buy again) button
	// (research P0-3: the single biggest retention gap in a basic site).
	import { Package, RotateCcw } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { addProduct } from '#lib/cart.svelte.ts';
	import { drawer } from '#lib/drawer.svelte.ts';
	import { inr, mockOrders, products } from '#lib/data/site.ts';

	let reordered = $state<string | null>(null);

	function reorder(id: string) {
		const order = mockOrders.find((o) => o.id === id);
		if (!order) return;
		for (const item of order.items) {
			for (let i = 0; i < item.qty; i++) addProduct(item.slug);
		}
		reordered = id;
		drawer.open = true;
		setTimeout(() => (reordered = null), 3000);
	}

	function itemNames(id: string) {
		const order = mockOrders.find((o) => o.id === id);
		if (!order) return '';
		return order.items
			.map((i) => {
				const p = products.find((x) => x.slug === i.slug);
				return p ? `${p.name} × ${i.qty}` : '';
			})
			.filter(Boolean)
			.join(', ');
	}
</script>

<svelte:head>
	<title>My Orders — GreenBasket</title>
	<meta name="description" content="Your GreenBasket orders — reorder any basket in one tap." />
	<meta name="robots" content="noindex" />
</svelte:head>

<PageHero eyebrow="My Orders" title="Order history" sub="Reorder any basket in one tap — the fastest way to restock the weekly shop." />

<section class="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
	{#if reordered}
		<p role="status" class="mb-6 rounded-2xl bg-leaf-pale px-5 py-4 text-sm font-bold text-leaf-dark">
			✓ Order {reordered} added to your cart — review and place it again.
		</p>
	{/if}
	<ul class="space-y-4">
		{#each mockOrders as order}
			<li class="rounded-3xl border border-line bg-white p-6">
				<div class="flex flex-wrap items-start justify-between gap-3">
					<div>
						<p class="flex items-center gap-2 font-display text-lg font-extrabold text-ink">
							<Package size={18} class="text-leaf-dark" aria-hidden="true" /> {order.id}
						</p>
						<p class="mt-1 text-sm text-muted">{order.date} · {order.items.length} items · {inr(order.subtotal)}</p>
						<p class="mt-2 text-sm text-ink">{itemNames(order.id)}</p>
					</div>
					<span
						class="rounded-full px-3 py-1 text-xs font-black {order.status === 'Delivered'
							? 'bg-leaf-pale text-leaf-dark'
							: 'bg-amber-100 text-amber-700'}">{order.status}</span
					>
				</div>
				<div class="mt-4 flex flex-wrap gap-2">
					<button
						type="button"
						onclick={() => reorder(order.id)}
						class="flex min-h-11 items-center gap-2 rounded-full bg-leaf px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-leaf-dark"
					>
						<RotateCcw size={15} aria-hidden="true" /> Reorder
					</button>
					<a
						href={`/account/orders/${order.id}`}
						class="flex min-h-11 items-center rounded-full border border-line px-5 py-2.5 text-sm font-bold text-ink transition-colors hover:border-leaf"
						>View details</a
					>
					<a
						href={`/track-order?id=${order.id}`}
						class="flex min-h-11 items-center rounded-full border border-line px-5 py-2.5 text-sm font-bold text-ink transition-colors hover:border-leaf"
						>Track</a
					>
				</div>
			</li>
		{/each}
	</ul>
</section>
