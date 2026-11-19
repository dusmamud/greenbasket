<script lang="ts">
	// Recipes — shoppable (research P1-3): every recipe links to its
	// ingredients in the store. Recipe JSON-LD lives on the detail page.
	import { Clock, Users } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { products, recipes } from '#lib/data/site.ts';
	import { inr } from '#lib/data/site.ts';

	function total(r: (typeof recipes)[number]) {
		return r.ingredients.reduce((sum, ing) => {
			const p = products.find((x) => x.slug === ing.slug);
			return sum + (p?.price ?? 0);
		}, 0);
	}
</script>

<svelte:head>
	<title>Recipes — GreenBasket</title>
	<meta name="description" content="Shoppable recipes from GreenBasket — add every ingredient to your cart in one tap. Delivered in 30 minutes across Mumbai." />
</svelte:head>

<PageHero
	eyebrow="Recipes"
	title="Cook tonight, shop in one tap"
	sub="Every recipe lists its ingredients from our shelves — add them all to your cart and dinner is sorted."
/>

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
	<div class="grid gap-6 md:grid-cols-3">
		{#each recipes as recipe}
			<article class="flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
				<a href={`/recipes/${recipe.slug}`} class="block">
					<Picture
						name={recipe.image}
						alt={recipe.title}
						width={800}
						height={533}
						sizes="(max-width: 768px) 100vw, 33vw"
						imgClass="aspect-[3/2] w-full object-cover"
					/>
				</a>
				<div class="flex flex-1 flex-col p-5">
					<div class="flex items-center gap-3 text-xs font-bold text-muted">
						<span class="flex items-center gap-1"><Clock size={13} aria-hidden="true" /> {recipe.time}</span>
						<span class="flex items-center gap-1"><Users size={13} aria-hidden="true" /> Serves {recipe.servings}</span>
						<span class="rounded-full bg-leaf-pale px-2 py-0.5 text-leaf-dark">Veg</span>
					</div>
					<a href={`/recipes/${recipe.slug}`}>
						<h2 class="mt-2 font-display text-xl font-extrabold text-ink hover:text-leaf-dark">{recipe.title}</h2>
					</a>
					<p class="mt-2 text-sm leading-relaxed text-muted">{recipe.excerpt}</p>
					<div class="mt-4 flex-1"></div>
					<div class="mt-4 flex items-center justify-between">
						<span class="text-sm font-bold text-ink">Ingredients from {inr(total(recipe))}</span>
						<a
							href={`/recipes/${recipe.slug}`}
							class="rounded-full bg-leaf px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-leaf-dark"
							>View recipe</a
						>
					</div>
				</div>
			</article>
		{/each}
	</div>
</section>
