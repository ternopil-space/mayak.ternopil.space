import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MetaService } from '@wawjs/ngx-core';
import { filter } from 'rxjs';
import { buildCanonicalUrl } from '../seo/seo.utils';

@Injectable({
	providedIn: 'root',
})
export class CanonicalService {
	private readonly _document = inject(DOCUMENT);
	private readonly _metaService = inject(MetaService);
	private readonly _router = inject(Router);
	private readonly _isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
	private _initialized = false;

	initialize() {
		if (this._initialized) {
			return;
		}

		this._initialized = true;
		this.setCanonicalUrl(this._router.url);

		this._router.events
			.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
			.subscribe((event) => this.setCanonicalUrl(event.urlAfterRedirects));
	}

	setCanonicalUrl(url: string) {
		const canonical = buildCanonicalUrl(url);

		if (this._isBrowser) {
			this._metaService.setLink({ canonical });
			return;
		}

		this._setCanonicalOnDocument(canonical);
	}

	private _setCanonicalOnDocument(canonical: string) {
		const existingLinks = Array.from(
			this._document.head.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]'),
		);
		const link = existingLinks[0] ?? this._document.createElement('link');

		if (!existingLinks.length) {
			link.setAttribute('rel', 'canonical');
			this._document.head.appendChild(link);
		} else if (existingLinks.length > 1) {
			for (let index = 1; index < existingLinks.length; index++) {
				existingLinks[index].remove();
			}
		}

		link.setAttribute('href', canonical);
	}
}
