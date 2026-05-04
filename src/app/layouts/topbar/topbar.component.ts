import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateService } from '@wawjs/ngx-translate';
import { ThemeService } from '@wawjs/ngx-ui';
import { LanguageOption } from '../../feature/language/language.interface';
import { LanguageService } from '../../feature/language/language.service';
import { TranslatePipe } from '../../shared/translate.pipe';

@Component({
	selector: 'app-topbar',
	imports: [NgOptimizedImage, RouterLink, TranslatePipe],
	templateUrl: './topbar.component.html',
	styleUrl: './topbar.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent {
	private readonly _translateService = inject(TranslateService);
	private readonly _themeService = inject(ThemeService);
	private readonly _languageService = inject(LanguageService);
	private readonly _router = inject(Router);

	protected readonly mode = computed(() => this._themeService.mode() ?? 'light');
	protected readonly languageMenuOpen = signal(false);
	protected readonly languages = this._languageService.languages;
	protected readonly activeLanguage = this._languageService.language;
	protected readonly currentLanguage = computed(() =>
		this._languageService.getLanguage(this.activeLanguage()),
	);
	protected readonly toggleIcon = computed(() =>
		this.mode() === 'dark' ? 'light_mode' : 'dark_mode',
	);
	protected readonly toggleLabel = computed(() => {
		this.activeLanguage();
		return this.mode() === 'dark'
			? this._translateService.translate('Switch to light mode')()
			: this._translateService.translate('Switch to dark mode')();
	});
	protected readonly languageMenuLabel = computed(() => {
		this.activeLanguage();
		return this._translateService.translate('Open language menu')();
	});
	protected readonly languageCycleLabel = computed(
		() => {
			this.activeLanguage();
			return `${this._translateService.translate('Switch language to')()} ${this.getNextLanguage().label}`;
		},
	);

	constructor() {
		this._themeService.init();
		this._languageService.init();
	}

	protected toggleMode() {
		const nextMode = this.mode() === 'dark' ? 'light' : 'dark';
		this._themeService.setMode(nextMode);
	}

	protected async nextLanguage() {
		const nextLanguage = this.getNextLanguage();
		await this._languageService.setLanguage(nextLanguage.code);
		await this._router.navigateByUrl(this._router.url);
		this.languageMenuOpen.set(false);
	}

	protected toggleLanguageMenu() {
		this.languageMenuOpen.update((open) => !open);
	}

	protected async setLanguage(language: LanguageOption) {
		await this._languageService.setLanguage(language.code);
		await this._router.navigateByUrl(this._router.url);
		this.languageMenuOpen.set(false);
	}

	protected getNextLanguage() {
		const languages = this.languages();
		const currentCode = this.currentLanguage().code;
		const currentIndex = languages.findIndex((language) => language.code === currentCode);

		return languages[(currentIndex + 1) % languages.length] ?? languages[0]!;
	}
}
