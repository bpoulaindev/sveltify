

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.d62e5999.js","_app/immutable/chunks/scheduler.cd2d310a.js","_app/immutable/chunks/index.bc6dd192.js","_app/immutable/chunks/stores.d3dedfec.js","_app/immutable/chunks/singletons.6080c29f.js","_app/immutable/chunks/index.b6f5b428.js"];
export const stylesheets = [];
export const fonts = [];
