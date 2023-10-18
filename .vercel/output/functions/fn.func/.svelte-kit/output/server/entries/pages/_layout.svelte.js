import { c as create_ssr_component, v as validate_component, s as subscribe, k as add_attribute } from "../../chunks/ssr.js";
import { d as darkMode } from "../../chunks/hooks.client.js";
import { I as Icon } from "../../chunks/Icon.js";
import { p as page } from "../../chunks/stores.js";
import { t as tokenStore } from "../../chunks/stores2.js";
import "dayjs";
const app = "";
const Moon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "moon" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Moon$1 = Moon;
const Sun_dim = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["circle", { "cx": "12", "cy": "12", "r": "4" }],
    ["path", { "d": "M12 4h.01" }],
    ["path", { "d": "M20 12h.01" }],
    ["path", { "d": "M12 20h.01" }],
    ["path", { "d": "M4 12h.01" }],
    ["path", { "d": "M17.657 6.343h.01" }],
    ["path", { "d": "M17.657 17.657h.01" }],
    ["path", { "d": "M6.343 17.657h.01" }],
    ["path", { "d": "M6.343 6.343h.01" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "sun-dim" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const SunDim = Sun_dim;
const User_circle_2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["path", { "d": "M18 20a6 6 0 0 0-12 0" }],
    ["circle", { "cx": "12", "cy": "10", "r": "4" }],
    ["circle", { "cx": "12", "cy": "12", "r": "10" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "user-circle-2" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const UserCircle2 = User_circle_2;
const Theme_switch = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $darkMode, $$unsubscribe_darkMode;
  $$unsubscribe_darkMode = subscribe(darkMode, (value) => $darkMode = value);
  $$unsubscribe_darkMode();
  return `<button type="button"${add_attribute(
    "class",
    `${$darkMode ? "bg-zinc-900 ring-zinc-700 hover:bg-zinc-950" : "bg-zinc-200/80 ring-zinc-300 hover:bg-white"} group relative inline-flex max-h-3.5 h-3.5 w-6.5 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ring-1 focus:ring-2 dark:focus:ring-zinc-700 focus:ring-zinc-300 focus:ring-offset-0`,
    0
  )} role="switch" aria-checked="false"><span class="sr-only" data-svelte-h="svelte-t5dycu">Use setting</span>  <span${add_attribute("class", `${$darkMode ? "translate-x-3" : "translate-x-0"} pointer-events-none relative inline-block h-3 w-3 transform rounded-full ring-0 transition duration-200 ease-in-out`, 0)}> ${validate_component(Moon$1, "Moon").$$render(
    $$result,
    {
      class: `${$darkMode ? "opacity-100 duration-200 ease-in" : "opacity-0 duration-100 ease-out"} absolute inset-0 flex h-full w-full items-center justify-center transition-opacity text-zinc-300 rounded-full p-0.25 bg-zinc-950`
    },
    {},
    {}
  )} ${validate_component(SunDim, "SunDim").$$render(
    $$result,
    {
      class: `${$darkMode ? "opacity-0 duration-100 ease-out" : "opacity-100 duration-200 ease-in"} absolute inset-0 flex h-full w-full items-center justify-center transition-opacity text-zinc-600 rounded-full p-0.25 bg-white`
    },
    {},
    {}
  )} </span></button>`;
});
const logo = "/_app/immutable/assets/logo_nobg.bdbf221b.svg";
const lightLogo = "/_app/immutable/assets/logo_nobg_light.64523f67.svg";
const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  let $$unsubscribe_tokenStore;
  let $darkMode, $$unsubscribe_darkMode;
  $$unsubscribe_page = subscribe(page, (value) => value);
  $$unsubscribe_tokenStore = subscribe(tokenStore, (value) => value);
  $$unsubscribe_darkMode = subscribe(darkMode, (value) => $darkMode = value);
  $$unsubscribe_page();
  $$unsubscribe_tokenStore();
  $$unsubscribe_darkMode();
  return `<nav class="flex rounded-2xl bg-white border-2 border-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 max-w-auto px-2 py-1 m-2"><div class="flex w-full items-center"><a class="flex items-center grow" href="/"><img${add_attribute("src", $darkMode ? logo : lightLogo, 0)} alt="logo" class="w-3.5 h-3.5"> <span class="text-2xl font-medium text-zinc-950 dark:text-white -ml-0.5 font-supreme" data-svelte-h="svelte-rbmxlw">veltify</span></a> <button type="button" class="w-fit h-fit rounded-full p-0.5 mr-1 hover:bg-zinc-100 dark:hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">${validate_component(UserCircle2, "UserCircle2").$$render(
    $$result,
    {
      class: "text-zinc-950 dark:text-zinc-200 stroke-[1.5px] h-3 w-3"
    },
    {},
    {}
  )}</button> ${validate_component(Theme_switch, "ThemeSwitch").$$render($$result, {}, {}, {})}</div></nav>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="flex flex-col w-[calc(100dvw)] relative z-0 max-w-[calc(100dvw)] min-h-[calc(100dvh)] max-h-[calc(100dvh)] overflow-hidden bg-zinc-100 dark:bg-zinc-950 transition-colors ease-linear duration-150"> ${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})} <div class="flex flex-col w-full px-2 pb-2">${slots.default ? slots.default({}) : ``}</div></div>`;
});
export {
  Layout as default
};
