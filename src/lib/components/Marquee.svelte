<script lang="ts">
	// Marquee strip: grocery words scrolling on leaf green, CSS transform only.
	const words = [
		'Farm Fresh Vegetables',
		'30-Minute Delivery',
		'Free Delivery over ₹499',
		'Daily Essentials',
		'Organic Fruits',
		'Best Prices Every Day',
		'Fresh Dairy',
		'Easy Returns'
	];
	const row = [...words, ...words];
</script>

<div class="marquee overflow-hidden bg-leaf py-3" aria-hidden="true">
	<div class="animate-marquee flex w-max items-center gap-8 whitespace-nowrap">
		{#each row as word}
			<span class="font-display text-lg font-bold tracking-wide text-white">{word}</span>
			<span class="text-white/60">✦</span>
		{/each}
	</div>
</div>
