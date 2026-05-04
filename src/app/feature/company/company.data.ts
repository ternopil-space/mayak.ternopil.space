import companyData from '../../../data/company.json';
import {
	CompanyProfile,
	CompanyStructuredData,
	SeoMetadata,
	SeoPageOverride,
} from './company.interface';

type RawCompanyProfile = Partial<
	Omit<CompanyProfile, 'defaultSeo' | 'pageSeo' | 'structuredData'>
> & {
	defaultSeo?: Partial<SeoMetadata>;
	pageSeo?: Record<string, SeoPageOverride | undefined>;
	structuredData?: Partial<CompanyStructuredData>;
};

const rawCompanyProfile = companyData as RawCompanyProfile;

export const companyProfile: CompanyProfile = {
	_id: _stringOrFallback(rawCompanyProfile._id, 'demo'),
	name: _stringOrFallback(rawCompanyProfile.name, 'Horeca'),
	lang: _stringOrFallback(rawCompanyProfile.lang, 'uk'),
	locale: _stringOrFallback(rawCompanyProfile.locale, 'uk_UA'),
	siteUrl: _trimTrailingSlash(_stringOrFallback(rawCompanyProfile.siteUrl)),
	logo: _stringOrFallback(rawCompanyProfile.logo, '/logo.png'),
	phone: _stringOrFallback(rawCompanyProfile.phone),
	email: _stringOrFallback(rawCompanyProfile.email),
	address: _stringOrFallback(rawCompanyProfile.address),
	defaultSeo: _normalizeSeoMetadata(rawCompanyProfile.defaultSeo, rawCompanyProfile.name),
	pageSeo: _normalizePageSeo(rawCompanyProfile.pageSeo),
	structuredData: _normalizeStructuredData(rawCompanyProfile.structuredData),
};

function _normalizeSeoMetadata(
	metadata: RawCompanyProfile['defaultSeo'],
	companyName: string | undefined,
): SeoMetadata {
	return {
		title: _stringOrFallback(metadata?.title, _stringOrFallback(companyName, 'Horeca')),
		description: _stringOrFallback(metadata?.description),
		keywords: _stringArrayOrFallback(metadata?.keywords),
		author: _stringOrFallback(metadata?.author, _stringOrFallback(companyName, 'Horeca')),
		robots: _stringOrFallback(metadata?.robots, 'index, follow'),
		image: _stringOrFallback(metadata?.image, '/logo.png'),
		type: _stringOrFallback(metadata?.type, 'website'),
		twitterCard: _stringOrFallback(metadata?.twitterCard, 'summary_large_image'),
	};
}

function _normalizePageSeo(
	pageSeo: RawCompanyProfile['pageSeo'],
): Record<string, SeoPageOverride> {
	if (!pageSeo) {
		return {};
	}

	return Object.fromEntries(
		Object.entries(pageSeo).map(([path, metadata]) => [
			path,
			{
				title: _optionalString(metadata?.title),
				description: _optionalString(metadata?.description),
				keywords: Array.isArray(metadata?.keywords)
					? metadata.keywords.filter(
							(keyword): keyword is string =>
								typeof keyword === 'string' && keyword.trim().length > 0,
						)
					: undefined,
				author: _optionalString(metadata?.author),
				robots: _optionalString(metadata?.robots),
				image: _optionalString(metadata?.image),
				type: _optionalString(metadata?.type),
				twitterCard: _optionalString(metadata?.twitterCard),
				canonicalPath: _optionalString(metadata?.canonicalPath),
			},
		]),
	);
}

function _normalizeStructuredData(
	structuredData: RawCompanyProfile['structuredData'],
): CompanyStructuredData {
	return {
		type: _stringOrFallback(structuredData?.type, 'Restaurant'),
		priceRange: _stringOrFallback(structuredData?.priceRange, '$$'),
		servesCuisine: _stringOrFallback(structuredData?.servesCuisine, 'HoReCa'),
		addressLocality: _stringOrFallback(structuredData?.addressLocality, 'Kamianets-Podilskyi'),
		addressCountry: _stringOrFallback(structuredData?.addressCountry, 'UA'),
		sameAs: _stringArrayOrFallback(structuredData?.sameAs),
	};
}

function _stringOrFallback(value: string | null | undefined, fallback = ''): string {
	return typeof value === 'string' && value.trim().length > 0 ? value.trim() : fallback;
}

function _optionalString(value: string | null | undefined): string | undefined {
	return typeof value === 'string' && value.trim().length > 0 ? value.trim() : undefined;
}

function _stringArrayOrFallback(value: string[] | null | undefined): string[] {
	return Array.isArray(value)
		? value.filter(
				(entry): entry is string => typeof entry === 'string' && entry.trim().length > 0,
			)
		: [];
}

function _trimTrailingSlash(value: string): string {
	return value.endsWith('/') ? value.slice(0, -1) : value;
}
