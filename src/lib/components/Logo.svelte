<script lang="ts">
	// GreenBasket mark — a basket drawn as SVG (24×24 grid rules:
	// 2px stroke, round caps/joins) on a leaf-green rounded tile.
	// Wordmark is real text so it stays crisp at every size.
	let { compact = false }: { compact?: boolean } = $props();
</script>

<a href="/" class="flex shrink-0 items-center gap-2.5" aria-label="GreenBasket — home">
	<span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-leaf text-white shadow-sm" aria-hidden="true">
		<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<path d="M5 8h14l-1.5 10.5a2 2 0 0 1-2 1.5h-7a2 2 0 0 1-2-1.5L5 8Z" />
			<path d="M8.5 8 12 3.5 15.5 8" />
			<path d="M9.5 12v4" />
			<path d="M12 12v4" />
			<path d="M14.5 12v4" />
		</svg>
	</span>
	<span class="leading-none">
		<span class="block font-display text-[1.45rem] font-extrabold tracking-tight text-ink">GreenBasket</span>
		{#if !compact}
			<span class="mt-1 block text-[0.6rem] font-bold tracking-[0.38em] text-leaf-dark">FRESH TO YOU</span>
		{/if}
	</span>
</a>
