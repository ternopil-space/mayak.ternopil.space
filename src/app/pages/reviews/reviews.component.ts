import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslateDirective } from '@wawjs/ngx-translate';
import { TranslatePipe } from '../../shared/translate.pipe';
import { ReviewService } from '../../feature/review/review.service';

@Component({
	imports: [TranslateDirective, TranslatePipe],
	templateUrl: './reviews.component.html',
	styleUrl: './reviews.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewsComponent {
	private readonly _reviewService = inject(ReviewService);

	protected readonly reviews = this._reviewService.reviews;
	protected readonly isLoading = this._reviewService.isLoading;
	protected readonly stars = [1, 2, 3, 4, 5];
}
