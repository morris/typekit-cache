# Typekit Cache

_Revision 14_

**Current Status:** typekit-cache only works for older Typekit installations (using JavaScript). Newer installations use a `<link>` tag; all resources are cached properly by the browser
and served from disk on a revisit. This cannot be further improved so upgrading to the `<link>` embed and removing typekit-cache is recommended.

---

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
  /* contents of typekit-cache.min.js */
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

The regular Typekit behavior is not modified at all.
Exceptions visible in the console (e.g. if the storage is not available) can be safely ignored.
However, you should use separate `<script>` tags to ensure the Typekit embed code is still run if an exception occurs.

In addition to the regular `wf-*` classes, the `wf-cached` class is added to the `<html>` tag on cache hit.

To use `sessionStorage` instead, just replace the `localStorage` reference.

## Contributing

Make sure PRs contain an updated minified version.
Run `npm run prepublish` to build it.

## Contributors

- [Artem Gordinsky](https://github.com/ArtemGordinsky)
- [Dave Garwacke](https://github.com/ifyoumakeit)
- [Michael Baldry](https://github.com/brightbits)
- [Jan Persoons](https://github.com/janpersoons)
- [Tristan Koch](https://github.com/trkoch)
- [Luke Bussey](https://github.com/lukebussey)
- [Viktor Kuliebiakin](https://github.com/kuliebiakin)

Thanks!

[tk]: https://typekit.com/
[tou]: https://fonts.adobe.com/
[min]: https://raw.githubusercontent.com/morris/typekit-cache/master/typekit-cache.min.js
