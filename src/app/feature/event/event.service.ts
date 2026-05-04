import { Injectable, signal } from '@angular/core';
import eventsData from '../../../data/events.json';
import { EventItem } from './event.interface';

type RawEvent = Partial<EventItem> &
	Record<string, string | number | null | undefined>;

const _fallbackEvents: EventItem[] = _normalizeEvents(eventsData as RawEvent[]);

@Injectable({
	providedIn: 'root',
})
export class EventService {
	readonly events = signal<EventItem[]>(_fallbackEvents);
	readonly isLoading = signal(true);

	resolveEvents(events: RawEvent[] | null | undefined) {
		this.events.set(
			Array.isArray(events) && events.length > 0 ? _normalizeEvents(events) : _fallbackEvents,
		);
		this.isLoading.set(false);
	}

	finishLoading() {
		this.isLoading.set(false);
	}
}

function _normalizeEvents(events: RawEvent[]): EventItem[] {
	return events.map((event, index) => _normalizeEvent(event, index));
}

function _normalizeEvent(event: RawEvent, index: number): EventItem {
	const title = _stringOrFallback(event.title ?? event['name'] ?? event['eventTitle'], '');
	const slugSource = event.slug ?? event['id'] ?? title;

	return {
		slug: _slugOrFallback(slugSource, index),
		title,
		summary: _stringOrFallback(event.summary ?? event['description']),
		dateLabel: _stringOrFallback(event.dateLabel ?? event['date']),
		timeLabel: _stringOrFallback(event.timeLabel ?? event['time']),
		location: _stringOrFallback(event.location ?? event['venue']),
		format: _stringOrFallback(event.format ?? event['type']),
		capacity: _stringOrFallback(event.capacity ?? event['guests']),
		ctaLabel: _stringOrFallback(event.ctaLabel ?? event['buttonLabel'] ?? event['linkText']),
		ctaHref: _stringOrFallback(event.ctaHref ?? event['url'] ?? event['link']),
	};
}

function _slugOrFallback(value: string | number | null | undefined, index: number): string {
	if (typeof value === 'number' && Number.isFinite(value)) {
		return `event-${value}`;
	}

	const normalized = _stringOrFallback(value)
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');

	return normalized || `event-${index + 1}`;
}

function _stringOrFallback(value: string | number | null | undefined, fallback = ''): string {
	if (typeof value === 'number' && Number.isFinite(value)) {
		return String(value);
	}

	return typeof value === 'string' && value.trim().length > 0 ? value.trim() : fallback;
}
