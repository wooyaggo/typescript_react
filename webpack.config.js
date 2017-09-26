const Webpack = require( "webpack" );

const path = require( 'path' );
const fs = require( 'fs' );

const entries = {};

const SCRIPT = `import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from '../view/{{api}}';

declare global{
	interface Window{
		param: any;
	}
}

ReactDOM.render( <App {...window.param}/>, document.getElementById( 'root' ) );`

const VIEW_DIR = "./src/tsx/view/";
const GEN_DIR = "./src/tsx/.gen/";
const views = fs.readdirSync( VIEW_DIR );
views.forEach( $view => {
	const name = path.parse( $view ).name;
	const scripts = SCRIPT.replace( '{{api}}', name );

	if( fs.existsSync( GEN_DIR ) == false ){
		fs.mkdirSync( GEN_DIR );
	}

	fs.writeFileSync( path.resolve( GEN_DIR, name + '.tsx' ), scripts );

	entries[ name ] = path.resolve( GEN_DIR, name + '.tsx' );
})

module.exports = {
	entry: entries,
	output: {
		filename: "[name].js",
		path: __dirname + "/public/js"
	},
	devtool: "source-map",
	resolve: {
		extensions: [ ".tsx" ]
	}, 
	plugins: [
		new Webpack.optimize.CommonsChunkPlugin( "default" ),
	],
	module: {
		rules: [
			{
				test: /\.tsx$/,
				loaders: [
					'babel-loader?presets[]=es2015',
					'awesome-typescript-loader',
				],
				exclude: [/\.(spec|e2e|d)\.ts$/]
			}
		]
	},
	// watch: true,
	watchOptions:{
		ignored: "tsx/.gen",
	},
	externals: {
		"react": "React",
		"react-dom": "ReactDOM"
	}
}