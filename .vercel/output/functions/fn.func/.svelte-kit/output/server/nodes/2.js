

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.b60c50ca.js","_app/immutable/chunks/scheduler.cd2d310a.js","_app/immutable/chunks/index.bc6dd192.js","_app/immutable/chunks/hooks.client.4ad73e98.js","_app/immutable/chunks/index.b6f5b428.js","_app/immutable/chunks/dayjs.min.5433e12a.js","_app/immutable/chunks/Icon.f4a72c78.js"];
export const stylesheets = [];
export const fonts = [];
