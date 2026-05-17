document.addEventListener('DOMContentLoaded', () => {
    const gameState = localStorage.getItem('gameState');
    
    if (gameState === 'gameover') {
        window.location.href = '../pages/gameover.html';
        return;
    }

    if (gameState === 'victory') {
        window.location.href = '../pages/vitoria.html';
        return;
    }

    const startTime = parseInt(localStorage.getItem('startTime'), 10);
    if (!startTime) {
        window.location.href = '../index.html';
        return;
    }

    const clockElement = document.getElementById('relogio-digital');
    const feedImage = document.getElementById('feed-camera');
    const feedStatus = document.getElementById('feed-status');
    const minimapContainer = document.getElementById('minimap-container');
    const btnConsertar = document.getElementById('btn-consertar');
    
    const urlParts = window.location.pathname.split('/');
    const currentPage = urlParts[urlParts.length - 1];
    let currentCamId = null;

    if (currentPage === 'camera1.html') currentCamId = 'cam1';
    else if (currentPage === 'camera2.html') currentCamId = 'cam2';
    else if (currentPage === 'camera3.html') currentCamId = 'cam3';
    else if (currentPage === 'camera4.html') currentCamId = 'cam4';
    else if (currentPage === 'camera5.html') currentCamId = 'cam5';
    else if (currentPage === 'camera6.html') currentCamId = 'cam6';

    const camCoordinates = {
        cam1: { top: '10%', left: '10%' },
        cam2: { top: '50%', left: '40%' },
        cam3: { top: '80%', left: '10%' },
        cam4: { top: '10%', left: '80%' },
        cam5: { top: '80%', left: '80%' },
        cam6: { top: '50%', left: '80%' }
    };

    const getCamerasState = () => {
        const state = localStorage.getItem('camerasState');
        if (state) {
            return JSON.parse(state);
        }
        // false = limpo. Se tiver anomalia, o valor será um timestamp (número). Se consertando, "repairing_timestamp"
        return { cam1: false, cam2: false, cam3: false, cam4: false, cam5: false, cam6: false };
    };

    const saveCamerasState = (state) => {
        localStorage.setItem('camerasState', JSON.stringify(state));
    };

    const checkGameOver = (activeCount) => {
        if (activeCount >= 4) {
            localStorage.setItem('gameState', 'gameover');
            window.location.href = '../pages/gameover.html';
        }
    };

    const updateUI = () => {
        let currentState = getCamerasState();
        let stateChanged = false;
        
        // Verifica todos os estados de conserto em andamento (Opção C)
        Object.keys(currentState).forEach(camId => {
            const val = currentState[camId];
            if (typeof val === 'string' && val.startsWith('repairing_')) {
                const repairStart = parseInt(val.split('_')[1], 10);
                const elapsedRepair = new Date().getTime() - repairStart;
                if (elapsedRepair >= 5000) { // 5 segundos para consertar
                    currentState[camId] = false;
                    stateChanged = true;
                }
            }
        });

        if (stateChanged) {
            saveCamerasState(currentState);
        }

        const activeCount = Object.values(currentState).filter(val => val !== false).length;
        checkGameOver(activeCount);
        
        if (feedStatus) {
            feedStatus.className = '';
            if (activeCount === 0) {
                feedStatus.textContent = 'FEED_ESTÁVEL';
                feedStatus.classList.add('status-green');
            } else if (activeCount === 1) {
                feedStatus.textContent = 'ALERTA: 1 ANOMALIA DETECTADA';
                feedStatus.classList.add('status-yellow');
            } else if (activeCount === 2) {
                feedStatus.textContent = 'ALERTA: 2 ANOMALIAS DETECTADAS';
                feedStatus.classList.add('status-orange');
            } else if (activeCount >= 3) {
                feedStatus.textContent = 'CRÍTICO: MULTIPLAS ANOMALIAS';
                feedStatus.classList.add('status-red');
            }
        }
        
        if (minimapContainer) {
            while (minimapContainer.firstChild) {
                minimapContainer.removeChild(minimapContainer.firstChild);
            }
            
            // Indicador de qual câmera o jogador está acessando (Ponto Verde)
            if (currentCamId && camCoordinates[currentCamId]) {
                const playerDot = document.createElement('div');
                playerDot.classList.add('minimap-player');
                playerDot.style.top = camCoordinates[currentCamId].top;
                playerDot.style.left = camCoordinates[currentCamId].left;
                playerDot.title = 'VOCÊ ESTÁ AQUI (' + currentCamId.toUpperCase() + ')';
                minimapContainer.appendChild(playerDot);
            }
            
            // Indicador de Anomalias (Ponto Vermelho ou Amarelo)
            Object.keys(currentState).forEach(camId => {
                if (currentState[camId] !== false) {
                    const alertDot = document.createElement('div');
                    alertDot.classList.add('minimap-alert');
                    alertDot.style.top = camCoordinates[camId].top;
                    alertDot.style.left = camCoordinates[camId].left;
                    
                    if (typeof currentState[camId] === 'string' && currentState[camId].startsWith('repairing_')) {
                        alertDot.style.backgroundColor = '#ffff00'; 
                    }
                    
                    alertDot.title = camId.toUpperCase();
                    minimapContainer.appendChild(alertDot);
                }
            });
        }
        
        const cameraContainer = document.getElementById('camera-container');
        const currentVal = currentState[currentCamId];

        if (currentCamId && currentVal !== false && feedImage) {
            
            if (typeof currentVal === 'string' && currentVal.startsWith('repairing_')) {
                // Modo Conserto (Opção C aguardando tempo)
                feedImage.style.filter = 'brightness(0) sepia(1) hue-rotate(180deg)'; // Tela zoada de conserto
                if (btnConsertar) {
                    btnConsertar.textContent = 'CONSERTANDO...';
                    btnConsertar.disabled = true;
                    btnConsertar.style.opacity = '0.5';
                }
                const oldPlaceholder = document.getElementById('anomaly-placeholder');
                if (oldPlaceholder && cameraContainer) cameraContainer.removeChild(oldPlaceholder);
                
            } else {
                // Anomalia Ativa
                feedImage.style.filter = 'hue-rotate(90deg) saturate(200%)';
                
                const anomalyStart = currentVal;
                const elapsed = new Date().getTime() - anomalyStart;
                
                if (elapsed < 10000) {
                    // Anomalia recente (Hitbox ativa, Botão desativado)
                    if (btnConsertar) {
                        btnConsertar.textContent = 'SISTEMA BLOQUEADO';
                        btnConsertar.disabled = true;
                        btnConsertar.style.opacity = '0.5';
                    }
                    
                    if (cameraContainer && !document.getElementById('anomaly-placeholder')) {
                        const placeholder = document.createElement('div');
                        placeholder.id = 'anomaly-placeholder';
                        placeholder.style.position = 'absolute';
                        placeholder.style.width = '100px';
                        placeholder.style.height = '100px';
                        placeholder.style.backgroundColor = 'rgba(255, 0, 0, 0.4)';
                        placeholder.style.border = '2px dashed #ff003c';
                        placeholder.style.top = '35%';
                        placeholder.style.left = '45%';
                        placeholder.style.zIndex = '12';
                        placeholder.style.cursor = 'crosshair';
                        placeholder.style.pointerEvents = 'auto'; // Clicavel!
                        
                        // Hitbox click - Conserto Instantâneo
                        placeholder.onclick = () => {
                            let state = getCamerasState();
                            state[currentCamId] = false;
                            saveCamerasState(state);
                            updateUI();
                        };
                        
                        cameraContainer.appendChild(placeholder);
                    }
                } else {
                    // Passou 10 segundos, anomalia corrompeu a câmera! (Hitbox some, Botão ativa)
                    if (btnConsertar) {
                        btnConsertar.textContent = 'CONSERTAR CÂMERA';
                        btnConsertar.disabled = false;
                        btnConsertar.style.opacity = '1';
                    }
                    const oldPlaceholder = document.getElementById('anomaly-placeholder');
                    if (oldPlaceholder && cameraContainer) cameraContainer.removeChild(oldPlaceholder);
                }
            }
            
        } else if (feedImage) {
            feedImage.style.filter = 'grayscale(0.3) contrast(1.2) brightness(0.8)';
            if (btnConsertar) {
                btnConsertar.textContent = 'CONSERTAR CÂMERA';
                btnConsertar.disabled = true; // Não tem o que consertar
                btnConsertar.style.opacity = '0.5';
            }
            if (cameraContainer) {
                const placeholder = document.getElementById('anomaly-placeholder');
                if (placeholder) {
                    cameraContainer.removeChild(placeholder);
                }
            }
        }
    };

    if (btnConsertar) {
        btnConsertar.addEventListener('click', () => {
            const currentState = getCamerasState();
            const currentVal = currentState[currentCamId];
            
            // Só pode usar o botão se a anomalia for antiga (>10s)
            if (currentCamId && currentVal !== false && typeof currentVal === 'number') {
                const elapsed = new Date().getTime() - currentVal;
                if (elapsed >= 10000) {
                    // Inicia o processo de conserto (Opção C)
                    currentState[currentCamId] = 'repairing_' + new Date().getTime();
                    saveCamerasState(currentState);
                    updateUI();
                }
            }
        });
    }

    const raffleAnomaly = () => {
        const currentState = getCamerasState();
        const availableCams = Object.keys(currentState).filter(cam => currentState[cam] === false);
        
        if (availableCams.length > 0) {
            const chance = Math.random();
            if (chance > 0.6) { 
                const randomCam = availableCams[Math.floor(Math.random() * availableCams.length)];
                currentState[randomCam] = new Date().getTime(); // Salva o tempo atual em vez de só 'true'
                saveCamerasState(currentState);
                updateUI();
            }
        }
    };

    const updateClock = () => {
        const now = new Date().getTime();
        const elapsedMs = now - startTime;
        
        const inGameMinutes = Math.floor(elapsedMs / 1000); 
        
        let hours = Math.floor(inGameMinutes / 60);
        let minutes = inGameMinutes % 60;

        if (hours >= 6) {
            localStorage.setItem('gameState', 'victory');
            window.location.href = '../pages/vitoria.html';
            return;
        }

        const displayHours = hours.toString().padStart(2, '0');
        const displayMinutes = minutes.toString().padStart(2, '0');
        
        if (clockElement) {
            clockElement.textContent = `${displayHours}:${displayMinutes} AM`;
        }
        
        // Atualiza a UI a cada segundo para verificar os timers das anomalias!
        updateUI();
    };

    // Atualiza relógio e UI a cada 1 segundo
    setInterval(() => {
        updateClock();
    }, 1000);

    // Sorteio a cada 5 segundos
    setInterval(() => {
        raffleAnomaly();
    }, 5000);

    updateUI();
    updateClock();
});
