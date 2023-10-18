

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/login/error/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.63f66f0f.js","_app/immutable/chunks/scheduler.e427dfb5.js","_app/immutable/chunks/index.51bba90f.js"];
export const stylesheets = [];
export const fonts = [];
