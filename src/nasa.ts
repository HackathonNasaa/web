import crypto from "node:crypto";
import kv, { retrieve } from "@kv";

const nasa_api = import.meta.env.NASA_API;

const sdbd_api = import.meta.env.SDBD_API;

export function checkKey(key: string | undefined | null) {
  if (!key) {
    return 401;
  }

  if (key === import.meta.env.NASA_API_KEY) {
    return 200;
  }

  return 403;
}

const search = new URLSearchParams();
search.append("api_key", import.meta.env.NASA_API_KEY);

type QueryType = URLSearchParams | Record<string, string> | string | undefined;

export async function fetchFromSDBD(
  query: QueryType) {
  return queryAPI(sdbd_api, undefined, toQuery(query));
}

const sdbd_query = "https://ssd-api.jpl.nasa.gov/sbdb_query.api";

export async function queryFromSDBD(
  query: QueryType
) {
  query = toQuery(query);
  query.delete("api_key");
  return queryAPI(sdbd_query, undefined, query);
}

function toQuery(query: QueryType): URLSearchParams {
  return new URLSearchParams(query);
}

export async function fetchFromNasa(
  route: string,
  query: QueryType = undefined
) {
  query = toQuery(query);

  search.forEach((value, key) => {
    query.append(key, value);
  });

  return queryAPI(nasa_api, route, query);
}

async function queryAPI(
  apiUrl: string,
  route: string | undefined,
  query: URLSearchParams
) {
  let url: URL;

  if (!route) {
    url = new URL(apiUrl);
  } else if (route.startsWith("/")) {
    url = new URL(`${apiUrl}${route}`);
  } else {
    url = new URL(`${apiUrl}/${route}`);
  }

  url.search = "";
  return fetchURL(url, query);
}

export async function fetchURL(url: URL, query?: URLSearchParams) {
  const key = toKey(url.href, query);
  const cached = await retrieve(key);

  if (cached) {
    return cached;
  }

  query?.forEach((value, key) => {
    url.searchParams.append(key, value);
  });

  console.log(url.href)

  const response = await fetch(url);
  const content = await response.text();

  kv.set(key, content);
  kv.setMeta(key, {
    atime: new Date(),
    ttl: Number(import.meta.env.TTL) ?? 60
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

