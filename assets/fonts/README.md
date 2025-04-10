# Fonts for Tariff Tycoon

This directory contains custom fonts for the Tariff Tycoon game. While the game primarily uses the "Press Start 2P" font from Google Fonts (loaded via CDN), you can add additional pixel art fonts here for use in the game.

## Default Font

The game uses "Press Start 2P" as its primary font, which is a pixel art font that gives the game its retro aesthetic. This font is loaded from Google Fonts in the `index.html` file:

```html
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
```

## Adding Custom Fonts

If you want to add additional fonts to the game:

1. Place the font files (in formats like .woff2, .woff, .ttf) in this directory
2. Create a CSS file in the `css` directory to define the font-face
3. Link to the CSS file in the `index.html` file
4. Update the CSS to use the new font where appropriate

### Example Font-Face Definition

```css
@font-face {
  font-family: 'CustomPixelFont';
  src: url('../assets/fonts/custom-pixel-font.woff2') format('woff2'),
       url('../assets/fonts/custom-pixel-font.woff') format('woff'),
       url('../assets/fonts/custom-pixel-font.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
```

## Recommended Pixel Art Fonts

Here are some free pixel art fonts that work well with the game's aesthetic:

1. **Press Start 2P** - The default font, perfect for retro gaming
2. **VT323** - A monospace font inspired by terminal screens
3. **Pixel Operator** - A clean pixel font with multiple weights
4. **Munro** - A pixel font with good readability
5. **Visitor** - A futuristic pixel font
6. **Silkscreen** - A clean, readable pixel font

## Font Resources

You can find free pixel art fonts at these resources:

1. [Google Fonts](https://fonts.google.com/?category=Display&category=Monospace) - Filter by Display or Monospace
2. [DaFont](https://www.dafont.com/bitmap.php) - Bitmap/Pixel section
3. [Font Squirrel](https://www.fontsquirrel.com/fonts/list/style/Pixel) - Pixel fonts
4. [1001 Fonts](https://www.1001fonts.com/pixel-fonts.html) - Pixel fonts

## Font Licensing

When adding fonts to your game, make sure to check the license to ensure you can use them in your project. Most fonts on Google Fonts are free for commercial use, but fonts from other sources may have different licensing terms.

## Font Performance Considerations

When adding custom fonts:

1. Use modern formats like WOFF2 first for better compression
2. Consider using `font-display: swap` to prevent font-related rendering delays
3. Only load the font weights and styles you actually need
4. Consider using a font loading strategy to avoid FOUT (Flash of Unstyled Text)

## Using Pixel Fonts Effectively

For the best pixel art aesthetic:

1. Use font sizes that are multiples of the font's base size (often 8px or 16px)
2. Avoid anti-aliasing by using `image-rendering: pixelated` in your CSS
3. Disable subpixel rendering for text with `text-rendering: optimizeSpeed`
4. Use appropriate line heights that complement the pixel grid
