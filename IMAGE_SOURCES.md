# Image & font sources

## Photos
**None used.** The design brief asked for Unsplash/Pexels photos, but on 2026-11-01 both sites blocked
automated access from the build environment (Unsplash: bot-check page; Pexels: HTTP 403), so the
author and license of any photo could not be checked. We did not add unverified images, and we never
use Pinterest.

To add photos later: download from unsplash.com or pexels.com by hand, place them in `src/assets/`,
render with `astro:assets` `<Image>` (webp, explicit width/height, `loading="lazy"`), and log each one here:

| File | Source URL | Author | License |
|---|---|---|---|
| — | — | — | — |

## Fonts
| File | Source | License |
|---|---|---|
| `public/fonts/fraunces-latin-wght.woff2` (Fraunces variable, latin subset, weights 300–700) | npm `@fontsource-variable/fraunces@5.3.0` (from Google Fonts, github.com/undercasetype/Fraunces) | SIL Open Font License 1.1, see `public/fonts/Fraunces-OFL.txt` |

UI text uses the system font stack; code uses the system monospace stack (`ui-monospace`). Neither is bundled.
