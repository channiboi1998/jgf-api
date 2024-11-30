import activities from "@/public/data/activities.json";
import { Activity, FetchActivitiesResponse } from "@/types/activity";
import { Pagination } from "@/types/pagination";

// Helper function to filter activities older than 3 months
const filterPastPosts = (activities: Activity[]) => {
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3); // Calculate 3 months ago

  return activities.filter((activity) => {
    const publishedDate = new Date(activity.publishedAt);
    return publishedDate <= threeMonthsAgo; // Only posts older than 3 months
  });
};

export async function GET(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10); // Default to page 1
  const pageSize = 6; // Max items per page
  // const totalItems = activities.length;
  const type = url.searchParams.get("type") || "recent"; // Default to "recent"

  // Filter and sort activities based on the 'type' query parameter
  let filteredActivities: Activity[] = [...activities]; // Copy of the activities array to work with

  if (type === "past") {
    filteredActivities = filterPastPosts(activities); // Only posts older than 3 months
  }

  // Sort activities by the publishedAt field in descending order
  filteredActivities.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  // Pagination calculations
  const totalPages = Math.max(
    1,
    Math.ceil(filteredActivities.length / pageSize)
  );
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Get paginated items
  const paginatedItems: Activity[] = filteredActivities.slice(
    startIndex,
    endIndex
  );

  // Pagination metadata
  const pagination: Pagination = {
    page,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
    nextPage: page < totalPages ? page + 1 : null,
    prevPage: page > 1 ? page - 1 : null,
  };

  // Response data
  const responseData: FetchActivitiesResponse = {
    activities: paginatedItems,
    pagination,
  };

  return new Response(JSON.stringify(responseData), {
    headers: { "Content-Type": "application/json" },
  });
}
