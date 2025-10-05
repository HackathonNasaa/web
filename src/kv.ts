import { createDatabase } from "db0";
import libSql from "db0/connectors/libsql/web";
import { createStorage } from "unstorage";
import dbDriver from "unstorage/drivers/db0";
import fsDriver from "unstorage/drivers/fs";

const database = import.meta.env.PROD
  ? createDatabase(
      libSql({
        url: import.meta.env.ASTRO_DB_REMOTE_URL,
        authToken: import.meta.env.ASTRO_DB_APP_TOKEN
      })
    )
  : undefined;

const kv = createStorage({
  driver: database ? dbDriver({ database }) : fsDriver({ base: "./.tmp" })
});

export default kv;

export async function retrieve(key: string) {
  const content = await kv.getItemRaw(key).then((result) => result?.valueOf());

  if (!content) {
    return undefined;
  }

  const meta = await kv.getMeta(key);
  const { atime, ttl } = meta;

  if (!atime || !ttl) {
    return content;
  }

  const now = new Date();

  if (atime.getTime() + ttl * 1000 <= now.getTime()) {
    console.log("EXPIRED");
    kv.del(key);
    return undefined;
  }

  return String(content);
}
