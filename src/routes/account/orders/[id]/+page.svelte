<script lang="ts">
	// Order detail — items, totals, 5-step live tracker mock, 1-tap reorder,
	// GST invoice line (mock). Prerendered per order id.
	import { Check, Package, RotateCcw } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { addProduct } from '#lib/cart.svelte.ts';
	import { drawer } from '#lib/drawer.svelte.ts';
	import { inr, mockOrders, products } from '#lib/data/site.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const order = mockOrders.find((o) => o.id === data.id);
	const steps = ['Confirmed', 'Packed', 'Picked up', 'Out for delivery', 'Delivered'];
	const activeStep = order?.status === 'Delivered' ? 4 : order?.status === 'Out for delivery' ? 3 : 1;

	let reordered = $state(false);

	function reorder() {
		if (!order) return;
		for (const item of order.items) {
			for (let i = 0; i < item.qty; i++) addProduct(item.slug);
		}
		reordered = true;
		drawer.open = true;
	}
</script>

<svelte:head>
	<title>{order ? `Order ${order.id} — GreenBasket` : 'Order not found — GreenBasket'}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

{#if order}
	<PageHero eyebrow="Order {order.id}" title={order.status} sub="{order.date} · {order.items.length} items · {inr(order.subtotal)}" />

	<section class="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
		<!-- 5-step tracker -->
		<div class="rounded-3xl border border-line bg-white p-6">
			<h2 class="font-display text-lg font-extrabold text-ink">Delivery status</h2>
			<ol class="mt-6 space-y-0">
				{#each steps as step, i}
					<li class="relative flex gap-4 pb-6 last:pb-0">
						{#if i < steps.length - 1}
							<span class="absolute top-7 left-[13px] h-[calc(100%-28px)] w-0.5 {i < activeStep ? 'bg-leaf' : 'bg-line'}" aria-hidden="true"></span>
						{/if}
						<span
							class="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full {i <= activeStep
								? 'bg-leaf text-white'
								: 'bg-line text-muted'}"
						>
							{#if i <= activeStep}<Check size={14} aria-hidden="true" />{:else}<span class="h-2 w-2 rounded-full bg-white"></span>{/if}
						</span>
						<div class="pt-0.5">
							<p class="text-sm font-bold {i <= activeStep ? 'text-ink' : 'text-muted'}">{step}</p>
							{#if i === activeStep && order.eta}
								<p class="text-xs text-muted">Arriving in about {order.eta} · Rider: Arjun (★★ 4.9)</p>
							{/if}
						</div>
					</li>
				{/each}
			</ol>
			{#if order.status === 'Out for delivery'}
				<p class="mt-2 rounded-2xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
					Substitution notice: Farm Eggs (6 pcs) was replaced with Farm Eggs (12 pcs) at the same per-egg price — approve or refund from tracking.
				</p>
			{/if}
		</div>

		<!-- Items -->
		<div class="mt-6 rounded-3xl border border-line bg-white p-6">
			<h2 class="flex items-center gap-2 font-display text-lg font-extrabold text-ink"><Package size={20} aria-hidden="true" /> Items</h2>
			<ul class="mt-4 divide-y divide-line">
				{#each order.items as item}
					{@const p = products.find((x) => x.slug === item.slug)}
					{#if p}
						<li class="flex items-center justify-between gap-3 py-3">
							<a href={`/shop/${p.slug}`} class="text-sm font-bold text-ink hover:text-leaf-dark">{p.name} · {p.unit} × {item.qty}</a>
							<span class="text-sm font-bold text-ink">{inr(p.price * item.qty)}</span>
						</li>
					{/if}
				{/each}
			</ul>
			<div class="mt-4 space-y-1 border-t border-line pt-4 text-sm">
				<p class="flex justify-between"><span class="text-muted">Subtotal</span><span class="font-bold text-ink">{inr(order.subtotal)}</span></p>
				<p class="flex justify-between"><span class="text-muted">Delivery</span><span class="font-bold text-leaf-dark">FREE</span></p>
				<p class="flex justify-between text-base"><span class="font-bold text-ink">Total paid</span><span class="font-black text-ink">{inr(order.subtotal)}</span></p>
				<p class="text-xs text-muted">GST invoice available for download (mock). Paid via UPI.</p>
			</div>
			<div class="mt-6 flex flex-wrap gap-2">
				<button
					type="button"
					onclick={reorder}
					class="flex min-h-11 items-center gap-2 rounded-full bg-leaf px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-leaf-dark"
				>
					<RotateCcw size={15} aria-hidden="true" /> Reorder this basket
				</button>
				{#if reordered}
					<span role="status" class="flex min-h-11 items-center rounded-full bg-leaf-pale px-4 py-2.5 text-sm font-bold text-leaf-dark">Added to cart ✓</span>
				{/if}
				<a href="/account/orders" class="flex min-h-11 items-center rounded-full border border-line px-5 py-2.5 text-sm font-bold text-ink">Back to orders</a>
			</div>
		</div>
	</section>
{:else}
	<PageHero eyebrow="Order" title="Order not found" sub="Check the order ID and try again — demo IDs are GB-248136, GB-248097 and GB-248142." />
{/if}
