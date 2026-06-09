document.addEventListener('DOMContentLoaded', () => {
    const configForm = document.getElementById('config-form');
    const volumeControl = document.getElementById('volume-control');
    const volumeValue = document.getElementById('volume-value');
    const noiseOpacity = document.getElementById('noise-opacity');
    const noiseValue = document.getElementById('noise-value');
    const saveStatus = document.getElementById('save-status');
    const btnVoltar = document.getElementById('btn-voltar');

    const loadSettings = () => {
        const savedVolume = localStorage.getItem('game_volume');
        const savedNoise = localStorage.getItem('game_noise_opacity');

        if (savedVolume !== null) {
            const volPct = Math.round(parseFloat(savedVolume) * 100);
            volumeControl.value = volPct;
            volumeValue.textContent = `${volPct}%`;
        } else {
            volumeControl.value = 50;
            volumeValue.textContent = '50%';
        }

        if (savedNoise !== null) {
            const noisePct = Math.round(parseFloat(savedNoise) * 100);
            noiseOpacity.value = noisePct;
            noiseValue.textContent = `${noisePct}%`;
        } else {
            noiseOpacity.value = 15;
            noiseValue.textContent = '15%';
        }
    };

    volumeControl.addEventListener('input', (e) => {
        volumeValue.textContent = `${e.target.value}%`;
    });

    noiseOpacity.addEventListener('input', (e) => {
        noiseValue.textContent = `${e.target.value}%`;
    });


    configForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const volVal = parseFloat(volumeControl.value) / 100;
        const noiseVal = parseFloat(noiseOpacity.value) / 100;

        localStorage.setItem('game_volume', volVal);
        localStorage.setItem('game_noise_opacity', noiseVal);

        saveStatus.style.color = '#00ff88';
        saveStatus.textContent = '> CONFIGURAÇÕES APLICADAS NO TERMINAL... [OK]';

        setTimeout(() => {
            saveStatus.textContent = '> REDIRECIONANDO AO COCKPIT...';
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 600);
        }, 1200);
    });

    btnVoltar.addEventListener('click', () => {
        window.location.href = '../index.html';
    });

    const btnLimpar = document.getElementById('btn-limpar-dados');
    if (btnLimpar) {
        btnLimpar.addEventListener('click', () => {
            if (confirm('DESEJA LIMPAR TODAS AS CONFIGURAÇÕES E DADOS DO LOCAL STORAGE?')) {
                localStorage.clear();
                saveStatus.style.color = '#ff003c';
                saveStatus.textContent = '> SISTEMA LIMPO. REINICIANDO TERMINAL...';
                setTimeout(() => {
                    window.location.href = '../index.html';
                }, 1500);
            }
        });
    }

    loadSettings();
});
