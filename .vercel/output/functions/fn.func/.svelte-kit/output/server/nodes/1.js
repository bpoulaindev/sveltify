

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.a0ab0680.js","_app/immutable/chunks/scheduler.cd2d310a.js","_app/immutable/chunks/index.bc6dd192.js","_app/immutable/chunks/stores.439da365.js","_app/immutable/chunks/singletons.e6de1a6e.js","_app/immutable/chunks/index.b6f5b428.js"];
export const stylesheets = [];
export const fonts = [];
