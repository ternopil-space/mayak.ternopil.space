import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslateDirective } from '@wawjs/ngx-translate';
import { TranslatePipe } from '../../shared/translate.pipe';
import { JobService } from '../../feature/job/job.service';

@Component({
	imports: [TranslateDirective, TranslatePipe],
	templateUrl: './jobs.component.html',
	styleUrl: './jobs.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobsComponent {
	private readonly _jobService = inject(JobService);

	protected readonly jobs = this._jobService.jobs;
	protected readonly isLoading = this._jobService.isLoading;
}
