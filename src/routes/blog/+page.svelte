<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { articles } from '#lib/data/site.ts';
</script>

<svelte:head>
	<title>Blog — GreenBasket | Healthy Living, Made Simple</title>
	<meta name="description" content="GreenBasket blog — superfoods, meal prep ideas, sustainability tips and healthy recipes for everyday Indian kitchens." />
	<link rel="canonical" href="https://greenbasket.pages.dev/blog" />
</svelte:head>

<PageHero
	eyebrow="Healthy living"
	title="Healthy living, made simple"
	sub="Practical nutrition, meal prep and sustainability ideas — written for real Indian kitchens, not for Instagram."
/>

<section class="bg-white py-10 sm:py-14" aria-label="Articles">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid gap-5 md:grid-cols-3">
			{#each articles as article}
				<article class="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-line transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
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
						<span class="ml-2 text-xs font-semibold text-muted">{article.readMins} min read</span>
						<h2 class="mt-3 font-display text-lg leading-snug font-bold text-ink">
							<a href={`/blog/${article.slug}`} class="transition-colors hover:text-leaf-dark">{article.title}</a>
						</h2>
						<p class="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{article.excerpt}</p>
						<a href={`/blog/${article.slug}`} class="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-leaf-dark">
							Read More <ArrowRight size={15} aria-hidden="true" />
						</a>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>
