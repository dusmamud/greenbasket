<script lang="ts">
	import Logo from '#lib/components/Logo.svelte';
	import SocialIcon from '#lib/components/SocialIcon.svelte';
	import { categories, fssaiLicence, site } from '#lib/data/site.ts';

	const shop = [
		{ label: 'All Categories', href: '/shop' },
		...categories.slice(0, 4).map((c) => ({ label: c.name, href: `/category/${c.slug}` })),
		{ label: 'Under ₹99', href: '/category/under-99' },
		{ label: 'Recipes', href: '/recipes' },
		{ label: 'Offers', href: '/offers' }
	];
	const help = [
		{ label: 'Help Centre', href: '/help' },
		{ label: 'FAQs', href: '/faq' },
		{ label: 'Shipping & Delivery', href: '/shipping' },
		{ label: 'Returns & Refunds', href: '/returns' },
		{ label: 'Track My Order', href: '/track-order' },
		{ label: 'Contact Us', href: '/contact' }
	];
	const about = [
		{ label: 'Our Story', href: '/about' },
		{ label: 'Stores', href: '/stores' },
		{ label: 'Careers', href: '/careers' },
		{ label: 'Sustainability', href: '/sustainability' },
		{ label: 'Bulk & Business', href: '/bulk' },
		{ label: 'Gift Cards', href: '/gift-cards' },
		{ label: 'Blog', href: '/blog' }
	];
	const accountLinks = [
		{ label: 'My Account', href: '/account' },
		{ label: 'My Orders', href: '/account/orders' },
		{ label: 'Wishlist', href: '/wishlist' },
		{ label: 'Subscriptions', href: '/subscriptions' },
		{ label: 'GreenBasket Pass', href: '/membership' }
	];
</script>

<footer class="bg-leaf-pale pt-14 pb-8" aria-label="Footer">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
			<div class="lg:col-span-2">
				<Logo />
				<p class="mt-4 max-w-sm text-sm leading-relaxed text-muted">
					Your one-stop shop for fresh groceries and daily essentials. Delivered fresh to your door — {site.address}.
				</p>
				<p class="mt-3 text-xs font-semibold text-muted">FSSAI Lic. No. {fssaiLicence}</p>
				<div class="mt-6 flex items-center gap-3">
					<a href={site.facebook} target="_blank" rel="noopener" aria-label="GreenBasket on Facebook" class="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink shadow-sm transition-all duration-200 hover:scale-105 hover:bg-leaf hover:text-white">
						<SocialIcon network="facebook" />
					</a>
					<a href={site.twitter} target="_blank" rel="noopener" aria-label="GreenBasket on X" class="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink shadow-sm transition-all duration-200 hover:scale-105 hover:bg-leaf hover:text-white">
						<SocialIcon network="x" />
					</a>
					<a href={site.youtube} target="_blank" rel="noopener" aria-label="GreenBasket on YouTube" class="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink shadow-sm transition-all duration-200 hover:scale-105 hover:bg-leaf hover:text-white">
						<SocialIcon network="youtube" />
					</a>
					<a href={site.instagram} target="_blank" rel="noopener" aria-label="GreenBasket on Instagram" class="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink shadow-sm transition-all duration-200 hover:scale-105 hover:bg-leaf hover:text-white">
						<SocialIcon network="instagram" />
					</a>
				</div>
			</div>

			<nav aria-label="Shop">
				<p class="font-display text-base font-extrabold text-ink">Shop</p>
				<ul class="mt-3 space-y-2.5 text-sm font-medium">
					{#each shop as link}
						<li><a href={link.href} class="text-muted transition-colors hover:text-leaf-dark">{link.label}</a></li>
					{/each}
				</ul>
			</nav>

			<nav aria-label="Help">
				<p class="font-display text-base font-extrabold text-ink">Help</p>
				<ul class="mt-3 space-y-2.5 text-sm font-medium">
					{#each help as link}
						<li><a href={link.href} class="text-muted transition-colors hover:text-leaf-dark">{link.label}</a></li>
					{/each}
				</ul>
			</nav>

			<nav aria-label="Account">
				<p class="font-display text-base font-extrabold text-ink">Account</p>
				<ul class="mt-3 space-y-2.5 text-sm font-medium">
					{#each accountLinks as link}
						<li><a href={link.href} class="text-muted transition-colors hover:text-leaf-dark">{link.label}</a></li>
					{/each}
				</ul>
			</nav>

			<div>
				<p class="font-display text-base font-extrabold text-ink">About Us</p>
				<ul class="mt-3 space-y-2.5 text-sm font-medium">
					{#each about as link}
						<li><a href={link.href} class="text-muted transition-colors hover:text-leaf-dark">{link.label}</a></li>
					{/each}
				</ul>
				<p class="mt-5 font-display text-base font-extrabold text-ink">Get Our App</p>
				<div class="mt-3 flex flex-col gap-2">
					<a href="/app" class="flex w-fit items-center gap-2.5 rounded-xl bg-ink px-3.5 py-2 text-white transition-transform duration-200 hover:scale-[1.02]" aria-label="Download on the App Store">
						<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.05 12.54c-.03-2.89 2.36-4.27 2.47-4.34-1.35-1.97-3.44-2.24-4.18-2.27-1.78-.18-3.47 1.05-4.37 1.05-.9 0-2.29-1.02-3.77-1-1.94.03-3.72 1.13-4.72 2.86-2.01 3.49-.51 8.66 1.45 11.5.96 1.39 2.1 2.94 3.6 2.88 1.45-.06 2-.93 3.74-.93s2.24.93 3.77.9c1.56-.03 2.55-1.41 3.5-2.8 1.1-1.61 1.55-3.17 1.58-3.25-.03-.01-3.03-1.16-3.07-4.6ZM14.14 4.5c.8-.97 1.34-2.31 1.19-3.65-1.15.05-2.55.77-3.38 1.74-.74.86-1.39 2.23-1.22 3.55 1.29.1 2.6-.65 3.41-1.64Z"/></svg>
						<span class="leading-tight">
							<span class="block text-[0.6rem] font-medium text-white/70">Download on the</span>
							<span class="block text-sm font-bold">App Store</span>
						</span>
					</a>
					<a href="/app" class="flex w-fit items-center gap-2.5 rounded-xl bg-ink px-3.5 py-2 text-white transition-transform duration-200 hover:scale-[1.02]" aria-label="Get it on Google Play">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.6 1.8 13.7 12 3.6 22.2c-.37-.2-.6-.63-.6-1.2V3c0-.57.23-1 .6-1.2Zm11.5 8.6L4.9 1.9l11 6.3 1.9-1c.6-.34 1.3-.34 1.9 0l1.1.63-5.7 2.57Zm-.1 3.2 4.9 2.8-1.1.63c-.6.34-1.3.34-1.9 0l-1.9-1 1-1.1-1-1.33Zm-1.3 1.4L4.9 22.1l10.2-8.5-1.4 1.4Z"/></svg>
						<span class="leading-tight">
							<span class="block text-[0.6rem] font-medium text-white/70">GET IT ON</span>
							<span class="block text-sm font-bold">Google Play</span>
						</span>
					</a>
				</div>
			</div>
		</div>

		<div class="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row">
			<p>© 2024 GreenBasket. All rights reserved. · Mock website for design review.</p>
			<p class="flex gap-5">
				<a href="/privacy" class="hover:text-leaf-dark">Privacy Policy</a>
				<a href="/terms" class="hover:text-leaf-dark">Terms &amp; Conditions</a>
				<a href="/sitemap.xml" class="hover:text-leaf-dark">Sitemap</a>
			</p>
		</div>
	</div>
</footer>
