import { backendApi } from "@/api/backendApi";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page")) || 1;
  const pageSize = parseInt(searchParams.get("pageSize")) || 10;
  const sortBy = searchParams.get("sortBy") || "stake";
  const address = searchParams.get("address") || null;

  const values = await backendApi.getValues(page, pageSize, sortBy, address);
  return Response.json(values);
}
