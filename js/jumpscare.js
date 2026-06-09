// Feito por Drey
export function acionarJumpscare() {
    const container = document.getElementById("jumpscare-container");
    const staticImg = document.getElementById("jumpscare-static");
    const audio = document.getElementById("jumpscare-audio");

    if (!container) {
        window.location.href = "../Pages/Gameover.html";
        return;
    }

    container.style.display = "block";

    if (audio) {
        const savedVolume = localStorage.getItem('game_volume');
        const volumeFactor = savedVolume !== null ? parseFloat(savedVolume) : 1.0;
        audio.volume = 0.3 * volumeFactor;
        audio.play().catch(() => {});
    }

    setTimeout(() => {
        if (staticImg) {
            staticImg.style.opacity = "0.8";
        }
    }, 1000);

    setTimeout(() => {
        window.location.href = "../Pages/Gameover.html";
    }, 4500);
}
// Fim - Feito por Drey
