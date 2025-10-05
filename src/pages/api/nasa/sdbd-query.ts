import type { APIRoute } from "astro";

import { queryFromSDBD } from "@/nasa";

const headers = new Headers();
headers.append("content-type", "application/json");

export const GET: APIRoute = async ({ request }) => {
  const userParams = new URL(request.url).searchParams;

  const content = await queryFromSDBD(userParams);

  return new Response(content, {
    status: 200,
    headers
  });
};
