// Feito por Drey
export const configEstatica = {
    volumeBase: 0.05,
    volumeSpike: 0.6,
    tempoFade: 500
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
// Fim - Feito por Drey
