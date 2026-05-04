import dishCategoriesData from '../../../data/dishCategories.json';
import dishesData from '../../../data/dishes.json';
import type { Dish, DishCategory, DishCard } from './dish.interface';

interface RawDishDetail {
	dish: Dish;
	category: DishCategory | null;
}

const _categories = dishCategoriesData as DishCategory[];
const _dishes = dishesData as Dish[];
const _categoriesBySlug = new Map(_categories.map((category) => [category.slug, category] as const));
const _dishesBySlug = new Map(
	_dishes.map((dish) => [
		dish.slug,
		{
			dish,
			category: _categoriesBySlug.get(dish.categorySlug) ?? null,
		},
	] as const),
);

export const dishSlugs = _dishes.map((dish) => dish.slug);
export const rawDishDetails = [..._dishesBySlug.values()];

export function findDishDetailBySlug(slug: string) {
	return _dishesBySlug.get(slug) ?? null;
}

export function toDishCard(dish: Dish): DishCard {
	return {
		id: dish.slug,
		slug: dish.slug,
		name: dish.name,
		price: dish.price,
		description: dish.description,
		labels: dish.labels,
		image: `/item/${dish.slug}.webp`,
		imageAlt: dish.name,
		soldOut: false,
	};
}
