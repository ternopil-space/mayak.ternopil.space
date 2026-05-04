import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TranslateDirective } from '@wawjs/ngx-translate';
import { ExhibitService } from '../../feature/exhibit/exhibit.service';
import { TranslatePipe } from '../../shared/translate.pipe';
import { Exhibit } from '../../feature/exhibit/exhibit.interface';

@Component({
	imports: [TranslateDirective, TranslatePipe],
	templateUrl: './gallery.component.html',
	styleUrl: './gallery.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryComponent {
	private readonly _exhibitService = inject(ExhibitService);

	protected readonly exhibits = this._exhibitService.exhibits;
	protected readonly isLoading = this._exhibitService.isLoading;
	protected readonly selectedExhibit = signal<Exhibit | null>(null);

	protected openPhoto(exhibit: Exhibit) {
		this.selectedExhibit.set(exhibit);
	}

	protected closePhoto() {
		this.selectedExhibit.set(null);
	}
}
