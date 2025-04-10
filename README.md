# Tariff Tycoon: The Art of the Panic

A satirical browser game about a Trump-like figure imposing tariffs, manipulating markets, and trying to get rich while the economy burns.

![Tariff Tycoon Game](screenshots/game-preview.png)

## Game Description

**Tagline:** Pump stocks, slap tariffs, and crash the economy — all in a day's work!

**Premise:** You play as a "Trump-like" figure (with big hair, exaggerated hands, and a phone always in hand), issuing erratic tweets, slapping random tariffs on countries, and triggering insider trades among your cartoonish cabinet of cronies.

**Goal:** Stay rich while the economy burns. Survive 4 "years" (rounds) without getting impeached or completely crashing the economy.

## Features

- **Tweet Button Mechanic:** Click to tweet "policy ideas" that randomly trigger tariffs, market reactions, and insider trading alerts
- **Crony Cards:** Collect and use parody versions of real Trump associates with unique powers
- **Market Meter:** Track the health of the stock market - if it crashes completely, you lose
- **Scandal Meter:** Watch your scandal level - if it fills up, you're impeached!
- **Pixel Art Style:** Clean, readable pixel art visuals
- **Responsive Design:** Play on desktop or mobile devices
- **Sound Effects:** Optional audio feedback for game events

## How to Play

1. Open `index.html` in a modern web browser
2. Click the "Start Game" button
3. Click the "TWEET!" button to issue random policy tweets
4. Each tweet affects the market, your wealth, and scandal level
5. Use your Crony Cards strategically to maximize profits
6. Try to survive 4 years without getting impeached or crashing the economy

## Game Controls

- **Mouse/Touch:** Click the TWEET! button and Crony Cards
- **Keyboard:** Press Space or Enter to tweet
- **Sound:** Toggle sound on/off with the sound button in the bottom right

## Development

### Project Structure

```
tariff-tycoon/
├── index.html              # Main game page
├── css/
│   ├── style.css           # Main styles
│   └── responsive.css      # Mobile adaptations
├── js/
│   ├── game.js             # Core game loop
│   ├── ui.js               # Interface management
│   ├── tweets.js           # Tweet generation & effects
│   ├── market.js           # Economy simulation
│   ├── cronies.js          # Advisor card system
│   ├── events.js           # Game events based on real references
│   ├── audio.js            # Sound management
│   └── animations.js       # Visual effects
├── assets/
│   ├── images/             # Pixel art assets
│   │   ├── character/      # Main character sprites
│   │   ├── cronies/        # Advisor card images
│   │   ├── ui/             # Interface elements
│   │   └── animations/     # Animation frames
│   ├── sounds/             # Game sound effects
│   └── fonts/              # Pixel art typography
└── README.md
```

### Asset Generation

The game includes tools to generate pixel art assets:

- `assets/images/character/generate-character.html` - Tool to create and export the main character sprite
- `assets/images/cronies/generate-cronies.html` - Tool to create and export crony portraits

### Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Canvas API for pixel art rendering

## Real-World References

The game includes satirical references to real events from the Trump administration, including:

- Steel & Aluminum Tariffs (2018)
- Trade War with China
- Farm Bailouts after China Retaliation
- Apple & iPhone Exemptions
- Mexican Avocado Tariff Threats
- Senator Stock Dumps Before COVID News
- Trump's Hydroxychloroquine Hype
- Trump's Comments Crashing Boeing Stock
- Saudi Arms Deal Despite Khashoggi Killing
- Market reactions to Trump's tweets

## Credits

Created as a satirical browser game for entertainment purposes only. All characters and events in this game are fictional, and any resemblance to real persons or events is used for satirical purposes.

## License

This project is released under the MIT License.
