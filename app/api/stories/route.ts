import stories from "@/public/data/stories.json";
import { Pagination } from "@/types/pagination";
import { FetchStoriesResponse, Story } from "@/types/story";

export async function GET(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const pageSize = 6;

  const filteredStories: Story[] = [...stories];

  filteredStories.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredStories.length / pageSize)
  );
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedItems: Story[] = filteredStories.slice(
    startIndex,
    endIndex
  );

  const pagination: Pagination = {
    page,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
    nextPage: page < totalPages ? page + 1 : null,
    prevPage: page > 1 ? page - 1 : null,
  };

  const responseData: FetchStoriesResponse = {
    activities: paginatedItems,
    pagination,
  };

  return new Response(JSON.stringify(responseData), {
    headers: { "Content-Type": "application/json" },
  });
}
