import { Injectable, signal } from '@angular/core';
import salesData from '../../../data/sales.json';
import { Sale } from './sale.interface';

type RawSale = Partial<Sale> &
	Record<string, string | number | null | undefined>;

const _fallbackSales = _normalizeSales(salesData as RawSale[]);

@Injectable({
	providedIn: 'root',
})
export class SaleService {
	readonly sales = signal<Sale[]>(_fallbackSales);
	readonly isLoading = signal(true);

	resolveSales(sales: RawSale[] | null | undefined) {
		this.sales.set(
			Array.isArray(sales) && sales.length > 0 ? _normalizeSales(sales) : _fallbackSales,
		);
		this.isLoading.set(false);
	}

	finishLoading() {
		this.isLoading.set(false);
	}
}

function _normalizeSales(sales: RawSale[]) {
	return sales
		.map((sale, index) => _normalizeSale(sale as RawSale, index))
		.filter((sale): sale is Sale => Boolean(sale));
}

function _normalizeSale(sale: RawSale | null | undefined, index: number): Sale | null {
	const title = _stringOrFallback(sale?.title ?? sale?.['name'] ?? sale?.['headline']);

	if (!title) {
		return null;
	}

	const slugSource = sale?.slug ?? sale?.['id'] ?? title;

	return {
		slug: _slugOrFallback(slugSource, index),
		title,
		summary: _stringOrFallback(sale?.summary ?? sale?.['excerpt']),
		description: _stringOrFallback(sale?.description ?? sale?.['details']),
		badge: _stringOrFallback(sale?.badge ?? sale?.['label'] ?? sale?.['category']),
		period: _stringOrFallback(sale?.period ?? sale?.['dateRange'] ?? sale?.['validUntil']),
		terms: _stringOrFallback(sale?.terms ?? sale?.['conditions']),
		ctaLabel: _stringOrFallback(sale?.ctaLabel ?? sale?.['buttonLabel']),
		ctaUrl: _stringOrFallback(sale?.ctaUrl ?? sale?.['url']),
	};
}

function _slugOrFallback(value: string | number | null | undefined, index: number): string {
	if (typeof value === 'number' && Number.isFinite(value)) {
		return `sale-${value}`;
	}

	const normalized = _stringOrFallback(value)
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');

	return normalized || `sale-${index + 1}`;
}

function _stringOrFallback(value: string | number | null | undefined, fallback = ''): string {
	if (typeof value === 'number' && Number.isFinite(value)) {
		return String(value);
	}

	return typeof value === 'string' && value.trim().length > 0 ? value.trim() : fallback;
}
