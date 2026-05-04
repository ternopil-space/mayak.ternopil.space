import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslateDirective } from '@wawjs/ngx-translate';
import { TranslatePipe } from '../../shared/translate.pipe';
import { ProductService } from '../../feature/product/product.service';

@Component({
	imports: [TranslateDirective, TranslatePipe],
	templateUrl: './products.component.html',
	styleUrl: './products.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
	private readonly _productService = inject(ProductService);

	protected readonly products = this._productService.products;
	protected readonly isLoading = this._productService.isLoading;
}
