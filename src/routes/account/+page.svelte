<script lang="ts">
	// Account hub — profile, GreenBasket Pass, wallet coins, addresses,
	// payment methods, quick links (research P0-3). All mock data.
	import { ChevronRight, Coins, CreditCard, Crown, Heart, MapPin, Package, Settings, Truck } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { mockOrders, mockUser } from '#lib/data/site.ts';
	import { inr } from '#lib/data/site.ts';
	import { wishlist } from '#lib/wishlist.svelte.ts';
</script>

<svelte:head>
	<title>My Account — GreenBasket</title>
	<meta name="description" content="Your GreenBasket account — orders, addresses, payments, wallet and GreenBasket Pass." />
	<meta name="robots" content="noindex" />
</svelte:head>

<PageHero eyebrow="Account" title="Namaste, {mockUser.name.split(' ')[0]}" sub="Your orders, wallet, addresses and Pass — all in one place." />

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
	<div class="grid gap-6 lg:grid-cols-3">
		<!-- Profile + Pass + wallet -->
		<div class="space-y-6">
			<div class="rounded-3xl border border-line bg-white p-6">
				<div class="flex items-center gap-4">
					<span class="flex h-14 w-14 items-center justify-center rounded-full bg-leaf text-xl font-black text-white">
						{mockUser.name.split(' ').map((w) => w[0]).join('')}
					</span>
					<div>
						<h2 class="font-display text-lg font-extrabold text-ink">{mockUser.name}</h2>
						<p class="text-sm text-muted">{mockUser.phone}</p>
						<p class="text-sm text-muted">{mockUser.email}</p>
					</div>
				</div>
				<div class="mt-5 grid grid-cols-2 gap-3">
					<a href="/account/orders" class="rounded-2xl bg-leaf-pale p-4 text-center">
						<span class="block font-display text-2xl font-extrabold text-leaf-dark">{mockOrders.length}</span>
						<span class="text-xs font-bold text-muted">Orders</span>
					</a>
					<a href="/wishlist" class="rounded-2xl bg-leaf-pale p-4 text-center">
						<span class="block font-display text-2xl font-extrabold text-leaf-dark">{wishlist.count}</span>
						<span class="text-xs font-bold text-muted">Saved items</span>
					</a>
				</div>
			</div>

			<div class="rounded-3xl bg-leaf-deep p-6 text-white">
				<p class="flex items-center gap-2 text-sm font-black tracking-wide uppercase"><Crown size={16} aria-hidden="true" /> GreenBasket Pass</p>
				{#if mockUser.passMember}
					<p class="mt-2 font-display text-xl font-extrabold">Active till {mockUser.passValidTill}</p>
					<p class="mt-1 text-sm text-white/80">Free delivery on every order + extra 5% off fruits & vegetables.</p>
				{:else}
					<p class="mt-2 font-display text-xl font-extrabold">Not a member yet</p>
					<p class="mt-1 text-sm text-white/80">Free delivery on every order for just ₹99/month.</p>
				{/if}
				<a href="/membership" class="mt-4 inline-block rounded-full bg-white px-5 py-2.5 text-sm font-bold text-leaf-deep">Manage Pass</a>
			</div>

			<div class="flex items-center gap-4 rounded-3xl border border-line bg-white p-6">
				<span class="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600"><Coins size={22} aria-hidden="true" /></span>
				<div>
					<p class="font-display text-lg font-extrabold text-ink">{mockUser.coins} coins</p>
					<p class="text-sm text-muted">1 coin = ₹1 at checkout. Earn 2% on every order.</p>
				</div>
			</div>
		</div>

		<!-- Orders + quick links -->
		<div class="space-y-6 lg:col-span-2">
			<div class="rounded-3xl border border-line bg-white p-6">
				<div class="flex items-center justify-between">
					<h2 class="flex items-center gap-2 font-display text-lg font-extrabold text-ink"><Package size={20} aria-hidden="true" /> Recent orders</h2>
					<a href="/account/orders" class="flex items-center gap-1 text-sm font-bold text-leaf-dark">View all <ChevronRight size={15} aria-hidden="true" /></a>
				</div>
				<ul class="mt-4 divide-y divide-line">
					{#each mockOrders as order}
						<li>
							<a href={`/account/orders/${order.id}`} class="flex items-center justify-between gap-3 py-4">
								<div>
									<p class="font-bold text-ink">{order.id}</p>
									<p class="text-sm text-muted">{order.date} · {order.items.length} items</p>
								</div>
								<div class="text-right">
									<p class="font-bold text-ink">{inr(order.subtotal)}</p>
									<p class="text-xs font-bold {order.status === 'Delivered' ? 'text-leaf-dark' : 'text-amber-600'}">{order.status}</p>
								</div>
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<div class="grid gap-4 sm:grid-cols-2">
				<div class="rounded-3xl border border-line bg-white p-6">
					<h3 class="flex items-center gap-2 font-display text-base font-extrabold text-ink"><MapPin size={18} aria-hidden="true" /> Saved addresses</h3>
					<ul class="mt-3 space-y-3">
						{#each mockUser.addresses as a}
							<li class="rounded-2xl bg-leaf-pale/60 p-3">
								<p class="text-sm font-bold text-ink">{a.label}{a.isDefault ? ' · Default' : ''}</p>
								<p class="text-sm text-muted">{a.line}</p>
							</li>
						{/each}
					</ul>
				</div>
				<div class="rounded-3xl border border-line bg-white p-6">
					<h3 class="flex items-center gap-2 font-display text-base font-extrabold text-ink"><CreditCard size={18} aria-hidden="true" /> Payment methods</h3>
					<ul class="mt-3 space-y-3">
						{#each mockUser.payments as p}
							<li class="rounded-2xl bg-leaf-pale/60 p-3">
								<p class="text-sm font-bold text-ink">{p.label}{p.isDefault ? ' · Default' : ''}</p>
								<p class="text-sm text-muted">{p.detail}</p>
							</li>
						{/each}
					</ul>
				</div>
			</div>

			<div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
				<a href="/subscriptions" class="rounded-3xl border border-line bg-white p-4 text-center transition-colors hover:border-leaf">
					<Truck size={22} class="mx-auto text-leaf-dark" aria-hidden="true" />
					<span class="mt-2 block text-sm font-bold text-ink">Subscriptions</span>
				</a>
				<a href="/wishlist" class="rounded-3xl border border-line bg-white p-4 text-center transition-colors hover:border-leaf">
					<Heart size={22} class="mx-auto text-leaf-dark" aria-hidden="true" />
					<span class="mt-2 block text-sm font-bold text-ink">Wishlist</span>
				</a>
				<a href="/help" class="rounded-3xl border border-line bg-white p-4 text-center transition-colors hover:border-leaf">
					<Settings size={22} class="mx-auto text-leaf-dark" aria-hidden="true" />
					<span class="mt-2 block text-sm font-bold text-ink">Help centre</span>
				</a>
				<a href="/track-order" class="rounded-3xl border border-line bg-white p-4 text-center transition-colors hover:border-leaf">
					<Package size={22} class="mx-auto text-leaf-dark" aria-hidden="true" />
					<span class="mt-2 block text-sm font-bold text-ink">Track order</span>
				</a>
			</div>
		</div>
	</div>
</section>
