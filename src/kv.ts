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

export default createStorage({
  driver: database ? dbDriver({ database }) : fsDriver({ base: "./.tmp" })
});
