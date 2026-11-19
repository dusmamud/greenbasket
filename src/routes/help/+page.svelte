<script lang="ts">
	// Help centre — searchable, grouped (research P2-1). Separate from /faq:
	// this is for order issues, returns, payments and subscriptions.
	import { MessageCircleQuestion, Search } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { helpTopics, site } from '#lib/data/site.ts';

	let q = $state('');
	const groups = $derived.by(() => {
		const t = q.trim().toLowerCase();
		const list = t ? helpTopics.filter((x) => `${x.title} ${x.body} ${x.group}`.toLowerCase().includes(t)) : helpTopics;
		const map = new Map<string, typeof helpTopics>();
		for (const topic of list) {
			const arr = map.get(topic.group) ?? [];
			arr.push(topic);
			map.set(topic.group, arr);
		}
		return [...map.entries()];
	});
</script>

<svelte:head>
	<title>Help Centre — GreenBasket</title>
	<meta name="description" content="GreenBasket help centre — delivery, returns, payments, coupons, subscriptions and your account. Answers in plain words." />
</svelte:head>

<PageHero
	eyebrow="Help Centre"
	title="How can we help?"
	sub="Search an answer, or talk to a human — we reply within minutes, 6 am to 11 pm."
/>

<section class="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
	<form role="search" onsubmit={(e) => e.preventDefault()} class="relative">
		<label class="sr-only" for="help-search">Search help articles</label>
		<Search size={19} class="absolute top-1/2 left-5 -translate-y-1/2 text-leaf-dark" aria-hidden="true" />
		<input
			id="help-search"
			type="search"
			bind:value={q}
			placeholder="Try 'refund', 'delivery slot', 'coupon'..."
			class="w-full rounded-full border-2 border-leaf bg-white py-4 pr-5 pl-12 text-base outline-none placeholder:text-muted"
		/>
	</form>

	{#if groups.length === 0}
		<div class="mt-8 rounded-3xl border border-line bg-white px-6 py-12 text-center">
			<MessageCircleQuestion size={40} class="mx-auto text-muted" aria-hidden="true" />
			<h2 class="mt-3 font-display text-xl font-extrabold text-ink">No article matches “{q}”</h2>
			<p class="mt-2 text-sm text-muted">Try a simpler word, or ask us directly — we are quick.</p>
			<a href={site.whatsappHref} target="_blank" rel="noopener" class="mt-5 inline-block rounded-full bg-leaf px-6 py-3 text-sm font-bold text-white">Chat on WhatsApp</a>
		</div>
	{:else}
		{#each groups as [group, topics]}
			<h2 class="mt-10 font-display text-xl font-extrabold text-ink">{group}</h2>
			<div class="mt-4 space-y-3">
				{#each topics as topic}
					<details class="group rounded-3xl border border-line bg-white p-5 open:shadow-sm">
						<summary class="flex cursor-pointer list-none items-center justify-between gap-3 text-base font-bold text-ink">
							{topic.title}
							<span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-leaf-pale text-leaf-dark transition-transform duration-200 group-open:rotate-45" aria-hidden="true">+</span>
						</summary>
						<p class="mt-3 text-sm leading-relaxed text-muted">{topic.body}</p>
					</details>
				{/each}
			</div>
		{/each}
	{/if}

	<div class="mt-12 rounded-3xl bg-leaf-deep p-6 text-center text-white sm:p-8">
		<h2 class="font-display text-xl font-extrabold">Still stuck?</h2>
		<p class="mt-2 text-sm text-white/85">Call {site.phoneDisplay} or message us on WhatsApp — a human replies, not a bot loop.</p>
		<div class="mt-5 flex flex-wrap justify-center gap-3">
			<a href={site.phoneHref} class="rounded-full bg-white px-6 py-3 text-sm font-bold text-leaf-deep">Call us</a>
			<a href={site.whatsappHref} target="_blank" rel="noopener" class="rounded-full border border-white/60 px-6 py-3 text-sm font-bold text-white">WhatsApp</a>
		</div>
	</div>
</section>
