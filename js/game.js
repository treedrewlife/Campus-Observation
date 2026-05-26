const SAVE_KEY = "game_state";

const estados = [
    "CONEXÃO_ESTÁVEL",
    "CONEXÃO_INSTÁVEL",
    "PERDA_DE_SINAL",
    "FORA_DO_AR"
];

let state = JSON.parse(localStorage.getItem(SAVE_KEY)) || {
    timer: {
        inicioReal: Date.now(),
        duracaoReal: 10 * 60 * 1000
    },
    ultimoUpdate: Date.now(),
    erros: 0,
    cameras: {
        camera1: null,
        camera2: null,
        camera3: null,
        camera4: null
    }
};

const CAM_ID = window.CAM_ID;

const img = document.getElementById("feed-camera");
const btn = document.getElementById("btn-reportar");

function salvar() {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    console.log("[GAME STATE]", state);
}

function atualizarTimer() {
    const agora = Date.now();
    const tempoPassado = agora - state.timer.inicioReal;

    const progresso = Math.min(
        tempoPassado / state.timer.duracaoReal,
        1
    );

    const minutosVirtuais = progresso * (5 * 60);

    const horas = Math.floor(minutosVirtuais / 60);
    const minutos = Math.floor(minutosVirtuais % 60);

    const timerEl = document.getElementById("timer");

    if (!timerEl) return;

    timerEl.innerText =
        String(horas).padStart(2, "0") +
        ":" +
        String(minutos).padStart(2, "0");
}

function atualizarStatus() {
    const el = document.getElementById("status-conexao");

    if (!el) return;

    const indice = Math.min(
        state.erros,
        estados.length - 1
    );

    el.textContent = estados[indice];

    if (estados[indice] === "FORA_DO_AR") {
        setTimeout(() => {
            window.location.href = "../index.html"; //mudar para tela de game over depois
        }, 1000);
    }
}

function registrarErro() {
    state.erros++;

    salvar();
    atualizarStatus();
}

function chanceAnomalia() {
    const base = dificuldadeTempo();
    const fator = state.erros * 0.015;
    const chance = Math.min(base + fator, 0.016);

    return Math.random() < chance;
}

export function renderCamera() {
    if (!img) return;

    const currentCam = window.CAM_ID;
    const anomalia = state.cameras[currentCam];

    const novoSrc = anomalia
        ? `../assets/imagem/anomalia/${currentCam}-${anomalia}.webp`
        : `../assets/imagem/camera/${currentCam}.webp`;

    const srcAtual = img.getAttribute("src");

    if (srcAtual !== novoSrc) {
        img.src = novoSrc;
    }
}

function updateWorld() {
    for (let cam in state.cameras) {
        if (cam === window.CAM_ID) continue;

        if (!state.cameras[cam] && chanceAnomalia()) {
            const random = Math.floor(Math.random() * 3) + 1;
            state.cameras[cam] = `anomalia${random}`;
        }
    }
}

function processarTempoOffline() {
    const agora = Date.now();

    const tempoPassado =
        agora - state.ultimoUpdate;

    const ticks =
        Math.floor(tempoPassado / 5000);

    if (ticks <= 0) return;

    for (let i = 0; i < ticks; i++) {
        updateWorld();
    }

    state.ultimoUpdate = agora;

    salvar();
}

function dificuldadeTempo() {
    const agora = Date.now();

    const tempoPassado =
        agora - state.timer.inicioReal;

    const progresso =
        tempoPassado / state.timer.duracaoReal;

    if (progresso < 0.3) {
        return 0.05;
    }

    if (progresso < 0.6) {
        return 0.10;
    }

    if (progresso < 0.9) {
        return 0.18;
    }

    return 0.30;
}

function verificarAnomaliasAtivas() {

    let total = 0;

    for (let cam in state.cameras) {

        if (state.cameras[cam]) {
            total++;
        }
    }

    if (total >= 3) {

        state.erros++;

        atualizarStatus();

        salvar();
    }

    if (total >= 4) {

        window.location.href =
            "../index.html";
    }
}

/*function xr_77() {

    const chance =
        Math.random() < 1.02;

    if (!chance) return;

    const flash =
        document.createElement("imagem");

    flash.src =
        "null";

    flash.style.position = "fixed";
    flash.style.top = "0";
    flash.style.left = "0";
    flash.style.width = "100vw";
    flash.style.height = "100vh";
    flash.style.zIndex = "99999";
    flash.style.objectFit = "cover";

    document.body.appendChild(flash);

    const som =
        new Audio("../imgs/alho.mp3");

    som.volume = 1;

    som.play();

    setTimeout(() => {
        flash.remove();
    }, 1010);
}*/

function init() {
    atualizarTimer();
    atualizarStatus();

    processarTempoOffline();

    updateWorld();
    renderCamera();

    salvar();

    setInterval(() => {
        processarTempoOffline();
        verificarAnomaliasAtivas();
        renderCamera();
    }, 55000);

    setInterval(() => {
        atualizarTimer();
    }, 1000);
}

export function tentarCorrigirAnomalia() {
    const currentCam = window.CAM_ID;
    if (state.cameras[currentCam]) {
        state.cameras[currentCam] = null;
        salvar();
        renderCamera();
    } else {
        registrarErro();
    }
}

init();