<script lang="ts">
	// Slide-in cart drawer: line items with photos, qty steppers, bill with
	// savings + delivery, free-delivery progress. Opens from the header cart.
	import { Minus, Plus, Trash2, X } from '@lucide/svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { cart, clearCart, removeLine, setQty } from '#lib/cart.svelte.ts';
	import { couponStore } from '#lib/coupon.svelte.ts';
	import { inr, site } from '#lib/data/site.ts';

	let { open = $bindable(false) }: { open: boolean } = $props();

	const remaining = $derived(Math.max(0, site.freeDeliveryAbove - cart.subtotal));
	const progress = $derived(Math.min(100, (cart.subtotal / site.freeDeliveryAbove) * 100));
	const discount = $derived(couponStore.discount(cart.subtotal));
	const payable = $derived(Math.max(0, cart.total - discount));
	const totalSaved = $derived(cart.savings + discount);
	let couponCode = $state('');

	function applyCoupon() {
		if (couponCode.trim()) couponStore.apply(couponCode);
	}
</script>

{#if open}
	<div class="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Your cart">
		<button
			type="button"
			class="absolute inset-0 bg-ink/50"
			aria-label="Close cart"
			onclick={() => (open = false)}
		></button>
		<aside
			class="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-2xl"
			data-lenis-prevent
		>
			<div class="flex items-center justify-between border-b border-line px-5 py-4">
				<h2 class="font-display text-2xl font-extrabold text-ink">Your cart</h2>
				<button
					type="button"
					onclick={() => (open = false)}
					aria-label="Close cart"
					class="flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-leaf-pale"
				>
					<X size={22} aria-hidden="true" />
				</button>
			</div>

			{#if cart.count === 0}
				<div class="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
					<p class="font-display text-3xl font-extrabold text-leaf-dark">Your basket is empty</p>
					<p class="text-muted">Add some fresh fruits, vegetables or daily essentials to get started.</p>
					<a
						href="/shop"
						onclick={() => (open = false)}
						class="mt-2 flex min-h-12 items-center rounded-full bg-leaf px-8 text-sm font-bold text-white"
					>
						Start Shopping
					</a>
				</div>
			{:else}
				<div class="border-b border-line px-5 py-3">
					{#if remaining > 0}
						<p class="text-sm font-semibold text-ink">Add {inr(remaining)} more for free delivery</p>
					{:else}
						<p class="text-sm font-semibold text-leaf-dark">Free delivery unlocked</p>
					{/if}
					<div class="mt-2 h-2 overflow-hidden rounded-full bg-leaf-pale">
						<div class="h-full rounded-full bg-leaf transition-all duration-300" style="width: {progress}%"></div>
					</div>
				</div>

				<ul class="flex-1 overflow-y-auto px-5 py-4" data-lenis-prevent>
					{#each cart.lines as line (line.slug)}
						<li class="flex items-center gap-3 border-b border-line/70 py-3">
							<a href={`/shop/${line.slug}`} onclick={() => (open = false)} class="h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-white ring-1 ring-line" aria-label={line.name}>
								<Picture name={line.image} alt={line.name} width={480} height={480} sizes="64px" imgClass="h-full w-full object-cover" />
							</a>
							<div class="min-w-0 flex-1">
								<p class="truncate font-bold text-ink">{line.name}</p>
								<p class="text-sm text-muted">{inr(line.price)} · {line.unit}</p>
								<div class="mt-1.5 flex items-center rounded-full bg-leaf-pale w-fit">
									<button
										type="button"
										onclick={() => setQty(line.slug, line.qty - 1)}
										aria-label={`One less ${line.name}`}
										class="flex h-10 w-10 items-center justify-center rounded-full text-ink"
									>
										<Minus size={15} aria-hidden="true" />
									</button>
									<span class="w-6 text-center text-sm font-bold" aria-label={`${line.qty} of ${line.name}`}
										>{line.qty}</span
									>
									<button
										type="button"
										onclick={() => setQty(line.slug, line.qty + 1)}
										aria-label={`One more ${line.name}`}
										class="flex h-10 w-10 items-center justify-center rounded-full text-ink"
									>
										<Plus size={15} aria-hidden="true" />
									</button>
								</div>
							</div>
							<div class="flex shrink-0 flex-col items-end gap-1">
								<p class="text-sm font-black text-ink">{inr(line.price * line.qty)}</p>
								<button
									type="button"
									onclick={() => removeLine(line.slug)}
									aria-label={`Remove ${line.name}`}
									class="flex h-8 w-8 items-center justify-center rounded-full text-muted hover:text-ink"
								>
									<Trash2 size={15} aria-hidden="true" />
								</button>
							</div>
						</li>
					{/each}
				</ul>

				<div class="space-y-1 border-t border-line px-5 py-4 text-sm">
					<p class="flex justify-between"><span class="text-muted">Subtotal</span><span class="font-semibold">{inr(cart.subtotal)}</span></p>
					{#if cart.savings > 0}
						<p class="flex justify-between"><span class="text-muted">You save on MRP</span><span class="font-semibold text-leaf-dark">− {inr(cart.savings)}</span></p>
					{/if}
					{#if discount > 0}
						<p class="flex justify-between"><span class="text-muted">Coupon {couponStore.applied?.code}</span><span class="font-semibold text-leaf-dark">− {inr(discount)}</span></p>
					{/if}
					<p class="flex justify-between">
						<span class="text-muted">Delivery</span><span class="font-semibold"
							>{cart.deliveryFee === 0 ? 'Free' : inr(cart.deliveryFee)}</span
						>
					</p>
					{#if totalSaved > 0}
						<p class="flex justify-between rounded-xl bg-leaf-pale px-3 py-2 font-bold text-leaf-dark">You saved {inr(totalSaved)} on this order</p>
					{/if}
					<p class="flex justify-between border-t border-line pt-2 text-base font-black text-ink">
						<span>Total</span><span>{inr(payable)}</span>
					</p>
					{#if couponStore.applied}
						<p class="flex items-center justify-between rounded-2xl bg-leaf-pale px-4 py-2.5 text-sm font-bold text-leaf-dark">
							<span>✓ {couponStore.applied.code} applied</span>
							<button type="button" onclick={() => couponStore.clear()} class="text-muted underline">Remove</button>
						</p>
					{:else}
						<form
							onsubmit={(e) => {
								e.preventDefault();
								applyCoupon();
							}}
							class="flex gap-2 pt-1"
						>
							<label class="sr-only" for="drawer-coupon">Coupon code</label>
							<input
								id="drawer-coupon"
								type="text"
								bind:value={couponCode}
								placeholder="Coupon code"
								class="min-w-0 flex-1 rounded-full border border-line bg-white px-4 py-2.5 text-sm font-bold uppercase outline-none placeholder:normal-case focus:border-leaf"
							/>
							<button type="submit" class="shrink-0 rounded-full bg-ink px-4 py-2.5 text-sm font-bold text-white">Apply</button>
						</form>
						{#if couponStore.error}
							<p role="alert" class="text-xs font-semibold text-red-600">{couponStore.error}</p>
						{:else}
							<p class="text-xs text-muted">Try WELCOME10, FRESH20 or FLAT50</p>
						{/if}
					{/if}
					<div class="flex gap-3 pt-3">
						<button
							type="button"
							onclick={clearCart}
							class="min-h-12 rounded-full border border-line px-5 text-sm font-bold text-muted"
						>
							Clear
						</button>
						<a
							href="/checkout"
							onclick={() => (open = false)}
							class="flex min-h-12 flex-1 items-center justify-center rounded-full bg-leaf text-sm font-bold text-white"
						>
							Checkout · {inr(payable)}
						</a>
					</div>
				</div>
			{/if}
		</aside>
	</div>
{/if}
