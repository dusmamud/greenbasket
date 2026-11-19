<script lang="ts">
	import FaqAccordion from '#lib/components/FaqAccordion.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { faqs, site } from '#lib/data/site.ts';
</script>

<svelte:head>
	<title>FAQ — GreenBasket | Delivery, Payment, Returns & More</title>
	<meta
		name="description"
		content="Answers to the questions customers actually ask: delivery speed and areas, free delivery, payment methods, returns, scheduling and more."
	/>
	<link rel="canonical" href="https://greenbasket-4yz.pages.dev/faq" />
</svelte:head>

<PageHero
	eyebrow="Good to know"
	title="Frequently asked questions"
	sub="Delivery, payment, returns, scheduling — the questions customers actually ask, answered straight."
/>

<section class="bg-white py-10 sm:py-14" aria-label="Frequently asked questions">
	<div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
		<FaqAccordion items={faqs} />
		<p class="mt-8 text-center text-muted">
			Still stuck? Call <a class="font-bold text-leaf-dark underline underline-offset-4" href={site.phoneHref}>{site.phoneDisplay}</a> or
			<a class="font-bold text-leaf-dark underline underline-offset-4" href="/contact"> message us</a>.
		</p>
	</div>
</section>
