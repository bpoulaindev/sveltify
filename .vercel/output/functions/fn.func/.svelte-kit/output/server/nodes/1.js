

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.2463e5ba.js","_app/immutable/chunks/scheduler.cd2d310a.js","_app/immutable/chunks/index.bc6dd192.js","_app/immutable/chunks/stores.a927edf3.js","_app/immutable/chunks/singletons.34f67333.js","_app/immutable/chunks/index.b6f5b428.js"];
export const stylesheets = [];
export const fonts = [];
