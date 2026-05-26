import { tentarCorrigirAnomalia } from './game.js';

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

    const btnAmbiente = document.createElement('button');
    btnAmbiente.textContent = 'Ambiente';
    btnAmbiente.className = 'btn-opcao';

    const btnCriatura = document.createElement('button');
    btnCriatura.className = 'btn-opcao';

    const progressoJanela = 0.7; 

    if (progressoJanela >= 0.6) {
        btnCriatura.textContent = 'Criatura';
    } else {
        btnCriatura.textContent = '???';
    }

    painel.appendChild(btnObjeto);
    painel.appendChild(btnAmbiente);
    painel.appendChild(btnCriatura);
    
    btnReportar.parentNode.appendChild(painel);

    painel.addEventListener('click', (evento) => {
        if (evento.target.classList.contains('btn-opcao')) {
            
            tentarCorrigirAnomalia();
            
            painel.remove();
        }
    });
});