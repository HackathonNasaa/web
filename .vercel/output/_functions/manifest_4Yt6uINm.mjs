import { w as decodeKey } from './chunks/astro/server_C0kEAT-t.mjs';
import './chunks/astro-designed-error-pages_DX22LGC9.mjs';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/noop-middleware_CSDXq2BT.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///home/ame/Projects/HackatonNasaa/web/","cacheDir":"file:///home/ame/Projects/HackatonNasaa/web/node_modules/.astro/","outDir":"file:///home/ame/Projects/HackatonNasaa/web/dist/","srcDir":"file:///home/ame/Projects/HackatonNasaa/web/src/","publicDir":"file:///home/ame/Projects/HackatonNasaa/web/public/","buildClientDir":"file:///home/ame/Projects/HackatonNasaa/web/dist/client/","buildServerDir":"file:///home/ame/Projects/HackatonNasaa/web/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.VIllvXJD.js"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@5.14.1_@types+node@24.6.2_@vercel+functions@2.2.13_jiti@2.6.1_lightningcss@1.30.1_ab02463bdb582b9087f130818b9570be/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.VIllvXJD.js"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_actions/[...path]","pattern":"^\\/_actions(?:\\/(.*?))?\\/?$","segments":[[{"content":"_actions","dynamic":false,"spread":false}],[{"content":"...path","dynamic":true,"spread":true}]],"params":["...path"],"component":"node_modules/.pnpm/astro@5.14.1_@types+node@24.6.2_@vercel+functions@2.2.13_jiti@2.6.1_lightningcss@1.30.1_ab02463bdb582b9087f130818b9570be/node_modules/astro/dist/actions/runtime/route.js","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.VIllvXJD.js"}],"styles":[{"type":"external","src":"/_astro/about.bzByhJ_V.css"}],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.VIllvXJD.js"}],"styles":[],"routeData":{"route":"/api/nasa/[...route]","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/nasa(?:\\/(.*?))?\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"nasa","dynamic":false,"spread":false}],[{"content":"...route","dynamic":true,"spread":true}]],"params":["...route"],"component":"src/pages/api/nasa/[...route].ts","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.VIllvXJD.js"}],"styles":[],"routeData":{"route":"/form","isIndex":false,"type":"page","pattern":"^\\/form\\/?$","segments":[[{"content":"form","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/form.astro","pathname":"/form","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.VIllvXJD.js"}],"styles":[{"type":"external","src":"/_astro/about.bzByhJ_V.css"}],"routeData":{"route":"/game","isIndex":false,"type":"page","pattern":"^\\/game\\/?$","segments":[[{"content":"game","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/game.astro","pathname":"/game","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.VIllvXJD.js"}],"styles":[{"type":"inline","content":"h1[data-astro-cid-j7pv25f6],h2[data-astro-cid-j7pv25f6]{font-family:var(--font-title)}\n"},{"type":"external","src":"/_astro/about.bzByhJ_V.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/ame/Projects/HackatonNasaa/web/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/home/ame/Projects/HackatonNasaa/web/src/pages/game.astro",{"propagation":"none","containsHead":true}],["/home/ame/Projects/HackatonNasaa/web/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000astro-internal:actions":"_astro-internal_actions.mjs","\u0000@astro-page:node_modules/.pnpm/astro@5.14.1_@types+node@24.6.2_@vercel+functions@2.2.13_jiti@2.6.1_lightningcss@1.30.1_ab02463bdb582b9087f130818b9570be/node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:node_modules/.pnpm/astro@5.14.1_@types+node@24.6.2_@vercel+functions@2.2.13_jiti@2.6.1_lightningcss@1.30.1_ab02463bdb582b9087f130818b9570be/node_modules/astro/dist/actions/runtime/route@_@js":"pages/_actions/_---path_.astro.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/api/nasa/[...route]@_@ts":"pages/api/nasa/_---route_.astro.mjs","\u0000@astro-page:src/pages/form@_@astro":"pages/form.astro.mjs","\u0000@astro-page:src/pages/game@_@astro":"pages/game.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_4Yt6uINm.mjs","/home/ame/Projects/HackatonNasaa/web/node_modules/.pnpm/astro@5.14.1_@types+node@24.6.2_@vercel+functions@2.2.13_jiti@2.6.1_lightningcss@1.30.1_ab02463bdb582b9087f130818b9570be/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_BlTRCrMk.mjs","/home/ame/Projects/HackatonNasaa/web/node_modules/.pnpm/astro@5.14.1_@types+node@24.6.2_@vercel+functions@2.2.13_jiti@2.6.1_lightningcss@1.30.1_ab02463bdb582b9087f130818b9570be/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts":"_astro/ClientRouter.astro_astro_type_script_index_0_lang.7vq8zEUA.js","astro:scripts/page.js":"_astro/page.VIllvXJD.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/asteroide.BYXdvL5q.svg","/_astro/about.bzByhJ_V.css","/favicon.svg","/_astro/ClientRouter.astro_astro_type_script_index_0_lang.7vq8zEUA.js","/_astro/index.Bxr0XgtK.js","/_astro/page.VIllvXJD.js","/_astro/fonts/196de0bff6a5f63c.woff2","/_astro/fonts/19b3b76926f223e8.woff2","/_astro/fonts/4d4f69c248daf726.woff2","/_astro/fonts/508280f371c812d4.woff2","/_astro/fonts/50c8417ec683ca96.woff2","/_astro/fonts/5abd0d1729536a3d.woff2","/_astro/fonts/5f16e8ffe3a544f4.woff2","/_astro/fonts/752b785ba8633cf9.woff2","/_astro/fonts/7804fcd0ead9b7d4.woff2","/_astro/fonts/856b2ff97b3b3fc0.woff2","/_astro/fonts/8df825aa43c27672.woff2","/_astro/fonts/922a57971e1dc9f8.woff2","/_astro/fonts/97069eb0e5541a63.woff2","/_astro/fonts/a0543c80af105047.woff2","/_astro/fonts/a84bf7cd56bb4fe3.woff2","/_astro/fonts/b5571537bdc0ec9c.woff2","/_astro/fonts/b8404b01ab0ba104.woff2","/_astro/fonts/c8df919587affba5.woff2","/_astro/fonts/c9d28ed5d4e9d913.woff2","/_astro/fonts/cd7f23e77cccbbc5.woff2","/_astro/fonts/d60bea61adfe175e.woff2","/_astro/fonts/de64f3e9553864a4.woff2","/_astro/fonts/e4facf85575a217e.woff2","/_astro/fonts/f566106b79007ac7.woff2","/_astro/fonts/f6ae29ee416a3b89.woff2","/_astro/fonts/f7163a1e4244037e.woff2","/_astro/page.VIllvXJD.js"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"KAMQT06HGBZQdggeMIbGpoQhcVal4masmK8TjPTbjr8="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
