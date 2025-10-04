import { c as createComponent, a as renderComponent, b as renderTemplate } from '../chunks/astro/server_C0kEAT-t.mjs';
import { $ as $$Base } from '../chunks/Base_B6BLnsGj.mjs';
export { renderers } from '../renderers.mjs';

const $$Game = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": "Game" }, { "default": ($$result2) => renderTemplate`
hi
` })}`;
}, "/home/ame/Projects/HackatonNasaa/web/src/pages/game.astro", void 0);

const $$file = "/home/ame/Projects/HackatonNasaa/web/src/pages/game.astro";
const $$url = "/game";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Game,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
