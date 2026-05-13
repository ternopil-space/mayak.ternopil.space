import { Routes } from '@angular/router';
import { buildRouteMeta } from './seo/seo.utils';

export const routes: Routes = [
	{
		path: '',
		data: {
			meta: buildRouteMeta('/'),
		},
		loadComponent: () =>
			import('./pages/menu/menu.component').then((m) => m.MenuComponent),
	},
	{
		path: 'favorites',
		data: {
			meta: buildRouteMeta('/favorites'),
		},
		loadComponent: () =>
			import('./pages/menu/menu.component').then((m) => m.MenuComponent),
	},
	{
		path: 'rooms',
		data: {
			meta: buildRouteMeta('/rooms'),
		},
		loadComponent: () => import('./pages/rooms/rooms.component').then((m) => m.RoomsComponent),
	},
	{
		path: 'navigation',
		data: {
			meta: buildRouteMeta('/navigation'),
		},
		loadComponent: () =>
			import('./pages/navigation/navigation.component').then((m) => m.NavigationComponent),
	},
	{
		path: 'gallery',
		data: {
			meta: buildRouteMeta('/gallery'),
		},
		loadComponent: () =>
			import('./pages/gallery/gallery.component').then((m) => m.GalleryComponent),
	},
	{
		path: 'dish/:slug',
		loadComponent: () => import('./pages/dish/dish.component').then((m) => m.DishComponent),
	},
	{
		path: 'sales',
		data: {
			meta: buildRouteMeta('/sales'),
		},
		loadComponent: () => import('./pages/sales/sales.component').then((m) => m.SalesComponent),
	},
	{
		path: 'articles',
		data: {
			meta: buildRouteMeta('/articles'),
		},
		loadComponent: () =>
			import('./pages/articles/articles.component').then((m) => m.ArticlesComponent),
	},
	{
		path: 'quests',
		data: {
			meta: buildRouteMeta('/quests'),
		},
		loadComponent: () => import('./pages/quests/quests.component').then((m) => m.QuestsComponent),
	},
	{
		path: 'reviews',
		data: {
			meta: buildRouteMeta('/reviews'),
		},
		loadComponent: () =>
			import('./pages/reviews/reviews.component').then((m) => m.ReviewsComponent),
	},
	{
		path: 'events',
		data: {
			meta: buildRouteMeta('/events'),
		},
		loadComponent: () =>
			import('./pages/events/events.component').then((m) => m.EventsComponent),
	},
	{
		path: 'products',
		data: {
			meta: buildRouteMeta('/products'),
		},
		loadComponent: () =>
			import('./pages/products/products.component').then((m) => m.ProductsComponent),
	},
	{
		path: 'jobs',
		data: {
			meta: buildRouteMeta('/jobs'),
		},
		loadComponent: () => import('./pages/jobs/jobs.component').then((m) => m.JobsComponent),
	},
	{
		path: 'team',
		data: {
			meta: buildRouteMeta('/team'),
		},
		loadComponent: () => import('./pages/team/team.component').then((m) => m.TeamComponent),
	},
	{
		path: 'socials',
		data: {
			meta: buildRouteMeta('/socials'),
		},
		loadComponent: () =>
			import('./pages/socials/socials.component').then((m) => m.SocialsComponent),
	},
	{
		path: '**',
		redirectTo: '/',
	},
];
