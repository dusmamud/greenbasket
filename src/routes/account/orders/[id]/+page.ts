import { mockOrders } from '#lib/data/site.ts';
import type { PageLoad } from './$types';

export const prerender = true;

export const entries = () => mockOrders.map((o) => ({ id: o.id }));

export const load: PageLoad = ({ params }) => ({ id: params.id });
