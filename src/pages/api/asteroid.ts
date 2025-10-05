import kv, { retrieve } from "@kv";
import { queryFromSDBD } from "@nasa";
import type { APIRoute } from "astro";

type composition = "metallic" | "rocky" | "carbonaceous";

const tholen_metal = new Set(["M"]);
const tholen_rocky = new Set(["S", "Q"]);
const tholen_carbon = new Set(["C", "G", "F", "B"]);

const smass_rocky = new Set(["A", "K", "L", "Q", "R"]);

const G = 6.6743e-11;

export type Asteroid = {
  name?: string;
  fullName?: string;
  spkid: number;
  mass: number;
  diameter?: number;
  composition: composition;
};

const fields = [
  "name", //0
  "spkid", // 1
  "full_name", // 2
  "diameter", // 3
  "GM", // 4
  "spec_T", // 5 MANDATORY
  "albedo", // 6
  "spec_B" // 7
];

function classify(asteroid: string[]) {
  if (!asteroid[5] && !asteroid[7]) {
    return undefined;
  }

  let composition: composition | undefined;

  if (asteroid[5]) {
    const tholen = asteroid[5]?.trim();

    if (tholen_rocky.has(tholen)) {
      composition = "rocky";
    } else if (tholen_metal.has(tholen)) {
      composition = "metallic";
    } else if (tholen_carbon.has(tholen)) {
      composition = "carbonaceous";
    }
  }

  if (!composition && asteroid[7]) {
    const smass = asteroid[7].trim();

    if (smass.startsWith("C") || smass === "B") {
      composition = "carbonaceous";
    } else if (smass_rocky.has(smass) || smass.startsWith("S")) {
      composition = "rocky";
    }
  }

  return composition;
}

const headers = new Headers();
headers.append("content-type", "application/json");

export const GET: APIRoute = async () => {
  const cached = await retrieve("game-asteroids");

  if (cached) {
    return new Response(cached, {
      headers
    });
  }

  const { data } = JSON.parse(
    await queryFromSDBD({
      fields: fields.join(","),
      "sb-cdata": JSON.stringify({
        AND: [
          "GM|DF",
          {
            OR: ["spec_T|DF", "spec_B|DF"]
          }
        ]
      })
    })
  );

  const asteroids: Asteroid[] = [];

  // biome-ignore lint/suspicious/noExplicitAny: <nao quero lidar com tipagem>
  data?.forEach((asteroid: any[]) => {
    const composition = classify(asteroid);
    if (!composition) return;

    // ("name", //0
    //   "spkid", // 1
    //   "full_name", // 2
    //   "diameter", // 3
    //   "GM", // 4
    //   "spec_T", // 5 MANDATORY
    //   "albedo", // 6
    //   "spec_B"); // 7

    asteroids.push({
      name: asteroid[0] || undefined,
      spkid: Number(asteroid[1]),
      fullName: asteroid[2].trim(),
      diameter: asteroid[4] && Number(asteroid[3]),
      mass: asteroid[4] && (Number(asteroid[4]) / G) * 1e6,
      composition
    });
  });

  const text = JSON.stringify(asteroids);

  kv.set("game-asteroids", text);
  kv.setMeta("game-asteroids", {
    atime: new Date(),
    ttl: import.meta.env.TTL
  });

  return new Response(text, {
    headers
  });
};
