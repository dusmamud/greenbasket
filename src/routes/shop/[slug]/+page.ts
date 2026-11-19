import { error } from '@sveltejs/kit';
import { products } from '#lib/data/site.ts';
import type { PageLoad } from './$types';

export const entries = () => products.map((p) => ({ slug: p.slug }));

export const load: PageLoad = ({ params }) => {
	const product = products.find((p) => p.slug === params.slug);
	if (!product) error(404, 'Product not found');
	const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);
	return { product, related };
};
