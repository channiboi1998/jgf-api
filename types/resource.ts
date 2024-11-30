import { Post } from './post';

export type Resource = Post & {
  externalUrl: string;
};
