document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const errorMsg = document.getElementById('error-msg');
    const btnVoltar = document.getElementById('btn-voltar');
    const SENHA_SECRETA = '1234';

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        if (username !== '' && password === SENHA_SECRETA) {
            errorMsg.textContent = 'ACESSO CONCEDIDO... INICIANDO SISTEMA';
            errorMsg.style.color = '#00ff41';
            errorMsg.style.textShadow = '0 0 5px #00ff41';
            
            setTimeout(() => {
                localStorage.clear();
                localStorage.setItem('gameState', 'active');
                localStorage.setItem('startTime', new Date().getTime());
                
                document.body.style.opacity = '0';
                setTimeout(() => {
                    window.location.href = 'hub.html';
                }, 500);
            }, 1000);
        } else {
            errorMsg.textContent = 'ERRO: ACESSO NEGADO';
            errorMsg.style.color = '#ff003c';
            errorMsg.style.textShadow = '0 0 5px #ff003c';
            
            document.getElementById('password').value = '';
        }
    });

    btnVoltar.addEventListener('click', () => {
        window.location.href = '../index.html';
    });
});
