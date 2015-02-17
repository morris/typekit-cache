# Typekit Cache

When on a slow connection or offline, [Typekits](https://typekit.com/)
might still [FOUT](http://help.typekit.com/customer/portal/articles/6852-Controlling-the-Flash-of-Unstyled-Text-or-FOUT-using-Font-Events),
or fail to load, even if the font was already downloaded before.
This is bad UX, especially on mobile browsers.

This script completely eliminates the (secondary) FOUT.
It caches the Typekit CSS in localStorage or sessionStorage,
while still trying to request the entire Typekit afterwards.

__Note hat using this script may violate the [Typekit Terms Of Use](http://www.adobe.com/products/eulas/tou_typekit/).
Use at your own risk, you have been warned.
See license for more disclaimers.__

## Usage

Copy the contents of __[typekit-cache.min.js](https://raw.githubusercontent.com/morris/typekit-cache/master/typekit-cache.min.js)__ right before your Typekit (advanced) embed code.
That's it, your website should be caching your Typekit happily.

## Notes

Check the `typekit-cache.js` source for customization.
For example, you could swap `sessionStorage` for `localStorage`.

You *could* cancel loading the entire Typekit if you find that fonts are in the cache,
but that seems to violate Typekit's Terms Of Use clearly.

This script instead only disables the Typekit `<link>` and gets the CSS via XHR,
and then includes it as an inline stylesheet.
The requests made are the same as if loading the Typekit entirely.
Also, the Typekit embed code is not altered.

Typekits may be quite large, and the performance impact of including
them as inline stylesheets is not yet tested.

The minified version is built using `uglifyjs typekit-cache.js -o typekit-cache.min-js --compress --mangle`.
