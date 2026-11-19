<script lang="ts">
	import { Leaf, Timer, Truck } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { site } from '#lib/data/site.ts';

	const stats = [
		{ value: '50,000+', label: 'Happy customers' },
		{ value: '2,400+', label: 'Products in store' },
		{ value: '30 min', label: 'Average delivery' },
		{ value: '4.8', label: 'Average rating' }
	];
</script>

<svelte:head>
	<title>About Us — GreenBasket | Fresh Groceries, Delivered Fast</title>
	<meta
		name="description"
		content="GreenBasket started in Bandra West, Mumbai with one belief: fresh groceries should reach your door fast, fairly priced, and honestly packed."
	/>
	<link rel="canonical" href="https://greenbasket-4yz.pages.dev/about" />
</svelte:head>

<PageHero
	eyebrow="Since 2024"
	title="Fresh groceries, the way your neighbourhood store used to do it."
	sub="GreenBasket started in Bandra West with one belief: fresh groceries should reach your door fast, fairly priced, and honestly packed — like the sabziwala who knew your name, minus the haggling."
/>

<section class="bg-white py-12 sm:py-16" aria-label="Our story">
	<div class="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
		<div class="animate-float">
			<Picture
				name="hero-grocery-bag"
				alt="GreenBasket tote bag overflowing with fresh groceries"
				width={1600}
				height={1067}
				sizes="(max-width: 1024px) 100vw, 50vw"
				imgClass="w-full rounded-[2rem] object-cover shadow-xl"
			/>
		</div>
		<div>
			<h2 class="font-display text-3xl font-extrabold text-ink sm:text-4xl">Why "GreenBasket"?</h2>
			<p class="mt-4 leading-relaxed text-muted">
				Because the basket is the whole idea. Every morning our buyers walk the wholesale mandi at 4 am,
				pick vegetables the way you would — thump the watermelon, smell the coriander, check the milk
				date — and pack them into green baskets that go straight to our riders. No cold storage for days,
				no stale stock pushed to the front.
			</p>
			<p class="mt-4 leading-relaxed text-muted">
				Two years later the promise is unchanged: farm-fresh produce, honest weights, and delivery in
				about 30 minutes. What changed is the scale — 50,000+ Mumbai households now shop with us every
				week, and our riders cover the whole city from Bandra to Thane.
			</p>
			<ul class="mt-6 space-y-4">
				<li class="flex gap-3">
					<Leaf size={22} class="shrink-0 text-leaf-dark" aria-hidden="true" />
					<p><strong class="text-ink">Farm vegetables every morning</strong> — sourced fresh from the mandi, never warehoused for days.</p>
				</li>
				<li class="flex gap-3">
					<Timer size={22} class="shrink-0 text-leaf-dark" aria-hidden="true" />
					<p><strong class="text-ink">At your door in about 30 minutes</strong> — or your delivery fee is on us.</p>
				</li>
				<li class="flex gap-3">
					<Truck size={22} class="shrink-0 text-leaf-dark" aria-hidden="true" />
					<p><strong class="text-ink">Honest weights, fair prices</strong> — what you order is what you get, weighed in front of you on request.</p>
				</li>
			</ul>
		</div>
	</div>
</section>

<!-- Stats -->
<section class="bg-leaf-pale py-12" aria-label="GreenBasket in numbers">
	<div class="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
		{#each stats as stat}
			<div class="rounded-3xl bg-white p-6 text-center ring-1 ring-line">
				<p class="font-display text-4xl font-extrabold text-leaf-dark">{stat.value}</p>
				<p class="mt-1 text-sm font-semibold text-muted">{stat.label}</p>
			</div>
		{/each}
	</div>
</section>

<!-- How it works -->
<section class="bg-white py-12 sm:py-16" aria-label="How GreenBasket works">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<h2 class="font-display text-3xl font-extrabold text-ink sm:text-4xl">How it works</h2>
		<div class="mt-8 grid gap-4 md:grid-cols-3">
			<div class="rounded-3xl bg-leaf-pale p-6 ring-1 ring-line">
				<p class="text-sm font-black tracking-[0.2em] text-leaf-dark uppercase">Step one</p>
				<h3 class="mt-1 font-display text-xl font-extrabold text-ink">Shop the store</h3>
				<p class="mt-2 leading-relaxed text-muted">Browse 2,400+ products across fruits, vegetables, dairy, snacks and daily essentials — with real photos and honest prices.</p>
			</div>
			<div class="rounded-3xl bg-leaf-pale p-6 ring-1 ring-line">
				<p class="text-sm font-black tracking-[0.2em] text-leaf-dark uppercase">Step two</p>
				<h3 class="mt-1 font-display text-xl font-extrabold text-ink">We pick &amp; pack</h3>
				<p class="mt-2 leading-relaxed text-muted">Our pickers choose each item like you would, pack it in paper and cloth — never loose plastic — and weigh it twice.</p>
			</div>
			<div class="rounded-3xl bg-leaf-pale p-6 ring-1 ring-line">
				<p class="text-sm font-black tracking-[0.2em] text-leaf-dark uppercase">Step three</p>
				<h3 class="mt-1 font-display text-xl font-extrabold text-ink">Delivered in ~30 minutes</h3>
				<p class="mt-2 leading-relaxed text-muted">A rider brings it to your door, chilled where it matters. Pay by UPI, card or cash — whatever suits you.</p>
			</div>
		</div>
		<p class="mt-8 text-center text-sm text-muted">
			Open 6:00 am – 11:00 pm, every day · {site.address} · {site.phoneDisplay}
		</p>
		<div class="mt-6 flex flex-wrap justify-center gap-3">
			<a href="/shop" class="flex min-h-12 items-center rounded-full bg-leaf px-7 text-sm font-bold text-white">Shop now</a>
			<a href="/contact" class="flex min-h-12 items-center rounded-full border-2 border-leaf px-7 text-sm font-bold text-leaf-dark">Visit the store</a>
		</div>
	</div>
</section>
