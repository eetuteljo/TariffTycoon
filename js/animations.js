/**
 * Tariff Tycoon: The Art of the Panic
 * Animation System
 */

// Animation settings
const animationSettings = {
    tweetDuration: 500,
    buttonShakeDuration: 300,
    characterAnimationSpeed: 150,
    notificationFadeDuration: 300
};

// Initialize animations
function initAnimations() {
    // Set up any animation-related event listeners or initial states
    
    // Add animation-related CSS classes
    addAnimationStyles();
}

// Add animation-specific CSS styles dynamically
function addAnimationStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            50% { transform: translateX(5px); }
            75% { transform: translateX(-5px); }
            100% { transform: translateX(0); }
        }
        
        @keyframes pop-in {
            0% { transform: scale(0.5); opacity: 0; }
            80% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes slide-in {
            0% { transform: translateY(-20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fade-in {
            0% { opacity: 0; }
            100% { opacity: 1; }
        }
        
        @keyframes fade-out {
            0% { opacity: 1; }
            100% { opacity: 0; }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        
        .shake-animation {
            animation: shake ${animationSettings.buttonShakeDuration}ms ease-in-out;
        }
        
        .pop-in-animation {
            animation: pop-in ${animationSettings.tweetDuration}ms ease-out forwards;
        }
        
        .slide-in-animation {
            animation: slide-in ${animationSettings.tweetDuration}ms ease-out forwards;
        }
        
        .fade-in-animation {
            animation: fade-in ${animationSettings.tweetDuration}ms ease-out forwards;
        }
        
        .fade-out-animation {
            animation: fade-out ${animationSettings.tweetDuration}ms ease-in forwards;
        }
        
        .pulse-animation {
            animation: pulse 1s infinite ease-in-out;
        }
        
        .bounce-animation {
            animation: bounce 1s infinite ease-in-out;
        }
    `;
    
    document.head.appendChild(styleElement);
}

// Animate tweet button
function animateTweetButton() {
    const tweetButton = document.getElementById('tweet-button');
    
    // Remove animation class if it exists
    tweetButton.classList.remove('shake-animation');
    
    // Force reflow to restart animation
    void tweetButton.offsetWidth;
    
    // Add animation class
    tweetButton.classList.add('shake-animation');
    
    // Remove class after animation completes
    setTimeout(() => {
        tweetButton.classList.remove('shake-animation');
    }, animationSettings.buttonShakeDuration);
}

// Animate a new tweet
function animateTweet(tweetElement) {
    // Set initial state
    tweetElement.style.opacity = '0';
    tweetElement.style.transform = 'translateY(-20px)';
    
    // Force reflow
    void tweetElement.offsetWidth;
    
    // Animate in
    tweetElement.style.transition = `opacity ${animationSettings.tweetDuration}ms ease-out, transform ${animationSettings.tweetDuration}ms ease-out`;
    tweetElement.style.opacity = '1';
    tweetElement.style.transform = 'translateY(0)';
}

// Animate character based on action
function animateCharacter(action) {
    const characterSprite = document.getElementById('character-sprite');
    
    switch (action) {
        case 'tweet':
            // Shake animation
            characterSprite.classList.remove('shake-animation');
            void characterSprite.offsetWidth;
            characterSprite.classList.add('shake-animation');
            
            setTimeout(() => {
                characterSprite.classList.remove('shake-animation');
            }, animationSettings.buttonShakeDuration);
            break;
            
        case 'win':
            // Bounce animation
            characterSprite.classList.remove('bounce-animation');
            void characterSprite.offsetWidth;
            characterSprite.classList.add('bounce-animation');
            break;
            
        case 'lose':
            // Shake and fade animation
            characterSprite.classList.remove('shake-animation');
            void characterSprite.offsetWidth;
            characterSprite.classList.add('shake-animation');
            
            setTimeout(() => {
                characterSprite.style.opacity = '0.5';
            }, animationSettings.buttonShakeDuration);
            break;
            
        case 'idle':
            // Reset animations
            characterSprite.classList.remove('shake-animation', 'bounce-animation');
            characterSprite.style.opacity = '1';
            break;
            
        case 'celebrate':
            // Pulse animation
            characterSprite.classList.remove('pulse-animation');
            void characterSprite.offsetWidth;
            characterSprite.classList.add('pulse-animation');
            break;
    }
}

// Animate market meter changes
function animateMarketMeter(oldValue, newValue) {
    const marketMeter = document.getElementById('market-meter-fill');
    
    // Set transition
    marketMeter.style.transition = `width ${animationSettings.tweetDuration}ms ease-in-out, background-color ${animationSettings.tweetDuration}ms ease-in-out`;
    
    // Update width
    marketMeter.style.width = `${newValue}%`;
    
    // Update color based on health
    if (newValue > 70) {
        marketMeter.style.backgroundColor = '#4caf50'; // Green
    } else if (newValue > 30) {
        marketMeter.style.backgroundColor = '#ff9800'; // Orange
    } else {
        marketMeter.style.backgroundColor = '#f44336'; // Red
    }
    
    // Add pulse animation if big change
    if (Math.abs(oldValue - newValue) > 10) {
        marketMeter.classList.remove('pulse-animation');
        void marketMeter.offsetWidth;
        marketMeter.classList.add('pulse-animation');
        
        setTimeout(() => {
            marketMeter.classList.remove('pulse-animation');
        }, 1000);
    }
}

// Animate scandal meter changes
function animateScandalMeter(oldValue, newValue) {
    const scandalMeter = document.getElementById('scandal-meter-fill');
    
    // Set transition
    scandalMeter.style.transition = `width ${animationSettings.tweetDuration}ms ease-in-out`;
    
    // Update width
    scandalMeter.style.width = `${newValue}%`;
    
    // Add pulse animation if big change
    if (Math.abs(oldValue - newValue) > 10) {
        scandalMeter.classList.remove('pulse-animation');
        void scandalMeter.offsetWidth;
        scandalMeter.classList.add('pulse-animation');
        
        setTimeout(() => {
            scandalMeter.classList.remove('pulse-animation');
        }, 1000);
    }
}

// Animate wealth counter changes
function animateWealthCounter(oldValue, newValue) {
    const wealthCounter = document.getElementById('wealth-counter');
    
    // Determine if wealth increased or decreased
    const isIncrease = newValue > oldValue;
    
    // Add appropriate class
    wealthCounter.classList.remove('increase', 'decrease');
    void wealthCounter.offsetWidth;
    wealthCounter.classList.add(isIncrease ? 'increase' : 'decrease');
    
    // Update value
    wealthCounter.textContent = newValue;
    
    // Remove class after animation
    setTimeout(() => {
        wealthCounter.classList.remove('increase', 'decrease');
    }, animationSettings.tweetDuration);
}

// Animate screen transitions
function animateScreenTransition(fromScreenId, toScreenId) {
    const fromScreen = document.getElementById(fromScreenId);
    const toScreen = document.getElementById(toScreenId);
    
    // Fade out current screen
    fromScreen.style.opacity = '1';
    fromScreen.style.transition = `opacity ${animationSettings.tweetDuration}ms ease-in`;
    fromScreen.style.opacity = '0';
    
    setTimeout(() => {
        // Hide from screen
        fromScreen.classList.add('hidden');
        
        // Show to screen
        toScreen.classList.remove('hidden');
        toScreen.style.opacity = '0';
        
        // Force reflow
        void toScreen.offsetWidth;
        
        // Fade in new screen
        toScreen.style.transition = `opacity ${animationSettings.tweetDuration}ms ease-out`;
        toScreen.style.opacity = '1';
    }, animationSettings.tweetDuration);
}

// Animate notification
function animateNotification(notification) {
    // Set initial state
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(-20px)';
    notification.classList.remove('hidden');
    
    // Force reflow
    void notification.offsetWidth;
    
    // Animate in
    notification.style.transition = `opacity ${animationSettings.notificationFadeDuration}ms ease-out, transform ${animationSettings.notificationFadeDuration}ms ease-out`;
    notification.style.opacity = '1';
    notification.style.transform = 'translateY(0)';
    
    // Animate out after delay
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        
        // Hide after animation completes
        setTimeout(() => {
            notification.classList.add('hidden');
        }, animationSettings.notificationFadeDuration);
    }, 3000);
}

// Animate crony card activation
function animateCronyActivation(cronyCard) {
    // Remove any existing animations
    cronyCard.classList.remove('pulse-animation', 'bounce-animation');
    
    // Force reflow
    void cronyCard.offsetWidth;
    
    // Add pulse animation
    cronyCard.classList.add('pulse-animation');
    
    // Remove animation after a few seconds
    setTimeout(() => {
        cronyCard.classList.remove('pulse-animation');
    }, 3000);
}

// Animate new crony unlock
function animateNewCrony(cronyCard) {
    // Set initial state
    cronyCard.style.opacity = '0';
    cronyCard.style.transform = 'scale(0.5)';
    
    // Force reflow
    void cronyCard.offsetWidth;
    
    // Animate in
    cronyCard.style.transition = `opacity ${animationSettings.tweetDuration}ms ease-out, transform ${animationSettings.tweetDuration}ms ease-out`;
    cronyCard.style.opacity = '1';
    cronyCard.style.transform = 'scale(1)';
    
    // Add bounce animation after appearing
    setTimeout(() => {
        cronyCard.classList.add('bounce-animation');
        
        // Remove bounce after a few seconds
        setTimeout(() => {
            cronyCard.classList.remove('bounce-animation');
        }, 3000);
    }, animationSettings.tweetDuration);
}
