import { Injectable, signal } from '@angular/core';
import jobsData from '../../../data/jobs.json';
import { Job } from './job.interface';

type RawJob = Partial<Job> &
	Record<string, string | number | null | undefined>;

const _fallbackJobs: Job[] = _normalizeJobs(jobsData as RawJob[]);

@Injectable({
	providedIn: 'root',
})
export class JobService {
	readonly jobs = signal<Job[]>(_fallbackJobs);
	readonly isLoading = signal(true);

	resolveJobs(jobs: RawJob[] | null | undefined) {
		this.jobs.set(
			Array.isArray(jobs) && jobs.length > 0 ? _normalizeJobs(jobs) : _fallbackJobs,
		);
		this.isLoading.set(false);
	}

	finishLoading() {
		this.isLoading.set(false);
	}
}

function _normalizeJobs(jobs: RawJob[]): Job[] {
	return jobs.map((job, index) => _normalizeJob(job, index));
}

function _normalizeJob(job: RawJob, index: number): Job {
	const title = _stringOrFallback(job.title ?? job['name'] ?? job['position'], '');
	const slugSource = job.slug ?? job['id'] ?? title;

	return {
		slug: _slugOrFallback(slugSource, index),
		title,
		summary: _stringOrFallback(job.summary ?? job['description']),
		location: _stringOrFallback(job.location ?? job['city']),
		employmentType: _stringOrFallback(
			job.employmentType ?? job['type'] ?? job['format'],
		),
		schedule: _stringOrFallback(job.schedule),
		salary: _stringOrFallback(job.salary ?? job['salaryRange']),
		experience: _stringOrFallback(job.experience ?? job['experienceLevel']),
		applyUrl: _stringOrFallback(job.applyUrl ?? job['url']),
		applyLabel: _stringOrFallback(job.applyLabel),
		contactEmail: _stringOrFallback(job.contactEmail ?? job['email']),
		contactPhone: _stringOrFallback(job.contactPhone ?? job['phone']),
	};
}

function _slugOrFallback(value: string | number | null | undefined, index: number): string {
	if (typeof value === 'number' && Number.isFinite(value)) {
		return `job-${value}`;
	}

	const normalized = _stringOrFallback(value)
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');

	return normalized || `job-${index + 1}`;
}

function _stringOrFallback(value: string | number | null | undefined, fallback = ''): string {
	if (typeof value === 'number' && Number.isFinite(value)) {
		return String(value);
	}

	return typeof value === 'string' && value.trim().length > 0 ? value.trim() : fallback;
}
