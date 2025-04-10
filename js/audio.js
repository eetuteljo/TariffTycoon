/**
 * Tariff Tycoon: The Art of the Panic
 * Audio System
 */

// Audio state
const audioState = {
    enabled: true,
    soundsLoaded: false,
    sounds: {}
};

// Sound definitions
const soundDefinitions = [
    {
        id: 'tweet',
        src: 'tweet.mp3',
        volume: 0.7
    },
    {
        id: 'menu-click',
        src: 'menu-click.mp3',
        volume: 0.5
    },
    {
        id: 'game-start',
        src: 'game-start.mp3',
        volume: 0.8
    },
    {
        id: 'game-over',
        src: 'game-over.mp3',
        volume: 0.8
    },
    {
        id: 'game-win',
        src: 'game-win.mp3',
        volume: 0.8
    },
    {
        id: 'market-up',
        src: 'market-up.mp3',
        volume: 0.6
    },
    {
        id: 'market-down',
        src: 'market-down.mp3',
        volume: 0.6
    },
    {
        id: 'scandal',
        src: 'scandal.mp3',
        volume: 0.7
    },
    {
        id: 'money-gain',
        src: 'money-gain.mp3',
        volume: 0.6
    },
    {
        id: 'money-loss',
        src: 'money-loss.mp3',
        volume: 0.6
    },
    {
        id: 'crony-activate',
        src: 'crony-activate.mp3',
        volume: 0.7
    },
    {
        id: 'crony-unlock',
        src: 'crony-unlock.mp3',
        volume: 0.8
    },
    {
        id: 'notification',
        src: 'notification.mp3',
        volume: 0.5
    },
    {
        id: 'year-complete',
        src: 'year-complete.mp3',
        volume: 0.8
    }
];

// Initialize audio system
function initAudio() {
    // Create audio context if Web Audio API is available
    if (window.AudioContext || window.webkitAudioContext) {
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            audioState.audioContext = new AudioContext();
        } catch (e) {
            console.warn('Web Audio API is not supported in this browser');
        }
    }
    
    // Add audio toggle button to the game
    addAudioToggleButton();
    
    // Preload sounds
    preloadSounds();
    
    // Set up event listeners for audio
    setupAudioEventListeners();
}

// Add audio toggle button
function addAudioToggleButton() {
    // Create button element
    const audioButton = document.createElement('button');
    audioButton.id = 'audio-toggle';
    audioButton.className = 'audio-button';
    audioButton.innerHTML = '<span>🔊</span>';
    audioButton.title = 'Toggle Sound';
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .audio-button {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: rgba(0, 0, 0, 0.5);
            border: 2px solid #ffffff;
            color: #ffffff;
            font-size: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            z-index: 1000;
            transition: background-color 0.3s;
        }
        
        .audio-button:hover {
            background-color: rgba(0, 0, 0, 0.7);
        }
        
        .audio-button.muted span::after {
            content: '';
            position: absolute;
            width: 2px;
            height: 20px;
            background-color: #ff6b6b;
            transform: rotate(45deg);
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(audioButton);
    
    // Add event listener
    audioButton.addEventListener('click', toggleAudio);
}

// Toggle audio on/off
function toggleAudio() {
    audioState.enabled = !audioState.enabled;
    
    // Update button appearance
    const audioButton = document.getElementById('audio-toggle');
    if (!audioState.enabled) {
        audioButton.classList.add('muted');
    } else {
        audioButton.classList.remove('muted');
        
        // Resume audio context if it was suspended
        if (audioState.audioContext && audioState.audioContext.state === 'suspended') {
            audioState.audioContext.resume();
        }
    }
    
    // Play test sound if enabling
    if (audioState.enabled && audioState.soundsLoaded) {
        playSound('menu-click');
    }
}

// Preload all sounds
function preloadSounds() {
    // Check if Audio is supported
    if (!window.Audio) {
        console.warn('Audio is not supported in this browser');
        return;
    }
    
    // Create placeholder sounds with empty sources
    soundDefinitions.forEach(sound => {
        audioState.sounds[sound.id] = new Audio();
        audioState.sounds[sound.id].volume = sound.volume;
    });
    
    // Mark as loaded (we'll use placeholder sounds for now)
    audioState.soundsLoaded = true;
    
    // In a real game, you would load actual sound files:
    /*
    let loadedCount = 0;
    
    soundDefinitions.forEach(sound => {
        const audio = new Audio();
        
        audio.addEventListener('canplaythrough', () => {
            loadedCount++;
            if (loadedCount === soundDefinitions.length) {
                audioState.soundsLoaded = true;
                console.log('All sounds loaded');
            }
        });
        
        audio.addEventListener('error', () => {
            console.warn(`Error loading sound: ${sound.id}`);
            loadedCount++;
        });
        
        audio.src = `assets/sounds/${sound.src}`;
        audio.volume = sound.volume;
        audio.load();
        
        audioState.sounds[sound.id] = audio;
    });
    */
}

// Set up audio event listeners
function setupAudioEventListeners() {
    // Resume audio context on user interaction (required by some browsers)
    document.addEventListener('click', () => {
        if (audioState.audioContext && audioState.audioContext.state === 'suspended') {
            audioState.audioContext.resume();
        }
    }, { once: true });
    
    // Listen for game events to play appropriate sounds
    document.addEventListener('marketChange', (e) => {
        const change = e.detail.change;
        if (change > 0) {
            playSound('market-up');
        } else if (change < 0) {
            playSound('market-down');
        }
    });
    
    document.addEventListener('wealthChange', (e) => {
        const change = e.detail.change;
        if (change > 0) {
            playSound('money-gain');
        } else if (change < 0) {
            playSound('money-loss');
        }
    });
    
    document.addEventListener('scandalChange', () => {
        playSound('scandal');
    });
    
    document.addEventListener('notification', () => {
        playSound('notification');
    });
}

// Play a sound by ID
function playSound(id) {
    if (!audioState.enabled || !audioState.soundsLoaded) return;
    
    const sound = audioState.sounds[id];
    if (!sound) return;
    
    // For simple playback, clone the audio to allow overlapping sounds
    try {
        const clone = sound.cloneNode();
        clone.volume = sound.volume;
        clone.play().catch(e => console.warn(`Error playing sound: ${e.message}`));
    } catch (e) {
        // Fallback to simple play if cloning is not supported
        sound.currentTime = 0;
        sound.play().catch(e => console.warn(`Error playing sound: ${e.message}`));
    }
}

// Play a sound with custom parameters
function playSoundWithParams(id, volume, rate) {
    if (!audioState.enabled || !audioState.soundsLoaded) return;
    
    const sound = audioState.sounds[id];
    if (!sound) return;
    
    try {
        const clone = sound.cloneNode();
        clone.volume = volume !== undefined ? volume : sound.volume;
        
        if (rate !== undefined && clone.playbackRate !== undefined) {
            clone.playbackRate = rate;
        }
        
        clone.play().catch(e => console.warn(`Error playing sound: ${e.message}`));
    } catch (e) {
        // Fallback
        sound.currentTime = 0;
        sound.volume = volume !== undefined ? volume : sound.volume;
        
        if (rate !== undefined && sound.playbackRate !== undefined) {
            sound.playbackRate = rate;
        }
        
        sound.play().catch(e => console.warn(`Error playing sound: ${e.message}`));
    }
}

// Stop all sounds
function stopAllSounds() {
    if (!audioState.soundsLoaded) return;
    
    Object.values(audioState.sounds).forEach(sound => {
        try {
            sound.pause();
            sound.currentTime = 0;
        } catch (e) {
            console.warn(`Error stopping sound: ${e.message}`);
        }
    });
}

// Check if audio is enabled
function isAudioEnabled() {
    return audioState.enabled;
}

// Set audio enabled/disabled
function setAudioEnabled(enabled) {
    audioState.enabled = enabled;
    
    // Update button appearance
    const audioButton = document.getElementById('audio-toggle');
    if (audioButton) {
        if (!audioState.enabled) {
            audioButton.classList.add('muted');
        } else {
            audioButton.classList.remove('muted');
        }
    }
}
