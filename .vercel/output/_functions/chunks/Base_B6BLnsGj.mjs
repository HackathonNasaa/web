import { c as createComponent, b as renderTemplate, e as createAstro, m as maybeRenderHead, f as addAttribute, g as renderScript, a as renderComponent, h as renderSlot, i as renderHead } from './astro/server_C0kEAT-t.mjs';
/* empty css                         */
import './index_MaT6fT73.mjs';
import { $ as $$Font } from './_astro_assets_t5xPzNfg.mjs';

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate``;
}, "/home/ame/Projects/HackatonNasaa/web/src/components/Footer.astro", void 0);

const $$Astro$4 = createAstro();
const $$NavBar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$NavBar;
  const pages = {
    "/": "Home",
    "/game": "Game",
    "/about": "About"
  };
  const current = Astro2.url.pathname;
  return renderTemplate`${maybeRenderHead()}<nav class="flex items-center justify-between px-15 py-4 gap-3 text-white border-b border-gray-500 mb-7 flex-col md:flex-row" data-astro-cid-ymhdp2rl> <div class="flex gap-2" data-astro-cid-ymhdp2rl> <b data-astro-cid-ymhdp2rl>icon</b> <span data-astro-cid-ymhdp2rl>NOME DO SITE</span> </div> <ul class="flex list-none gap-4" data-astro-cid-ymhdp2rl> ${Object.entries(pages).map(
    ([path, page]) => path === current ? renderTemplate`<li class="rounded-full border-2 border-gray-400 px-8 py-2" data-astro-cid-ymhdp2rl>${page}</li>` : renderTemplate`<a${addAttribute(path, "href")} data-astro-cid-ymhdp2rl> <li class="border-2 border-transparent px-8 py-2" data-astro-cid-ymhdp2rl>${page}</li> </a>`
  )} </ul> </nav> `;
}, "/home/ame/Projects/HackatonNasaa/web/src/components/NavBar.astro", void 0);

const $$Astro$3 = createAstro();
const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "/home/ame/Projects/HackatonNasaa/web/node_modules/.pnpm/astro@5.14.1_@types+node@24.6.2_@vercel+functions@2.2.13_jiti@2.6.1_lightningcss@1.30.1_ab02463bdb582b9087f130818b9570be/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/ame/Projects/HackatonNasaa/web/node_modules/.pnpm/astro@5.14.1_@types+node@24.6.2_@vercel+functions@2.2.13_jiti@2.6.1_lightningcss@1.30.1_ab02463bdb582b9087f130818b9570be/node_modules/astro/components/ClientRouter.astro", void 0);

const $$Astro$2 = createAstro();
const $$Head = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Head;
  const { title, description } = Astro2.props;
  return renderTemplate`<head><meta charset="UTF-8"><meta name="title"${addAttribute(title, "content")}><meta name="viewport" content="width=device-width, initial-scale=1">${renderComponent($$result, "Font", $$Font, { "cssVariable": "--font-title", "preload": true })}${description && renderTemplate`<meta name="description"${addAttribute(description, "content")}>`}<link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderComponent($$result, "ClientRouter", $$ClientRouter, {})}${renderSlot($$result, $$slots["default"])}${renderHead()}</head>`;
}, "/home/ame/Projects/HackatonNasaa/web/src/components/Head.astro", void 0);

const $$Astro$1 = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  return renderTemplate`<html lang="en" data-astro-cid-sckkx6r4> ${renderComponent($$result, "Head", $$Head, { ...Astro2.props, "data-astro-cid-sckkx6r4": true }, { "default": ($$result2) => renderTemplate`${renderSlot($$result2, $$slots["head"])}` })}${maybeRenderHead()}<body class="bg-purple-950 w-screen h-screen" data-astro-cid-sckkx6r4> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/home/ame/Projects/HackatonNasaa/web/src/layouts/Layout.astro", void 0);

const $$Astro = createAstro();
const $$Base = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Base;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { ...Astro2.props }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "NavBar", $$NavBar, {})} ${maybeRenderHead()}<main class="container mx-auto px-5 lg:max-w-6xl"> ${renderSlot($$result2, $$slots["default"])} </main> ${renderComponent($$result2, "Footer", $$Footer, {})} `, "head": ($$result2) => renderTemplate`${renderSlot($$result2, $$slots["head"])}` })}`;
}, "/home/ame/Projects/HackatonNasaa/web/src/layouts/Base.astro", void 0);

export { $$Base as $ };
