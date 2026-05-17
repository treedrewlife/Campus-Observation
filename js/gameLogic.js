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
    const cameraDisplay = document.getElementById('camera-container');
    const feedImage = document.getElementById('feed-camera');
    
    const urlParts = window.location.pathname.split('/');
    const currentPage = urlParts[urlParts.length - 1];
    let currentCamId = null;

    if (currentPage === 'camera1.html') currentCamId = 'cam1';
    else if (currentPage === 'camera2.html') currentCamId = 'cam2';
    else if (currentPage === 'camera3.html') currentCamId = 'cam3';
    else if (currentPage === 'camera4.html') currentCamId = 'cam4';

    const getCamerasState = () => {
        const state = localStorage.getItem('camerasState');
        if (state) {
            return JSON.parse(state);
        }
        return { cam1: false, cam2: false, cam3: false, cam4: false };
    };

    const saveCamerasState = (state) => {
        localStorage.setItem('camerasState', JSON.stringify(state));
    };

    const checkGameOver = (state) => {
        const activeCount = Object.values(state).filter(isAnomalous => isAnomalous).length;
        if (activeCount >= 4) {
            localStorage.setItem('gameState', 'gameover');
            window.location.href = '../pages/gameover.html';
        }
    };

    const fixAnomaly = (event) => {
        const hitbox = event.target;
        const parent = hitbox.parentNode;
        
        parent.removeChild(hitbox);
        feedImage.style.filter = 'none';

        const currentState = getCamerasState();
        if (currentCamId && currentState[currentCamId]) {
            currentState[currentCamId] = false;
            saveCamerasState(currentState);
        }
    };

    const renderAnomalyIfActive = () => {
        const currentState = getCamerasState();
        if (currentCamId && currentState[currentCamId]) {
            
            feedImage.style.filter = 'hue-rotate(90deg) saturate(200%)';
            
            const existingHitbox = document.getElementById('anomaly-hitbox');
            if (!existingHitbox) {
                const hitbox = document.createElement('div');
                hitbox.id = 'anomaly-hitbox';
                hitbox.style.position = 'absolute';
                hitbox.style.top = '30%';
                hitbox.style.left = '40%';
                hitbox.style.width = '100px';
                hitbox.style.height = '100px';
                hitbox.style.cursor = 'crosshair';
                hitbox.style.backgroundColor = 'rgba(255, 0, 0, 0.3)'; 
                
                hitbox.addEventListener('click', fixAnomaly);
                
                cameraDisplay.appendChild(hitbox);
            }
        }
    };

    const raffleAnomaly = () => {
        const currentState = getCamerasState();
        const availableCams = Object.keys(currentState).filter(cam => !currentState[cam]);
        
        if (availableCams.length > 0) {
            const chance = Math.random();
            if (chance > 0.6) { 
                const randomCam = availableCams[Math.floor(Math.random() * availableCams.length)];
                currentState[randomCam] = true;
                saveCamerasState(currentState);
                checkGameOver(currentState);
                renderAnomalyIfActive();
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
    };

    setInterval(() => {
        updateClock();
    }, 1000);

    setInterval(() => {
        raffleAnomaly();
    }, 5000);

    renderAnomalyIfActive();
    updateClock();
});
