import { c as create_ssr_component, v as validate_component, s as subscribe, b as add_attribute, e as escape } from "../../../chunks/ssr.js";
import { u as userProfileStore, t as tokenStore } from "../../../chunks/stores2.js";
import { L as Loader } from "../../../chunks/loader.js";
import "dayjs";
import { I as Icon } from "../../../chunks/Icon.js";
const External_link = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
      }
    ],
    ["polyline", { "points": "15 3 21 3 21 9" }],
    [
      "line",
      {
        "x1": "10",
        "x2": "21",
        "y1": "14",
        "y2": "3"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "external-link" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const ExternalLink = External_link;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $userProfileStore, $$unsubscribe_userProfileStore;
  let $$unsubscribe_tokenStore;
  $$unsubscribe_userProfileStore = subscribe(userProfileStore, (value) => $userProfileStore = value);
  $$unsubscribe_tokenStore = subscribe(tokenStore, (value) => value);
  $$unsubscribe_userProfileStore();
  $$unsubscribe_tokenStore();
  return `<div class="flex w-full flex-col mt-1">${!$userProfileStore ? `<div class="flex flex-col items-center">${validate_component(Loader, "LayeredLoader").$$render($$result, {}, {}, {})}</div>` : ``} ${$userProfileStore ? `<div class="flex items-center w-full justify-center"><div class="flex items-center px-2 h-14 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-800"><img${add_attribute("src", $userProfileStore.images[1].url, 0)} alt="profile" class="rounded-lg w-10 h-10 min-h-10 min-w-10 object-cover bg-center ring-2 ring-indigo-300 dark:ring-slate-700"> <div class="flex flex-col ml-2"><a${add_attribute("href", $userProfileStore.external_urls.spotify, 0)} target="_blank" title="Open Spotify profile" class="group text-2xl flex items-center font-bold dark:text-white hover:text-indigo-500 dark:hover:text-indigo-300 ease-in duration-100">${escape($userProfileStore.display_name)} ${validate_component(ExternalLink, "ExternalLink").$$render($$result, { class: "h-2 w-2 ml-1" }, {}, {})}</a> <div class="flex items-center mt-0.5">${$userProfileStore.product === "premium" ? `<span class="inline-flex capitalize items-center rounded-md bg-purple-50 px-1 py-0.5 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-600/10 dark:ring-2 dark:bg-red-400/10 dark:text-red-400 dark:ring-red-400/20">${escape($userProfileStore.product)}</span>` : `<span class="inline-flex capitalize items-center rounded-md bg-green-50 px-1 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/10 dark:ring-2 dark:bg-green-400/10 dark:text-green-400 dark:ring-green-400/20">${escape($userProfileStore.product)}</span>`} <span class="ml-1 inline-flex capitalize items-center rounded-md bg-slate-50 px-1 py-0.5 text-xs font-medium text-slate-700 ring-1 ring-inset ring-slate-600/10 dark:ring-2 dark:bg-slate-400/10 dark:text-slate-400 dark:ring-slate-400/20">${escape($userProfileStore.country)}</span></div> <h5 class="text-xs mt-1 font-semibold dark:text-slate-500">${escape($userProfileStore.followers.total)}
                        Followers</h5></div></div></div>` : ``}</div>`;
});
export {
  Page as default
};
