<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { deals } from '#lib/data/site.ts';

	const extraOffers = [
		{ tag: 'New here', title: 'Flat ₹100 off your first order', detail: 'Use code FRESH100 at checkout on orders above ₹499. One per customer, because we want you to come back for the quality — not the coupon.' },
		{ tag: 'Everyday', title: 'Free delivery over ₹499', detail: 'No code needed. Fill your basket above ₹499 and delivery is on us, every single day.' },
		{ tag: 'Members', title: 'GreenBasket Plus — 5% back', detail: 'Join Plus (free) and earn 5% back as GreenCoins on every order. Coins never expire and work on everything in the store.' },
		{ tag: 'Weekends', title: 'Weekend veggie box — ₹299', detail: 'A curated box of the week’s best vegetables, enough for a family of four, delivered Saturday morning. Limited boxes each week.' }
	];
</script>

<svelte:head>
	<title>Offers — GreenBasket | Deals, Discounts & Free Delivery</title>
	<meta
		name="description"
		content="GreenBasket offers: up to 40% off vegetables, flat 20% off fruits every Friday, buy 1 get 1 free on snacks, ₹100 off your first order and free delivery over ₹499."
	/>
	<link rel="canonical" href="https://greenbasket-4yz.pages.dev/offers" />
</svelte:head>

<PageHero
	eyebrow="Good deals"
	title="Offers & savings"
	sub="Real discounts on the things you buy every week. All offers are mock — the real ones replace these after the client approves the design."
/>

<section class="bg-white py-10 sm:py-14" aria-label="Current offers">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid gap-4 md:grid-cols-3">
			{#each deals as deal}
				<article class="relative overflow-hidden rounded-3xl p-6 sm:p-7" style="background: {deal.tint}">
					<p class="text-xs font-black tracking-[0.18em] text-leaf-dark uppercase">{deal.title}</p>
					<h2 class="mt-2 max-w-[62%] font-display text-2xl leading-tight font-extrabold text-ink">{deal.subtitle}</h2>
					<p class="mt-1 text-sm font-medium text-muted">{deal.detail}</p>
					<a href={deal.link} class="mt-4 inline-flex min-h-11 items-center rounded-full bg-leaf px-6 text-sm font-bold text-white transition-colors hover:bg-leaf-dark">
						{deal.cta}
					</a>
					<Picture
						name={deal.image}
						alt={deal.subtitle}
						width={800}
						height={600}
						sizes="(max-width: 768px) 100vw, 33vw"
						imgClass="absolute -right-4 -bottom-2 h-32 w-44 rounded-2xl object-cover shadow-md sm:h-36 sm:w-52"
					/>
				</article>
			{/each}
		</div>

		<div class="mt-4 grid gap-4 md:grid-cols-2">
			{#each extraOffers as offer}
				<article class="flex flex-col rounded-3xl bg-leaf-pale p-6 ring-1 ring-line sm:p-7">
					<span class="w-fit rounded-full bg-leaf px-3 py-1 text-xs font-black tracking-wider text-white uppercase">{offer.tag}</span>
					<h2 class="mt-3 font-display text-2xl font-extrabold text-ink">{offer.title}</h2>
					<p class="mt-2 flex-1 leading-relaxed text-muted">{offer.detail}</p>
					<a href="/shop" class="mt-5 inline-flex min-h-11 w-fit items-center rounded-full bg-leaf px-6 text-sm font-bold text-white transition-colors hover:bg-leaf-dark">
						Shop now
					</a>
				</article>
			{/each}
		</div>

		<div class="mt-10 rounded-3xl bg-leaf p-8 text-center text-white sm:p-10">
			<h2 class="font-display text-3xl font-extrabold">Why our prices stay low</h2>
			<p class="mx-auto mt-3 max-w-xl leading-relaxed text-white/90">
				We buy directly from farmers and the morning mandi — no middlemen taking a cut at every step.
				That is why the same tomato costs less here, and why the saving goes to your basket, not to a
				marketplace fee.
			</p>
		</div>
	</div>
</section>
