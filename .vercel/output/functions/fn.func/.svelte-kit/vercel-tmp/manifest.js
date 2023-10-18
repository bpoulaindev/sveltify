export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["logo.png","logo.svg","logo_nobg.svg","logo_nobg_light.svg","manifest.json","service-worker.js"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml",".json":"application/json"},
	_: {
		client: {"start":"_app/immutable/entry/start.8094a777.js","app":"_app/immutable/entry/app.c0f2b794.js","imports":["_app/immutable/entry/start.8094a777.js","_app/immutable/chunks/scheduler.e427dfb5.js","_app/immutable/chunks/singletons.4d73db2a.js","_app/immutable/chunks/index.3afa8ada.js","_app/immutable/entry/app.c0f2b794.js","_app/immutable/chunks/dayjs.min.a0a66fd6.js","_app/immutable/chunks/scheduler.e427dfb5.js","_app/immutable/chunks/index.51bba90f.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js')),
			__memo(() => import('../output/server/nodes/3.js')),
			__memo(() => import('../output/server/nodes/4.js')),
			__memo(() => import('../output/server/nodes/5.js')),
			__memo(() => import('../output/server/nodes/6.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/spotify/artists",
				pattern: /^\/api\/spotify\/artists\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/spotify/artists/_server.ts.js'))
			},
			{
				id: "/api/spotify/likes",
				pattern: /^\/api\/spotify\/likes\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/spotify/likes/_server.ts.js'))
			},
			{
				id: "/api/spotify/playback/queue",
				pattern: /^\/api\/spotify\/playback\/queue\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/spotify/playback/queue/_server.ts.js'))
			},
			{
				id: "/api/spotify/playback/seek",
				pattern: /^\/api\/spotify\/playback\/seek\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/spotify/playback/seek/_server.ts.js'))
			},
			{
				id: "/api/spotify/playback/shuffle",
				pattern: /^\/api\/spotify\/playback\/shuffle\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/spotify/playback/shuffle/_server.ts.js'))
			},
			{
				id: "/api/spotify/playback/transfer",
				pattern: /^\/api\/spotify\/playback\/transfer\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/spotify/playback/transfer/_server.ts.js'))
			},
			{
				id: "/api/spotify/profile",
				pattern: /^\/api\/spotify\/profile\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/spotify/profile/_server.ts.js'))
			},
			{
				id: "/api/spotify/refresh",
				pattern: /^\/api\/spotify\/refresh\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/spotify/refresh/_server.ts.js'))
			},
			{
				id: "/api/spotify/tracks",
				pattern: /^\/api\/spotify\/tracks\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/spotify/tracks/_server.ts.js'))
			},
			{
				id: "/home",
				pattern: /^\/home\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: __memo(() => import('../output/server/entries/endpoints/home/_server.ts.js'))
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/login/callback",
				pattern: /^\/login\/callback\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: __memo(() => import('../output/server/entries/endpoints/login/callback/_server.ts.js'))
			},
			{
				id: "/login/error",
				pattern: /^\/login\/error\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
