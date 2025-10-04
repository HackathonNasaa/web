import crypto from 'node:crypto';
import { createStorage } from 'unstorage';
import fsDriver from 'unstorage/drivers/fs';

const kv = createStorage({
  driver: fsDriver({ base: "./.tmp" })
});

const nasa_api = "https://api.nasa.gov";
const search = new URLSearchParams();
search.append("api_key", "rrJs1uGSrVdfOrl9TKWoR12utoCI6pdhkYRW5tNC");
async function fetchFromNasa(route, query = void 0) {
  let key;
  if (query) {
    query = query instanceof URLSearchParams ? query : new URLSearchParams(query);
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
  search.forEach((value, key2) => {
    url.searchParams.append(key2, value);
  });
  const response = await fetch(url);
  const content = await response.text();
  kv.set(key, content);
  kv.setMeta(key, {
    ttl: Number("15") ?? 60
  });
  return content;
}
function toKey(route, url = void 0) {
  const hash = crypto.createHash("sha1");
  hash.update(route);
  if (url) {
    hash.update(url.toString());
  }
  return hash.digest("hex");
}
async function retrieve(key) {
  const content = await kv.getItemRaw(key).then((result) => result?.valueOf());
  if (!content) {
    return void 0;
  }
  const meta = await kv.getMeta(key);
  console.log(meta);
  const { atime, ttl } = meta;
  if (!atime || !ttl) {
    console.log("undef");
    return void 0;
  }
  const now = /* @__PURE__ */ new Date();
  if (atime.getTime() + ttl * 1e3 <= now.getTime()) {
    console.log("EXPIRED");
    kv.del(key);
    return void 0;
  }
  return content;
}

export { fetchFromNasa as f };
