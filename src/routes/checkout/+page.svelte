<script lang="ts">
	import { Minus, Plus, Trash2 } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { cart, clearCart, removeLine, setQty } from '#lib/cart.svelte.ts';
	import { couponStore } from '#lib/coupon.svelte.ts';
	import { inr, site } from '#lib/data/site.ts';

	let step = $state(1);
	let name = $state('');
	let phone = $state('');
	let address = $state('');
	let pincode = $state('400050');
	let slot = $state('As soon as possible (30–45 mins)');
	let payment = $state('UPI — Google Pay');
	let substitution = $state('Allow a similar substitute');
	let couponCode = $state('');
	let orderRef = $state('');
	let placedTotal = $state(0);
	let accountCreated = $state(false);

	const discount = $derived(couponStore.discount(cart.subtotal));
	const payable = $derived(Math.max(0, cart.total - discount));

	function applyCoupon() {
		if (couponCode.trim()) couponStore.apply(couponCode);
	}

	function placeOrder(e: SubmitEvent) {
		e.preventDefault();
		orderRef = `GB-${Math.floor(100000 + Math.random() * 900000)}`;
		placedTotal = payable;
		step = 3;
		clearCart();
		couponStore.clear();
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<svelte:head>
	<title>Checkout — GreenBasket | Fast Grocery Delivery</title>
	<meta name="description" content="Checkout at GreenBasket — review your basket, pick a delivery slot and pay by UPI, card or cash on delivery. Mock checkout, no real payment." />
</svelte:head>

<PageHero
	eyebrow="Almost there"
	title="Checkout"
	sub="Review your basket, add delivery details and place your order. This is a mock checkout — no real payment is taken."
/>

<section class="bg-white py-10 sm:py-14" aria-label="Checkout">
	<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
		{#if step === 3}
			<!-- Confirmation -->
			<div class="rounded-3xl bg-leaf-pale p-8 text-center ring-1 ring-line sm:p-12">
				<p class="font-display text-4xl font-extrabold text-leaf-dark">Order placed!</p>
				<p class="mt-3 text-lg font-semibold text-ink">Thank you{#if name}, {name.split(' ')[0]}{/if} — your groceries are on their way.</p>
				<p class="mx-auto mt-2 max-w-md leading-relaxed text-muted">
					Order <strong class="text-ink">{orderRef}</strong> · {inr(placedTotal)} · {payment} · {slot} at {address || 'your address'}.
				</p>
				<p class="mx-auto mt-2 max-w-md text-sm font-semibold text-leaf-dark">You can edit this order until 15 minutes before your slot.</p>
				<ol class="mx-auto mt-8 flex max-w-lg items-center justify-between gap-2 text-xs font-bold text-ink sm:text-sm">
					<li class="flex flex-col items-center gap-2"><span class="flex h-9 w-9 items-center justify-center rounded-full bg-leaf text-white">1</span>Placed</li>
					<li class="h-0.5 flex-1 bg-leaf" aria-hidden="true"></li>
					<li class="flex flex-col items-center gap-2"><span class="flex h-9 w-9 items-center justify-center rounded-full bg-leaf text-white">2</span>Packed</li>
					<li class="h-0.5 flex-1 bg-line" aria-hidden="true"></li>
					<li class="flex flex-col items-center gap-2"><span class="flex h-9 w-9 items-center justify-center rounded-full bg-white ring-2 ring-line">3</span>On the way</li>
					<li class="h-0.5 flex-1 bg-line" aria-hidden="true"></li>
					<li class="flex flex-col items-center gap-2"><span class="flex h-9 w-9 items-center justify-center rounded-full bg-white ring-2 ring-line">4</span>Delivered</li>
				</ol>
				<div class="mt-8 flex flex-wrap justify-center gap-3">
					<a href={`/track-order?order=${orderRef}`} class="flex min-h-12 items-center rounded-full bg-leaf px-7 text-sm font-bold text-white">Track my order</a>
					<a href="/shop" class="flex min-h-12 items-center rounded-full border-2 border-leaf px-7 text-sm font-bold text-leaf-dark">Continue shopping</a>
				</div>
				<div class="mx-auto mt-8 max-w-md rounded-2xl bg-white p-5 text-left ring-1 ring-line">
					<p class="font-display text-base font-extrabold text-ink">Save your details for next time?</p>
					<p class="mt-1 text-sm text-muted">Create a GreenBasket account in one tap — your address, payments and this order move with you. No password needed, we will send a login link.</p>
					<button
						type="button"
						onclick={() => (accountCreated = true)}
						class="mt-3 flex min-h-11 items-center rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white"
					>
						{#if accountCreated}✓ Account created — welcome!{:else}Create my account{/if}
					</button>
				</div>
				<p class="mt-6 text-sm text-muted">A confirmation has been sent on WhatsApp (mock). Questions? Call {site.phoneDisplay}.</p>
			</div>
		{:else if cart.count === 0}
			<div class="rounded-3xl bg-leaf-pale px-6 py-14 text-center">
				<p class="font-display text-2xl font-extrabold text-ink">Your basket is empty</p>
				<p class="mt-2 text-muted">Add some fresh groceries first — checkout takes less than a minute after that.</p>
				<a href="/shop" class="mt-5 inline-flex min-h-12 items-center rounded-full bg-leaf px-7 text-sm font-bold text-white">Start shopping</a>
			</div>
		{:else}
			<!-- Steps indicator -->
			<ol class="flex items-center gap-2 text-sm font-bold" aria-label="Checkout progress">
				<li class="flex items-center gap-2 {step === 1 ? 'text-leaf-dark' : 'text-ink'}"><span class="flex h-8 w-8 items-center justify-center rounded-full {step === 1 ? 'bg-leaf text-white' : 'bg-leaf-pale text-leaf-dark'}">1</span> Review basket</li>
				<li class="h-0.5 w-8 bg-line sm:w-16" aria-hidden="true"></li>
				<li class="flex items-center gap-2 {step === 2 ? 'text-leaf-dark' : 'text-muted'}"><span class="flex h-8 w-8 items-center justify-center rounded-full {step === 2 ? 'bg-leaf text-white' : 'bg-leaf-pale text-muted'}">2</span> Delivery &amp; payment</li>
			</ol>

			{#if step === 1}
				<div class="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
					<ul class="divide-y divide-line rounded-3xl bg-white ring-1 ring-line">
						{#each cart.lines as line (line.slug)}
							<li class="flex items-center gap-4 p-4">
								<a href={`/shop/${line.slug}`} class="h-20 w-20 shrink-0 overflow-hidden rounded-2xl ring-1 ring-line" aria-label={line.name}>
									<Picture name={line.image} alt={line.name} width={480} height={480} sizes="80px" imgClass="h-full w-full object-cover" />
								</a>
								<div class="min-w-0 flex-1">
									<p class="truncate font-bold text-ink">{line.name}</p>
									<p class="text-sm text-muted">{inr(line.price)} · {line.unit}</p>
									<div class="mt-2 flex items-center rounded-full bg-leaf-pale w-fit">
										<button type="button" onclick={() => setQty(line.slug, line.qty - 1)} aria-label={`One less ${line.name}`} class="flex h-9 w-9 items-center justify-center rounded-full text-ink"><Minus size={15} aria-hidden="true" /></button>
										<span class="w-7 text-center text-sm font-bold">{line.qty}</span>
										<button type="button" onclick={() => setQty(line.slug, line.qty + 1)} aria-label={`One more ${line.name}`} class="flex h-9 w-9 items-center justify-center rounded-full text-ink"><Plus size={15} aria-hidden="true" /></button>
									</div>
								</div>
								<div class="flex shrink-0 flex-col items-end gap-1">
									<p class="font-black text-ink">{inr(line.price * line.qty)}</p>
									<button type="button" onclick={() => removeLine(line.slug)} aria-label={`Remove ${line.name}`} class="flex h-9 w-9 items-center justify-center rounded-full text-muted hover:text-ink"><Trash2 size={16} aria-hidden="true" /></button>
								</div>
							</li>
						{/each}
					</ul>
					<aside class="h-fit rounded-3xl bg-leaf-pale p-6 ring-1 ring-line">
						<h2 class="font-display text-xl font-extrabold text-ink">Bill details</h2>
						<div class="mt-4 space-y-2 text-sm">
							<p class="flex justify-between"><span class="text-muted">Subtotal</span><span class="font-semibold">{inr(cart.subtotal)}</span></p>
							{#if cart.savings > 0}
								<p class="flex justify-between"><span class="text-muted">You save on MRP</span><span class="font-semibold text-leaf-dark">− {inr(cart.savings)}</span></p>
							{/if}
							{#if discount > 0}
								<p class="flex justify-between"><span class="text-muted">Coupon {couponStore.applied?.code}</span><span class="font-semibold text-leaf-dark">− {inr(discount)}</span></p>
							{/if}
							<p class="flex justify-between"><span class="text-muted">Delivery</span><span class="font-semibold">{cart.deliveryFee === 0 ? 'Free' : inr(cart.deliveryFee)}</span></p>
							<p class="flex justify-between border-t border-line pt-3 text-base font-black text-ink"><span>Total</span><span>{inr(payable)}</span></p>
						</div>
						{#if couponStore.applied}
							<p class="mt-3 flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-sm font-bold text-leaf-dark ring-1 ring-line">
								<span>✓ {couponStore.applied.code} applied — you saved {inr(discount)}</span>
								<button type="button" onclick={() => couponStore.clear()} class="text-muted underline">Remove</button>
							</p>
						{:else}
							<form
								onsubmit={(e) => {
									e.preventDefault();
									applyCoupon();
								}}
								class="mt-4 flex gap-2"
							>
								<label class="sr-only" for="coupon">Coupon code</label>
								<input
									id="coupon"
									type="text"
									bind:value={couponCode}
									placeholder="Coupon code"
									class="min-w-0 flex-1 rounded-full border border-line bg-white px-4 py-2.5 text-sm font-bold uppercase outline-none placeholder:normal-case focus:border-leaf"
								/>
								<button type="submit" class="shrink-0 rounded-full bg-ink px-4 py-2.5 text-sm font-bold text-white">Apply</button>
							</form>
							{#if couponStore.error}
								<p role="alert" class="mt-2 text-xs font-semibold text-red-600">{couponStore.error}</p>
							{:else}
								<p class="mt-2 text-xs text-muted">Try WELCOME10, FRESH20 or FLAT50</p>
							{/if}
						{/if}
						<button type="button" onclick={() => { step = 2; window.scrollTo({ top: 0, behavior: 'smooth' }); }} class="mt-5 flex min-h-12 w-full items-center justify-center rounded-full bg-leaf text-sm font-bold text-white transition-colors hover:bg-leaf-dark">
							Continue to delivery · {inr(payable)}
						</button>
						<a href="/shop" class="mt-3 block text-center text-sm font-bold text-leaf-dark underline underline-offset-4">Add more items</a>
					</aside>
				</div>
			{:else}
				<form onsubmit={placeOrder} class="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
					<div class="space-y-6">
						<p class="rounded-2xl bg-leaf-pale px-5 py-4 text-sm font-bold text-leaf-dark ring-1 ring-line">
							Checking out as guest — no account needed. You can create one after your order, in one tap.
						</p>
						<fieldset class="rounded-3xl bg-white p-6 ring-1 ring-line">
							<legend class="font-display text-xl font-extrabold text-ink">Delivery details</legend>
							<div class="mt-4 grid gap-4 sm:grid-cols-2">
								<label class="block text-sm font-bold text-ink">Full name
									<input required bind:value={name} placeholder="Priya Sharma" autocomplete="name" class="mt-1.5 block w-full rounded-2xl border border-line bg-leaf-pale/50 px-4 py-3 text-sm font-medium outline-none focus:border-leaf focus:bg-white" />
								</label>
								<label class="block text-sm font-bold text-ink">Phone
									<input required bind:value={phone} placeholder="+91 98765 43210" autocomplete="tel" inputmode="tel" class="mt-1.5 block w-full rounded-2xl border border-line bg-leaf-pale/50 px-4 py-3 text-sm font-medium outline-none focus:border-leaf focus:bg-white" />
								</label>
								<label class="block text-sm font-bold text-ink sm:col-span-2">Delivery address
									<textarea required bind:value={address} rows="2" placeholder="Flat 302, Sunrise Apartments, Linking Road, Bandra West" autocomplete="street-address" class="mt-1.5 block w-full rounded-2xl border border-line bg-leaf-pale/50 px-4 py-3 text-sm font-medium outline-none focus:border-leaf focus:bg-white"></textarea>
								</label>
								<label class="block text-sm font-bold text-ink">Pincode
									<input required bind:value={pincode} placeholder="400050" inputmode="numeric" pattern="[0-9]{6}" title="6-digit pincode" class="mt-1.5 block w-full rounded-2xl border border-line bg-leaf-pale/50 px-4 py-3 text-sm font-medium outline-none focus:border-leaf focus:bg-white" />
								</label>
								<label class="block text-sm font-bold text-ink">Delivery slot
									<select bind:value={slot} class="mt-1.5 block w-full rounded-2xl border border-line bg-leaf-pale/50 px-4 py-3 text-sm font-medium outline-none focus:border-leaf focus:bg-white">
										<option>As soon as possible (30–45 mins)</option>
										<option>Today, 6–8 pm</option>
										<option>Tomorrow, 6–8 am (fresh slot)</option>
										<option>Tomorrow, 10 am–12 pm</option>
									</select>
								</label>
							</div>
						</fieldset>

						<fieldset class="rounded-3xl bg-white p-6 ring-1 ring-line">
							<legend class="font-display text-xl font-extrabold text-ink">Payment method</legend>
							<p class="mt-1 text-xs font-semibold text-muted">UPI first — one tap on Android and iPhone.</p>
							<div class="mt-4 space-y-3">
								{#each ['UPI — Google Pay', 'UPI — PhonePe', 'UPI — Paytm', 'UPI — BHIM', 'Card', 'Cash on Delivery'] as method}
									<label class="flex min-h-12 cursor-pointer items-center gap-3 rounded-2xl border px-4 text-sm font-bold {payment === method ? 'border-leaf bg-leaf-pale' : 'border-line'}">
										<input type="radio" name="payment" value={method} bind:group={payment} class="h-4 w-4 accent-[#22a447]" />
										{method}
										{#if method.startsWith('UPI')}<span class="text-xs font-semibold text-muted">One-tap UPI</span>{/if}
										{#if method === 'Cash on Delivery'}<span class="text-xs font-semibold text-muted">No extra fee · keep change ready</span>{/if}
									</label>
								{/each}
							</div>
							<p class="mt-4 text-xs leading-relaxed text-muted">Mock checkout — no real payment is taken and no order is actually placed.</p>
						</fieldset>

						<fieldset class="rounded-3xl bg-white p-6 ring-1 ring-line">
							<legend class="font-display text-xl font-extrabold text-ink">If something is out of stock</legend>
							<p class="mt-1 text-xs font-semibold text-muted">We never swap silently — tell us what to do.</p>
							<div class="mt-4 space-y-3">
								{#each ['Allow a similar substitute', 'Refund the item', 'Call me first'] as opt}
									<label class="flex min-h-12 cursor-pointer items-center gap-3 rounded-2xl border px-4 text-sm font-bold {substitution === opt ? 'border-leaf bg-leaf-pale' : 'border-line'}">
										<input type="radio" name="substitution" value={opt} bind:group={substitution} class="h-4 w-4 accent-[#22a447]" />
										{opt}
									</label>
								{/each}
							</div>
						</fieldset>
					</div>

					<aside class="h-fit rounded-3xl bg-leaf-pale p-6 ring-1 ring-line">
						<h2 class="font-display text-xl font-extrabold text-ink">Your order</h2>
						<ul class="mt-4 space-y-2 text-sm">
							{#each cart.lines as line (line.slug)}
								<li class="flex justify-between gap-3"><span class="text-muted">{line.qty} × {line.name}</span><span class="font-semibold whitespace-nowrap">{inr(line.price * line.qty)}</span></li>
							{/each}
						</ul>
						<div class="mt-4 space-y-2 border-t border-line pt-3 text-sm">
							{#if discount > 0}
								<p class="flex justify-between"><span class="text-muted">Coupon {couponStore.applied?.code}</span><span class="font-semibold text-leaf-dark">− {inr(discount)}</span></p>
							{/if}
							<p class="flex justify-between"><span class="text-muted">Delivery</span><span class="font-semibold">{cart.deliveryFee === 0 ? 'Free' : inr(cart.deliveryFee)}</span></p>
							<p class="flex justify-between text-base font-black text-ink"><span>Total</span><span>{inr(payable)}</span></p>
						</div>
						<button type="submit" class="mt-5 flex min-h-12 w-full items-center justify-center rounded-full bg-leaf text-sm font-bold text-white transition-colors hover:bg-leaf-dark">
							Place order · {inr(payable)}
						</button>
						<button type="button" onclick={() => (step = 1)} class="mt-3 block w-full text-center text-sm font-bold text-leaf-dark underline underline-offset-4">Back to basket</button>
					</aside>
				</form>
			{/if}
		{/if}
	</div>
</section>
