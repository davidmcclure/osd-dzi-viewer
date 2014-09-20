# OpenSeaDragon, DZI, s3

A little static site generator that makes it possible to serve up an arbitrary number of DZI tile pyramids using OpenSeadragon, without having to monkey around with a server or generate a bunch of redundant HTML files. A Backbone router listens for routes like:

`your.s3.bucket/#image-group/image`

Where `image-group` sits next to the generated `index.html` file, and `image` is a directory inside of `image-group` with an `image.dzi` file and the tile pyramid under `image_files`. So, you might have a directory structure like this on s3:

[fig]

As the user pans and zooms around the image, the viewer updates the route with the current focus and zoom position, which makes it possible to hard-link to specific locations:

`your.s3.bucket/#image-group/image/0.5615/0.4206/8.4324`

Which makes it easy to "quote" specific sections of the image from an external piece of writing, like this. Throw a `target="_new"` attribute onto the anchor tags, and then other links in the text will just switch context back to the existing tab and update the focus location, like this. If a link points to a different image, instead of just a different location in the same image, the router will reinitialize OpenSeadragon with the new tile pyramid and apply the requested focus, like this.

To see it in action, check out the second half of this blog post.

## Generating the viewer

Run `grunt compile:min`, which generates a `_site` directory with `index.html`, `script.js`, `style.css`. Or, just grab the pre-built tarball.
