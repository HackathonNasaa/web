import type { APIRoute } from "astro";

import { fetchFromSDBD } from "@/nasa";

const headers = new Headers();
headers.append("content-type", "application/json");

export const GET: APIRoute = async ({ request }) => {
  const userParams = new URL(request.url).searchParams;

  const content = await fetchFromSDBD(userParams);

  return new Response(content, {
    status: 200,
    headers
  });
};
