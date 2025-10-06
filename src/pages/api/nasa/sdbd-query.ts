import type { APIRoute } from "astro";

import { checkKey, queryFromSDBD } from "@/nasa";

const headers = new Headers();
headers.append("content-type", "application/json");

export const GET: APIRoute = async ({ request }) => {
  const userParams = new URL(request.url).searchParams;

  const key = userParams.get("api_key");
  const res = checkKey(key);

  if (res !== 200) {
    return new Response(null, {
      status: res
    });
  }

  const content = await queryFromSDBD(userParams);

  return new Response(content, {
    status: 200,
    headers
  });
};
