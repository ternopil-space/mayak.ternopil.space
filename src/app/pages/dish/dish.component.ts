import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MetaService } from '@wawjs/ngx-core';
import { TranslatePipe } from '../../shared/translate.pipe';
import { TranslateService } from '@wawjs/ngx-translate';
import { companyProfile } from '../../feature/company/company.data';
import type { Dish, DishCategory } from '../../feature/dish/dish.interface';
import { DishService } from '../../feature/dish/dish.service';
import { DishCategoryService } from '../../feature/dish/dish-category.service';
import { LanguageService } from '../../feature/language/language.service';
import { buildAbsoluteUrl } from '../../seo/seo.utils';
import { CanonicalService } from '../../services/canonical.service';

interface DishFact {
	label: string;
	value?: string;
	translatedValue?: string;
	fallbackValue?: string;
}

interface DishSuggestion {
	slug: string;
	name: string;
	description: string;
	hasDescription: boolean;
	price: number | null;
}

interface DishViewModel {
	id: string;
	slug: string;
	name: string;
	description: string;
	fullDescription: string;
	categoryName: string;
	hasDescription: boolean;
	hasFullDescription: boolean;
	labels: string[];
	price: number | null;
	facts: DishFact[];
	suggestions: DishSuggestion[];
}

@Component({
	imports: [RouterLink, TranslatePipe],
	templateUrl: './dish.component.html',
	styleUrl: './dish.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DishComponent {
	private readonly _canonicalService = inject(CanonicalService);
	private readonly _languageService = inject(LanguageService);
	private readonly _metaService = inject(MetaService);
	private readonly _route = inject(ActivatedRoute);
	private readonly _dishService = inject(DishService);
	private readonly _dishCategoryService = inject(DishCategoryService);
	private readonly _title = inject(Title);
	private readonly _translateService = inject(TranslateService);
	private readonly _slug = toSignal(this._route.paramMap, {
		initialValue: this._route.snapshot.paramMap,
	});

	protected readonly dish = computed(() => {
		const slug = this._slug().get('slug');
		const dishes = this._dishService.dishes();
		const flatCategories = this._dishCategoryService.flatCategories();

		const dish = dishes.find((d) => d.slug === slug) ?? dishes[0];
		const category = flatCategories.find((c) => c.slug === dish.categorySlug) ?? null;

		return _buildDishViewModel(category, dish, dishes);
	});
	protected readonly isFavorite = computed(() =>
		this._dishService.favoriteDishes().includes(this.dish().slug),
	);

	constructor() {
		effect(() => {
			this._languageService.language();
			const dish = this.dish();
			const description = _buildDishMetaDescription(dish);
			const translatedTitle = this._translateService.translate(dish.name)();

			this._title.setTitle(`${translatedTitle} | ${companyProfile.name}`);

			this._metaService.applyMeta({
				title: translatedTitle,
				description,
				image: buildAbsoluteUrl(`/item/${dish.slug}.webp`),
			});
			this._canonicalService.setCanonicalUrl(`/dish/${dish.slug}`);
		});
	}

	protected toggleFavorite() {
		this._dishService.toggleDishFavorite(this.dish().slug);
	}
}

function _buildDishViewModel(
	category: DishCategory | null,
	item: Dish,
	allDishes: Dish[],
): DishViewModel {
	return {
		id: item.slug,
		slug: item.slug,
		name: item.name,
		description: item.description,
		fullDescription: item.fullDescription,
		categoryName: category?.name ?? item.categorySlug,
		hasDescription: Boolean(item.description?.trim()),
		hasFullDescription: Boolean(item.fullDescription?.trim()),
		labels: item.labels,
		price: item.price,
		facts: _buildFacts(item, category),
		suggestions: _buildSuggestions(item, allDishes),
	};
}

function _buildFacts(item: Dish, category: DishCategory | null): DishFact[] {
	return [
		{
			label: 'Menu section',
			translatedValue: category?.name,
			fallbackValue: item.categorySlug,
		},
		{
			label: 'Portion',
			translatedValue: item.portion || undefined,
			fallbackValue: item.portion ? undefined : 'Ask restaurant staff for portion details',
		},
		{
			label: 'Cooking time',
			value: item.cookTimeMinutes === null ? undefined : `${item.cookTimeMinutes} min`,
			fallbackValue: item.cookTimeMinutes === null ? 'Ask restaurant staff' : undefined,
		},
		{
			label: 'Calories',
			value: item.caloriesKcal === null ? undefined : `${item.caloriesKcal} kcal`,
			fallbackValue: item.caloriesKcal === null ? 'Ask restaurant staff' : undefined,
		},
		{
			label: 'Allergens',
			translatedValue: item.allergens.length > 0 ? item.allergens.join(', ') : undefined,
			fallbackValue:
				item.allergens.length > 0 ? undefined : 'No allergen information available',
		},
	];
}

function _buildSuggestions(currentItem: Dish, allDishes: Dish[]): DishSuggestion[] {
	const suggestedItems = currentItem.suggested
		.map((slug) => allDishes.find((d) => d.slug === slug))
		.filter((item): item is Dish => Boolean(item));

	return (
		suggestedItems.length
			? suggestedItems
			: allDishes.filter(
					(item) =>
						item.slug !== currentItem.slug && item.categorySlug === currentItem.categorySlug,
				)
	)
		.slice(0, 3)
		.map((item) => ({
			slug: item.slug,
			name: item.name,
			description: item.description,
			hasDescription: Boolean(item.description?.trim()),
			price: item.price,
		}));
}

function _buildDishMetaDescription(dish: DishViewModel): string {
	return (
		dish.fullDescription ||
		dish.description ||
		`${dish.name} from the ${dish.categoryName} menu section.`
	);
}
