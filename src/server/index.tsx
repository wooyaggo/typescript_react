import * as Express from 'express';
import * as BodyParser from 'body-parser';

import * as React from 'react';
import { renderToString } from 'react-dom/server';

const app = Express();
app.use( BodyParser.urlencoded( { extended: true } ) );
app.use( BodyParser.json() );
// app.use( "/", Express.static( "./public/html" ) );
app.use( "/js", Express.static( "./public/js" ) );
app.use( "/libs", Express.static( "./public/libs" ) );

app.use( onRequest );

import * as fs from 'fs';

const html = fs.readFileSync( "./public/html/index.html" ).toString();

function onRequest( $req: Express.Request, $res: Express.Response ): void{
	const View = require( "../tsx/view/home" ).default;
	const content = renderToString( <View /> );

	const body = html
					.replace( `{{api}}`, 'home' )
					.replace( `{{root}}`, content )
					.replace( `"{{param}}"`, JSON.stringify( {} ) );

	$res.write( body );
	$res.end();
}

app.listen( 80, ()=>{
	console.log( 'Listening~' );
})