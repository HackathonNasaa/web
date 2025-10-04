import crypto from "node:crypto";
import kv from "@kv";

const nasa_api = import.meta.env.NASA_API;

const search = new URLSearchParams();
search.append("api_key", import.meta.env.NASA_API_KEY);

export async function fetchFromNasa(
  route: string,
  query:
    | URLSearchParams
    | Record<string, string>
    | string
    | undefined = undefined
) {
  let key: string;

  if (query) {
    query =
      query instanceof URLSearchParams ? query : new URLSearchParams(query);
    query.delete("api_key");
    key = toKey(route, query);
  } else {
    key = toKey(route);
  }

  const cached = await retrieve(key);

  if (cached) {
    return cached;
  }

  const url = new URL(
    route.startsWith("/") ? `${nasa_api}${route}` : `${nasa_api}/${route}`
  );

  if (query) {
    url.search = query.toString();
  }

  search.forEach((value, key) => {
    url.searchParams.append(key, value);
  });

  const response = await fetch(url);
  const content = await response.text();

  kv.set(key, content);
  kv.setMeta(key, {
    ttl: Number(import.meta.env.NASA_TTL) ?? 60
  });

  return content;
}

function toKey(
  route: string,
  url: URLSearchParams | undefined = undefined
): string {
  const hash = crypto.createHash("sha1");
  hash.update(route);

  if (url) {
    hash.update(url.toString());
  }

  return hash.digest("hex");
}

async function retrieve(key: string) {
  const content = await kv.getItemRaw(key).then((result) => result?.valueOf());

  if (!content) {
    return undefined;
  }

  const meta = await kv.getMeta(key);
  console.log(meta);
  const { atime, ttl } = meta;

  if (!atime || !ttl) {
    console.log("undef");
    return undefined;
  }

  const now = new Date();

  if (atime.getTime() + ttl * 1000 <= now.getTime()) {
    console.log("EXPIRED");
    kv.del(key);
    return undefined;
  }

  return content as string;
}
