

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.99d45715.js","_app/immutable/chunks/scheduler.e427dfb5.js","_app/immutable/chunks/index.51bba90f.js","_app/immutable/chunks/stores.14b5174e.js","_app/immutable/chunks/singletons.4d73db2a.js","_app/immutable/chunks/index.3afa8ada.js"];
export const stylesheets = [];
export const fonts = [];
