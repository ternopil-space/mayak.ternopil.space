import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslateService } from '@wawjs/ngx-translate';
import { LanguageService } from '../feature/language/language.service';

@Pipe({
	name: 'translate',
	pure: false,
})
export class TranslatePipe implements PipeTransform {
	private readonly _languageService = inject(LanguageService);
	private readonly _translateService = inject(TranslateService);

	transform(text: string | null | undefined): string {
		this._languageService.language();

		if (!text) {
			return '';
		}

		return this._translateService.translate(text)();
	}
}
