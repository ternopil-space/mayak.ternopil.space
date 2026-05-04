import { Injectable, signal } from '@angular/core';
import roomsData from '../../../data/rooms.json';
import { Room } from './room.interface';

type RawRoom = Partial<Room> & Record<string, string | null | undefined>;

const _fallbackRooms: Room[] = _normalizeRooms(roomsData as RawRoom[]);

@Injectable({
	providedIn: 'root',
})
export class RoomService {
	readonly rooms = signal<Room[]>(_fallbackRooms);
	readonly isLoading = signal(true);

	resolveRooms(rooms: RawRoom[] | null | undefined) {
		this.rooms.set(
			Array.isArray(rooms) && rooms.length > 0 ? _normalizeRooms(rooms) : _fallbackRooms,
		);
		this.isLoading.set(false);
	}

	finishLoading() {
		this.isLoading.set(false);
	}
}

function _normalizeRooms(rooms: RawRoom[]) {
	return rooms
		.map((room) => _normalizeRoom(room))
		.filter((room): room is Room => Boolean(room));
}

function _normalizeRoom(room: RawRoom | null | undefined): Room | null {
	if (!room?.name || !room.image) {
		return null;
	}

	return {
		name: room.name,
		description: room.description ?? '',
		price: room.price ?? '',
		image: room.image,
		imageAlt: room.imageAlt ?? room.name,
	};
}
