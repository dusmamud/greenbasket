<script lang="ts">
	// Store area detail — address, hours, ETA, pincode, bestsellers for the
	// area, GroceryStore JSON-LD.
	import { Clock, MapPin, Phone } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import { bestsellers, site, storeAreas } from '#lib/data/site.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const area = storeAreas.find((a) => a.slug === data.slug);

	const storeLd = area
		? {
				'@context': 'https://schema.org',
				'@type': 'GroceryStore',
				name: `GreenBasket — ${area.name}`,
				address: { '@type': 'PostalAddress', streetAddress: area.address, addressLocality: 'Mumbai', postalCode: area.pincode, addressCountry: 'IN' },
				telephone: area.phone,
				url: `${site.url}/stores/${area.slug}`
			}
		: null;
</script>

<svelte:head>
	<title>{area ? `GreenBasket ${area.name} — Grocery Delivery` : 'Store not found — GreenBasket'}</title>
	{#if storeLd}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html `<script type="application/ld+json">${JSON.stringify(storeLd)}</script>`}
	{/if}
</svelte:head>

{#if area}
	<PageHero eyebrow="Store · {area.pincode}" title="GreenBasket {area.name}" sub="Fresh groceries delivered in about {area.eta} — {area.hours}." />
	<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
		<div class="grid gap-6 md:grid-cols-3">
			<div class="rounded-3xl border border-line bg-white p-6">
				<h2 class="flex items-center gap-2 font-display text-lg font-extrabold text-ink"><MapPin size={19} class="text-leaf-dark" aria-hidden="true" /> Visit / contact</h2>
				<p class="mt-3 text-sm leading-relaxed text-ink">{area.address}, Mumbai {area.pincode}</p>
				<p class="mt-2 flex items-center gap-2 text-sm text-muted"><Clock size={15} aria-hidden="true" /> {area.hours}</p>
				<p class="mt-2 flex items-center gap-2 text-sm text-muted"><Phone size={15} aria-hidden="true" /> {area.phone}</p>
				<p class="mt-4 rounded-2xl bg-leaf-pale px-4 py-3 text-sm font-bold text-leaf-dark">Delivery in about {area.eta} · Free above ₹499</p>
				<a href="/shop" class="mt-4 block rounded-full bg-leaf px-5 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-leaf-dark">Start shopping</a>
			</div>
			<div class="md:col-span-2">
				<h2 class="font-display text-xl font-extrabold text-ink">Bestsellers in {area.name}</h2>
				<div class="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-3">
					{#each bestsellers.slice(0, 3) as product (product.slug)}
						<ProductCard {product} />
					{/each}
				</div>
			</div>
		</div>
		<p class="mt-8 text-center"><a href="/stores" class="text-sm font-bold text-leaf-dark hover:underline">← All delivery areas</a></p>
	</section>
{:else}
	<PageHero eyebrow="Store" title="Area not found" sub="That delivery area does not exist yet." />
{/if}
