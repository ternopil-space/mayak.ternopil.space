import { Injectable, signal } from '@angular/core';
import profilesData from '../../../data/profiles.json';
import { Profile } from './profile.interface';

type NullableProfile = Partial<Profile> | null | undefined;

const _fallbackProfiles: Profile[] = (profilesData as NullableProfile[]).map((profile) =>
	_normalizeProfile(profile),
);

@Injectable({
	providedIn: 'root',
})
export class ProfileService {
	readonly profiles = signal<Profile[]>(_fallbackProfiles);

	setProfiles(profiles: NullableProfile[] | null | undefined) {
		if (!Array.isArray(profiles) || profiles.length === 0) {
			this.profiles.set(_fallbackProfiles);
			return;
		}

		this.profiles.set(_normalizeProfiles(profiles));
	}
}

function _normalizeProfiles(profiles: NullableProfile[]): Profile[] {
	return profiles.map((profile) => _normalizeProfile(profile));
}

function _normalizeProfile(profile: NullableProfile): Profile {
	return {
		name: _stringOrFallback(profile?.name),
		role: _stringOrFallback(profile?.role),
		seniority: _stringOrFallback(profile?.seniority),
		description: _stringOrFallback(profile?.description),
		image: _stringOrFallback(profile?.image),
		tips: _stringOrFallback(profile?.tips),
	};
}

function _stringOrFallback(value: string | null | undefined, fallback = ''): string {
	return typeof value === 'string' && value.trim().length > 0 ? value : fallback;
}
