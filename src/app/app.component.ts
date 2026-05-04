import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { TranslateService } from '@wawjs/ngx-translate';
import { companyProfile } from './feature/company/company.data';
import { LanguageService } from './feature/language/language.service';
import { TopbarComponent } from './layouts/topbar/topbar.component';
import { CanonicalService } from './services/canonical.service';
import { ScrollService } from './services/scroll.service';

@Component({
	selector: 'app-root',
	imports: [RouterLink, RouterLinkActive, RouterOutlet, TopbarComponent],
	template: `
		<app-topbar />

		<div class="pb-24">
			<router-outlet />
		</div>

		<nav
			aria-label="Bottom navigation"
			class="fixed inset-x-0 bottom-0 z-30 border-t border-[var(--c-border)] bg-[var(--c-bg-secondary)]/95 px-2 py-2 backdrop-blur supports-[backdrop-filter]:bg-[var(--c-bg-secondary)]/88"
		>
			<div class="mx-auto grid max-w-[var(--container)] grid-cols-5 gap-1">
				@for (item of navItems; track item.label) {
					@if (item.route) {
						<a
							class="flex min-w-0 flex-col items-center justify-center gap-1 rounded-[0.9rem] px-1 py-2 text-[11px] font-medium text-[var(--c-text-muted)] transition-colors duration-200 hover:bg-[var(--c-bg-primary)]"
							[routerLink]="item.route"
							[routerLinkActiveOptions]="{ exact: item.exact }"
							routerLinkActive="bg-[color:rgba(197,61,61,0.1)] text-[var(--c-secondary)]"
						>
							<span class="material-symbols-outlined text-[21px]" aria-hidden="true">
								{{ item.icon }}
							</span>
							<span class="truncate">{{ item.label }}</span>
						</a>
					} @else {
						<button
							class="flex min-w-0 flex-col items-center justify-center gap-1 rounded-[0.9rem] px-1 py-2 text-[11px] font-medium text-[var(--c-text-muted)] transition-colors duration-200 hover:bg-[var(--c-bg-primary)]"
							type="button"
						>
							<span class="material-symbols-outlined text-[21px]" aria-hidden="true">
								{{ item.icon }}
							</span>
							<span class="truncate">{{ item.label }}</span>
						</button>
					}
				}
			</div>
		</nav>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
	private readonly _canonicalService = inject(CanonicalService);
	private readonly _languageService = inject(LanguageService);
	private readonly _router = inject(Router);
	private readonly _scrollService = inject(ScrollService);
	private readonly _title = inject(Title);
	private readonly _translateService = inject(TranslateService);
	private readonly _navigationEnd = toSignal(
		this._router.events.pipe(filter((event) => event instanceof NavigationEnd)),
		{ initialValue: null },
	);

	protected readonly navItems = [
		{ label: 'Nav', icon: 'navigation', route: '/navigation', exact: true },
		{ label: 'Gallery', icon: 'photo_library', route: '/gallery', exact: true },
		{ label: 'Socials', icon: 'share', route: '/socials', exact: true },
		{ label: 'Favorite', icon: 'favorite', route: '/favorites', exact: true },
		{ label: 'Menu', icon: 'restaurant_menu', route: '/', exact: true },
	];

	constructor() {
		this._canonicalService.initialize();
		this._scrollService.initialize();

		effect(() => {
			this._navigationEnd();
			this._languageService.language();

			const path = _normalizeTitlePath(this._router.url);

			if (path.startsWith('/dish/')) {
				return;
			}

			const titleKey = _pageTitleKeys[path];
			const translatedTitle = titleKey
				? this._translateService.translate(titleKey)()
				: companyProfile.name;

			this._title.setTitle(
				translatedTitle === companyProfile.name
					? translatedTitle
					: `${translatedTitle} | ${companyProfile.name}`,
			);
		});
	}
}

const _pageTitleKeys: Record<string, string> = {
	'/': 'Menu',
	'/favorites': 'Favorites',
	'/rooms': 'Rooms',
	'/navigation': 'Navigation',
	'/gallery': 'Gallery',
	'/sales': 'Sales',
	'/articles': 'Articles',
	'/quests': 'Quests',
	'/reviews': 'Reviews',
	'/events': 'Events',
	'/products': 'Products',
	'/jobs': 'Jobs',
	'/team': 'Team',
	'/socials': 'Socials',
};

function _normalizeTitlePath(url: string): string {
	return (url.split(/[?#]/)[0] || '/').replace(/\/+$/, '') || '/';
}
