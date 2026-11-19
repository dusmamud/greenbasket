// Real mock cart state (frontend only — no checkout, no payment).
// Kept in a .svelte.ts module so Header, product cards and /checkout share
// one live cart. Prices in INR; delivery free above ₹499, else ₹40.
import { products, site } from '#lib/data/site.ts';

export type CartLine = { slug: string; name: string; price: number; mrp: number; qty: number; image: string; unit: string };

const lines = $state<CartLine[]>([]);

export const cart = {
	get lines() {
		return lines;
	},
	get count() {
		return lines.reduce((a, l) => a + l.qty, 0);
	},
	get subtotal() {
		return lines.reduce((a, l) => a + l.qty * l.price, 0);
	},
	get savings() {
		return lines.reduce((a, l) => a + l.qty * (l.mrp - l.price), 0);
	},
	get deliveryFee() {
		if (this.subtotal === 0) return 0;
		return this.subtotal >= site.freeDeliveryAbove ? 0 : site.deliveryFee;
	},
	get total() {
		return this.subtotal + this.deliveryFee;
	},
	get lastAdded() {
		return lines.length ? lines[lines.length - 1].name : '';
	}
};

export function addProduct(slug: string) {
	const p = products.find((item) => item.slug === slug);
	if (!p) return;
	const line = lines.find((l) => l.slug === slug);
	if (line) line.qty += 1;
	else lines.push({ slug: p.slug, name: p.name, price: p.price, mrp: p.mrp, qty: 1, image: p.image, unit: p.unit });
}

export function setQty(slug: string, qty: number) {
	const line = lines.find((l) => l.slug === slug);
	if (!line) return;
	if (qty <= 0) lines.splice(lines.indexOf(line), 1);
	else line.qty = qty;
}

export function removeLine(slug: string) {
	const i = lines.findIndex((l) => l.slug === slug);
	if (i >= 0) lines.splice(i, 1);
}

export function clearCart() {
	lines.splice(0, lines.length);
}
