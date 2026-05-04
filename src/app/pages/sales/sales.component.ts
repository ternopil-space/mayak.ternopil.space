import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TranslateDirective } from '@wawjs/ngx-translate';
import { TranslatePipe } from '../../shared/translate.pipe';
import { SaleService } from '../../feature/sale/sale.service';

@Component({
	imports: [TranslateDirective, TranslatePipe],
	templateUrl: './sales.component.html',
	styleUrl: './sales.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SalesComponent {
	private readonly _saleService = inject(SaleService);

	protected readonly sales = this._saleService.sales;
	protected readonly isLoading = this._saleService.isLoading;
	protected readonly hasSales = computed(() => this.sales().length > 0);
}
