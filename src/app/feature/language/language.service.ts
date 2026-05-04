import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { TranslateService } from '@wawjs/ngx-translate';

import { environment } from '../../../environments/environment';
import { LANGUAGES } from './language.const';
import { LanguageOption } from './language.interface';
import { LanguageCode } from './language.type';

@Injectable({ providedIn: 'root' })
export class LanguageService {
	private readonly _doc = inject(DOCUMENT);
	private readonly _translateService = inject(TranslateService);
	private readonly _isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
	private readonly _storageKey = 'app-language';

	readonly languages = signal<LanguageOption[]>(LANGUAGES);
	private readonly _defaultLanguage = this._resolveDefaultLanguage();

	readonly language = signal<LanguageCode>(this._defaultLanguage);

	init() {
		const stored = this._isBrowser
			? this._doc.defaultView?.localStorage.getItem(this._storageKey)
			: null;
		const language = this._isSupportedLanguage(stored)
			? (stored as LanguageCode)
			: this._defaultLanguage;

		void this.setLanguage(language);
	}

	async setLanguage(language: LanguageCode) {
		await this._translateService.setLanguage(language);
		this.language.set(language);
		this._doc.documentElement.lang = this.getLanguage(language).htmlLang;

		if (this._isBrowser) {
			this._doc.defaultView?.localStorage.setItem(this._storageKey, language);
		}
	}

	nextLanguage() {
		const languages = this.languages();
		const currentIndex = languages.findIndex((language) => language.code === this.language());
		const nextIndex = (currentIndex + 1) % languages.length;

		void this.setLanguage(languages[nextIndex]?.code ?? this._defaultLanguage);
	}

	getLanguage(code: LanguageCode) {
		return this.languages().find((language) => language.code === code) ?? this.languages()[0]!;
	}

	private _isSupportedLanguage(value: string | null | undefined) {
		return this.languages().some((language) => language.code === value);
	}

	private _resolveDefaultLanguage() {
		return this._isSupportedLanguage(environment.defaultLanguage)
			? (environment.defaultLanguage as LanguageCode)
			: 'en';
	}
}
