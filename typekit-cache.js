( function (
	// constants
	document,
	className,
	innerHTML,
	getElementsByTagName,
	style,
	// config
	storage,
	key,
	pattern,
	// min
	cached,
	el,
	els,
	i,
	css ) {

	// If CSS is in cache, append it to <head> in a <style> tag.

	cached = storage[ key ];
	if ( cached ) {
		el = document.createElement( style );
		el[ innerHTML ] = cached;
		el[ key ] = 1;
		document[ getElementsByTagName ]( 'head' )[ 0 ].appendChild( el );
		document.documentElement[ className ] += ' wf-cached';
	}

	storage[ key ] = '';

	( function check() {

		els = document[ getElementsByTagName ]( style );

		for ( i = 0; i < els.length; i++ ) {
			el = els[ i ];
			css = el[ innerHTML ];
			if ( el[ key ] != 1 && css.match( pattern ) ) {
				storage[ key ] += css;
				el[ key ] = 1;
			}
		}

		setTimeout( check, 100 );

	} )();

} )(
	// constants
	document,
	'className',
	'innerHTML',
	'getElementsByTagName',
	'style',
	// config
	localStorage,
	'tk',
	/\.tk-|\.typekit\.net/
);
