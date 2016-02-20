try {

	( function ( document, proto, storage, key, domain, /* min */ cached, style, setAttribute ) {

		// Do nothing if localStorage is not available

		if ( !storage ) return;

		// If CSS is in cache, append it to <head> in a <style> tag.

		cached = storage[ key ];
		if ( cached ) {
			style = document.createElement( 'style' );
			style.innerHTML = cached;
			document.getElementsByTagName( 'head' )[ 0 ].appendChild( style );
		}

		// The typekit will at some point create a <link> to load its CSS.
		// Override Element.prototype.setAttribute to handle setting its href.

		setAttribute = proto.setAttribute;
		proto.setAttribute = function ( name, url, /* min */ xhr, css ) {

			if ( typeof url === 'string' && url.indexOf( domain ) > -1 ) {

				// Get the CSS of the URL via XHR and cache it.
				// Only overwrite cache if CSS has changed.

				xhr = new XMLHttpRequest();
				xhr.open( 'GET', url, true );
				xhr.onreadystatechange = function () {

					if ( xhr.readyState === 4 ) {

						// Make relative URLs absolute. Fixes #2
						css = xhr.responseText.replace( /url\(\//g, 'url(' + domain + '/' );

						try {

							if ( css !== cached ) storage[ key ] = css;

						} catch ( ex ) {

							// Quota exceeded, fall back to regular behavior. Fixes #3
							if ( cached ) cached = style.innerHTML = '';

						}

					}

				};
				xhr.send( null );

				// Reset Element.prototype.setAttribute.
				// Continue setting the href, browsers will cache the second request

				proto.setAttribute = setAttribute;

			}

			setAttribute.apply( this, arguments );

		};

	} )( document, Element.prototype, localStorage, 'tk', 'https://use.typekit.net' );

} catch ( x ) {

	// Support Chrome
	// Ignore errors caused by referencing localStorage

}
