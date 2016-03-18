# Typekit Cache

Keeps a site's [Typekit][tk] in `localStorage` and injects it on page load.
Eliminates the annoying Flash Of Invisible/Unstyled Text (FOUT) and provides
better UX for slow or offline connections.

The same requests are sent as in loading a Typekit regularly, and the Typekit embed code is unaltered.
However, using this script may still violate the [Typekit Terms Of Use][tou].


## Usage

Copy the contents of [typekit-cache.min.js][min] right before your Typekit (advanced) embed code.
That's it, your website should be caching your Typekit happily.

```html
<script>
	try{!function(t,e,n,r,a,s,i,l) // ...
</script>
<script>
	(function(d) {
		var config = {
			kitId: 'abcd1234',
			scriptTimeout: 3000
		},
		h=d.documentElement, // ...
	})(document);
</script>
```

## Notes

Works in recent Firefox, Chrome, Safari, and IE.
Please contribute issues and pull requests if you find any quirks.
Check `typekit-cache.js` for more information.

Quota errors in `localStorage` are silently ignored.
The quota is set to 0 in Safari Privat Mode so Typekits will not be cached.

Typekits may be quite large, and the performance impact of injecting
them as inline stylesheets is not well tested.

FOUC can still occur on first page load. You can choose to hide text while the
font is being loaded. A good option is to hide text when `wf-active`,
`wf-inactive` or `wf-cached` classes are missing on the `<html>` element.

```css
html:not(.wf-active):not(.wf-inactive):not(.wf-cached) * {
  /* Hide text */
}
```

## Contributing

The minified version is built using uglifyjs which is installed as a local dependency. To install and build run the following commands:

```
$ npm install
$ npm run prepublish
```

## Contributors

- [Artem Gordinsky](https://github.com/ArtemGordinsky)
- [Dave Garwacke](https://github.com/ifyoumakeit)
- [Michael Baldry](https://github.com/brightbits)
- [Jan Persoons](https://github.com/janpersoons)
- [Tristan Koch](https://github.com/trkoch)
- [Luke Bussey](https://github.com/lukebussey)

Thanks!

[tk]: https://typekit.com/
[tou]: http://www.adobe.com/products/eulas/tou_typekit/
[min]: https://raw.githubusercontent.com/morris/typekit-cache/master/typekit-cache.min.js
