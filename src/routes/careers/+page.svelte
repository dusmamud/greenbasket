<script lang="ts">
	// Careers (research P2-2) — mock roles, simple application form.
	import { Briefcase } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { careers } from '#lib/data/site.ts';

	let applied = $state<string | null>(null);
</script>

<svelte:head>
	<title>Careers — GreenBasket</title>
	<meta name="description" content="Work at GreenBasket — delivery partners, dark store associates, customer happiness and category roles in Mumbai." />
</svelte:head>

<PageHero
	eyebrow="Careers"
	title="Grow with GreenBasket"
	sub="We are a small Mumbai team moving fast — riders, pickers, support and buyers. Freshers welcome where it says so."
/>

<section class="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
	<ul class="space-y-4">
		{#each careers as role}
			<li class="rounded-3xl border border-line bg-white p-6">
				<div class="flex flex-wrap items-start justify-between gap-3">
					<div>
						<h2 class="flex items-center gap-2 font-display text-lg font-extrabold text-ink"><Briefcase size={18} class="text-leaf-dark" aria-hidden="true" /> {role.title}</h2>
						<p class="mt-1 text-sm font-semibold text-muted">{role.type}</p>
						<p class="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{role.blurb}</p>
					</div>
					<button
						type="button"
						onclick={() => (applied = role.title)}
						class="shrink-0 rounded-full bg-leaf px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-leaf-dark"
					>
						Apply
					</button>
				</div>
				{#if applied === role.title}
					<p role="status" class="mt-4 rounded-2xl bg-leaf-pale px-4 py-3 text-sm font-bold text-leaf-dark">
						✓ Application noted for “{role.title}” (demo — nothing was submitted). We would email you the next steps.
					</p>
				{/if}
			</li>
		{/each}
	</ul>
	<p class="mt-8 text-center text-sm text-muted">Don't see your role? Write to <a href="mailto:hello@greenbasket.in" class="font-bold text-leaf-dark">hello@greenbasket.in</a> — we read everything.</p>
</section>
