<script lang="ts">
	// Mobile bottom navigation — the primary nav on phones (research P0-1):
	// Home, Categories, Search, Cart (live count badge), Account. 48px+
	// targets, safe-area padding, hidden on desktop where the header nav rules.
	import { House, LayoutGrid, Search, ShoppingCart, User } from '@lucide/svelte';
	import { page } from '$app/state';
	import { cart } from '#lib/cart.svelte.ts';
	import { drawer } from '#lib/drawer.svelte.ts';

	const items = [
		{ label: 'Home', href: '/', icon: House, active: (p: string) => p === '/' },
		{ label: 'Categories', href: '/shop', icon: LayoutGrid, active: (p: string) => p.startsWith('/shop') || p.startsWith('/category') },
		{ label: 'Search', href: '/search', icon: Search, active: (p: string) => p.startsWith('/search') },
		{ label: 'Cart', href: '', icon: ShoppingCart, active: (_p: string) => false, cart: true },
		{ label: 'Account', href: '/account', icon: User, active: (p: string) => p.startsWith('/account') || p.startsWith('/wishlist') }
	];
</script>

<nav
	aria-label="Primary"
	class="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(20,38,26,0.06)] backdrop-blur lg:hidden"
>
	{#each items as item}
		{@const Icon = item.icon}
		{#if item.cart}
			<button
				type="button"
				data-cart-target="mobile"
				onclick={() => (drawer.open = true)}
				aria-label={`Your cart, ${cart.count} item${cart.count === 1 ? '' : 's'}, total ₹${cart.total}`}
				class="relative flex min-h-14 flex-col items-center justify-center gap-0.5 text-[0.65rem] font-bold text-white"
			>
				<span class="absolute inset-x-3 top-1.5 bottom-1.5 rounded-2xl bg-leaf"></span>
				<span class="relative">
					<ShoppingCart size={21} aria-hidden="true" />
					{#if cart.count > 0}
						<span
							class="absolute -top-2 -right-2.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[0.65rem] font-black text-leaf-dark shadow"
							>{cart.count}</span
						>
					{/if}
				</span>
				<span class="relative">Cart{#if cart.count > 0} · ₹{cart.total}{/if}</span>
			</button>
		{:else}
			{@const isActive = item.active(page.url.pathname)}
			<a
				href={item.href}
				aria-current={isActive ? 'page' : undefined}
				class="flex min-h-14 flex-col items-center justify-center gap-0.5 text-[0.65rem] font-bold {isActive ? 'text-leaf-dark' : 'text-muted'}"
			>
				<Icon size={21} aria-hidden="true" />
				{item.label}
			</a>
		{/if}
	{/each}
</nav>
