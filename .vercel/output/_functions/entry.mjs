import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_BelgrILG.mjs';
import { manifest } from './manifest_4Yt6uINm.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/_actions/_---path_.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/api/nasa/_---route_.astro.mjs');
const _page4 = () => import('./pages/form.astro.mjs');
const _page5 = () => import('./pages/game.astro.mjs');
const _page6 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.14.1_@types+node@24.6.2_@vercel+functions@2.2.13_jiti@2.6.1_lightningcss@1.30.1_ab02463bdb582b9087f130818b9570be/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["node_modules/.pnpm/astro@5.14.1_@types+node@24.6.2_@vercel+functions@2.2.13_jiti@2.6.1_lightningcss@1.30.1_ab02463bdb582b9087f130818b9570be/node_modules/astro/dist/actions/runtime/route.js", _page1],
    ["src/pages/about.astro", _page2],
    ["src/pages/api/nasa/[...route].ts", _page3],
    ["src/pages/form.astro", _page4],
    ["src/pages/game.astro", _page5],
    ["src/pages/index.astro", _page6]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_astro-internal_actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "e6c5f935-4b5a-4d08-a22f-1f396f27dfa5",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
