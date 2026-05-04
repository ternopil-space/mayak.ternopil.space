import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslateDirective } from '@wawjs/ngx-translate';
import { ProfileService } from '../../feature/profile/profile.service';
import { TranslatePipe } from '../../shared/translate.pipe';

@Component({
	imports: [NgOptimizedImage, TranslateDirective, TranslatePipe],
	templateUrl: './team.component.html',
	styleUrl: './team.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamComponent {
	private readonly _profileService = inject(ProfileService);

	protected readonly profiles = this._profileService.profiles;
}
