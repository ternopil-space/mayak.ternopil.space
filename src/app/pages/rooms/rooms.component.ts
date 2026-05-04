import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TranslatePipe } from '../../shared/translate.pipe';
import { RoomService } from '../../feature/room/room.service';

type ContactLink = {
	label: string;
	href: string;
	description: string;
};

@Component({
	imports: [NgOptimizedImage, TranslatePipe],
	templateUrl: './rooms.component.html',
	styleUrl: './rooms.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsComponent {
	private readonly _roomService = inject(RoomService);

	protected readonly amenities = [
		'Comfortable rooms',
		'Breakfast for guests',
		'Restaurant or cafe on site',
		'Room service',
		'Wi-Fi in rooms',
		'Parking',
		'Work area',
		'Air conditioning',
		'Transfer on request',
		'Booking support',
	];
	protected readonly loadingCards = [1, 2, 3];
	protected readonly rooms = this._roomService.rooms;
	protected readonly isLoading = this._roomService.isLoading;
	protected readonly hasRooms = computed(() => this.rooms().length > 0);

	protected readonly contactLinks: ContactLink[] = [
		{
			label: 'Call us',
			href: 'tel:+380970000000',
			description: '+38 097 000 00 00',
		},
		{
			label: 'Chat on Viber',
			href: 'https://example.com/horeca-demo/viber',
			description: 'Demo chat for quick booking',
		},
		{
			label: 'Chat on Telegram',
			href: 'https://example.com/horeca-demo/telegram',
			description: '@horeca_demo',
		},
	];
}
