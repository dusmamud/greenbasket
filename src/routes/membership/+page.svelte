<script lang="ts">
	// Membership — GreenBasket Pass (research P1-1): ₹99/mo, benefits,
	// savings calculator ("You'd save ₹X/mo at N orders"). Mock only.
	import { Check, Crown } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { inr, pass, site } from '#lib/data/site.ts';

	let ordersPerMonth = $state(8);
	let avgOrder = $state(600);

	// Savings model (mock): free delivery (₹40/order, over ₹499 already free
	// for ~half the orders) + 5% off fruits & veg (~40% of basket).
	const savings = $derived.by(() => {
		const deliverySaved = Math.round(ordersPerMonth * 40 * 0.5);
		const vegSaved = Math.round(ordersPerMonth * avgOrder * 0.4 * 0.05);
		return deliverySaved + vegSaved;
	});
	const net = $derived(Math.max(0, savings - pass.price));

	let joined = $state(false);
</script>

<svelte:head>
	<title>GreenBasket Pass — Membership</title>
	<meta name="description" content="GreenBasket Pass — free delivery on every order, extra 5% off fruits & vegetables, priority slots. Just ₹99 a month." />
</svelte:head>

<PageHero
	eyebrow="Membership"
	title="GreenBasket Pass"
	sub="Free delivery on every order, extra 5% off fruits & vegetables, priority slots in peak hours — ₹99 a month, cancel anytime."
/>

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
	<div class="grid gap-6 lg:grid-cols-2">
		<div class="rounded-3xl bg-leaf-deep p-6 text-white sm:p-8">
			<p class="flex items-center gap-2 text-sm font-black tracking-wide uppercase"><Crown size={18} aria-hidden="true" /> {pass.name}</p>
			<p class="mt-3 font-display text-5xl font-extrabold">{inr(pass.price)}<span class="text-lg font-bold text-white/70"> {pass.period}</span></p>
			<ul class="mt-6 space-y-3">
				{#each pass.benefits as b}
					<li class="flex items-start gap-2.5 text-sm font-semibold text-white/90"><Check size={17} class="mt-0.5 shrink-0" aria-hidden="true" /> {b}</li>
				{/each}
			</ul>
			<button
				type="button"
				onclick={() => (joined = true)}
				class="mt-8 flex min-h-12 w-full items-center justify-center rounded-full bg-white text-base font-bold text-leaf-deep transition-transform duration-200 hover:scale-[1.02]"
			>
				{#if joined}Welcome to Pass ✓{:else}Join Pass — ₹99/month{/if}
			</button>
			<p class="mt-3 text-center text-xs text-white/70">Cancel anytime from your account. No lock-in, no hidden charges.</p>
		</div>

		<div class="rounded-3xl border border-line bg-white p-6 sm:p-8">
			<h2 class="font-display text-xl font-extrabold text-ink">How much would you save?</h2>
			<p class="mt-1 text-sm text-muted">Move the sliders to match your usual shopping.</p>
			<div class="mt-6 space-y-6">
				<div>
					<label for="orders" class="flex justify-between text-sm font-bold text-ink">
						<span>Orders per month</span><span>{ordersPerMonth}</span>
					</label>
					<input id="orders" type="range" min="2" max="20" step="1" bind:value={ordersPerMonth} class="mt-2 w-full accent-[#22a447]" />
				</div>
				<div>
					<label for="avg" class="flex justify-between text-sm font-bold text-ink">
						<span>Average order value</span><span>{inr(avgOrder)}</span>
					</label>
					<input id="avg" type="range" min="200" max="2000" step="50" bind:value={avgOrder} class="mt-2 w-full accent-[#22a447]" />
				</div>
			</div>
			<div class="mt-8 rounded-2xl bg-leaf-pale p-5 text-center">
				<p class="text-sm font-bold text-muted">You'd save about</p>
				<p class="font-display text-4xl font-extrabold text-leaf-dark">{inr(savings)}<span class="text-base font-bold text-muted"> / month</span></p>
				<p class="mt-1 text-sm font-bold text-ink">
					{#if net > 0}That's {inr(net)} in your pocket after the ₹99 fee.{:else}At this level Pass roughly pays for itself.{/if}
				</p>
			</div>
			<p class="mt-4 text-xs leading-relaxed text-muted">
				Estimate only, for design review. Delivery is already free above {inr(site.freeDeliveryAbove)}; the calculator assumes about half your orders are below that.
			</p>
		</div>
	</div>
</section>
