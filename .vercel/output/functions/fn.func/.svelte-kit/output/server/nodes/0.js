

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.1d965932.js","_app/immutable/chunks/scheduler.cd2d310a.js","_app/immutable/chunks/index.bc6dd192.js","_app/immutable/chunks/hooks.client.46f5bdbb.js","_app/immutable/chunks/index.b6f5b428.js","_app/immutable/chunks/dayjs.min.a35c91f3.js","_app/immutable/chunks/Icon.f4a72c78.js","_app/immutable/chunks/stores.439da365.js","_app/immutable/chunks/singletons.e6de1a6e.js"];
export const stylesheets = ["_app/immutable/assets/0.fdaa5e80.css"];
export const fonts = [];
