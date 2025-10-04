import { f as fetchFromNasa } from '../../../chunks/nasa_BTXFcydh.mjs';
export { renderers } from '../../../renderers.mjs';

const headers = new Headers();
headers.append("content-type", "application/json");
const GET = async ({ params, request }) => {
  const userParams = new URL(request.url).searchParams;
  const route = params.route?.trim() ?? "";
  const content = await fetchFromNasa(route, userParams);
  return new Response(content, {
    status: 200,
    headers
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
