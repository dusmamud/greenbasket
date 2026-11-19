import { storeAreas } from '#lib/data/site.ts';
import type { PageLoad } from './$types';

export const prerender = true;

export const entries = () => storeAreas.map((a) => ({ slug: a.slug }));

export const load: PageLoad = ({ params }) => ({ slug: params.slug });
