/**
 * Tariff Tycoon: The Art of the Panic
 * UI Management
 */

// UI state
const uiState = {
    isInitialized: false,
    lastMarketHealth: 100,
    lastScandalLevel: 0,
    lastWealth: 1000,
    isTweetButtonEnabled: true,
    activeScreen: 'title-screen'
};

// Initialize UI
function initUI() {
    if (uiState.isInitialized) return;
    
    // Set up UI event listeners
    setupUIEventListeners();
    
    // Initialize UI components
    initializeUIComponents();
    
    uiState.isInitialized = true;
}

// Set up UI event listeners
function setupUIEventListeners() {
    // Tweet button hover effects
    const tweetButton = document.getElementById('tweet-button');
    tweetButton.addEventListener('mouseenter', () => {
        if (uiState.isTweetButtonEnabled) {
            tweetButton.classList.add('hover');
        }
    });
    
    tweetButton.addEventListener('mouseleave', () => {
        tweetButton.classList.remove('hover');
    });
    
    // Add touch support for mobile
    document.addEventListener('touchstart', handleTouchStart);
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', handleKeyPress);
    
    // Add resize handler
    window.addEventListener('resize', handleResize);
}

// Initialize UI components
function initializeUIComponents() {
    // Set initial meter values
    document.getElementById('market-meter-fill').style.width = '100%';
    document.getElementById('scandal-meter-fill').style.width = '0%';
    
    // Set initial counter values
    document.getElementById('year-counter').textContent = '1';
    document.getElementById('day-counter').textContent = '1';
    document.getElementById('wealth-counter').textContent = '1000';
    
    // Add CSS classes for UI animations
    addUIAnimationClasses();
}

// Add CSS classes for UI animations
function addUIAnimationClasses() {
    const style = document.createElement('style');
    style.textContent = `
        .increase {
            color: #4caf50;
            animation: pulse 0.5s ease-in-out;
        }
        
        .decrease {
            color: #f44336;
            animation: pulse 0.5s ease-in-out;
        }
        
        .hover {
            transform: translateY(-2px);
            box-shadow: 0px 8px 0px #0d8ecf;
        }
        
        .disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
    `;
    
    document.head.appendChild(style);
}

// Handle touch start events
function handleTouchStart(event) {
    // Prevent default behavior for tweet button
    if (event.target.id === 'tweet-button' || event.target.closest('#tweet-button')) {
        event.preventDefault();
    }
}

// Handle key press events
function handleKeyPress(event) {
    // Space or Enter to tweet when game screen is active
    if ((event.key === ' ' || event.key === 'Enter') && 
        gameState.currentScreen === 'game-screen' && 
        !gameState.isGameOver && 
        !gameState.isGameWon) {
        
        event.preventDefault();
        handleTweet();
    }
    
    // Escape to go back to title screen
    if (event.key === 'Escape' && gameState.currentScreen !== 'title-screen') {
        event.preventDefault();
        showTitleScreen();
    }
}

// Handle window resize
function handleResize() {
    // Adjust UI based on window size
    const gameContainer = document.getElementById('game-container');
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Set minimum dimensions
    const minWidth = 320;
    const minHeight = 480;
    
    // Calculate scale factor
    const scaleX = windowWidth / minWidth;
    const scaleY = windowHeight / minHeight;
    const scale = Math.min(scaleX, scaleY, 1); // Cap at 1 to prevent oversizing
    
    // Apply scale if needed
    if (scale < 1) {
        gameContainer.style.transform = `scale(${scale})`;
        gameContainer.style.transformOrigin = 'center center';
    } else {
        gameContainer.style.transform = 'none';
    }
}

// Update UI based on game state
function updateUI() {
    // Store previous values for animation
    const prevMarketHealth = uiState.lastMarketHealth;
    const prevScandalLevel = uiState.lastScandalLevel;
    const prevWealth = uiState.lastWealth;
    
    // Update counters
    document.getElementById('year-counter').textContent = gameState.year;
    document.getElementById('day-counter').textContent = gameState.day;
    document.getElementById('wealth-counter').textContent = gameState.wealth;
    
    // Update meters with animation
    animateMarketMeter(prevMarketHealth, gameState.marketHealth);
    animateScandalMeter(prevScandalLevel, gameState.scandalLevel);
    
    // Animate wealth changes
    if (prevWealth !== gameState.wealth) {
        animateWealthCounter(prevWealth, gameState.wealth);
    }
    
    // Update tweet button state
    updateTweetButtonState();
    
    // Update character animation based on game state
    updateCharacterAnimation();
    
    // Store current values for next update
    uiState.lastMarketHealth = gameState.marketHealth;
    uiState.lastScandalLevel = gameState.scandalLevel;
    uiState.lastWealth = gameState.wealth;
    
    // Update active screen
    uiState.activeScreen = gameState.currentScreen;
}

// Update tweet button state
function updateTweetButtonState() {
    const tweetButton = document.getElementById('tweet-button');
    
    if (gameState.isGameOver || gameState.isGameWon) {
        // Disable tweet button if game is over
        tweetButton.classList.add('disabled');
        tweetButton.disabled = true;
        uiState.isTweetButtonEnabled = false;
    } else {
        // Enable tweet button
        tweetButton.classList.remove('disabled');
        tweetButton.disabled = false;
        uiState.isTweetButtonEnabled = true;
    }
}

// Update character animation based on game state
function updateCharacterAnimation() {
    // Determine character state
    let characterAction = 'idle';
    
    if (gameState.isGameOver) {
        characterAction = 'lose';
    } else if (gameState.isGameWon) {
        characterAction = 'win';
    } else if (gameState.marketHealth < 30) {
        characterAction = 'worried';
    } else if (gameState.scandalLevel > 70) {
        characterAction = 'nervous';
    } else if (gameState.wealth > 3000) {
        characterAction = 'celebrate';
    }
    
    // Apply animation
    animateCharacter(characterAction);
}

// Show notification
function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notification-text');
    
    // Set message
    notificationText.textContent = message;
    
    // Animate notification
    animateNotification(notification);
    
    // Dispatch event for sound
    document.dispatchEvent(new CustomEvent('notification'));
}

// Update crony UI
function updateCronyUI() {
    const cronyContainer = document.getElementById('crony-cards');
    cronyContainer.innerHTML = '';
    
    // Add unlocked cronies to the UI
    gameState.cronies.forEach(crony => {
        if (crony.unlocked) {
            const cronyCard = document.createElement('div');
            cronyCard.className = 'crony-card';
            cronyCard.dataset.cronyId = crony.id;
            
            // Add active class if this crony is active
            if (gameState.activeCrony && gameState.activeCrony.id === crony.id) {
                cronyCard.classList.add('active');
            }
            
            // Create crony content
            cronyCard.innerHTML = `
                <div class="crony-portrait"></div>
                <div class="crony-name">${crony.name}</div>
                <div class="crony-ability">${crony.ability}</div>
            `;
            
            cronyContainer.appendChild(cronyCard);
            
            // Animate if newly added
            if (!document.querySelector(`[data-crony-id="${crony.id}"]`)) {
                animateNewCrony(cronyCard);
            }
        }
    });
}

// Create pixel art character
function createPixelArtCharacter() {
    const characterSprite = document.getElementById('character-sprite');
    
    // Create a canvas for pixel art
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 48;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.imageRendering = 'pixelated';
    
    characterSprite.innerHTML = '';
    characterSprite.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Draw a simple pixel art character (placeholder)
    // In a real game, you would use sprite sheets or more complex drawing
    
    // Background (transparent)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Hair (yellow)
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(8, 0, 16, 8);
    ctx.fillRect(6, 4, 20, 6);
    
    // Face (peach)
    ctx.fillStyle = '#FFDAB9';
    ctx.fillRect(10, 8, 12, 12);
    
    // Eyes (blue)
    ctx.fillStyle = '#1E90FF';
    ctx.fillRect(12, 12, 2, 2);
    ctx.fillRect(18, 12, 2, 2);
    
    // Mouth (red)
    ctx.fillStyle = '#FF6347';
    ctx.fillRect(14, 16, 4, 1);
    
    // Suit (dark blue)
    ctx.fillStyle = '#00008B';
    ctx.fillRect(8, 20, 16, 20);
    
    // Tie (red)
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(14, 20, 4, 12);
    
    // Arms (suit color)
    ctx.fillStyle = '#00008B';
    ctx.fillRect(4, 22, 4, 12);
    ctx.fillRect(24, 22, 4, 12);
    
    // Hands (peach)
    ctx.fillStyle = '#FFDAB9';
    ctx.fillRect(2, 34, 6, 4);
    ctx.fillRect(24, 34, 6, 4);
    
    // Legs (dark gray)
    ctx.fillStyle = '#2F4F4F';
    ctx.fillRect(10, 40, 5, 8);
    ctx.fillRect(17, 40, 5, 8);
    
    // Phone in hand (black)
    ctx.fillStyle = '#000000';
    ctx.fillRect(24, 32, 4, 6);
}

// Initialize UI when DOM is loaded
document.addEventListener('DOMContentLoaded', initUI);
