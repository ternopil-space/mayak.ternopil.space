import { LanguageCode } from './language.type';

export interface LanguageOption {
	code: LanguageCode;
	label: string;
	flagSrc: string;
	htmlLang: string;
}
