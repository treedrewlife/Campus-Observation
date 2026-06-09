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
        audio.volume = 1;
        audio.play().catch(() => {});
    }

    setTimeout(() => {
        if (staticImg) {
            staticImg.style.opacity = "1";
        }
    }, 1000);

    setTimeout(() => {
        window.location.href = "../Pages/Gameover.html";
    }, 4500);
}
// Fim - Feito por Drey
