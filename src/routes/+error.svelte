<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>Page not found — GreenBasket</title>
	<meta name="description" content="That page does not exist. Find your way back to GreenBasket." />
</svelte:head>

<section class="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
	<p class="font-display text-7xl font-extrabold text-leaf">404</p>
	<h1 class="mt-4 font-display text-3xl font-extrabold text-ink">This aisle does not exist</h1>
	<p class="mx-auto mt-3 max-w-md leading-relaxed text-muted">
		The page you are looking for ({page.url.pathname}) has moved or never existed. Let us take you back to
		fresh groceries.
	</p>
	<div class="mt-8 flex flex-wrap justify-center gap-3">
		<a
			href="/"
			class="inline-flex min-h-12 items-center rounded-full bg-leaf px-7 text-base font-bold text-white transition-colors duration-200 hover:bg-leaf-dark"
		>
			Back to home
		</a>
		<a
			href="/shop"
			class="inline-flex min-h-12 items-center rounded-full border-2 border-leaf px-7 text-base font-bold text-leaf-dark transition-colors duration-200 hover:bg-leaf-soft"
		>
			Shop groceries
		</a>
	</div>
</section>
