const { defineConfig } = require("@vue/cli-service");
const BundleTracker = require("webpack-bundle-tracker");

const pages = {
	vue_app_01: {
		entry: "./src/main.js",
		chunks: ["cunk_vendors"],
	},
	vue_app_02: {
		entry: "./src/newhampshir.js",
		chunks: ["cunk_vendors"],
	},
};

module.exports = defineConfig({
	pages: pages,
	filenameHashing: false,
	productionSourceMap: false,
	// use static finder on production, but webpack dev server on local
	publicPath: process.env.NODE_ENV === "production" ? "" : "http://localhost:8080/",
	// location of prod ready js/css, django's static file location
	outputDir: "../mpa/static/vue/",

	chainWebpack: (config) => {
		config.optimization.splitChunks({
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: "chunk-vendors",
					chunks: "all",
					priority: 1,
				},
			},
		});

		Object.keys(pages).forEach((page) => {
			config.plugins.delete(`html-${page}`);
			config.plugins.delete(`preload-${page}`);
			config.plugins.delete(`prefetch-${page}`);
		});

		config.plugin("BundleTracker").use(BundleTracker, [{ filename: "../vue_frontend/webpack-stats.json" }]);

		config.resolve.alias.set("__STATIC__", "static");

		config.devServer
			.public("http://localhost:8080")
			.host("localhost")
			.port(8080)
			.hotOnly(true)
			.watchOptions({ poll: 1000 })
			.https(false)
			.headers({ "Access-Control-Allow-Origin": ["*"] });
	},
});