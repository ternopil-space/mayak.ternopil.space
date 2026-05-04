import { Article } from '../article/article.interface';
import { Company } from '../company/company.interface';
import { Dish, DishCategory } from '../dish/dish.interface';
import { EventItem } from '../event/event.interface';
import { Exhibit } from '../exhibit/exhibit.interface';
import { Job } from '../job/job.interface';
import { Profile } from '../profile/profile.interface';
import { Product } from '../product/product.interface';
import { Quest } from '../quest/quest.interface';
import { Review } from '../review/review.interface';
import { Room } from '../room/room.interface';
import { Sale } from '../sale/sale.interface';

export interface BootstrapData {
	articles?: Partial<Article>[] | null;
	company?: Company;
	categories?: DishCategory[] | null;
	dishes?: Dish[];
	events?: Partial<EventItem>[] | null;
	exhibits?: Partial<Exhibit>[] | null;
	jobs?: Partial<Job>[] | null;
	profiles?: Partial<Profile>[] | null;
	products?: Partial<Product>[] | null;
	quests?: Partial<Quest>[] | null;
	reviews?: Partial<Review>[] | null;
	rooms?: Partial<Room>[] | null;
	sales?: Partial<Sale>[] | null;
}
