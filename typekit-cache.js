( function (
  // Constants
  document,
  style,
  innerHTML,
  getElementsByTagName,
  // Config
  storage,
  key,
  pattern,
  delay,
  // Vars
  temp,
  next,
  i,
  css
) {

  // If CSS is in cache, append it to <head> in a <style> tag.

  if ( storage[ key ] ) {
    temp = document.createElement( style );
    temp[ innerHTML ] = storage[ key ];
    document[ getElementsByTagName ]( 'head' )[ 0 ].appendChild( temp );
    document.documentElement.className += ' wf-cached';
  }

  // Find and cache the Typekit CSS.

  ( function cache() {

    // Find matching CSS.
    temp = document[ getElementsByTagName ]( style );
    next = '';

    for ( i = 0; i < temp.length; i++ ) {
      css = temp[ i ][ innerHTML ];
      if ( css.match( pattern ) ) {
        next += css;
      }
    }

    // If there's matching CSS, cache it.
    // Prefix cached CSS so it does not match the pattern.
    if ( next ) storage[ key ] = '/**/' + next;

    // Retry using exponential backoff.
    setTimeout( cache, delay += delay );

  } )();

} )(
  // Constants
  document,
  'style',
  'innerHTML',
  'getElementsByTagName',
  // Config
  localStorage,
  'tk',
  /^@font|^\.tk-/,
  100
);
