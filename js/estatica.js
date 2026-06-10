const savedVolume = localStorage.getItem('game_volume');
const volumeFactor = savedVolume !== null ? parseFloat(savedVolume) : 1.0;

export const configEstatica = {
    volumeBase: 0.01 * volumeFactor,
    volumeSpike: 0.03 * volumeFactor,
    tempoFade: 300
};

let fadeAudioInterval;

export function inicializarEstatica() {
    const staticAudio = document.getElementById('static-audio');
    if (staticAudio) {
        staticAudio.volume = configEstatica.volumeBase;
    }
}

export function dispararEstatica() {
    const staticOverlay = document.getElementById('static-overlay');
    const staticAudio = document.getElementById('static-audio');

    if (staticOverlay) {
        staticOverlay.classList.add('spike');
        void staticOverlay.offsetWidth; 
        staticOverlay.classList.remove('spike');
    }

    if (staticAudio) {
        staticAudio.volume = configEstatica.volumeSpike;
        clearInterval(fadeAudioInterval);

        const steps = 20;
        const stepTime = configEstatica.tempoFade / steps;
        const volumeStep = (configEstatica.volumeSpike - configEstatica.volumeBase) / steps;

        fadeAudioInterval = setInterval(() => {
            if (staticAudio.volume > configEstatica.volumeBase + volumeStep) {
                staticAudio.volume -= volumeStep;
            } else {
                staticAudio.volume = configEstatica.volumeBase;
                clearInterval(fadeAudioInterval);
            }
        }, stepTime);
    }
}

