import { Injectable, signal } from '@angular/core';
import questsData from '../../../data/quests.json';
import { Quest } from './quest.interface';

type RawQuest = Partial<Quest> & Record<string, string | number | null | undefined>;

const _fallbackQuests: Quest[] = _normalizeQuests(questsData as RawQuest[]);

@Injectable({
	providedIn: 'root',
})
export class QuestService {
	readonly quests = signal<Quest[]>(_fallbackQuests);
	readonly isLoading = signal(true);

	resolveQuests(quests: RawQuest[] | null | undefined) {
		this.quests.set(
			Array.isArray(quests) && quests.length > 0 ? _normalizeQuests(quests) : _fallbackQuests,
		);
		this.isLoading.set(false);
	}

	finishLoading() {
		this.isLoading.set(false);
	}
}

function _normalizeQuests(quests: RawQuest[]): Quest[] {
	return quests
		.map((quest, index) => _normalizeQuest(quest, index))
		.filter((quest): quest is Quest => Boolean(quest));
}

function _normalizeQuest(quest: RawQuest, index: number): Quest | null {
	const title = _stringOrFallback(
		quest.title ?? quest['name'] ?? quest['questTitle'] ?? quest['label'],
	);

	if (!title) {
		return null;
	}

	const slugSource = quest.slug ?? quest['id'] ?? title;

	return {
		slug: _slugOrFallback(slugSource, index),
		title,
		summary: _stringOrFallback(quest.summary ?? quest['description'] ?? quest['details']),
		duration: _stringOrFallback(quest.duration ?? quest['time'] ?? quest['durationLabel']),
		format: _stringOrFallback(quest.format ?? quest['type'] ?? quest['category']),
		price: _stringOrFallback(quest.price ?? quest['priceLabel'] ?? quest['cost']),
		ctaLabel: _stringOrFallback(
			quest.ctaLabel ?? quest['buttonLabel'] ?? quest['linkText'],
		),
		ctaHref: _stringOrFallback(quest.ctaHref ?? quest['url'] ?? quest['link']),
	};
}

function _slugOrFallback(value: string | number | null | undefined, index: number): string {
	if (typeof value === 'number' && Number.isFinite(value)) {
		return `quest-${value}`;
	}

	const normalized = _stringOrFallback(value)
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');

	return normalized || `quest-${index + 1}`;
}

function _stringOrFallback(value: string | number | null | undefined, fallback = ''): string {
	if (typeof value === 'number' && Number.isFinite(value)) {
		return String(value);
	}

	return typeof value === 'string' && value.trim().length > 0 ? value.trim() : fallback;
}
