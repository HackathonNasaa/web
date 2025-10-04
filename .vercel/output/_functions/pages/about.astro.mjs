import { c as createComponent, a as renderComponent, b as renderTemplate } from '../chunks/astro/server_C0kEAT-t.mjs';
import { $ as $$Base } from '../chunks/Base_B6BLnsGj.mjs';
export { renderers } from '../renderers.mjs';

const $$About = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": "About" }, { "default": ($$result2) => renderTemplate` hi ` })}`;
}, "/home/ame/Projects/HackatonNasaa/web/src/pages/about.astro", void 0);

const $$file = "/home/ame/Projects/HackatonNasaa/web/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$About,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
