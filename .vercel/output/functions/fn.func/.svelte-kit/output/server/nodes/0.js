

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.eace6fc2.js","_app/immutable/chunks/scheduler.e427dfb5.js","_app/immutable/chunks/index.51bba90f.js","_app/immutable/chunks/hooks.client.16043796.js","_app/immutable/chunks/index.3afa8ada.js","_app/immutable/chunks/dayjs.min.a0a66fd6.js","_app/immutable/chunks/Icon.429f2b39.js","_app/immutable/chunks/stores.14b5174e.js","_app/immutable/chunks/singletons.4d73db2a.js"];
export const stylesheets = ["_app/immutable/assets/0.033dc64a.css"];
export const fonts = ["_app/immutable/assets/Supreme-Variable.89d26fcd.ttf"];
