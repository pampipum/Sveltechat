export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.451fec41.js","imports":["_app/immutable/entry/start.451fec41.js","_app/immutable/chunks/index.2ee51f7d.js","_app/immutable/chunks/singletons.44154438.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.b67055f9.js","imports":["_app/immutable/entry/app.b67055f9.js","_app/immutable/chunks/index.2ee51f7d.js"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('../output/server/nodes/0.js'),
			() => import('../output/server/nodes/1.js'),
			() => import('../output/server/nodes/2.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
