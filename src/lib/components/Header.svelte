<script lang="ts">
	import { goto } from '$app/navigation';
	import { ChevronDown, MapPin, Menu, Search, ShoppingCart, Tag, User, X } from '@lucide/svelte';
	import Logo from '#lib/components/Logo.svelte';
	import { cart } from '#lib/cart.svelte.ts';
	import { drawer } from '#lib/drawer.svelte.ts';
	import { navLinks, site } from '#lib/data/site.ts';

	let open = $state(false);
	let q = $state('');

	function search(e: SubmitEvent) {
		e.preventDefault();
		const term = q.trim();
		open = false;
		goto(term ? `/search?q=${encodeURIComponent(term)}` : '/search');
	}
</script>

<!-- Announcement bar -->
<div class="bg-leaf-deep px-4 py-2 text-center text-[0.8rem] font-semibold text-white">
	Free delivery on orders over ₹499!
	<a href="/offers" class="ml-1 font-bold underline underline-offset-2 hover:text-lime">Shop now</a>
</div>

<header class="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur-md">
	<div class="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
		<Logo />

		<!-- Deliver to -->
		<a
			href="/contact"
			class="hidden min-w-0 items-center gap-2 rounded-full px-3 py-2 transition-colors hover:bg-leaf-pale md:flex"
			aria-label="Delivery location: Mumbai 400050"
		>
			<MapPin size={20} class="shrink-0 text-leaf-dark" aria-hidden="true" />
			<span class="min-w-0 leading-tight">
				<span class="block text-[0.65rem] font-semibold text-muted">Deliver to</span>
				<span class="block truncate text-sm font-bold text-ink">Mumbai, 400050</span>
			</span>
			<ChevronDown size={15} class="shrink-0 text-muted" aria-hidden="true" />
		</a>

		<!-- Search (desktop) -->
		<form role="search" onsubmit={search} class="hidden min-w-0 flex-1 lg:block">
			<label class="sr-only" for="site-search">Search for products, brands and more</label>
			<div class="flex items-center overflow-hidden rounded-full border border-line bg-leaf-pale/60 focus-within:border-leaf focus-within:bg-white">
				<input
					id="site-search"
					type="search"
					bind:value={q}
					placeholder="Search for products, brands and more..."
					class="min-w-0 flex-1 bg-transparent px-5 py-3 text-sm outline-none placeholder:text-muted"
				/>
				<button
					type="submit"
					aria-label="Search"
					class="mr-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-leaf text-white transition-transform duration-200 hover:scale-105"
				>
					<Search size={17} aria-hidden="true" />
				</button>
			</div>
		</form>

		<div class="ml-auto flex items-center gap-1 sm:gap-2">
			<a
				href="/offers"
				class="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-bold text-ink transition-colors hover:bg-leaf-pale md:flex"
			>
				<Tag size={18} class="text-leaf-dark" aria-hidden="true" /> Offers
			</a>
			<a
				href="/account"
				class="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-bold text-ink transition-colors hover:bg-leaf-pale md:flex"
			>
				<User size={18} class="text-leaf-dark" aria-hidden="true" /> Account
			</a>
			<button
				type="button"
				data-cart-target="desktop"
				onclick={() => (drawer.open = true)}
				class="relative flex h-11 items-center gap-2 rounded-full px-3 py-2 text-sm font-bold text-ink transition-colors hover:bg-leaf-pale"
				aria-label={`Your cart, ${cart.count} item${cart.count === 1 ? '' : 's'}, total ₹${cart.total}`}
			>
				<span class="relative">
					<ShoppingCart size={21} aria-hidden="true" />
					{#if cart.count > 0}
						<span
							class="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-leaf px-1 text-[0.65rem] font-black text-white"
							>{cart.count}</span
						>
					{/if}
				</span>
				<span class="hidden sm:inline">Cart</span>
			</button>
			<button
				type="button"
				class="flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-leaf-pale lg:hidden"
				aria-expanded={open}
				aria-label={open ? 'Close menu' : 'Open menu'}
				onclick={() => (open = !open)}
			>
				{#if open}<X size={24} aria-hidden="true" />{:else}<Menu size={24} aria-hidden="true" />{/if}
			</button>
		</div>
	</div>

	<!-- Search (mobile) -->
	<form role="search" onsubmit={search} class="px-4 pb-3 lg:hidden">
		<label class="sr-only" for="site-search-mobile">Search for products, brands and more</label>
		<div class="flex items-center overflow-hidden rounded-full border border-line bg-leaf-pale/60 focus-within:border-leaf focus-within:bg-white">
			<input
				id="site-search-mobile"
				type="search"
				bind:value={q}
				placeholder="Search for products, brands and more..."
				class="min-w-0 flex-1 bg-transparent px-5 py-3 text-sm outline-none placeholder:text-muted"
			/>
			<button
				type="submit"
				aria-label="Search"
				class="mr-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-leaf text-white"
			>
				<Search size={17} aria-hidden="true" />
			</button>
		</div>
	</form>

	<!-- Category nav (desktop) -->
	<nav class="hidden border-t border-line/70 lg:block" aria-label="Categories">
		<div class="mx-auto flex max-w-7xl items-center gap-1 px-4 sm:px-6 lg:px-8">
			<a
				href="/shop"
				class="my-2 mr-2 flex items-center gap-2 rounded-full bg-leaf px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-leaf-dark"
			>
				<Menu size={16} aria-hidden="true" /> All Categories
			</a>
			{#each navLinks as link}
				<a
					href={link.href}
					class="rounded-full px-3 py-2.5 text-sm font-semibold whitespace-nowrap text-ink transition-colors hover:bg-leaf-pale hover:text-leaf-dark"
					>{link.label}</a
				>
			{/each}
		</div>
	</nav>

	{#if open}
		<nav class="border-t border-line bg-white px-4 pt-2 pb-5 sm:px-6 lg:hidden" aria-label="Mobile navigation">
			<a
				href="/shop"
				onclick={() => (open = false)}
				class="mt-1 flex items-center justify-center gap-2 rounded-full bg-leaf px-5 py-3 text-sm font-bold text-white"
			>
				<Menu size={16} aria-hidden="true" /> All Categories
			</a>
			{#each navLinks as link}
				<a
					href={link.href}
					class="block rounded-xl px-3 py-3 text-base font-semibold text-ink transition-colors hover:bg-leaf-pale"
					onclick={() => (open = false)}>{link.label}</a
				>
			{/each}
			<a
				href="/offers"
				onclick={() => (open = false)}
				class="block rounded-xl px-3 py-3 text-base font-semibold text-ink transition-colors hover:bg-leaf-pale"
			>
				Offers
			</a>
		</nav>
	{/if}
</header>
