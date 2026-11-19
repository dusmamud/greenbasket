# GreenBasket — Fresh Groceries Delivered Fast

Frontend-only grocery store website (mock data), built like the Lumina and Kanigiri sites:
Svelte 5 + SvelteKit 3 + Tailwind CSS 4 + `@sveltejs/adapter-static`, fully prerendered.

## Pages

- `/` — hero, categories, deals, best sellers, blog, why choose, testimonials, newsletter
- `/shop` — all products with category filter, search, veg-only toggle, sorting
- `/shop/[slug]` — product detail with related products
- `/checkout` — 3-step mock checkout (basket → delivery & payment → confirmation)
- `/offers`, `/about`, `/blog`, `/blog/[slug]`, `/faq`, `/contact`, `/shipping`,
  `/track-order`, `/privacy`, `/terms`, 404

Cart is real client-side state (shared `.svelte.ts` store, slide-in drawer, free-delivery
progress over ₹499). All content is mock data in `src/lib/data/site.ts` — replace after
the client approves the design.

## Images

Product/hero/deal/blog photos are generated PNG masters in
`static/images/original/`, converted with sharp to AVIF → WebP → JPG @ 480/800/1200/1600
via `npm run images`. Every image renders through the reusable
`#lib/components/Picture.svelte` component.

## Scripts

- `npm run dev` — dev server
- `npm run build` — static build to `build/`
- `npm run check` — `svelte-check` (0 errors, 0 warnings)
- `npm run images` — convert image masters
- `npm run preview` — preview the static build

## Deploy

GitHub Actions (`.github/workflows/deploy.yml`) deploys `build/` to Cloudflare Pages on
every push to `main`. Live at https://greenbasket.pages.dev
