import { articles, categories, products, recipes, site, storeAreas } from '#lib/data/site.ts';

export const prerender = true;

const staticPages = [
	{ path: '/', priority: '1.0', changefreq: 'weekly' },
	{ path: '/shop', priority: '0.9', changefreq: 'weekly' },
	{ path: '/offers', priority: '0.8', changefreq: 'weekly' },
	{ path: '/recipes', priority: '0.8', changefreq: 'weekly' },
	{ path: '/subscriptions', priority: '0.8', changefreq: 'weekly' },
	{ path: '/membership', priority: '0.8', changefreq: 'monthly' },
	{ path: '/stores', priority: '0.8', changefreq: 'monthly' },
	{ path: '/help', priority: '0.7', changefreq: 'monthly' },
	{ path: '/gift-cards', priority: '0.6', changefreq: 'monthly' },
	{ path: '/bulk', priority: '0.6', changefreq: 'monthly' },
	{ path: '/careers', priority: '0.6', changefreq: 'monthly' },
	{ path: '/sustainability', priority: '0.6', changefreq: 'monthly' },
	{ path: '/app', priority: '0.6', changefreq: 'monthly' },
	{ path: '/returns', priority: '0.6', changefreq: 'monthly' },
	{ path: '/about', priority: '0.8', changefreq: 'monthly' },
	{ path: '/blog', priority: '0.8', changefreq: 'weekly' },
	{ path: '/contact', priority: '0.8', changefreq: 'monthly' },
	{ path: '/faq', priority: '0.7', changefreq: 'monthly' },
	{ path: '/shipping', priority: '0.7', changefreq: 'monthly' },
	{ path: '/track-order', priority: '0.7', changefreq: 'monthly' },
	{ path: '/privacy', priority: '0.3', changefreq: 'yearly' },
	{ path: '/terms', priority: '0.3', changefreq: 'yearly' }
];

const productPages = products.map((p) => ({ path: `/shop/${p.slug}`, priority: '0.8', changefreq: 'monthly' }));
const articlePages = articles.map((a) => ({ path: `/blog/${a.slug}`, priority: '0.7', changefreq: 'monthly' }));
const categoryPages = [
	...categories.map((c) => ({ path: `/category/${c.slug}`, priority: '0.8', changefreq: 'weekly' })),
	{ path: '/category/under-99', priority: '0.7', changefreq: 'weekly' }
];
const recipePages = recipes.map((r) => ({ path: `/recipes/${r.slug}`, priority: '0.7', changefreq: 'monthly' }));
const storePages = storeAreas.map((a) => ({ path: `/stores/${a.slug}`, priority: '0.7', changefreq: 'monthly' }));

export function GET() {
	// /checkout, /account, /wishlist and /search are deliberately excluded:
	// private or noindex routes do not belong in the sitemap.
	const pages = [...staticPages, ...productPages, ...articlePages, ...categoryPages, ...recipePages, ...storePages];
	const urls = pages.map(
		(p) =>
			`  <url><loc>${site.url}${p.path}</loc><changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>`
	);
	const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
