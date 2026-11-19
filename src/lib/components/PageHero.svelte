<script lang="ts">
	// Small hero for inner pages: eyebrow label + big title + sub copy.
	let { eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string } = $props();
</script>

<section class="bg-leaf-pale pt-10 pb-12 sm:pt-14 sm:pb-16" aria-labelledby="page-title">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<p class="text-sm font-black tracking-[0.2em] text-leaf-dark uppercase">{eyebrow}</p>
		<h1 id="page-title" class="mt-2 font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
			{title}
		</h1>
		{#if sub}
			<p class="mt-3 max-w-2xl leading-relaxed text-muted">{sub}</p>
		{/if}
	</div>
</section>
