import { checkKey, fetchFromNasa } from "@nasa";
import type { APIRoute } from "astro";

const headers = new Headers();
headers.append("content-type", "application/json");

export const GET: APIRoute = async ({ params, request }) => {
  const userParams = new URL(request.url).searchParams;

  const key = userParams.get("api_key");
  const res = checkKey(key);

  if (res !== 200) {
    return new Response(null, {
      status: res
    });
  }

  const route = params.route?.trim() ?? "";

  const content = await fetchFromNasa(route, userParams);

  return new Response(content, {
    status: 200,
    headers
  });
};
