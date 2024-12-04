import { Pagination } from "./pagination";
import { Post } from "./post";

export type Story = Post;

export type FetchStoriesResponse = {
  activities: Story[];
  pagination: Pagination;
};

export type FetchStoryResponse = Story;
