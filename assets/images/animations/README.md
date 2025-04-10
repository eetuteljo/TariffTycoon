# Animations for Tariff Tycoon

This directory contains animation assets for the Tariff Tycoon game. The game uses a combination of CSS animations and sprite-based animations to create visual effects.

## Animation Types

The game uses several types of animations:

1. **CSS Animations**: Simple transitions and effects defined in CSS
2. **Sprite Animations**: Frame-by-frame animations using sprite sheets
3. **Canvas Animations**: Programmatically drawn animations using the Canvas API

## Adding Sprite Sheets

For sprite-based animations, you can add sprite sheets to this directory. A sprite sheet is a single image containing multiple frames of an animation arranged in a grid.

### Recommended Sprite Sheet Format

- **File Format**: PNG with transparency
- **Resolution**: Use pixel art at the native resolution (avoid scaling up)
- **Frame Size**: Consistent frame size across the sprite sheet
- **Arrangement**: Frames arranged in a horizontal row or grid
- **Naming Convention**: `[character/element]-[animation-name].png`

### Example Sprite Sheet Structure

For a character with multiple animations:

```
trump-idle.png      # 4-frame idle animation
trump-tweet.png     # 6-frame tweeting animation
trump-celebrate.png # 8-frame celebration animation
trump-lose.png      # 5-frame losing animation
```

## Animation Implementation

The game implements animations in several ways:

### 1. CSS Animations

CSS animations are defined in `style.css` and applied to elements using JavaScript. For example:

```css
@keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
    100% { transform: translateX(0); }
}

.shake-animation {
    animation: shake 300ms ease-in-out;
}
```

### 2. Sprite Animations

Sprite animations are implemented in the `animations.js` file. The game uses a simple sprite animation system that:

1. Loads a sprite sheet image
2. Calculates the position of each frame
3. Updates the displayed frame at a specified interval

Example implementation:

```javascript
function animateSprite(element, spriteSheet, frameCount, frameDuration) {
    let currentFrame = 0;
    const frameWidth = spriteSheet.width / frameCount;
    
    const interval = setInterval(() => {
        const position = -(currentFrame * frameWidth);
        element.style.backgroundPosition = `${position}px 0`;
        
        currentFrame = (currentFrame + 1) % frameCount;
    }, frameDuration);
    
    return {
        stop: () => clearInterval(interval)
    };
}
```

### 3. Canvas Animations

For more complex animations, the game uses the Canvas API to draw animations programmatically. This is particularly useful for particle effects and dynamic animations.

## Creating Your Own Animations

To create your own pixel art animations:

1. Use a pixel art editor like [Aseprite](https://www.aseprite.org/), [Piskel](https://www.piskelapp.com/), or [LibreSprite](https://libresprite.github.io/)
2. Create your animation frames at the native resolution
3. Export as individual frames or as a sprite sheet
4. Add the images to this directory
5. Update the animation code to use your new assets

## Animation Performance Tips

1. **Limit Animation Complexity**: Keep animations simple and efficient
2. **Use CSS for Simple Animations**: CSS animations are hardware-accelerated
3. **Optimize Sprite Sheets**: Minimize file size without losing quality
4. **Limit Active Animations**: Only animate elements that are visible
5. **Use RequestAnimationFrame**: For smooth, efficient animations

## Placeholder Animations

Until you create custom animations, the game uses simple CSS animations and programmatically drawn animations. The character sprite is drawn using Canvas in `ui.js` with the `createPixelArtCharacter()` function.

## Animation Ideas for Tariff Tycoon

- **Tweet Button**: Pulsing or bouncing animation when clickable
- **Character**: Idle animation, tweeting animation, celebration, and defeat
- **Market Meter**: Flashing or pulsing when significant changes occur
- **Scandal Meter**: Warning flash when approaching dangerous levels
- **Crony Cards**: Flip or glow animation when activated
- **Notifications**: Slide in/out animations
- **Tweets**: Appear with a pop-in animation
