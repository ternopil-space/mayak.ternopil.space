export interface DishCategory {
	children?: DishCategory[]; // virtual field
	name: string;
	description: string;
	parent: string;
	slug: string;
}

export interface Dish {
	slug: string;
	categorySlug: string;
	name: string;
	description: string;
	price: number;
	labels: string[];
	fullDescription: string;
	suggested: string[];
	cookTimeMinutes: number;
	caloriesKcal: number;
	portion: string;
	allergens: string[];
}

export interface DishCard {
	id: string;
	slug: string;
	name: string;
	price: number | null;
	description: string | null;
	labels: string[];
	image: string;
	imageAlt: string;
	soldOut: boolean;
}
