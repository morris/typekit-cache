(function( document, proto, storage, key, pattern ) {

	if ( !storage ) return;

	var cached = storage[ key ];
	if ( cached ) {

		var style = document.createElement( 'style' );
		style.innerHTML = cached;
		document.getElementsByTagName( 'head' )[0].appendChild( style );

	}

	var setAttribute = proto.setAttribute;
	proto.setAttribute = function( name, url ) {

		if ( this.tagName === 'LINK' && url.match( pattern ) ) {

			var xhr = new XMLHttpRequest();
			xhr.open( 'GET', url, true );
			xhr.onreadystatechange = function() {

				if ( xhr.readyState === 4 ) {

					var css = xhr.responseText;
					if ( css !== cached ) storage[ key ] = css;

				}

			};
			xhr.send( null );

			proto.setAttribute = setAttribute;
			if ( cached ) return;

		}

		setAttribute.apply( this, arguments );

	};

})( document, Element.prototype, localStorage, 'tk', '//use.typekit.net' );
