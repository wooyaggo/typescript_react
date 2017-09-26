import * as fs from 'fs';
import * as Express from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';

import { Req, Res } from '../';

const htmlList: {[key:string]: string} = {};

function getHTML( $name: string ): string{
	if( htmlList[ $name ] == null ){
		htmlList[ $name ] = fs.readFileSync( `./public/html/${$name}.html` ).toString();
	}

	return htmlList[ $name ];
}

export default function react( $req: Req, $res: Res, $next: Express.NextFunction ): void{
	$res.react = function( $view: string, $param?: any, $html?: string ): void{
		const View = require( `../../tsx/view/${$view}` ).default;
		const content = renderToString( <View {...$param} /> );

		const html = getHTML( $html || 'default' )
						.replace( `{{api}}`, $view )
						.replace( `{{root}}`, content )
						.replace( `"{{param}}"`, JSON.stringify( $param ) );
		
		$res.write( html );
		$res.end();
	}

	$next();
}