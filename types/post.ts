export type Post = {
  id: number;
  category: string;
  coverImage: {
    url: string;
    alt: string;
  };
  publishedAt: string;
  slug: string;
  title: string;
};
