# OpenSeaDragon / DZI Viewer

This is an itty-bitty static site generator that makes it possible to serve up an arbitrary number of [DZI](http://en.wikipedia.org/wiki/Deep_Zoom) tile pyramids using [OpenSeadragon](http://openseadragon.github.io), without having to monkey around with a server or hand-code a bunch of redundant HTML files. A Backbone router listens for routes like:

`your.s3.bucket/#image-group/image`

Where `image-group` sits next to the generated `index.html` file, and `image` is a directory inside of `image-group` with an `image.dzi` file and the tile pyramid under `image_files`. So, you might have a directory structure like this on s3:

```bash
├── index.html
├── script.js
├── style.css
├── image-group
│   ├── image1
│   │   ├── image1.dzi
│   │   └── image1_files/
│   ├── image2
│   │   ├── image2.dzi
│   │   └── image2_files/
│   └── image3
│       ├── image3.dzi
│       └── image3_files/
```

As the user pans and zooms around the image, the viewer updates the route with the current focus and zoom position, which makes it possible to hard-link to specific locations:

`your.s3.bucket/#image-group/image/0.5615/0.4206/8.4324`

Which makes it easy to "quote" specific sections of the image from an external piece of writing, like this. Throw a `target="_new"` attribute onto the anchor tags, and then other links in the text will just switch the active context back to the existing tab and update the focus location, like <a href="http://textplot.s3-website-us-west-1.amazonaws.com/#mental-maps/war-and-peace/0.3390/0.5548/6.5667" target="_new">this</a>. If a link points to a different image, instead of just a different location in the same image, the router will restart OpenSeadragon with the new tile pyramid and apply the requested focus, like <a href="http://textplot.s3-website-us-west-1.amazonaws.com/#mental-maps/walden/0.4594/0.0522/5.4723" target="_new">this</a>.

To see it in action, check out the second half of [this blog post](https://github.com/davidmcclure/textplot/blob/master/notes/mental-maps/index.md).

## Generating the viewer

Run `grunt compile:min`, which generates a `_site` directory with `index.html`, `script.js`, `style.css`. Or, just grab a [pre-built tarball](https://github.com/davidmcclure/osd-dzi-viewer/releases) from the releases.
