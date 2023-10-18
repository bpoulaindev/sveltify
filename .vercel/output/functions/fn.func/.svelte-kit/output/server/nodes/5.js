

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/login/callback/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.0a3da941.js","_app/immutable/chunks/scheduler.e427dfb5.js","_app/immutable/chunks/index.51bba90f.js","_app/immutable/chunks/stores.14b5174e.js","_app/immutable/chunks/singletons.4d73db2a.js","_app/immutable/chunks/index.3afa8ada.js","_app/immutable/chunks/dayjs.min.a0a66fd6.js","_app/immutable/chunks/hooks.client.16043796.js"];
export const stylesheets = [];
export const fonts = [];
