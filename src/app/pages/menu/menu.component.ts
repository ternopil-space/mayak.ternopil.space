import {
	ChangeDetectionStrategy,
	Component,
	computed,
	effect,
	inject,
	untracked,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '../../shared/translate.pipe';
import { MenuCategoriesComponent } from '../../components/menu-categories/menu-categories.component';
import { MenuDishesComponent } from '../../components/menu-dishes/menu-dishes.component';
import { DishCategoryService } from '../../feature/dish/dish-category.service';
import { Dish, DishCategory } from '../../feature/dish/dish.interface';
import { DishService } from '../../feature/dish/dish.service';

@Component({
	imports: [MenuCategoriesComponent, MenuDishesComponent, RouterLink, TranslatePipe],
	templateUrl: './menu.component.html',
	styleUrl: './menu.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
	readonly showOnlyFavorites = inject(Router).url === '/favorites';
	readonly dishCategoryService = inject(DishCategoryService);
	readonly dishService = inject(DishService);
	private readonly dishes = computed(() => {
		const favoriteDishes = this.dishService.favoriteDishes();
		return this.dishService.dishes().filter((dish) => favoriteDishes.includes(dish.slug));
	});
	readonly filteredCategories = computed(() => {
		const categories = this.dishCategoryService.categories();
		const dishes = this.dishes();
		return this.showOnlyFavorites
			? categories.filter((category) => this._hasFavorite(category, dishes))
			: categories;
	});
	readonly filteredSelectedCategories = computed(() => {
		const selectedCategories = this.dishCategoryService.selectedCategories();
		const dishes = this.dishes();
		return this.showOnlyFavorites
			? selectedCategories.filter((category) => this._hasFavorite(category, dishes))
			: selectedCategories;
	});
	private _hasFavorite(category: DishCategory, dishes: Dish[]): boolean {
		return (
			!!dishes.filter((dish) => dish.categorySlug === category.slug).length ||
			!!category.children?.filter((_category) => this._hasFavorite(_category, dishes))?.length
		);
	}

	constructor() {
		effect(() => {
			const categories = this.filteredCategories();
			untracked(() => {
				if (
					categories.length &&
					this.dishCategoryService.selectedCategories()[0]?.slug !== categories[0].slug
				) {
					this.dishCategoryService.selectCategory(
						categories[0],
						categories[0].children ?? [],
					);
				}
			});
		});
	}
}
