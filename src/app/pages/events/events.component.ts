import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslatePipe } from '../../shared/translate.pipe';
import { EventService } from '../../feature/event/event.service';

@Component({
	imports: [TranslatePipe],
	templateUrl: './events.component.html',
	styleUrl: './events.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsComponent {
	private readonly _eventService = inject(EventService);

	protected readonly events = this._eventService.events;
	protected readonly isLoading = this._eventService.isLoading;
}
