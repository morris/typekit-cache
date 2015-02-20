# Typekit Cache

Keeps a site's [Typekit][tk] in localStorage and injects it on page load.
Completely eliminates the dreaded Flash Of Invisible/Unstyled Text
and provides better UX for slow or offline connections.

The same requests are sent as in loading a Typekit regularly, and the Typekit embed code is unaltered.
However, using this script may still violate the [Typekit Terms Of Use][tou].


## Usage

Copy the contents of [typekit-cache.min.js][min] right before your Typekit (advanced) embed code.
That's it, your website should be caching your Typekit happily.

```html
<script>
	!function(e,t,n,a,s,o,r,u){ // ...
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
Please contribute issues and PRs if you find any quirks.

Check the unminified, commented `typekit-cache.js` for more information.

Typekits may be quite large, and the performance impact of injecting
them as inline stylesheets is not well tested.

The minified version is built using `uglifyjs typekit-cache.js -o typekit-cache.min.js --compress --mangle`.


[tk]: https://typekit.com/
[tou]: http://www.adobe.com/products/eulas/tou_typekit/
[min]: https://raw.githubusercontent.com/morris/typekit-cache/master/typekit-cache.min.js
