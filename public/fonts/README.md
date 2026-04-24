# Fonts

Viberater uses three Google Fonts, loaded via CDN in `colors_and_type.css`:

- **Space Grotesk** — display / headlines
- **Inter** — UI and body
- **JetBrains Mono** — metadata, eyebrows, timestamps, code

All three are free via Google Fonts.

## ⚠️ Substitution flag

**No custom/licensed font files were provided in the brief.** The three above are educated matches for the "simple, modern, readable" direction:

- Space Grotesk — geometric, slightly quirky; reads confident but not corporate
- Inter — industry-standard neutral UI sans
- JetBrains Mono — friendly mono with good lowercase rhythm

If Viberater has (or wants) a bespoke display face, drop `.woff2` files in this folder and update the `@font-face` block in `colors_and_type.css`. **Please send updated font files if you have a preferred type family.**

## Offline fallback

If CDN loading is blocked, download the families from [fonts.google.com](https://fonts.google.com) and replace the `@import` in `colors_and_type.css` with local `@font-face` rules.
