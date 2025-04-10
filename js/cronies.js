/**
 * Tariff Tycoon: The Art of the Panic
 * Crony Card System
 */

// Crony definitions - Based on parody versions of real Trump associates
const cronyDefinitions = [
    {
        id: 'jared',
        name: 'Jared Kushcoin',
        ability: 'Trades crypto on inside info',
        description: 'Boosts your wealth when markets are unstable',
        portrait: 'jared.png',
        unlocked: false,
        wealthBoost: 100,
        marketBoost: 0,
        reducesScandal: false
    },
    {
        id: 'ivanka',
        name: 'Ivankapital',
        ability: 'Bails out fashion stocks',
        description: 'Stabilizes market during downturns',
        portrait: 'ivanka.png',
        unlocked: false,
        wealthBoost: 50,
        marketBoost: 10,
        reducesScandal: false
    },
    {
        id: 'mnuchin',
        name: 'Mnuchman',
        ability: 'Buys treasury bonds before panic',
        description: 'Massive wealth boost during market crashes',
        portrait: 'mnuchin.png',
        unlocked: false,
        wealthBoost: 150,
        marketBoost: 0,
        reducesScandal: false
    },
    {
        id: 'barr',
        name: 'Attorney Generule',
        ability: 'Covers up scandals',
        description: 'Reduces scandal impact of tweets',
        portrait: 'barr.png',
        unlocked: false,
        wealthBoost: 0,
        marketBoost: 0,
        reducesScandal: true
    },
    {
        id: 'devos',
        name: 'Betsy DeVoucher',
        ability: 'Privatizes everything',
        description: 'Converts market drops to wealth gains',
        portrait: 'devos.png',
        unlocked: false,
        wealthBoost: 80,
        marketBoost: -5,
        reducesScandal: false
    },
    {
        id: 'ross',
        name: 'Uncle Wilbur',
        ability: 'Shorts stocks before tariffs',
        description: 'Generates wealth when you impose tariffs',
        portrait: 'ross.png',
        unlocked: false,
        wealthBoost: 120,
        marketBoost: 0,
        reducesScandal: false
    },
    {
        id: 'carson',
        name: 'Dr. Sleepy',
        ability: 'Naps through scandals',
        description: 'Reduces scandal level and slightly boosts wealth',
        portrait: 'carson.png',
        unlocked: false,
        wealthBoost: 30,
        marketBoost: 0,
        reducesScandal: true
    },
    {
        id: 'pompeo',
        name: 'Pompous Rex',
        ability: 'Diplomatic immunity',
        description: 'Boosts market health during international incidents',
        portrait: 'pompeo.png',
        unlocked: false,
        wealthBoost: 0,
        marketBoost: 15,
        reducesScandal: false
    }
];

// Initialize cronies
function initCronies() {
    // Copy definitions to game state
    gameState.cronies = JSON.parse(JSON.stringify(cronyDefinitions));
    
    // Unlock first crony (Jared)
    gameState.cronies[0].unlocked = true;
    
    // Set up crony card event listeners
    document.getElementById('crony-cards').addEventListener('click', handleCronyClick);
    
    // Update crony UI
    updateCronyUI();
}

// Reset cronies to initial state
function resetCronies() {
    // Reset all cronies to locked except the first one
    gameState.cronies.forEach((crony, index) => {
        crony.unlocked = index === 0;
    });
    
    // Reset active crony
    gameState.activeCrony = null;
    
    // Update UI
    updateCronyUI();
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
                <div class="crony-portrait" style="background-image: url('assets/images/cronies/${crony.portrait}')"></div>
                <div class="crony-name">${crony.name}</div>
                <div class="crony-ability">${crony.ability}</div>
            `;
            
            cronyContainer.appendChild(cronyCard);
        }
    });
}

// Handle crony card click
function handleCronyClick(event) {
    // Find the clicked crony card
    let target = event.target;
    while (target && !target.classList.contains('crony-card')) {
        target = target.parentElement;
    }
    
    if (!target) return;
    
    // Get crony ID
    const cronyId = target.dataset.cronyId;
    
    // Find crony in game state
    const crony = gameState.cronies.find(c => c.id === cronyId);
    
    if (crony) {
        // Set as active crony
        gameState.activeCrony = crony;
        
        // Show notification
        showNotification(`${crony.name} activated: ${crony.description}`);
        
        // Play sound
        playSound('crony-activate');
        
        // Update UI
        updateCronyUI();
    }
}

// Unlock a random crony
function unlockRandomCrony() {
    // Get all locked cronies
    const lockedCronies = gameState.cronies.filter(crony => !crony.unlocked);
    
    if (lockedCronies.length === 0) return; // All cronies unlocked
    
    // Select a random locked crony
    const randomCrony = lockedCronies[Math.floor(Math.random() * lockedCronies.length)];
    
    // Unlock the crony
    const cronyIndex = gameState.cronies.findIndex(c => c.id === randomCrony.id);
    gameState.cronies[cronyIndex].unlocked = true;
    
    // Show notification
    showNotification(`New crony unlocked: ${randomCrony.name}!`);
    
    // Play sound
    playSound('crony-unlock');
    
    // Update UI
    updateCronyUI();
}

// Get a crony by ID
function getCronyById(id) {
    return gameState.cronies.find(crony => crony.id === id);
}

// Check if a crony is unlocked
function isCronyUnlocked(id) {
    const crony = getCronyById(id);
    return crony ? crony.unlocked : false;
}

// Activate a crony by ID
function activateCrony(id) {
    const crony = getCronyById(id);
    
    if (crony && crony.unlocked) {
        gameState.activeCrony = crony;
        updateCronyUI();
        return true;
    }
    
    return false;
}
