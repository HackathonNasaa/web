import type { APIRoute } from "astro";

import { fetchFromNasa } from "@/nasa";

const headers = new Headers();
headers.append("content-type", "application/json");

export const GET: APIRoute = async ({ params, request }) => {
  const userParams = new URL(request.url).searchParams;
  const route = params.route?.trim() ?? "";

  const content = await fetchFromNasa(route, userParams);

  return new Response(content, {
    status: 200,
    headers
  });
};
