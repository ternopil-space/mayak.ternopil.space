import { Injectable, signal } from '@angular/core';
import { companyProfile } from './company.data';
import { Company, CompanyProfile } from './company.interface';

@Injectable({
	providedIn: 'root',
})
export class CompanyService {
	readonly company = signal<CompanyProfile>(companyProfile);

	setCompany(company: Partial<Company> | null | undefined) {
		if (!company) {
			return;
		}

		this.company.update((currentCompany) => ({
			...currentCompany,
			_id: _stringOrFallback(company._id, currentCompany._id),
			name: _stringOrFallback(company.name, currentCompany.name),
		}));
	}
}

function _stringOrFallback(value: string | null | undefined, fallback: string): string {
	return typeof value === 'string' && value.trim().length > 0 ? value : fallback;
}
