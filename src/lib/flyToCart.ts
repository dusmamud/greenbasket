// Fly-to-cart micro-animation (Motion One vanilla API).
// A small green dot flies from the tapped Add button to the cart target
// (header cart on desktop, bottom-nav cart on mobile) in <=600ms, then the
// cart badge pops. Transform + opacity only; skipped entirely when the user
// prefers reduced motion. Runs in parallel with the cart update, never
// before it.
import { animate } from 'motion';

function cartTarget(): HTMLElement | null {
	// Mobile bottom nav cart wins on small screens, header cart on desktop.
	const mobile = document.querySelector<HTMLElement>('[data-cart-target="mobile"]');
	if (mobile && window.innerWidth < 1024) return mobile;
	return document.querySelector<HTMLElement>('[data-cart-target="desktop"]');
}

export function flyToCart(from: HTMLElement) {
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
	const target = cartTarget();
	if (!target) return;
	const a = from.getBoundingClientRect();
	const b = target.getBoundingClientRect();
	const dot = document.createElement('div');
	dot.setAttribute('aria-hidden', 'true');
	dot.style.cssText = `position:fixed;z-index:90;left:${a.left + a.width / 2 - 8}px;top:${a.top + a.height / 2 - 8}px;width:16px;height:16px;border-radius:9999px;background:#22a447;pointer-events:none;box-shadow:0 4px 12px rgba(34,164,71,.45);`;
	document.body.appendChild(dot);
	const dx = b.left + b.width / 2 - (a.left + a.width / 2);
	const dy = b.top + b.height / 2 - (a.top + a.height / 2);
	animate(
		dot,
		{ x: [0, dx * 0.5, dx], y: [0, dy - 60, dy], scale: [1, 1.15, 0.35], opacity: [1, 1, 0.6] },
		{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }
	).finished.finally(() => {
		dot.remove();
		target.animate(
			[
				{ transform: 'scale(1)' },
				{ transform: 'scale(1.25)' },
				{ transform: 'scale(1)' }
			],
			{ duration: 300, easing: 'ease-out' }
		);
	});
}
