import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslateDirective } from '@wawjs/ngx-translate';
import { TranslatePipe } from '../../shared/translate.pipe';
import { QuestService } from '../../feature/quest/quest.service';

@Component({
	imports: [TranslateDirective, TranslatePipe],
	templateUrl: './quests.component.html',
	styleUrl: './quests.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestsComponent {
	private readonly _questService = inject(QuestService);

	protected readonly quests = this._questService.quests;
	protected readonly isLoading = this._questService.isLoading;
}
