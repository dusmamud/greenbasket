<script lang="ts">
	// Subscriptions — daily staples on a schedule (research P1-1):
	// pick a plan, pick a schedule, pause/skip anytime. Mock only.
	import { CalendarClock, Pause, Play } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { inr, products, subscriptions } from '#lib/data/site.ts';

	let chosen = $state<Record<string, string>>({});
	let paused = $state<Record<string, boolean>>({});
	let started = $state<string | null>(null);

	function start(slug: string) {
		started = slug;
		setTimeout(() => (started = null), 3000);
	}
</script>

<svelte:head>
	<title>Subscriptions — GreenBasket</title>
	<meta name="description" content="Daily staples on subscription — milk, eggs and bread delivered every morning. Pause or skip anytime." />
</svelte:head>

<PageHero
	eyebrow="Subscriptions"
	title="Never run out of the daily stuff"
	sub="Milk, eggs and bread on autopilot — set it once, pause or skip anytime. No charge for paused days."
/>

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
	<div class="grid gap-6 md:grid-cols-3">
		{#each subscriptions as sub}
			{@const p = products.find((x) => x.slug === sub.productSlug)}
			<article class="flex flex-col rounded-3xl border border-line bg-white p-6 shadow-sm">
				<p class="flex items-center gap-2 text-sm font-black tracking-wide text-leaf-dark uppercase">
					<CalendarClock size={16} aria-hidden="true" /> Subscription
				</p>
				<h2 class="mt-2 font-display text-xl font-extrabold text-ink">{sub.name}</h2>
				<p class="mt-2 text-sm leading-relaxed text-muted">{sub.blurb}</p>
				<p class="mt-4">
					<span class="font-display text-2xl font-extrabold text-ink">{inr(sub.price)}</span>
					<span class="text-sm font-semibold text-muted"> / {sub.unit}</span>
				</p>
				<label class="mt-4 block text-xs font-bold tracking-wide text-muted uppercase" for={`sched-${sub.slug}`}>Delivery schedule</label>
				<select
					id={`sched-${sub.slug}`}
					bind:value={chosen[sub.slug]}
					class="mt-1 min-h-11 w-full rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink outline-none focus:border-leaf"
				>
					{#each sub.schedules as s}
						<option value={s}>{s}</option>
					{/each}
				</select>
				<div class="mt-5 flex-1"></div>
				<div class="mt-4 flex gap-2">
					<button
						type="button"
						onclick={() => start(sub.slug)}
						class="flex min-h-11 flex-1 items-center justify-center rounded-full bg-leaf px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-leaf-dark"
					>
						{#if started === sub.slug}Started ✓{:else}Start subscription{/if}
					</button>
					<button
						type="button"
						onclick={() => (paused[sub.slug] = !paused[sub.slug])}
						aria-pressed={paused[sub.slug] ?? false}
						class="flex min-h-11 items-center gap-1.5 rounded-full border border-line px-4 py-2.5 text-sm font-bold text-ink transition-colors hover:border-leaf"
					>
						{#if paused[sub.slug]}<Play size={15} aria-hidden="true" /> Resume{:else}<Pause size={15} aria-hidden="true" /> Pause{/if}
					</button>
				</div>
				{#if p}
					<a href={`/shop/${p.slug}`} class="mt-3 text-center text-sm font-bold text-leaf-dark hover:underline">Or buy once — {p.name}, {inr(p.price)}</a>
				{/if}
			</article>
		{/each}
	</div>

	<div class="mt-10 rounded-3xl bg-leaf-pale p-6 sm:p-8">
		<h2 class="font-display text-xl font-extrabold text-ink">How it works</h2>
		<ol class="mt-4 grid gap-4 sm:grid-cols-3">
			<li class="rounded-2xl bg-white p-5"><span class="font-display text-2xl font-extrabold text-leaf-dark">1</span><p class="mt-2 text-sm font-bold text-ink">Pick a staple and a schedule</p><p class="text-sm text-muted">Daily, weekdays or alternate days — your call.</p></li>
			<li class="rounded-2xl bg-white p-5"><span class="font-display text-2xl font-extrabold text-leaf-dark">2</span><p class="mt-2 text-sm font-bold text-ink">We deliver before 7 am</p><p class="text-sm text-muted">Chilled and fresh, at your door while you wake up.</p></li>
			<li class="rounded-2xl bg-white p-5"><span class="font-display text-2xl font-extrabold text-leaf-dark">3</span><p class="mt-2 text-sm font-bold text-ink">Pause, skip or cancel anytime</p><p class="text-sm text-muted">No charge for paused days. No lock-in, ever.</p></li>
		</ol>
	</div>
</section>
