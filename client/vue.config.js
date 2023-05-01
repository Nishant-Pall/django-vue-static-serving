const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
	transpileDependencies: true,
	publicPath: "/static/src/vue/dist",
	outputDir: path.resolve(__dirname, "../static/src/vue/dist"),
	filenameHashing: false,
	runtimeCompiler: true,
	devServer: {
		devMiddleware: {
			writeToDisk: true,
		},
	},
});
