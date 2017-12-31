const webpack = require("webpack")
const path = require("path")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const FaviconsWebpackPlugin = require("favicons-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const HtmlWebpackIncludeAssetsPlugin = require("html-webpack-include-assets-plugin")
const AddAssetsToJSON = require("add-assets-to-json-webpack-plugin")
const GenerateJsonPlugin = require("generate-json-webpack-plugin")
const crypto = require("crypto")
const generateHash = () => {
	const md5sum = crypto.createHash("md5")
	md5sum.update(new Date().toISOString())
	return md5sum.digest("hex")
}

const appConfig = {
	entry: {
		app: "./src/index.js"
	},
	output: {
		path: path.join(__dirname, "public/"),
		filename: "assets/js/[name].min.js"
	},

	resolve: {
		extensions: [".js", "css"]
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			}
		]
	},

	plugins: [
		new CleanWebpackPlugin(["public"]),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development"),
				SW_PATH: JSON.stringify("sw.js")
			}
		}),
		new FaviconsWebpackPlugin({
			logo: "./assets/favicon.png",
			prefix: "assets/icons/",
			title: "Awesome Pokedex"
		}),
		new CopyWebpackPlugin([
			{
				from: "node_modules/mdi/css/materialdesignicons.min.css",
				to: "assets/css/"
			},
			{
				from: "node_modules/mdi/fonts/",
				to: "assets/fonts/"
			},
			{
				from: "src/sw.js",
				to: "."
			}
		]),
		new HtmlWebpackPlugin({
			template: "assets/index.html",
			excludeChunks: ["sw"]
		}),
		new HtmlWebpackIncludeAssetsPlugin({
			assets: ["assets/css/materialdesignicons.min.css"],
			append: false
		}),
		new AddAssetsToJSON({
			path: path.resolve(__dirname, "public")
		}),
		new GenerateJsonPlugin("sw.json", {
			IMAGES_CACHE_NAME: "images-content-cache",
			CACHE_NAME: `cache-${generateHash()}`,
			ASSETS_JSON_PATH: "assets.json",
			DEFAULT_ASSETS: [
				"/",
				"https://fonts.googleapis.com/css?family=VT323",
				"https://fonts.gstatic.com/s/vt323/v9/lo_L7yCDHYN9FAxvMCI1vQ.woff2"
			],
			CACHE_IGNORED: [
				"sw.js",
				"sw.json",
				"assets.json",
				"assets/icons/.cache",
				"index.html"
			],
			IMAGES_PREFIX:
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"
		})
	],
	devServer: {
		contentBase: path.resolve(__dirname, "./public"),
		historyApiFallback: true,
		inline: true,
		open: true
	}
}

if (process.env.NODE_ENV === "production") {
	appConfig.plugins.push(new UglifyJsPlugin())
} else {
	appConfig.devtool = "eval-source-map"
}

module.exports = appConfig
