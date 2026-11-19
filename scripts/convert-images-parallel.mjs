// Parallel image conversion for the remaining masters: same outputs as
// scripts/convert-images.mjs (AVIF/WebP/JPG @ 480/800/1200/1600), but 3
// images at a time instead of one — AVIF encoding is single-threaded per
// image, so concurrency is what makes this fast. Skips images whose 12
// outputs already exist. Run: node scripts/convert-images-parallel.mjs
import { readdir, access } from 'node:fs/promises';
import { join, parse } from 'node:path';
import sharp from 'sharp';

const SRC = new URL('../static/images/original/', import.meta.url);
const OUT = new URL('../static/images/', import.meta.url);
const WIDTHS = [480, 800, 1200, 1600];
const CONCURRENCY = 3;

const exists = async (p) => {
	try {
		await access(p);
		return true;
	} catch {
		return false;
	}
};

async function convertOne(file) {
	const { name } = parse(file);
	const input = join(SRC.pathname, file);
	for (const width of WIDTHS) {
		const base = sharp(input).resize(width, null, { withoutEnlargement: true });
		await base.clone().avif({ quality: 50, effort: 2 }).toFile(join(OUT.pathname, `${name}-${width}.avif`));
		await base.clone().webp({ quality: 80 }).toFile(join(OUT.pathname, `${name}-${width}.webp`));
		await base
			.clone()
			.flatten({ background: '#ffffff' })
			.jpeg({ quality: 84 })
			.toFile(join(OUT.pathname, `${name}-${width}.jpg`));
	}
	console.log(`✓ ${name}`);
}

const files = (await readdir(SRC)).filter((f) => f.toLowerCase().endsWith('.png'));
const todo = [];
for (const file of files) {
	const { name } = parse(file);
	const missing = [];
	for (const w of WIDTHS) {
		for (const ext of ['avif', 'webp', 'jpg']) {
			if (!(await exists(join(OUT.pathname, `${name}-${w}.${ext}`)))) missing.push(`${w}.${ext}`);
		}
	}
	if (missing.length > 0) todo.push(file);
	else console.log(`— ${name}: already done, skipping`);
}
console.log(`Converting ${todo.length} image(s) with concurrency ${CONCURRENCY}…`);

let i = 0;
const workers = Array.from({ length: CONCURRENCY }, async () => {
	while (i < todo.length) {
		const file = todo[i++];
		await convertOne(file);
	}
});
await Promise.all(workers);
console.log('Done.');
