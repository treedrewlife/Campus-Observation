function bloquearSaida(evento) {
    if (window.permitirSaida) return;
    evento.preventDefault();
    evento.returnValue = ''; 
}

document.addEventListener('DOMContentLoaded', () => {

    window.permitirSaida = false;

    document.addEventListener('contextmenu', (evento) => {
        evento.preventDefault();
    });

    document.addEventListener('keydown', (evento) => {
        const bloqueados = [
            'F12',
            'F5'
        ];

        if (bloqueados.includes(evento.key)) {
            evento.preventDefault();
        }

        if (evento.ctrlKey) {
            if (evento.key === 'r' || evento.key === 'R' || 
                evento.key === 'u' || evento.key === 'U') {
                evento.preventDefault();
            }
            if (evento.shiftKey && (evento.key === 'i' || evento.key === 'I' || evento.key === 'j' || evento.key === 'J')) {
                evento.preventDefault();
            }
        }
    });

    history.pushState(null, null, window.location.href);
    window.addEventListener('popstate', () => {
        if (window.permitirSaida) return;
        history.pushState(null, null, window.location.href);
    });
    window.addEventListener('beforeunload', bloquearSaida);
});
