( function ( document, proto, storage, key, domain, /* min */ cached, style, setAttribute ) {

	// Check if localStorage exists and actually works without raising an error.
	if ( !storage ) return;

	try {
		storage.setItem(key + "-test", "x");

		if (storage.getItem(key + "-test") != "x")
			return;

		storage.removeItem(key + "-test");
	} catch (e) {
		return;
	}

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

					if ( css !== cached ) storage[ key ] = css;

				}

			};
			xhr.send( null );

			// Reset Element.prototype.setAttribute.
			// If the cache was empty, set the href normally.
			// Otherwise, cancel setting the href.

			proto.setAttribute = setAttribute;
			if ( cached ) return;

		}

		setAttribute.apply( this, arguments );

	};

} )( document, Element.prototype, localStorage, 'tk', 'https://use.typekit.net' );
