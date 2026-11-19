<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { site } from '#lib/data/site.ts';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const article = $derived(data.article);
	const body = $derived(data.body);
	const others = $derived(data.others);
</script>

<svelte:head>
	<title>{article.title} — GreenBasket Blog</title>
	<meta name="description" content={article.excerpt} />
	<link rel="canonical" href={`${site.url}/blog/${article.slug}`} />
</svelte:head>

<article class="bg-white py-10 sm:py-14">
	<div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
		<nav aria-label="Breadcrumb" class="text-sm font-medium text-muted">
			<a href="/" class="hover:text-leaf-dark">Home</a> · <a href="/blog" class="hover:text-leaf-dark">Blog</a> · <span class="text-ink">{article.tag}</span>
		</nav>
		<span class="mt-6 inline-block rounded-full bg-leaf-soft px-3 py-1 text-xs font-black tracking-wide text-leaf-dark uppercase">{article.tag}</span>
		<span class="ml-2 text-xs font-semibold text-muted">{article.readMins} min read</span>
		<h1 class="mt-3 font-display text-4xl leading-tight font-extrabold tracking-tight text-ink sm:text-5xl">{article.title}</h1>
		<p class="mt-4 text-lg leading-relaxed text-muted">{article.excerpt}</p>

		<Picture
			name={article.image}
			alt={article.title}
			width={1200}
			height={800}
			sizes="(max-width: 768px) 100vw, 768px"
			eager
			imgClass="mt-8 aspect-[3/2] w-full rounded-[2rem] object-cover shadow-sm"
		/>

		<div class="mt-8 space-y-5 text-[1.05rem] leading-relaxed text-ink/90">
			{#each body as para}
				<p>{para}</p>
			{/each}
		</div>

		<div class="mt-10 rounded-3xl bg-leaf-pale p-6 text-center ring-1 ring-line">
			<p class="font-display text-xl font-extrabold text-ink">Shop the ingredients</p>
			<p class="mt-1 text-sm text-muted">Everything in this article is in the store — delivered in about 30 minutes.</p>
			<a href="/shop" class="mt-4 inline-flex min-h-12 items-center rounded-full bg-leaf px-7 text-sm font-bold text-white">Shop groceries</a>
		</div>

		{#if others.length > 0}
			<h2 class="mt-12 font-display text-2xl font-extrabold text-ink">More to read</h2>
			<div class="mt-5 grid gap-4 sm:grid-cols-2">
				{#each others as other}
					<a href={`/blog/${other.slug}`} class="group flex gap-4 rounded-3xl bg-white p-4 ring-1 ring-line transition-all hover:-translate-y-0.5 hover:shadow-md">
						<Picture name={other.image} alt={other.title} width={480} height={360} sizes="160px" imgClass="h-24 w-32 shrink-0 rounded-2xl object-cover" />
						<span>
							<span class="text-xs font-black tracking-wide text-leaf-dark uppercase">{other.tag}</span>
							<span class="mt-1 block font-display text-base leading-snug font-bold text-ink group-hover:text-leaf-dark">{other.title}</span>
							<span class="mt-1 inline-flex items-center gap-1 text-sm font-bold text-leaf-dark">Read <ArrowRight size={14} aria-hidden="true" /></span>
						</span>
					</a>
				{/each}
			</div>
		{/if}
	</div>
</article>
