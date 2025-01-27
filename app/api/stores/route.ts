import stores from "@/public/data/stores.json";
import { Pagination } from "@/types/pagination";
import { FetchStoresResponse, Store } from "@/types/store";

export async function GET(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10); // Default to page 1
  const pageSize = 50; // Max items per page

  // Filter and sort activities based on the 'type' query parameter
  const filteredStores: Store[] = [...stores]; // Copy of the activities array to work with

  // Pagination calculations
  const totalPages = Math.max(
    1,
    Math.ceil(filteredStores.length / pageSize)
  );
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Get paginated items
  const paginatedItems: Store[] = filteredStores.slice(
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
  const responseData: FetchStoresResponse = {
    stores: paginatedItems,
    pagination,
  };

  return new Response(JSON.stringify(responseData), {
    headers: { "Content-Type": "application/json" },
  });
}
