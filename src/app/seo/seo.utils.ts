import type { MetaPage } from '@wawjs/ngx-core';
import { companyProfile } from '../feature/company/company.data';

const _absoluteUrlPattern = /^https?:\/\//i;

export const seoTitleSuffix = ` | ${companyProfile.name}`;

export function buildAbsoluteUrl(value: string | null | undefined): string | undefined {
	if (typeof value !== 'string' || value.trim().length === 0) {
		return undefined;
	}

	if (_absoluteUrlPattern.test(value)) {
		return value.trim();
	}

	return `${companyProfile.siteUrl}${value.startsWith('/') ? value : `/${value}`}`;
}

export function buildCanonicalUrl(url: string): string {
	const path = url.split(/[?#]/)[0] || '/';
	const normalizedPath = path.startsWith('/') ? path : `/${path}`;

	return normalizedPath === '/' ? companyProfile.siteUrl : `${companyProfile.siteUrl}${normalizedPath}`;
}

export function buildRouteMeta(path: string): MetaPage {
	const pageSeo = companyProfile.pageSeo[path];

	return {
		title: stripTitleSuffix(pageSeo?.title ?? (path === '/' ? companyProfile.defaultSeo.title : undefined)),
		description: pageSeo?.description ?? (path === '/' ? companyProfile.defaultSeo.description : undefined),
		image: buildAbsoluteUrl(pageSeo?.image ?? companyProfile.defaultSeo.image),
		robots: pageSeo?.robots,
	};
}

export function stripTitleSuffix(title: string | null | undefined): string | undefined {
	if (typeof title !== 'string' || title.trim().length === 0) {
		return undefined;
	}

	const normalizedTitle = title.trim();
	const leadingTitlePrefix = `${companyProfile.name} | `;

	if (normalizedTitle.endsWith(seoTitleSuffix)) {
		return normalizedTitle.slice(0, -seoTitleSuffix.length);
	}

	if (normalizedTitle.startsWith(leadingTitlePrefix)) {
		return normalizedTitle.slice(leadingTitlePrefix.length);
	}

	return normalizedTitle;
}
