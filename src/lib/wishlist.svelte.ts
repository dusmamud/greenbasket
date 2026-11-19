// Wishlist (favourites) — frontend only, persisted in localStorage.
// SSR-safe: localStorage is touched only in the browser.
const isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';

const KEY = 'greenbasket-wishlist';
const items = $state<string[]>([]);

let loaded = false;
function load() {
	if (loaded || !isBrowser) return;
	loaded = true;
	try {
		const raw = localStorage.getItem(KEY);
		if (raw) {
			const parsed: unknown = JSON.parse(raw);
			if (Array.isArray(parsed)) items.push(...parsed.filter((x): x is string => typeof x === 'string'));
		}
	} catch {
		// corrupted storage — start empty
	}
}

function save() {
	if (!isBrowser) return;
	try {
		localStorage.setItem(KEY, JSON.stringify(items));
	} catch {
		// storage full or blocked — wishlist still works in memory
	}
}

export const wishlist = {
	get items() {
		load();
		return items;
	},
	get count() {
		load();
		return items.length;
	},
	has(slug: string) {
		load();
		return items.includes(slug);
	},
	toggle(slug: string) {
		load();
		const i = items.indexOf(slug);
		if (i >= 0) items.splice(i, 1);
		else items.push(slug);
		save();
	},
	remove(slug: string) {
		load();
		const i = items.indexOf(slug);
		if (i >= 0) items.splice(i, 1);
		save();
	},
	clear() {
		items.splice(0, items.length);
		save();
	}
};
