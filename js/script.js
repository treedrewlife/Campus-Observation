
document.addEventListener('DOMContentLoaded', () => {
    

    const introText = document.querySelector('.typing-text');
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

  
    const btnIniciar = document.getElementById('iniciar');
    const btnConfig = document.getElementById('configuracoes');
    const btnCreditos = document.getElementById('creditos');

   
    const playSound = (url) => {
        const audio = new Audio(url);
        audio.volume = 0.2;
        audio.play().catch(() => {});
    };


    btnIniciar.addEventListener('click', () => {
       
        localStorage.clear();
        localStorage.setItem('gameState', 'active');
        localStorage.setItem('startTime', new Date().getTime());

       
        document.body.style.opacity = '0';
        setTimeout(() => {
            window.location.href = './Pages/camera1.html'; 
        }, 500);
    });

    btnConfig.addEventListener('click', () => {
        alert("Configurações: Ajuste de volume e sensibilidade (Em breve)");
    });

    btnCreditos.addEventListener('click', () => {
        window.location.href = './Pages/creditos.html';
    });

    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'w') {
            console.log("temos que tirar 8 pelo menos");
        }
    });
});
