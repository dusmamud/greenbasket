<script lang="ts">
	import { ArrowRight, Check, Headphones, Leaf, RefreshCcw, Tag, Truck } from '@lucide/svelte';
	import Hero from '#lib/components/Hero.svelte';
	import Marquee from '#lib/components/Marquee.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import Testimonials from '#lib/components/Testimonials.svelte';
	import { articles, bestsellers, categories, deals, recipes, site, whyChoose } from '#lib/data/site.ts';

	const whyIcons = { truck: Truck, leaf: Leaf, tag: Tag, refresh: RefreshCcw, headset: Headphones } as const;

	let email = $state('');
	let subscribed = $state(false);
	function subscribe(e: SubmitEvent) {
		e.preventDefault();
		if (email.trim()) subscribed = true;
	}
</script>

<svelte:head>
	<title>GreenBasket — Fresh Groceries Delivered Fast | Fruits, Vegetables, Dairy & More</title>
	<meta
		name="description"
		content="GreenBasket — farm-fresh fruits, vegetables, dairy and daily essentials delivered in as little as 30 minutes across Mumbai. Free delivery over ₹499."
	/>
</svelte:head>

<div id="top">
	<Hero />
	<Marquee />

	<!-- Categories -->
	<section class="bg-white py-12 sm:py-16" aria-labelledby="categories-title">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="reveal flex flex-wrap items-end justify-between gap-4">
				<h2 id="categories-title" class="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Shop by Category</h2>
				<a href="/shop" class="font-bold text-leaf-dark underline underline-offset-4">View All Categories →</a>
			</div>
			<div class="mt-8 grid grid-cols-4 gap-4 sm:gap-6 lg:grid-cols-8">
				{#each categories as cat}
					<a href={`/shop?category=${cat.slug}`} class="group flex flex-col items-center gap-3 text-center">
						<span class="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full shadow-sm ring-1 ring-line transition-transform duration-200 group-hover:scale-105 sm:h-24 sm:w-24" style="background: {cat.tint}">
							<Picture name={cat.image} alt={cat.name} width={480} height={480} sizes="96px" imgClass="h-14 w-14 rounded-full object-cover sm:h-16 sm:w-16" />
						</span>
						<span class="text-xs leading-tight font-bold text-ink transition-colors group-hover:text-leaf-dark sm:text-sm">{cat.name}</span>
					</a>
				{/each}
			</div>
		</div>
	</section>

	<!-- Deals -->
	<section class="bg-white pb-12 sm:pb-16" aria-labelledby="deals-title">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<h2 id="deals-title" class="reveal font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Today's Deals</h2>
			<div class="mt-8 grid gap-4 md:grid-cols-3">
				{#each deals as deal}
					<article class="reveal relative overflow-hidden rounded-3xl p-6 sm:p-7" style="background: {deal.tint}">
						<p class="text-xs font-black tracking-[0.18em] text-leaf-dark uppercase">{deal.title}</p>
						<h3 class="mt-2 max-w-[60%] font-display text-2xl leading-tight font-extrabold text-ink">{deal.subtitle}</h3>
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
		</div>
	</section>

	<!-- Best sellers -->
	<section class="bg-white pb-12 sm:pb-16" aria-labelledby="bestsellers-title">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="reveal flex flex-wrap items-end justify-between gap-4">
				<h2 id="bestsellers-title" class="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Best Sellers</h2>
				<a href="/shop" class="font-bold text-leaf-dark underline underline-offset-4">View All →</a>
			</div>
			<div class="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-6">
				{#each bestsellers as product}
					<ProductCard {product} />
				{/each}
			</div>
		</div>
	</section>

	<!-- Cook tonight / recipes -->
	<section class="bg-white pb-12 sm:pb-16" aria-labelledby="recipes-title">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="reveal flex flex-wrap items-end justify-between gap-4">
				<h2 id="recipes-title" class="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Cook Tonight</h2>
				<a href="/recipes" class="font-bold text-leaf-dark underline underline-offset-4">All Recipes →</a>
			</div>
			<p class="reveal mt-2 text-muted">Shoppable recipes — add every ingredient to your cart in one tap.</p>
			<div class="mt-8 grid gap-5 md:grid-cols-3">
				{#each recipes as recipe}
					<article class="group overflow-hidden rounded-3xl border border-line bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
						<a href={`/recipes/${recipe.slug}`} aria-label={recipe.title}>
							<Picture
								name={recipe.image}
								alt={recipe.title}
								width={800}
								height={533}
								sizes="(max-width: 768px) 100vw, 33vw"
								imgClass="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-105"
							/>
						</a>
						<div class="p-5">
							<p class="text-xs font-bold text-muted">{recipe.time} · Serves {recipe.servings} · Veg</p>
							<h3 class="mt-2 font-display text-lg leading-snug font-bold text-ink">
								<a href={`/recipes/${recipe.slug}`} class="transition-colors hover:text-leaf-dark">{recipe.title}</a>
							</h3>
							<a href={`/recipes/${recipe.slug}`} class="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-leaf-dark">
								Shop ingredients <ArrowRight size={15} aria-hidden="true" />
							</a>
						</div>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<!-- Healthy living / blog -->
	<section class="bg-leaf-pale py-12 sm:py-16" aria-labelledby="blog-title">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="reveal flex flex-wrap items-end justify-between gap-4">
				<h2 id="blog-title" class="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Healthy Living, Made Simple</h2>
				<a href="/blog" class="font-bold text-leaf-dark underline underline-offset-4">View All Articles →</a>
			</div>
			<div class="mt-8 grid gap-5 md:grid-cols-3">
				{#each articles as article}
					<article class="group overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
						<a href={`/blog/${article.slug}`} aria-label={article.title}>
							<Picture
								name={article.image}
								alt={article.title}
								width={800}
								height={600}
								sizes="(max-width: 768px) 100vw, 33vw"
								imgClass="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
							/>
						</a>
						<div class="p-5">
							<span class="rounded-full bg-leaf-soft px-3 py-1 text-xs font-black tracking-wide text-leaf-dark uppercase">{article.tag}</span>
							<h3 class="mt-3 font-display text-lg leading-snug font-bold text-ink">
								<a href={`/blog/${article.slug}`} class="transition-colors hover:text-leaf-dark">{article.title}</a>
							</h3>
							<p class="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{article.excerpt}</p>
							<a href={`/blog/${article.slug}`} class="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-leaf-dark">
								Read More <ArrowRight size={15} aria-hidden="true" />
							</a>
						</div>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<!-- Why choose -->
	<section class="bg-white py-12 sm:py-16" aria-labelledby="why-title">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<h2 id="why-title" class="reveal text-center font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Why Choose GreenBasket?</h2>
			<div class="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
				{#each whyChoose as item}
					{@const Icon = whyIcons[item.icon as keyof typeof whyIcons]}
					<div class="reveal flex flex-col items-center gap-3 text-center">
						<span class="flex h-14 w-14 items-center justify-center rounded-full bg-leaf-soft text-leaf-dark">
							<Icon size={24} aria-hidden="true" />
						</span>
						<div>
							<p class="font-display text-base font-bold text-ink">{item.title}</p>
							<p class="mt-0.5 text-sm text-muted">{item.text}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<Testimonials />

	<!-- GreenBasket Pass banner -->
	<section class="bg-white pb-12 sm:pb-16" aria-label="GreenBasket Pass">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="reveal relative overflow-hidden rounded-[2rem] bg-leaf-deep px-6 py-10 text-white sm:px-12 sm:py-12">
				<div class="pointer-events-none absolute -top-10 -right-10 h-48 w-48 rounded-full bg-white/10" aria-hidden="true"></div>
				<div class="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
					<div class="max-w-xl">
						<h2 class="font-display text-3xl font-extrabold sm:text-4xl">GreenBasket Pass — ₹99/month</h2>
						<p class="mt-2 leading-relaxed text-white/85">Free delivery on every order, extra 5% off fruits & vegetables, priority slots in peak hours. Try the savings calculator and see what you'd save.</p>
					</div>
					<div class="flex flex-wrap gap-3">
						<a href="/membership" class="flex min-h-12 items-center rounded-full bg-white px-7 text-sm font-bold text-leaf-deep">See Pass benefits</a>
						<a href="/subscriptions" class="flex min-h-12 items-center rounded-full border-2 border-white/70 px-7 text-sm font-bold text-white">Daily subscriptions</a>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Newsletter -->
	<section class="bg-white pb-16 sm:pb-20" aria-labelledby="newsletter-title">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="relative overflow-hidden rounded-[2rem] bg-leaf px-6 py-10 sm:px-12 sm:py-12">
				<div class="pointer-events-none absolute -top-10 -right-10 h-48 w-48 rounded-full bg-white/10" aria-hidden="true"></div>
				<div class="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
					<div class="max-w-xl">
						<h2 id="newsletter-title" class="font-display text-3xl font-extrabold text-white sm:text-4xl">Stay Fresh, Stay Updated</h2>
						<p class="mt-2 leading-relaxed text-white/85">Subscribe to get exclusive offers, healthy tips, and updates straight to your inbox.</p>
					</div>
					{#if subscribed}
						<p class="flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-leaf-dark shadow">
							<Check size={18} aria-hidden="true" /> You're subscribed — welcome to GreenBasket!
						</p>
					{:else}
						<form onsubmit={subscribe} class="flex w-full max-w-md items-center overflow-hidden rounded-full bg-white p-1.5 shadow">
							<label class="sr-only" for="newsletter-email">Email address</label>
							<input
								id="newsletter-email"
								type="email"
								required
								bind:value={email}
								placeholder="Enter your email address"
								class="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-muted"
							/>
							<button type="submit" class="flex min-h-11 shrink-0 items-center rounded-full bg-leaf-dark px-6 text-sm font-bold text-white transition-colors hover:bg-leaf-deep">
								Subscribe
							</button>
						</form>
					{/if}
				</div>
			</div>
		</div>
	</section>
</div>
