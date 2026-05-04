// src/app/constants/languages.ts

import { LanguageOption } from './language.interface';

export const LANGUAGES: (LanguageOption & { population: number })[] = [
	{
		code: 'ua',
		label: 'Українська',
		flagSrc: 'flags/ukraine.svg',
		htmlLang: 'uk',
		population: 35,
	},
	{
		code: 'en',
		label: 'English',
		flagSrc: 'flags/united-kingdom.svg',
		htmlLang: 'en',
		population: 280,
	},
	{
		code: 'de',
		label: 'Deutsch',
		flagSrc: 'flags/germany.svg',
		htmlLang: 'de',
		population: 130,
	},
	{
		code: 'fr',
		label: 'Français',
		flagSrc: 'flags/france.svg',
		htmlLang: 'fr',
		population: 110,
	},
	{
		code: 'pl',
		label: 'Polski',
		flagSrc: 'flags/poland.svg',
		htmlLang: 'pl',
		population: 45,
	},
	{
		code: 'ro',
		label: 'Română',
		flagSrc: 'flags/romania.svg',
		htmlLang: 'ro',
		population: 28,
	},
	{
		code: 'hu',
		label: 'Magyar',
		flagSrc: 'flags/hungary.svg',
		htmlLang: 'hu',
		population: 13,
	},
	{
		code: 'el',
		label: 'Ελληνικά',
		flagSrc: 'flags/greece.svg',
		htmlLang: 'el',
		population: 13,
	},
	{
		code: 'cs',
		label: 'Čeština',
		flagSrc: 'flags/czechia.svg',
		htmlLang: 'cs',
		population: 12,
	},
	{
		code: 'it',
		label: 'Italiano',
		flagSrc: 'flags/italy.svg',
		htmlLang: 'it',
		population: 70,
	},
	{
		code: 'es',
		label: 'Español',
		flagSrc: 'flags/spain.svg',
		htmlLang: 'es',
		population: 75,
	},
	{
		code: 'nl',
		label: 'Nederlands',
		flagSrc: 'flags/netherlands.svg',
		htmlLang: 'nl',
		population: 25,
	},
	{
		code: 'pt',
		label: 'Português',
		flagSrc: 'flags/portugal.svg',
		htmlLang: 'pt',
		population: 15,
	},
	{
		code: 'sv',
		label: 'Svenska',
		flagSrc: 'flags/sweden.svg',
		htmlLang: 'sv',
		population: 12,
	},
];
