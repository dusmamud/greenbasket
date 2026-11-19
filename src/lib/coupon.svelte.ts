// Coupon store — one applied coupon shared by the cart drawer and
// checkout (research P1-2: coupon input in cart, not only checkout).
// Mock codes live in site.ts (WELCOME10, FRESH20, FLAT50).
import { coupons, type Coupon } from '#lib/data/site.ts';

let applied: Coupon | null = $state(null);
let error = $state('');

export const couponStore = {
	get applied() {
		return applied;
	},
	get error() {
		return error;
	},
	apply(code: string) {
		const found = coupons.find((c) => c.code === code.trim().toUpperCase());
		if (!found) {
			error = `“${code.trim().toUpperCase()}” is not a valid coupon. Try WELCOME10, FRESH20 or FLAT50.`;
			return false;
		}
		applied = found;
		error = '';
		return true;
	},
	clear() {
		applied = null;
		error = '';
	},
	discount(subtotal: number) {
		if (!applied) return 0;
		if (subtotal < applied.minOrder) return 0;
		if (applied.percent > 0) return Math.min(Math.round((subtotal * applied.percent) / 100), applied.maxOff);
		return Math.min(applied.maxOff, subtotal);
	}
};
