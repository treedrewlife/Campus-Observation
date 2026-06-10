import { acionarJumpscare } from './jumpscare.js'; 
import { dispararEstatica } from './estatica.js'; 

const SAVE_KEY = "game_state";

const sinais = [
    { texto: "SIGNAL ▮▮▮", classe: "signal-good" },
    { texto: "SIGNAL ▮▮▯", classe: "signal-warning" },
    { texto: "SIGNAL ▮▯▯", classe: "signal-danger" },
    { texto: "SIGNAL ▯▯▯", classe: "signal-dead" }
];

let state = JSON.parse(localStorage.getItem(SAVE_KEY)) || {
    timer: {
        inicioReal: Date.now(),
        duracaoReal: 8 * 60 * 1000
    },
    ultimoUpdate: Date.now(),
    erros: 0,
    tempoAcumulado: 0,
    cameras: {
        camera1: null,
        camera2: null,
        camera3: null,
        camera4: null,
        camera5: null,
        camera6: null
    }
};

window.CAM_ID = window.CAM_ID || "camera1";

const img = document.getElementById("feed-camera");


// ----------------

function salvar() {
    try {
        localStorage.setItem(SAVE_KEY, JSON.stringify(state));
        return true;
    } catch {
        return false;
    }
}


// ----------------

function atualizarTimer() {
    const timerEl = document.getElementById("timer");
    if (!timerEl) return;

    const progresso = Math.min(
        (Date.now() - state.timer.inicioReal) /
        state.timer.duracaoReal,
        1
    );

    if (progresso >= 1) {
        timerEl.textContent = "7 AM";
        victory();
        return;
    }

    const horaVirtual = Math.floor(progresso * 8);

    const horas = ["11 PM","12 AM","1 AM","2 AM","3 AM","4 AM","5 AM","6 AM","7 AM"];

    timerEl.textContent = horas[Math.min(horas.length - 1, horaVirtual)];
}


// ----------------

function getIndiceSinal() {
    return Math.min(state.erros, sinais.length - 1);
}

function atualizarStatus() {
    const el = document.getElementById("status-conexao");
    if (!el) return;

    const indice = getIndiceSinal();
    const sinal = sinais[indice];

    el.textContent = sinal.texto;
    el.className = sinal.classe;

    if (indice === sinais.length - 1) {
        setTimeout(gameOver, 1000);
    }
}

function registrarErro() {
    state.erros = Math.min(
        state.erros + 1,
        sinais.length - 1
    );

    atualizarStatus();
    salvar();

    return state.erros;
}


// ----------------

const ANOMALIAS = {
    1: "objeto",
    2: "objeto",
    3: "ambiente",
    4: "ambiente",
    5: "criatura",
    6: "criatura"
};


function dificuldadeTempo() {
    const progresso =
        (Date.now() - state.timer.inicioReal) /
        state.timer.duracaoReal;

    if (progresso < 0.3) return 0.05;
    if (progresso < 0.6) return 0.10;
    if (progresso < 0.9) return 0.20;
    return 0.30;
}

function chanceAnomalia() {
    const CHANCE_POR_ERRO = 0.03;
    const CHANCE_MAX = 1;
    const roll = Math.random();
    const base = dificuldadeTempo();
    const fatorErro = Math.min(state.erros * CHANCE_POR_ERRO, 0.25);
    const chance = Math.min(base + fatorErro, CHANCE_MAX);
    const ruido = (Math.random() - 0.5) * 0.05;

    const chanceFinal = Math.min(1, Math.max(0, chance + ruido));

    return roll < chanceFinal;
}

function updateWorld() {
    const progresso = (Date.now() - state.timer.inicioReal) / state.timer.duracaoReal;

    const camerasVazias = Object.keys(state.cameras).filter(cam => state.cameras[cam] === null);
    if (camerasVazias.length === 0) return;

    if (progresso < 0.10) return;

    if (chanceAnomalia()) {
        const camAleatoria = camerasVazias[Math.floor(Math.random() * camerasVazias.length)];

        let pool;

        if (progresso < 0.3) pool = [1, 2];
        else if (progresso < 0.6) pool = [1, 2, 3, 4];
        else pool = [1, 2, 3, 4, 5, 6];

        const id = pool[Math.floor(Math.random() * pool.length)];

        state.cameras[camAleatoria] = {
        id,
        tipo: ANOMALIAS[id]
        };
    }
}


// ----------------

function processarTempoOffline() {
    const agora = Date.now();
    const tempoPassado = agora - state.ultimoUpdate;

    const ticks = Math.min(5, Math.floor(tempoPassado / 5000));
    if (ticks <= 0) return;

    for (let i = 0; i < ticks; i++) {
        updateWorld();
    }

    state.ultimoUpdate = agora;
    salvar();
}


// ----------------

let tempoAcumulado = 0;

function verificarAnomaliasAtivas() {
    let total = 0;

    for (let cam in state.cameras) {
        if (state.cameras[cam]) total++;
    }

    if (total >= 3) {
        tempoAcumulado += 3000;

        if (tempoAcumulado >= 15000) {
            registrarErro();
            tempoAcumulado = 0;
        }

    if (total >= 5 && criaturaLiberada()) {
        acionarJumpscare(); 
        }
    } else {
        tempoAcumulado = 0;
    }

}


// ----------------

function getCameraSrc(camId, data) {
    const base = "../assets/images";

    return data
        ? `${base}/anomalias/${camId}-anomalia${data.id}.webp`
        : `${base}/cameras/${camId}.webp`;
}

function renderCamera() {
    if (!img) return;

    const camId = window.CAM_ID;
    const data = state.cameras[camId];

    const src = getCameraSrc(camId, data);

    if (img.getAttribute("src") === src) return;

    img.src = src;
}


// ----------------

export function tentarCorrigirAnomalia(tipoSelecionado) {
    const camId = window.CAM_ID;
    const data = state.cameras[camId];

    if (!data) {
        dispararEstatica();
        registrarErro();
        return false;
    }

    if (data.tipo === tipoSelecionado) {
        state.cameras[camId] = null;
        dispararEstatica();
        salvar();
        renderCamera();
        return true;
    } else {
        dispararEstatica();
        registrarErro();
        return false;
    }
}

 export function getProgressoJogo() {
    return (
        (Date.now() - state.timer.inicioReal) /
        state.timer.duracaoReal
    );
}

// ----------------

function criaturaLiberada() {
    const progresso =
        (Date.now() - state.timer.inicioReal) /
        state.timer.duracaoReal;
    return progresso >= 0.5;
}

let gameFinished = false;

function gameOver() {
    if (gameFinished) return;
    gameFinished = true;
    localStorage.removeItem("game_state");
    if (criaturaLiberada()) {
        acionarJumpscare();
    } else {
        window.permitirSaida = true;
        window.location.href = "../Pages/Gameover.html";
    }
}

function victory() {
    if (gameFinished) return;
    gameFinished = true;
    window.permitirSaida = true;
    window.location.href = "../Pages/Vitoria.html";
}

// ----------------

const nomesCameras = {
    camera1: "CAM 01 - LAB 3.05",
    camera2: "CAM 02 - CORREDOR",
    camera3: "CAM 03 - BIBLIOTECA",
    camera4: "CAM 04 - ESCADA",
    camera5: "CAM 05 - ESCADA 2",
    camera6: "CAM 06 - ENTRADA AUDITÓRIO"
};

function initCameraControls() {
    const controles = document.querySelector('.controles-camera');
    const tituloCam = document.getElementById('cam-title');

    if (!controles) return;

    controles.addEventListener('click', (evento) => {
        if (!evento.target.classList.contains('btn-nav')) return;

        const idCamera = evento.target.getAttribute('data-cam');
        window.CAM_ID = idCamera;

      
        const botoes = controles.querySelectorAll('.btn-nav');
        botoes.forEach(botao => botao.classList.remove('active'));

        evento.target.classList.add('active');

        if (tituloCam && nomesCameras[idCamera]) {
            tituloCam.textContent = nomesCameras[idCamera];
        }

        renderCamera();

        
    });
}

// ----------------

function init() {
    const savedNoise = localStorage.getItem("game_noise_opacity");
    if (savedNoise !== null) {
        document.documentElement.style.setProperty("--static-base-opacity", savedNoise);
    }

    atualizarTimer();
    atualizarStatus();
    processarTempoOffline();
    initCameraControls();
    updateWorld();
    renderCamera();
    salvar();

    setInterval(() => {
        updateWorld();
        verificarAnomaliasAtivas();
        state.ultimoUpdate = Date.now();
        salvar();
    }, 3000);

    setInterval(atualizarTimer, 1000);
}

init();
