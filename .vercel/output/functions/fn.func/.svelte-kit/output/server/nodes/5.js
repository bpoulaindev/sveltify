

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/login/callback/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.2c555086.js","_app/immutable/chunks/scheduler.cd2d310a.js","_app/immutable/chunks/index.bc6dd192.js","_app/immutable/chunks/stores.d3dedfec.js","_app/immutable/chunks/singletons.6080c29f.js","_app/immutable/chunks/index.b6f5b428.js","_app/immutable/chunks/dayjs.min.a35c91f3.js","_app/immutable/chunks/hooks.client.46f5bdbb.js"];
export const stylesheets = [];
export const fonts = [];
