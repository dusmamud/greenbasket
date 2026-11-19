import { articles, products, site } from '#lib/data/site.ts';

export const prerender = true;

const staticPages = [
	{ path: '/', priority: '1.0', changefreq: 'weekly' },
	{ path: '/shop', priority: '0.9', changefreq: 'weekly' },
	{ path: '/checkout', priority: '0.9', changefreq: 'weekly' },
	{ path: '/offers', priority: '0.8', changefreq: 'weekly' },
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

export function GET() {
	const pages = [...staticPages, ...productPages, ...articlePages];
	const urls = pages.map(
		(p) =>
			`  <url><loc>${site.url}${p.path}</loc><changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>`
	);
	const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
