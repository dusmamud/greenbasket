<script lang="ts">
	// Recipe detail — ingredients with per-item steppers, "Add all
	// ingredients" (one tap builds the basket), servings scaler, Recipe
	// JSON-LD (still earns rich results in 2026).
	import { Check, Clock, Minus, Plus, ShoppingCart, Users } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { addProduct } from '#lib/cart.svelte.ts';
	import { drawer } from '#lib/drawer.svelte.ts';
	import { inr, products, recipes, site } from '#lib/data/site.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const recipe = recipes.find((r) => r.slug === data.slug);
	const quantities = $state<Record<string, number>>({});
	let servings = $state(recipe?.servings ?? 2);
	let added = $state(false);

	const total = $derived.by(() => {
		if (!recipe) return 0;
		return recipe.ingredients.reduce((sum, ing) => {
			const p = products.find((x) => x.slug === ing.slug);
			const qty = quantities[ing.slug] ?? 1;
			return sum + (p?.price ?? 0) * qty;
		}, 0);
	});

	function addAll() {
		if (!recipe) return;
		for (const ing of recipe.ingredients) {
			const n = quantities[ing.slug] ?? 1;
			for (let i = 0; i < n; i++) addProduct(ing.slug);
		}
		added = true;
		drawer.open = true;
		setTimeout(() => (added = false), 3000);
	}

	const recipeLd = recipe
		? {
				'@context': 'https://schema.org',
				'@type': 'Recipe',
				name: recipe.title,
				description: recipe.excerpt,
				recipeYield: `${recipe.servings} servings`,
				recipeIngredient: recipe.ingredients.map((ing) => {
					const p = products.find((x) => x.slug === ing.slug);
					return `${ing.qty} ${p?.name ?? ing.slug}`;
				}),
				recipeInstructions: recipe.steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, text: s }))
			}
		: null;
</script>

<svelte:head>
	<title>{recipe ? `${recipe.title} — GreenBasket Recipes` : 'Recipe not found — GreenBasket'}</title>
	{#if recipeLd}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html `<script type="application/ld+json">${JSON.stringify(recipeLd)}</script>`}
	{/if}
</svelte:head>

{#if recipe}
	<PageHero eyebrow="Recipe" title={recipe.title} sub={recipe.excerpt} />

	<section class="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
		<div class="overflow-hidden rounded-3xl border border-line bg-white">
			<Picture
				name={recipe.image}
				alt={recipe.title}
				width={1200}
				height={800}
				sizes="(max-width: 768px) 100vw, 80vw"
				imgClass="aspect-[3/2] w-full object-cover"
			/>
			<div class="p-6 sm:p-8">
				<div class="flex flex-wrap items-center gap-4 text-sm font-bold text-muted">
					<span class="flex items-center gap-1.5"><Clock size={16} aria-hidden="true" /> {recipe.time}</span>
					<span class="flex items-center gap-1.5"><Users size={16} aria-hidden="true" /> Serves {servings}</span>
					<span class="rounded-full bg-leaf-pale px-3 py-1 text-leaf-dark">Vegetarian</span>
					<span class="flex items-center gap-2">
						Servings
						<button
							type="button"
							aria-label="Fewer servings"
							onclick={() => (servings = Math.max(1, servings - 1))}
							class="flex h-9 w-9 items-center justify-center rounded-full bg-leaf-pale text-ink"
						><Minus size={14} aria-hidden="true" /></button>
						<span class="w-6 text-center text-ink">{servings}</span>
						<button
							type="button"
							aria-label="More servings"
							onclick={() => (servings = Math.min(8, servings + 1))}
							class="flex h-9 w-9 items-center justify-center rounded-full bg-leaf-pale text-ink"
						><Plus size={14} aria-hidden="true" /></button>
					</span>
				</div>

				<h2 class="mt-8 font-display text-xl font-extrabold text-ink">Ingredients</h2>
				<ul class="mt-4 divide-y divide-line">
					{#each recipe.ingredients as ing}
						{@const p = products.find((x) => x.slug === ing.slug)}
						{#if p}
							<li class="flex items-center justify-between gap-3 py-3">
								<a href={`/shop/${p.slug}`} class="min-w-0">
									<span class="block truncate text-sm font-bold text-ink hover:text-leaf-dark">{p.name}</span>
									<span class="text-xs text-muted">{ing.qty} · {inr(p.price)} / {p.unit}</span>
								</a>
								<span class="flex shrink-0 items-center gap-2">
									<button
										type="button"
										aria-label={`One less ${p.name}`}
										onclick={() => (quantities[ing.slug] = Math.max(0, (quantities[ing.slug] ?? 1) - 1))}
										class="flex h-9 w-9 items-center justify-center rounded-full bg-leaf-pale text-ink"
									><Minus size={14} aria-hidden="true" /></button>
									<span class="w-5 text-center text-sm font-black text-ink">{quantities[ing.slug] ?? 1}</span>
									<button
										type="button"
										aria-label={`One more ${p.name}`}
										onclick={() => (quantities[ing.slug] = (quantities[ing.slug] ?? 1) + 1)}
										class="flex h-9 w-9 items-center justify-center rounded-full bg-leaf text-white"
									><Plus size={14} aria-hidden="true" /></button>
								</span>
							</li>
						{/if}
					{/each}
				</ul>

				<button
					type="button"
					onclick={addAll}
					class="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-leaf text-base font-bold text-white transition-colors hover:bg-leaf-dark"
				>
					<ShoppingCart size={18} aria-hidden="true" />
					{#if added}Added to cart ✓{:else}Add all ingredients — {inr(total)}{/if}
				</button>
				<p class="mt-2 text-center text-xs text-muted">Servings scaler adjusts the recipe; ingredient quantities stay as listed.</p>

				<h2 class="mt-10 font-display text-xl font-extrabold text-ink">Method</h2>
				<ol class="mt-4 space-y-4">
					{#each recipe.steps as step, i}
						<li class="flex gap-3">
							<span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-leaf-pale text-sm font-black text-leaf-dark">{i + 1}</span>
							<p class="pt-1 text-sm leading-relaxed text-ink">{step}</p>
						</li>
					{/each}
				</ol>
				<p class="mt-8 flex items-center gap-2 rounded-2xl bg-leaf-pale px-4 py-3 text-sm font-semibold text-leaf-dark">
					<Check size={16} aria-hidden="true" /> All ingredients are in stock at Bandra West — order now, cook in 30 minutes.
				</p>
			</div>
		</div>
		<p class="mt-6 text-center"><a href="/recipes" class="text-sm font-bold text-leaf-dark hover:underline">← All recipes</a></p>
	</section>
{:else}
	<PageHero eyebrow="Recipe" title="Recipe not found" sub="That recipe does not exist — browse the ones we have." />
	<section class="mx-auto max-w-5xl px-4 py-10 text-center">
		<a href="/recipes" class="rounded-full bg-leaf px-6 py-3 text-sm font-bold text-white">All recipes</a>
	</section>
{/if}
