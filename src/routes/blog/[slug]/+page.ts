import { error } from '@sveltejs/kit';
import { articles } from '#lib/data/site.ts';
import type { PageLoad } from './$types';

const bodies: Record<string, string[]> = {
	'superfoods-immunity': [
		'Immunity is not built in a week of kadha — it is built by what you eat every day. The good news: the most powerful immune foods in the world are already sitting in an Indian kitchen.',
		'Amla has more vitamin C per gram than almost any fruit you can buy, and it costs less than a fancy imported berry. A spoon of amla pickle or a glass of fresh amla juice in the morning covers most of your daily vitamin C. Turmeric, the haldi in your dal, contains curcumin — pair it with a pinch of black pepper and your body absorbs far more of it.',
		'Spinach and other leafy greens bring iron and folate; curd brings probiotics that support gut health, where most of your immune system actually lives. And garlic, ginger and tulsi — the base of so many home remedies — have real, studied antimicrobial properties.',
		'The practical version: add one green vegetable to lunch, a bowl of curd to dinner, and keep amla, turmeric and ginger in your weekly basket. That is the whole plan — no supplements required, no exotic imports needed.'
	],
	'meal-prep-healthy-week': [
		'Meal prep sounds like something fitness influencers do. In reality it is what every Indian mother has done for decades: cook once, eat well all week. One focused Sunday hour can take five weekday tiffins off your mind.',
		'Start with the base: a big pot of rice or a stack of rotis, a dal that keeps well (moong or masoor), and two dry sabzis — one green like palak, one hearty like aloo-gobi. Wash and chop your vegetables on Sunday, store them in boxes, and weekday cooking becomes assembly, not a project.',
		'Pack tiffins the night before, not in the morning rush. A little curd, a fruit, and a handful of nuts round out the box. Keep portions honest: half the box vegetables, a quarter protein, a quarter carbs.',
		'The trick is not cooking more — it is deciding once. Decide the week’s menu on Sunday, shop it in one GreenBasket order, and your weekdays cook themselves.'
	],
	'small-choices-big-impact': [
		'You do not need to overhaul your life to shop sustainably. A grocery run has a dozen tiny choices, and each one is easy on its own.',
		'Buy seasonal. A mango in May is cheap, delicious and local; the same mango in December has flown halfway around the world. Seasonal vegetables are fresher, cheaper and need fewer chemicals — the mandi knows this, and so does your grandmother.',
		'Carry a cloth bag. One reusable bag replaces hundreds of plastic ones a year, and it carries more without tearing. Choose loose vegetables over pre-packed trays where you can, and pick paper or cloth packaging when the store offers it.',
		'Finally, waste less. Plan the week, buy what you will cook, and turn leftover vegetables into a soup or a pulao. The most sustainable grocery is the one that gets eaten, not thrown away.'
	]
};

export const entries = () => articles.map((a) => ({ slug: a.slug }));

export const load: PageLoad = ({ params }) => {
	const article = articles.find((a) => a.slug === params.slug);
	if (!article) error(404, 'Article not found');
	const others = articles.filter((a) => a.slug !== article.slug);
	return { article, body: bodies[article.slug] ?? [article.excerpt], others };
};
