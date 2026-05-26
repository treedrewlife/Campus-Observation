import { renderCamera } from './game.js';

const controles = document.querySelector('.controles-camera');
const tituloCam = document.getElementById('cam-title');

const nomesCameras = {
    camera1: "CAM 01 - LAB 3.05",
    camera2: "CAM 02 - CORREDOR",
    camera3: "CAM 03 - BIBLIOTECA",
    camera4: "CAM 04 - REFEITÓRIO",
    camera5: "CAM 05 - ENTRADA PRINCIPAL",
    camera6: "CAM 06 - ESTACIONAMENTO"
};

controles.addEventListener('click', (evento) => {
    if (evento.target.classList.contains('btn-nav')) {
        const idCamera = evento.target.getAttribute('data-cam');
        window.CAM_ID = idCamera;

        const todosOsBotoes = evento.target.parentNode.children;
        for (let botao of todosOsBotoes) {
            botao.classList.remove('active');
        }
        evento.target.classList.add('active');

        if (tituloCam && nomesCameras[idCamera]) {
            tituloCam.textContent = nomesCameras[idCamera];
        }

        renderCamera();
    }
});