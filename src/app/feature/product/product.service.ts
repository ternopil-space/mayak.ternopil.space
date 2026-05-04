import { Injectable, signal } from '@angular/core';
import productsData from '../../../data/products.json';
import { Product } from './product.interface';

type RawProduct = Partial<Product> & Record<string, string | number | null | undefined>;

const _fallbackProducts: Product[] = _normalizeProducts(productsData as RawProduct[]);

@Injectable({
	providedIn: 'root',
})
export class ProductService {
	readonly products = signal<Product[]>(_fallbackProducts);
	readonly isLoading = signal(true);

	resolveProducts(products: RawProduct[] | null | undefined) {
		this.products.set(
			Array.isArray(products) && products.length > 0
				? _normalizeProducts(products)
				: _fallbackProducts,
		);
		this.isLoading.set(false);
	}

	finishLoading() {
		this.isLoading.set(false);
	}
}

function _normalizeProducts(products: RawProduct[]): Product[] {
	return products
		.map((product, index) => _normalizeProduct(product, index))
		.filter((product): product is Product => Boolean(product));
}

function _normalizeProduct(product: RawProduct, index: number): Product | null {
	const title = _stringOrFallback(
		product.title ?? product['name'] ?? product['productTitle'] ?? product['label'],
	);

	if (!title) {
		return null;
	}

	const slugSource = product.slug ?? product['id'] ?? title;

	return {
		slug: _slugOrFallback(slugSource, index),
		title,
		summary: _stringOrFallback(
			product.summary ?? product['description'] ?? product['details'],
		),
		price: _stringOrFallback(
			product.price ?? product['priceLabel'] ?? product['cost'] ?? product['amount'],
		),
		category: _stringOrFallback(product.category ?? product['type'] ?? product['group']),
		badge: _stringOrFallback(product.badge ?? product['tag'] ?? product['status']),
		ctaLabel: _stringOrFallback(
			product.ctaLabel ?? product['buttonLabel'] ?? product['linkText'],
		),
		ctaHref: _stringOrFallback(product.ctaHref ?? product['url'] ?? product['link']),
	};
}

function _slugOrFallback(value: string | number | null | undefined, index: number): string {
	if (typeof value === 'number' && Number.isFinite(value)) {
		return `product-${value}`;
	}

	const normalized = _stringOrFallback(value)
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');

	return normalized || `product-${index + 1}`;
}

function _stringOrFallback(value: string | number | null | undefined, fallback = ''): string {
	if (typeof value === 'number' && Number.isFinite(value)) {
		return String(value);
	}

	return typeof value === 'string' && value.trim().length > 0 ? value.trim() : fallback;
}
