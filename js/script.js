document.addEventListener('DOMContentLoaded', () => {
    const introText = document.querySelector('.typing-text');
    
    if (introText) {
        const mensagem = introText.textContent;
        introText.textContent = ''; 
        
        let i = 0;
        function digitar() {
            if (i < mensagem.length) {
                introText.textContent += mensagem.charAt(i);
                i++;
                setTimeout(digitar, 50); 
            }
        }
        digitar();
    }

    const btnIniciar = document.getElementById('iniciar');
    const btnInstrucoes = document.getElementById('instrucoes');
    const btnConfig = document.getElementById('configuracoes');
    const btnCreditos = document.getElementById('creditos');

    const playSound = (url) => {
        const audio = new Audio(url);
        audio.volume = 0.2;
        audio.play().catch(() => {});
    };

    if (btnIniciar) {
        btnIniciar.addEventListener('click', () => {
            localStorage.clear();
            localStorage.setItem('gameState', 'active');
            localStorage.setItem('startTime', new Date().getTime());

            document.body.style.opacity = '0';
            setTimeout(() => {
                window.location.href = 'pages/hub.html'; 
            }, 500);
        });
    }

    if (btnInstrucoes) {
        btnInstrucoes.addEventListener('click', () => {
            window.location.href = './pages/instrucoes.html';
        });
    }

    if (btnConfig) {
        btnConfig.addEventListener('click', () => {
            window.location.href = './pages/configuracoes.html';
        });
    }

    if (btnCreditos) {
        btnCreditos.addEventListener('click', () => {
            window.location.href = './pages/creditos.html';
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'w') {
            console.log("temos que tirar 8 pelo menos");
        }
    });
});