const webpack = require('webpack');
const path = require('path');
const srcPath = path.resolve(__dirname, 'src');

const basePath = __dirname;

module.exports = {
    context: basePath,
    entry: [
        path.resolve(basePath, 'src/Entity.ts'),
        path.resolve(basePath, 'src/Relations.ts'),
        path.resolve(basePath, 'test/test.ts'),
    ],
    output: {
        path: path.resolve(basePath, 'dist/'),
        filename: 'index.js',
    },
    module: {
        rules: [
            // ts-loader: convert typescript (es6) to javascript (es6),
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ["env"]
                        }
                    },
                    {
                        loader: 'ts-loader',
                    }
                ]
            },
            // babel-loader for pure javascript (es6) to javascript (es5)
            {
                test: /\.jsx?$/,
                include: srcPath,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: "es2015"
                    }
                }
            }
        ]
    },
    resolve: {
        // root: [path.resolve('./src')],
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
        // modules: ['node_modules']
    },
};