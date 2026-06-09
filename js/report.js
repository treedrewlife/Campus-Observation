import { tentarCorrigirAnomalia, getProgressoJogo } from './game.js';

const btnReportar = document.getElementById('btn-reportar');

btnReportar.addEventListener('click', () => {
    const painelExistente = document.getElementById('painel-reportar');

    if (painelExistente) {
        painelExistente.remove();
        return;
    }

    const painel = document.createElement('div');
    painel.id = 'painel-reportar';
    painel.className = 'painel-style';

    const btnObjeto = document.createElement('button');
    btnObjeto.textContent = 'Objeto';
    btnObjeto.className = 'btn-opcao';
    btnObjeto.dataset.tipo = "objeto";

    const btnAmbiente = document.createElement('button');
    btnAmbiente.textContent = 'Ambiente';
    btnAmbiente.className = 'btn-opcao';
    btnAmbiente.dataset.tipo = "ambiente";

    const btnCriatura = document.createElement('button');
    btnCriatura.className = 'btn-opcao';
    btnCriatura.dataset.tipo = "criatura";

    const progressoJanela = getProgressoJogo();

    btnCriatura.textContent =
        progressoJanela >= 0.6 ? 'criatura' : '???';

    painel.appendChild(btnObjeto);
    painel.appendChild(btnAmbiente);
    painel.appendChild(btnCriatura);

    btnReportar.parentNode.appendChild(painel);

    painel.addEventListener('click', (evento) => {
        if (evento.target.classList.contains('btn-opcao')) {
            const tipo = evento.target.dataset.tipo;
            tentarCorrigirAnomalia(tipo);
            if (acertou) {
             efeitoEstatica();
            }
            painel.remove();
        }
    });
});

function efeitoEstatica() {
    const overlay = document.getElementById("efeito-estatica");
    if (!overlay) return;

    overlay.classList.add("ativo");

    setTimeout(() => {
        overlay.classList.remove("ativo");
    }, 300); 
}
