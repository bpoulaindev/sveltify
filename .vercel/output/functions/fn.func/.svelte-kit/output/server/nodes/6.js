

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/login/error/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.f6763bee.js","_app/immutable/chunks/scheduler.cd2d310a.js","_app/immutable/chunks/index.bc6dd192.js"];
export const stylesheets = [];
export const fonts = [];
