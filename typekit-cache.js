( function ( document, proto, method, storage, key, domain, /* min */ cached, style, setAttribute ) {

	// If CSS is in cache, append it to <head> in a <style> tag.

	cached = storage[ key ];
	if ( cached ) {
		style = document.createElement( 'style' );
		style.innerHTML = cached;
		document.getElementsByTagName( 'head' )[ 0 ].appendChild( style );
		document.documentElement.className += ' wf-cached';
	}

	// The typekit will at some point create a <link> to load its CSS.
	// Override Element.prototype.setAttribute to handle setting its href.

	setAttribute = proto[ method ];
	proto[ method ] = function ( name, url, /* min */ xhr, css ) {

		if ( typeof url == 'string' && url.indexOf( domain ) > -1 ) {

			try {

				// Get the CSS of the URL via XHR and cache it.
				// Only overwrite cache if CSS has changed.

				xhr = new XMLHttpRequest();
				xhr.open( 'GET', url, true );
				xhr.onreadystatechange = function () {

					try {

						if ( xhr.readyState == 4 ) {

							// Make relative URLs absolute. Fixes #2
							css = xhr.responseText.replace( /url\(\//g, 'url(' + domain + '/' );

							// Store new CSS if modified.
							if ( css !== cached ) storage[ key ] = css;

						}

					} catch ( x ) {

						// Fall back to regular behavior. Fixes #3
						if ( style ) style.innerHTML = '';

					}

				};
				xhr.send( null );

			} catch ( x ) {

				// The only possible side effect here is an empty <style> element.

			}

			// Reset Element.prototype.setAttribute
			proto[ method ] = setAttribute;

		}

		// Always apply original setAttribute
		return setAttribute.apply( this, arguments );

	};

} )( document, Element.prototype, 'setAttribute', localStorage, 'tk', 'https://use.typekit.net' );
