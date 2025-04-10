/**
 * Tariff Tycoon: The Art of the Panic
 * Main Game Logic
 */

// Game state
const gameState = {
    // Player stats
    year: 1,
    day: 1,
    wealth: 1000, // in millions
    
    // Game meters
    marketHealth: 100, // 0-100
    scandalLevel: 0, // 0-100
    
    // Game flags
    isGameOver: false,
    isGameWon: false,
    
    // Game progress
    tweetsPosted: 0,
    scandalsTriggered: 0,
    scandalsAvoided: 0,
    
    // Crony collection
    cronies: [],
    activeCrony: null,
    
    // Game settings
    daysPerYear: 50,
    maxYears: 4,
    
    // Internal state
    isInitialized: false,
    currentScreen: 'title-screen'
};

// Initialize the game
function initGame() {
    if (gameState.isInitialized) return;
    
    // Set up event listeners
    document.getElementById('start-game').addEventListener('click', startGame);
    document.getElementById('how-to-play').addEventListener('click', showHowToPlay);
    document.getElementById('back-to-title').addEventListener('click', showTitleScreen);
    document.getElementById('play-again').addEventListener('click', restartGame);
    document.getElementById('play-again-win').addEventListener('click', restartGame);
    document.getElementById('tweet-button').addEventListener('click', handleTweet);
    
    // Initialize audio
    initAudio();
    
    // Initialize animations
    initAnimations();
    
    // Initialize cronies
    initCronies();
    
    gameState.isInitialized = true;
    
    // Show title screen
    showScreen('title-screen');
}

// Start a new game
function startGame() {
    resetGame();
    showScreen('game-screen');
    playSound('game-start');
    
    // Add initial tweet
    addTweet({
        content: "Just took office! Time to Make America Great Again with some TREMENDOUS tariffs! #MAGA",
        effect: "Market is optimistic about your business-friendly approach."
    });
    
    // Update UI
    updateUI();
}

// Reset game state
function resetGame() {
    gameState.year = 1;
    gameState.day = 1;
    gameState.wealth = 1000;
    gameState.marketHealth = 100;
    gameState.scandalLevel = 0;
    gameState.isGameOver = false;
    gameState.isGameWon = false;
    gameState.tweetsPosted = 0;
    gameState.scandalsTriggered = 0;
    gameState.scandalsAvoided = 0;
    gameState.activeCrony = null;
    
    // Reset cronies
    resetCronies();
    
    // Clear tweet feed
    document.getElementById('twitter-feed').innerHTML = '';
    
    // Update UI
    updateUI();
}

// Restart game (for play again buttons)
function restartGame() {
    resetGame();
    showScreen('game-screen');
    playSound('game-start');
    
    // Add initial tweet
    addTweet({
        content: "Just took office! Time to Make America Great Again with some TREMENDOUS tariffs! #MAGA",
        effect: "Market is optimistic about your business-friendly approach."
    });
    
    // Update UI
    updateUI();
}

// Handle tweet button click
function handleTweet() {
    if (gameState.isGameOver || gameState.isGameWon) return;
    
    // Animate button
    animateTweetButton();
    
    // Play sound
    playSound('tweet');
    
    // Generate random tweet event
    const tweetEvent = generateTweetEvent();
    
    // Process tweet effects
    processTweetEffects(tweetEvent);
    
    // Add tweet to feed
    addTweet(tweetEvent);
    
    // Advance game day
    advanceDay();
    
    // Check for game over or win conditions
    checkGameConditions();
    
    // Update UI
    updateUI();
}

// Generate a random tweet event
function generateTweetEvent() {
    // Get random event type
    const eventTypes = ['tariff', 'market', 'insider'];
    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    
    // Get event from tweets.js based on type
    let event;
    
    switch (eventType) {
        case 'tariff':
            event = getTariffTweet();
            break;
        case 'market':
            event = getMarketTweet();
            break;
        case 'insider':
            event = getInsiderTweet();
            break;
        default:
            event = getTariffTweet();
    }
    
    return event;
}

// Process the effects of a tweet
function processTweetEffects(tweet) {
    // Apply market effects
    if (tweet.marketEffect) {
        gameState.marketHealth += tweet.marketEffect;
        
        // Ensure market health stays within bounds
        gameState.marketHealth = Math.max(0, Math.min(100, gameState.marketHealth));
        
        // Market crash effects on wealth
        if (tweet.marketEffect < -10) {
            // Big market drop
            const wealthChange = Math.floor(gameState.wealth * (tweet.marketEffect / 100));
            gameState.wealth += wealthChange;
            
            showNotification(`Market crash! Your wealth changed by $${wealthChange}M`);
        }
    }
    
    // Apply wealth effects
    if (tweet.wealthEffect) {
        gameState.wealth += tweet.wealthEffect;
        
        if (tweet.wealthEffect > 0) {
            showNotification(`You gained $${tweet.wealthEffect}M!`);
        } else if (tweet.wealthEffect < 0) {
            showNotification(`You lost $${tweet.wealthEffect}M!`);
        }
    }
    
    // Apply scandal effects
    if (tweet.scandalEffect) {
        // Check if active crony can reduce scandal
        let actualScandalEffect = tweet.scandalEffect;
        
        if (gameState.activeCrony && gameState.activeCrony.reducesScandal) {
            actualScandalEffect = Math.floor(actualScandalEffect * 0.5);
            showNotification(`${gameState.activeCrony.name} reduced scandal impact!`);
            gameState.scandalsAvoided++;
        }
        
        gameState.scandalLevel += actualScandalEffect;
        
        // Ensure scandal level stays within bounds
        gameState.scandalLevel = Math.max(0, Math.min(100, gameState.scandalLevel));
        
        if (actualScandalEffect > 0) {
            gameState.scandalsTriggered++;
        }
    }
    
    // Apply crony effects if active
    if (gameState.activeCrony) {
        if (gameState.activeCrony.marketBoost && tweet.marketEffect < 0) {
            // Crony helps with market recovery
            gameState.marketHealth += gameState.activeCrony.marketBoost;
            showNotification(`${gameState.activeCrony.name} helped stabilize the market!`);
        }
        
        if (gameState.activeCrony.wealthBoost) {
            // Crony helps increase wealth
            const boost = gameState.activeCrony.wealthBoost;
            gameState.wealth += boost;
            showNotification(`${gameState.activeCrony.name} made you $${boost}M richer!`);
        }
        
        // Reset active crony after use
        gameState.activeCrony = null;
        updateCronyUI();
    }
    
    // Increment tweets counter
    gameState.tweetsPosted++;
}

// Advance the game by one day
function advanceDay() {
    gameState.day++;
    
    // Check if year is complete
    if (gameState.day > gameState.daysPerYear) {
        gameState.day = 1;
        gameState.year++;
        
        // Year-end effects
        yearEndEffects();
    }
    
    // Random events based on day
    if (gameState.day % 10 === 0) {
        // Every 10 days, unlock a new crony if possible
        unlockRandomCrony();
    }
}

// Year-end effects
function yearEndEffects() {
    // Market correction
    if (gameState.marketHealth < 50) {
        // Market recovery if it's too low
        gameState.marketHealth += 15; // Increased from 10 to 15
        showNotification("Year-end market correction boosted the economy!");
    } else if (gameState.marketHealth > 80) {
        // Market cooling if it's too high
        gameState.marketHealth -= 3; // Reduced from 5 to 3
        showNotification("Year-end profit-taking cooled the market slightly.");
    }
    
    // Scandal decay
    if (gameState.scandalLevel > 0) {
        const scandalReduction = 15; // Increased from 10 to 15
        gameState.scandalLevel = Math.max(0, gameState.scandalLevel - scandalReduction);
        showNotification("Some scandals have been forgotten over time.");
    }
    
    // Wealth growth based on market health
    const growthRate = gameState.marketHealth / 180; // Increased from 1/200 to 1/180
    const growth = Math.floor(gameState.wealth * growthRate);
    gameState.wealth += growth;
    
    showNotification(`Year ${gameState.year - 1} complete! Your wealth grew by $${growth}M.`);
    playSound('year-complete');
}

// Check for game over or win conditions
function checkGameConditions() {
    // Game over conditions
    if (gameState.scandalLevel >= 100) {
        // Impeached due to scandals
        gameOver("You've been impeached due to too many scandals!");
        return;
    }
    
    if (gameState.marketHealth <= 0) {
        // Economy crashed completely
        gameOver("The economy has completely crashed! Your support base has abandoned you.");
        return;
    }
    
    if (gameState.wealth <= 0) {
        // Bankrupt
        gameOver("You've gone bankrupt! Your business empire has collapsed.");
        return;
    }
    
    // Win condition
    if (gameState.year > gameState.maxYears) {
        gameWin();
        return;
    }
}

// Game over
function gameOver(message) {
    gameState.isGameOver = true;
    
    // Update game over screen
    document.getElementById('game-over-message').textContent = message;
    document.getElementById('final-years').textContent = gameState.year;
    document.getElementById('final-wealth').textContent = gameState.wealth;
    document.getElementById('final-scandals').textContent = gameState.scandalsTriggered;
    
    // Show game over screen
    showScreen('game-over-screen');
    
    // Play sound
    playSound('game-over');
}

// Game win
function gameWin() {
    gameState.isGameWon = true;
    
    // Update win screen
    document.getElementById('win-wealth').textContent = gameState.wealth;
    document.getElementById('win-market').textContent = gameState.marketHealth;
    document.getElementById('win-scandals').textContent = gameState.scandalsAvoided;
    
    // Custom win message based on wealth
    let winMessage = "You've completed your term and made a fortune!";
    
    if (gameState.wealth > 5000) {
        winMessage = "You've become the richest president in history!";
    } else if (gameState.wealth > 3000) {
        winMessage = "Your business empire has grown tremendously!";
    } else if (gameState.wealth < 1500) {
        winMessage = "You survived, but your business didn't thrive as much as you hoped.";
    }
    
    document.getElementById('win-message').textContent = winMessage;
    
    // Show win screen
    showScreen('win-screen');
    
    // Play sound
    playSound('game-win');
}

// Show a specific screen
function showScreen(screenId) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.add('hidden');
    });
    
    // Show the requested screen
    document.getElementById(screenId).classList.remove('hidden');
    
    // Update current screen
    gameState.currentScreen = screenId;
}

// Show title screen
function showTitleScreen() {
    showScreen('title-screen');
    playSound('menu-click');
}

// Show how to play screen
function showHowToPlay() {
    showScreen('how-to-play-screen');
    playSound('menu-click');
}

// Update UI elements
function updateUI() {
    // Update counters
    document.getElementById('year-counter').textContent = gameState.year;
    document.getElementById('day-counter').textContent = gameState.day;
    document.getElementById('wealth-counter').textContent = gameState.wealth;
    
    // Update meters
    document.getElementById('market-meter-fill').style.width = `${gameState.marketHealth}%`;
    document.getElementById('scandal-meter-fill').style.width = `${gameState.scandalLevel}%`;
    
    // Update market meter color based on health
    const marketMeter = document.getElementById('market-meter-fill');
    if (gameState.marketHealth > 70) {
        marketMeter.style.backgroundColor = '#4caf50'; // Green
    } else if (gameState.marketHealth > 30) {
        marketMeter.style.backgroundColor = '#ff9800'; // Orange
    } else {
        marketMeter.style.backgroundColor = '#f44336'; // Red
    }
}

// Show a notification
function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notification-text');
    
    notificationText.textContent = message;
    notification.classList.remove('hidden');
    
    // Hide notification after a delay
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 3000);
}

// Add a tweet to the feed
function addTweet(tweet) {
    const twitterFeed = document.getElementById('twitter-feed');
    
    // Create tweet element
    const tweetElement = document.createElement('div');
    tweetElement.className = 'tweet';
    
    // Create tweet content
    tweetElement.innerHTML = `
        <div class="tweet-header">
            <div class="tweet-avatar"></div>
            <div class="tweet-name">President</div>
        </div>
        <div class="tweet-content">${tweet.content}</div>
        <div class="tweet-effect">${tweet.effect}</div>
    `;
    
    // Add tweet to feed (at the top)
    twitterFeed.insertBefore(tweetElement, twitterFeed.firstChild);
    
    // Animate tweet
    animateTweet(tweetElement);
}

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', initGame);
