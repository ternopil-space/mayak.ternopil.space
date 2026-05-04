import { Injectable, signal } from '@angular/core';
import exhibitsData from '../../../data/exhibits.json';
import { Exhibit } from './exhibit.interface';

type RawExhibit = Partial<Exhibit> & Record<string, string | number | null | undefined>;

const _fallbackExhibits: Exhibit[] = _normalizeExhibits(exhibitsData as RawExhibit[]);

@Injectable({
	providedIn: 'root',
})
export class ExhibitService {
	readonly exhibits = signal<Exhibit[]>(_fallbackExhibits);
	readonly isLoading = signal(true);

	resolveExhibits(exhibits: RawExhibit[] | null | undefined) {
		this.exhibits.set(
			Array.isArray(exhibits) && exhibits.length > 0
				? _normalizeExhibits(exhibits)
				: _fallbackExhibits,
		);
		this.isLoading.set(false);
	}

	finishLoading() {
		this.isLoading.set(false);
	}
}

function _normalizeExhibits(exhibits: RawExhibit[]): Exhibit[] {
	return exhibits
		.map((exhibit, index) => _normalizeExhibit(exhibit, index))
		.filter((exhibit): exhibit is Exhibit => Boolean(exhibit));
}

function _normalizeExhibit(exhibit: RawExhibit, index: number): Exhibit | null {
	const src = _stringOrFallback(exhibit.src ?? exhibit['image'] ?? exhibit['url']);

	if (!src) {
		return null;
	}

	const alt = _stringOrFallback(
		exhibit.alt ?? exhibit['title'] ?? exhibit['name'] ?? exhibit['description'],
		'Gallery photo',
	);
	const slugSource = exhibit.slug ?? exhibit['id'] ?? src;

	return {
		slug: _slugOrFallback(slugSource, index),
		src,
		alt,
	};
}

function _slugOrFallback(value: string | number | null | undefined, index: number): string {
	if (typeof value === 'number' && Number.isFinite(value)) {
		return `exhibit-${value}`;
	}

	const normalized = _stringOrFallback(value)
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');

	return normalized || `exhibit-${index + 1}`;
}

function _stringOrFallback(value: string | number | null | undefined, fallback = ''): string {
	if (typeof value === 'number' && Number.isFinite(value)) {
		return String(value);
	}

	return typeof value === 'string' && value.trim().length > 0 ? value.trim() : fallback;
}
