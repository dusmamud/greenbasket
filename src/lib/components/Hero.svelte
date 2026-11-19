<script lang="ts">
	import { ArrowRight, Leaf, ShieldCheck, Truck } from '@lucide/svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { site } from '#lib/data/site.ts';
</script>

<section class="relative overflow-hidden bg-leaf-pale" aria-labelledby="hero-title">
	<!-- soft green blob behind the image -->
	<div class="pointer-events-none absolute -top-24 right-[-10%] h-[34rem] w-[34rem] rounded-full bg-leaf-soft" aria-hidden="true"></div>
	<div class="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pt-10 pb-14 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:pt-16 lg:pb-20">
		<!-- Copy -->
		<div class="reveal">
			<p class="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-leaf-dark shadow-sm">
				<Leaf size={16} aria-hidden="true" /> 100% Fresh &amp; Organic
			</p>
			<h1 id="hero-title" class="mt-5 font-display text-[2.6rem] leading-[1.05] font-extrabold tracking-tight text-ink sm:text-6xl lg:text-[4.2rem]">
				Fresh Groceries,<br />Delivered <span class="text-leaf">Fast.</span>
			</h1>
			<p class="mt-5 max-w-lg text-lg leading-relaxed text-muted">
				Get farm-fresh fruits, vegetables, and daily essentials delivered to your door in as little as {site.deliveryEta}.
			</p>
			<div class="mt-7 flex flex-wrap items-center gap-4">
				<a
					href="/shop"
					class="flex min-h-12 items-center gap-2 rounded-full bg-leaf px-8 text-sm font-bold text-white shadow-md transition-all duration-200 hover:bg-leaf-dark active:scale-95"
				>
					Shop Now <ArrowRight size={17} aria-hidden="true" />
				</a>
				<a
					href="/offers"
					class="flex min-h-12 items-center rounded-full border-2 border-leaf bg-white px-8 text-sm font-bold text-leaf-dark transition-colors duration-200 hover:bg-leaf-soft"
				>
					Today's Offers
				</a>
			</div>
			<p class="mt-7 flex items-center gap-3">
				<span class="flex -space-x-2.5" aria-hidden="true">
					<span class="flex h-9 w-9 items-center justify-center rounded-full bg-amber text-xs font-black text-white ring-2 ring-white">PS</span>
					<span class="flex h-9 w-9 items-center justify-center rounded-full bg-leaf text-xs font-black text-white ring-2 ring-white">RM</span>
					<span class="flex h-9 w-9 items-center justify-center rounded-full bg-[#7c5cff] text-xs font-black text-white ring-2 ring-white">AI</span>
					<span class="flex h-9 w-9 items-center justify-center rounded-full bg-[#e2543e] text-xs font-black text-white ring-2 ring-white">VN</span>
				</span>
				<span class="text-sm font-semibold text-ink">Join {site.customers} happy customers</span>
			</p>
			<ul class="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-ink/80">
				<li class="flex items-center gap-2"><Truck size={17} class="text-leaf-dark" aria-hidden="true" /> 30-min delivery</li>
				<li class="flex items-center gap-2"><ShieldCheck size={17} class="text-leaf-dark" aria-hidden="true" /> Quality checked</li>
				<li class="flex items-center gap-2"><Leaf size={17} class="text-leaf-dark" aria-hidden="true" /> Farm fresh daily</li>
			</ul>
		</div>

		<!-- Image -->
		<div class="reveal animate-float relative">
			<Picture
				name="hero-grocery-bag"
				alt="GreenBasket tote bag overflowing with fresh groceries — leafy greens, bread, milk, broccoli and oranges"
				width={1600}
				height={1067}
				sizes="(max-width: 1024px) 100vw, 50vw"
				eager
				imgClass="w-full rounded-[2rem] object-cover shadow-xl"
			/>
			<p class="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/95 py-2 pr-4 pl-2 text-xs font-bold text-ink shadow-lg sm:left-6">
				<span class="flex h-7 w-7 items-center justify-center rounded-full bg-leaf text-white">
					<Truck size={14} aria-hidden="true" />
				</span>
				Free delivery over ₹499 · Mumbai
			</p>
		</div>
	</div>
</section>
