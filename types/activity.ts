import { Pagination } from './pagination';
import { Post } from './post';

export type Activity = Post;

export type FetchActivitiesResponse = {
  activities: Activity[];
  pagination: Pagination;
};

export type FetchActivityResponse = Activity;
