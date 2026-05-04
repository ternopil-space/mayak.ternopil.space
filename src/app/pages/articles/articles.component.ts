import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TranslatePipe } from '../../shared/translate.pipe';
import { ArticleService } from '../../feature/article/article.service';

@Component({
	imports: [TranslatePipe],
	templateUrl: './articles.component.html',
	styleUrl: './articles.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesComponent {
	private readonly _articleService = inject(ArticleService);

	protected readonly loadingCards = [1, 2, 3];
	protected readonly articles = this._articleService.articles;
	protected readonly isLoading = this._articleService.isLoading;
	protected readonly hasArticles = computed(() => this.articles().length > 0);
}
