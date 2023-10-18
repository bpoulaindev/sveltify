

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.1cc02107.js","_app/immutable/chunks/scheduler.e427dfb5.js","_app/immutable/chunks/index.51bba90f.js","_app/immutable/chunks/hooks.client.16043796.js","_app/immutable/chunks/index.3afa8ada.js","_app/immutable/chunks/dayjs.min.a0a66fd6.js","_app/immutable/chunks/Icon.429f2b39.js"];
export const stylesheets = [];
export const fonts = [];
