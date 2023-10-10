import { c as create_ssr_component, v as validate_component } from "./ssr.js";
import { I as Icon } from "./Icon.js";
const Loader_2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "M21 12a9 9 0 1 1-6.219-8.56" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "loader-2" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Loader2 = Loader_2;
const Loader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="mt-4 relative h-20 w-20"><div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">${validate_component(Loader2, "Loader2").$$render(
    $$result,
    {
      class: "w-14 h-14 dark:text-gray-200 text-dark-800 animate-spin-3 stroke-1"
    },
    {},
    {}
  )}</div> <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">${validate_component(Loader2, "Loader2").$$render(
    $$result,
    {
      class: "w-10 h-10 dark:text-gray-200 text-dark-800 animate-spin-2 stroke-[1.5px]"
    },
    {},
    {}
  )}</div> <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">${validate_component(Loader2, "Loader2").$$render(
    $$result,
    {
      class: "w-6 h-6 dark:text-gray-200 text-dark-800 animate-spin-1 stroke-2"
    },
    {},
    {}
  )}</div></div>`;
});
export {
  Loader as L
};
