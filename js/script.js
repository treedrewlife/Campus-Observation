// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Efeito de Digitação no parágrafo de introdução
    const introText = document.querySelector('.typing-text');
    const mensagem = introText.textContent;
    introText.textContent = ''; // Limpa para começar o efeito
    
    let i = 0;
    function digitar() {
        if (i < mensagem.length) {
            introText.textContent += mensagem.charAt(i);
            i++;
            setTimeout(digitar, 50); // Velocidade da digitação
        }
    }
    digitar();

    // 2. Seleção dos botões
    const btnIniciar = document.getElementById('iniciar');
    const btnConfig = document.getElementById('configuracoes');
    const btnCreditos = document.getElementById('creditos');

    // 3. Funções de Áudio (Feedback Visual e Sonoro)
    // Dica: use arquivos .mp3 curtos de 0.1s
    const playSound = (url) => {
        const audio = new Audio(url);
        audio.volume = 0.2;
        audio.play().catch(() => {}); // Catch evita erro se o navegador bloquear áudio sem interação
    };

    // 4. Eventos de Clique
    btnIniciar.addEventListener('click', () => {
        // Resetando o estado do jogo no localStorage
        localStorage.clear();
        localStorage.setItem('gameState', 'active');
        localStorage.removeItem("evento_timer");
        //localStorage.setItem('startTime', new Date().getTime());
        localStorage.setItem("erros", 0);

        // Efeito visual antes de sair
        document.body.style.opacity = '0';
        setTimeout(() => {
            window.location.href = '../Pages/hub.html'; // Ajuste o caminho conforme sua pasta
        }, 500);
    });

    btnConfig.addEventListener('click', () => {
        alert("Configurações: Ajuste de volume e sensibilidade (Em breve)");
    });

    btnCreditos.addEventListener('click', () => {
        window.location.href = './Pages/creditos.html';
    });

    // 5. Easter Egg ou Interatividade extra (Vibe Hacker)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'w') {
            console.log("ACESSO AO LOG DO SISTEMA: Erro na Câmera 04...");
        }
    });
});