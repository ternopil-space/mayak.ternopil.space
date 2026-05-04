import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { TranslatePipe } from '../../shared/translate.pipe';
import { DishCategoryService } from '../../feature/dish/dish-category.service';
import { DishCategory } from '../../feature/dish/dish.interface';

@Component({
	selector: 'app-menu-categories',
	imports: [TranslatePipe],
	templateUrl: './menu-categories.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuCategoriesComponent {
	readonly filteredCategories = input.required<DishCategory[]>();
	readonly filteredSelectedCategories = input.required<DishCategory[]>();
	readonly dishCategoryService = inject(DishCategoryService);
}
