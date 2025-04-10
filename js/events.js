/**
 * Tariff Tycoon: The Art of the Panic
 * Game Events System
 */

// Event definitions
const eventDefinitions = [
    {
        id: 'market_crash',
        name: 'Market Crash',
        description: 'The stock market has crashed! Your wealth takes a hit, but your cronies might help you profit from the chaos.',
        condition: () => gameState.marketHealth < 30 && Math.random() < 0.3,
        effect: () => {
            // Market crash effects
            const prevMarketHealth = gameState.marketHealth;
            gameState.marketHealth = Math.max(10, gameState.marketHealth - 15);
            
            // Wealth impact depends on active crony
            let wealthImpact = -Math.floor(gameState.wealth * 0.2); // Lose 20% by default
            
            if (gameState.activeCrony && gameState.activeCrony.id === 'mnuchin') {
                // Mnuchman helps during crashes
                wealthImpact = Math.floor(gameState.wealth * 0.1); // Gain 10% instead
                showNotification(`Market crash! But ${gameState.activeCrony.name} helped you profit $${-wealthImpact}M!`);
            } else {
                showNotification(`Market crash! You lost $${-wealthImpact}M!`);
            }
            
            gameState.wealth += wealthImpact;
            
            // Dispatch market change event for sound
            document.dispatchEvent(new CustomEvent('marketChange', { 
                detail: { change: gameState.marketHealth - prevMarketHealth } 
            }));
            
            // Dispatch wealth change event for sound
            document.dispatchEvent(new CustomEvent('wealthChange', { 
                detail: { change: wealthImpact } 
            }));
            
            return true;
        }
    },
    {
        id: 'federal_investigation',
        name: 'Federal Investigation',
        description: 'The FBI is investigating your administration! Scandal level increases significantly.',
        condition: () => gameState.scandalLevel > 60 && Math.random() < 0.2, // Reduced chance
        effect: () => {
            // Investigation effects
            const prevScandalLevel = gameState.scandalLevel;
            
            // Scandal impact depends on active crony
            let scandalImpact = 10; // Reduced from 15 to 10
            
            if (gameState.activeCrony && gameState.activeCrony.id === 'barr') {
                // Attorney Generule reduces scandal impact
                scandalImpact = 3; // Reduced from 5 to 3
                showNotification(`Federal investigation! But ${gameState.activeCrony.name} kept it under control.`);
            } else {
                showNotification('Federal investigation! Scandal level increased significantly!');
            }
            
            gameState.scandalLevel = Math.min(100, gameState.scandalLevel + scandalImpact);
            
            // Dispatch scandal change event for sound
            document.dispatchEvent(new CustomEvent('scandalChange', { 
                detail: { change: gameState.scandalLevel - prevScandalLevel } 
            }));
            
            return true;
        }
    },
    {
        id: 'market_rally',
        name: 'Market Rally',
        description: 'The stock market is rallying! Your wealth increases as stocks soar.',
        condition: () => gameState.marketHealth > 70 && Math.random() < 0.3,
        effect: () => {
            // Market rally effects
            const prevMarketHealth = gameState.marketHealth;
            gameState.marketHealth = Math.min(100, gameState.marketHealth + 10);
            
            // Wealth impact
            const wealthImpact = Math.floor(gameState.wealth * 0.15); // Gain 15%
            gameState.wealth += wealthImpact;
            
            showNotification(`Market rally! You gained $${wealthImpact}M!`);
            
            // Dispatch market change event for sound
            document.dispatchEvent(new CustomEvent('marketChange', { 
                detail: { change: gameState.marketHealth - prevMarketHealth } 
            }));
            
            // Dispatch wealth change event for sound
            document.dispatchEvent(new CustomEvent('wealthChange', { 
                detail: { change: wealthImpact } 
            }));
            
            return true;
        }
    },
    {
        id: 'foreign_crisis',
        name: 'Foreign Crisis',
        description: 'A foreign crisis has erupted! How you respond could affect your scandal level and the markets.',
        condition: () => Math.random() < 0.2,
        effect: () => {
            // Foreign crisis effects
            showNotification('Foreign crisis! Choose your response carefully...');
            
            // Create response options
            const options = [
                {
                    text: 'Threaten tariffs',
                    effect: () => {
                        gameState.marketHealth = Math.max(10, gameState.marketHealth - 10);
                        gameState.scandalLevel = Math.min(100, gameState.scandalLevel + 5);
                        showNotification('You threatened tariffs! Markets worried, scandal increased slightly.');
                    }
                },
                {
                    text: 'Diplomatic solution',
                    effect: () => {
                        gameState.marketHealth = Math.min(100, gameState.marketHealth + 5);
                        gameState.scandalLevel = Math.max(0, gameState.scandalLevel - 5);
                        showNotification('You chose diplomacy! Markets relieved, scandal decreased slightly.');
                    }
                },
                {
                    text: 'Ignore the crisis',
                    effect: () => {
                        // Random outcome
                        if (Math.random() < 0.5) {
                            gameState.scandalLevel = Math.min(100, gameState.scandalLevel + 10);
                            showNotification('Ignoring the crisis backfired! Scandal increased significantly.');
                        } else {
                            showNotification('The crisis resolved itself! No effect on your administration.');
                        }
                    }
                }
            ];
            
            // In a real game, you would show these options to the player
            // For this demo, we'll randomly select one
            const selectedOption = options[Math.floor(Math.random() * options.length)];
            selectedOption.effect();
            
            return true;
        }
    },
    {
        id: 'cabinet_reshuffle',
        name: 'Cabinet Reshuffle',
        description: 'Time to reshuffle your cabinet! This could unlock a new crony.',
        condition: () => gameState.day % 20 === 0 && Math.random() < 0.5,
        effect: () => {
            // Cabinet reshuffle effects
            showNotification('Cabinet reshuffle! A new advisor has joined your team.');
            
            // Unlock a random crony
            unlockRandomCrony();
            
            return true;
        }
    },
    {
        id: 'media_scandal',
        name: 'Media Scandal',
        description: 'The media has uncovered a scandal in your administration!',
        condition: () => Math.random() < 0.12, // Reduced chance from 0.15 to 0.12
        effect: () => {
            // Media scandal effects
            const prevScandalLevel = gameState.scandalLevel;
            
            // Scandal impact depends on active crony
            let scandalImpact = 8; // Reduced from 10 to 8
            
            if (gameState.activeCrony && (gameState.activeCrony.id === 'barr' || gameState.activeCrony.id === 'carson')) {
                // These cronies help reduce scandal impact
                scandalImpact = 2; // Reduced from 3 to 2
                showNotification(`Media scandal! But ${gameState.activeCrony.name} helped contain it.`);
            } else {
                showNotification('Media scandal! Your administration is under scrutiny!');
            }
            
            gameState.scandalLevel = Math.min(100, gameState.scandalLevel + scandalImpact);
            
            // Dispatch scandal change event for sound
            document.dispatchEvent(new CustomEvent('scandalChange', { 
                detail: { change: gameState.scandalLevel - prevScandalLevel } 
            }));
            
            return true;
        }
    },
    {
        id: 'economic_boom',
        name: 'Economic Boom',
        description: 'The economy is booming! Your wealth and market health increase.',
        condition: () => gameState.marketHealth > 50 && Math.random() < 0.2,
        effect: () => {
            // Economic boom effects
            const prevMarketHealth = gameState.marketHealth;
            gameState.marketHealth = Math.min(100, gameState.marketHealth + 15);
            
            // Wealth impact
            const wealthImpact = Math.floor(gameState.wealth * 0.2); // Gain 20%
            gameState.wealth += wealthImpact;
            
            showNotification(`Economic boom! You gained $${wealthImpact}M and market health improved!`);
            
            // Dispatch market change event for sound
            document.dispatchEvent(new CustomEvent('marketChange', { 
                detail: { change: gameState.marketHealth - prevMarketHealth } 
            }));
            
            // Dispatch wealth change event for sound
            document.dispatchEvent(new CustomEvent('wealthChange', { 
                detail: { change: wealthImpact } 
            }));
            
            return true;
        }
    },
    {
        id: 'trade_war_escalation',
        name: 'Trade War Escalation',
        description: 'The trade war has escalated! Markets react negatively, but your base loves it.',
        condition: () => Math.random() < 0.25,
        effect: () => {
            // Trade war effects
            const prevMarketHealth = gameState.marketHealth;
            gameState.marketHealth = Math.max(10, gameState.marketHealth - 12);
            
            // Scandal impact (positive for your base)
            const prevScandalLevel = gameState.scandalLevel;
            gameState.scandalLevel = Math.max(0, gameState.scandalLevel - 5);
            
            showNotification('Trade war escalated! Markets down, but your base is thrilled!');
            
            // Dispatch market change event for sound
            document.dispatchEvent(new CustomEvent('marketChange', { 
                detail: { change: gameState.marketHealth - prevMarketHealth } 
            }));
            
            // Dispatch scandal change event for sound
            document.dispatchEvent(new CustomEvent('scandalChange', { 
                detail: { change: gameState.scandalLevel - prevScandalLevel } 
            }));
            
            return true;
        }
    },
    {
        id: 'positive_media_coverage',
        name: 'Positive Media Coverage',
        description: 'You received unexpectedly positive media coverage! Scandal level decreases and markets respond well.',
        condition: () => Math.random() < 0.2, // 20% chance
        effect: () => {
            // Positive media effects
            const prevMarketHealth = gameState.marketHealth;
            const marketBoost = 8;
            gameState.marketHealth = Math.min(100, gameState.marketHealth + marketBoost);
            
            // Scandal reduction
            const prevScandalLevel = gameState.scandalLevel;
            const scandalReduction = 12;
            gameState.scandalLevel = Math.max(0, gameState.scandalLevel - scandalReduction);
            
            // Wealth impact
            const wealthImpact = Math.floor(gameState.wealth * 0.05); // Gain 5%
            gameState.wealth += wealthImpact;
            
            showNotification(`Positive media coverage! Scandal reduced and markets respond favorably.`);
            
            // Dispatch market change event for sound
            document.dispatchEvent(new CustomEvent('marketChange', { 
                detail: { change: marketBoost } 
            }));
            
            // Dispatch scandal change event for sound
            document.dispatchEvent(new CustomEvent('scandalChange', { 
                detail: { change: -scandalReduction } 
            }));
            
            // Dispatch wealth change event for sound
            document.dispatchEvent(new CustomEvent('wealthChange', { 
                detail: { change: wealthImpact } 
            }));
            
            return true;
        }
    }
];

// Check for random events
function checkRandomEvents() {
    // Only process events if game is active
    if (gameState.isGameOver || gameState.isGameWon) return;
    
    // Check each event
    for (const event of eventDefinitions) {
        // Check if event condition is met
        if (event.condition()) {
            // Trigger event effect
            const eventTriggered = event.effect();
            
            // If event was triggered, we're done for this turn
            if (eventTriggered) {
                break;
            }
        }
    }
}

// Process events after each tweet
function processEventsAfterTweet() {
    // Random chance to trigger an event
    if (Math.random() < 0.3) { // 30% chance
        checkRandomEvents();
    }
}

// Process events at year end
function processYearEndEvents() {
    // Guaranteed event at year end
    checkRandomEvents();
    
    // Special year-end events
    if (gameState.year === 2) {
        // Mid-term elections
        if (gameState.scandalLevel > 50) {
            // Only increase scandal if it's already high
            showNotification('Mid-term elections! Your party lost some seats in Congress due to scandals.');
            gameState.scandalLevel = Math.min(100, gameState.scandalLevel + 5); // Reduced from 10 to 5
        } else {
            // If scandal is low, it's a positive event
            showNotification('Mid-term elections! Your party performed better than expected!');
            gameState.scandalLevel = Math.max(0, gameState.scandalLevel - 5);
            gameState.marketHealth = Math.min(100, gameState.marketHealth + 5);
        }
    } else if (gameState.year === 4) {
        // Re-election campaign
        showNotification('Re-election campaign! Just a few more days to maximize your wealth!');
        // No direct effect, just a warning that the game is almost over
    }
}

// Initialize events system
function initEvents() {
    // Set up any event-related initialization
    console.log('Events system initialized');
}
