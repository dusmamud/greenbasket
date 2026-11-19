import { recipes } from '#lib/data/site.ts';
import type { PageLoad } from './$types';

export const prerender = true;

export const entries = () => recipes.map((r) => ({ slug: r.slug }));

export const load: PageLoad = ({ params }) => ({ slug: params.slug });
