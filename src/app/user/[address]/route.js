import { backendApi } from "@/api/backendApi";

export async function GET(request, { params }) {
  const { address } = await params;
  const user = await backendApi.getUser(address);
  return Response.json(user);
}
