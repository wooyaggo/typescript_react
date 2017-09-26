import * as Express from 'express';
import * as BodyParser from 'body-parser';

import react from './core/react';

const app = Express();
app.use( BodyParser.urlencoded( { extended: true } ) );
app.use( BodyParser.json() );
app.use( "/js", Express.static( "./public/js" ) );
app.use( "/libs", Express.static( "./public/libs" ) );
app.use( react );

export interface Req extends Express.Request{};
export interface Res extends Express.Response{
	react( $view: string, $param?: any, $html?: string ): void;
};

app.get( "/", ( $req: Req, $res: Res ) => {
	$res.react( "home", {} );
})

app.listen( 80, ()=>{
	console.log( 'Listening~' );
})