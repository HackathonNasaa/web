import { getImage } from "astro:assets";
import { fetchFromNasa } from "@nasa";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ redirect }) => {
  const response = JSON.parse(await fetchFromNasa("/planetary/apod"));

  const { hdurl } = response;

  const image = await getImage({
    inferSize: true,
    src: hdurl
  });

  return redirect(image.src, 307);
};
