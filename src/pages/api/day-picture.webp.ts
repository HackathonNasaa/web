import { getImage } from "astro:assets";
import { fetchFromNasa } from "@nasa";
import type { APIRoute } from "astro";

export async function getDayImage(): Promise<string> {
  const response = JSON.parse(await fetchFromNasa("/planetary/apod"));
  const { hdurl } = response;
  return hdurl;
}

export const GET: APIRoute = async ({ redirect }) => {
  const hdurl = await getDayImage();

  const image = await getImage({
    inferSize: true,
    src: hdurl
  });

  return redirect(image.src, 307);
};
