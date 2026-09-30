# License

## This theme

The design, markup, styles and code in this repository are the property of the
theme author and are licensed to the purchaser under the terms of the marketplace
listing it was bought from.

## Third-party dependencies

Two dependencies carry their own terms. Both permit commercial use.

### GSAP

Animation is built on [GSAP](https://gsap.com), including the ScrollTrigger and
SplitText plugins. GSAP is free for commercial use under the
[standard GSAP license](https://gsap.com/community/standard-license/). It is
listed as a normal npm dependency and is not modified or redistributed here.

### Lenis

Momentum scrolling uses [Lenis](https://github.com/darkroomengineering/lenis),
MIT licensed.

### Fonts

Both families are **bundled with the theme** in `src/assets/fonts/` and served
from your own domain. Nothing is fetched from a CDN at build time or in the
browser, so builds are reproducible and work offline.

**Inter Tight** — Copyright 2022 The Inter Project Authors. Licensed under the
SIL Open Font License 1.1, which permits bundling and redistribution as part of
a larger work. The full license is included at
`src/assets/fonts/InterTight-OFL.txt` and must stay with the font files.

**General Sans** — Indian Type Foundry, distributed via
[Fontshare](https://www.fontshare.com/fonts/general-sans). Free for personal and
commercial use.

> **Confirm before resale.** Fontshare's license permits using and self-hosting
> the font. Redistributing the font files *inside a template you sell* is a
> narrower question, and the terms should be checked against your intended
> distribution. If you would rather not ship them, delete the
> `GeneralSans-*.woff2` files and switch that family back to
> `fontProviders.fontshare()` in `astro.config.ts` — buyers then download it at
> build time, and nothing is redistributed.

## Demo content

The photography, logos and written content included with the theme are
placeholders for demonstration only. Replace them with your own before
publishing.

### Photography and video

The demo photographs and videos come from [Freepik](https://www.freepik.com).
They are included so the theme has something to show, and they are **not part of
what is licensed to you** with the theme.

Freepik's own terms govern them, and those terms turn on which Freepik plan the
files were obtained under and how you intend to use them. Depending on the plan,
using the files on a live site may require attribution to Freepik, and
redistributing them inside a template or theme is restricted separately from
using them yourself.

What that means in practice:

- **Building a site with this theme** — replace the demo images with your own
  photography, or with files you have licensed yourself. This is the expected
  path, and it sidesteps the question entirely.
- **Redistributing the theme** — do not pass the Freepik files on. Check your
  own Freepik license before including them in anything you share or sell.

Every image lives in `src/assets/images/`, and the videos in `public/videos/`.
Both are referenced by name from the content collections, so swapping a file for
one of your own keeps the layout intact.

### Logos

The "Logoipsum" marks used for the client logos are generic placeholder logos.
