const path = require("path");
const rimraf = require("rimraf");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const EventHooksPlugin = require("event-hooks-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const git = require("git-rev-sync");

const manifest = require("./package.json");

const webpackPath = path.resolve(__dirname, "dist/webpack");
const releasePath = path.resolve(__dirname, "dist/release");

/**
 * @desc Config
 */
module.exports = function(env = {}, argv = {}) {
    env.mode = argv.mode || env.mode || "production";
    env.lastModified = new Date().toISOString();

    switch (env.mode) {
        case "production":
            env.devtool = "source-map";
            env.outputPath = releasePath;
            break;
        case "development":
            env.devtool = "cheap-module-eval-source-map";
            env.outputPath = webpackPath;
            break;
        case "none":
        default:
            env.devtool = false;
            env.outputPath = webpackPath;
            break;
    }

    console.log(`webpack mode: ${env.mode}, git-commit hash: ${git.short()}`);

    return {
        mode: env.mode,
        entry: {
            "browser-storage": "./src/index.ts"
        },
        devtool: env.devtool,
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: {
                        loader: "ts-loader",
                        options: {
                            compilerOptions: {
                                module: "esnext"
                            }
                        }
                    }
                }
            ]
        },
        output: {
            path: env.outputPath,
            filename: "[name].js",
            libraryTarget: "umd"
        },
        resolve: {
            extensions: [".tsx", ".ts", ".jsx", ".js"]
        },
        plugins: [
            new webpack.ProgressPlugin(),
            new webpack.DefinePlugin({
                __X_METADATA__: JSON.stringify({
                    mode: env.mode,
                    name: manifest.name,
                    version: manifest.version,
                    gitHash: git.short(),
                    lastModified: env.lastModified
                })
            }),
            new EventHooksPlugin({
                environment: function() {
                    rimraf.sync(webpackPath);
                    rimraf.sync(releasePath);
                }
            }),
            new BundleAnalyzerPlugin({
                analyzerMode: env.mode === "production" ? "static" : "disabled",
                openAnalyzer: false
            })
        ],
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    sourceMap: true,
                    extractComments: false,
                    uglifyOptions: {
                        compress: {
                            drop_console: false,
                            drop_debugger: true
                        },
                        output: {
                            /**
                             * @desc escape Unicode characters in strings and regexps
                             *       (affects directives with non-ascii characters becoming invalid)
                             */
                            ascii_only: false
                        }
                    }
                })
            ]
        },
        node: false,
        performance: {
            hints: false
        }
    };
};
