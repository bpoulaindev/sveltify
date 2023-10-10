import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
import "dayjs";
import { L as Loader } from "../../../chunks/loader.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="w-full h-full flex items-center justify-center">${validate_component(Loader, "LayeredLoader").$$render($$result, {}, {}, {})}</div>`;
});
export {
  Page as default
};
