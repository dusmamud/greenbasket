import { categories } from '#lib/data/site.ts';
import type { PageLoad } from './$types';

export const prerender = true;

export const entries = () => [...categories.map((c) => ({ slug: c.slug })), { slug: 'under-99' }];

export const load: PageLoad = ({ params }) => ({ slug: params.slug });
