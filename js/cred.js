function updateClock() {
        const now = new Date();
        document.getElementById("clock").textContent =
            "> TIME: " + now.toLocaleTimeString('pt-BR', {hour:'2-digit', minute:'2-digit'});
    }
    setInterval(updateClock, 1000);
    updateClock();

    
    const subtitle = "> Compilando memória do sistema...";
    let i = 0;

    function typeSubtitle() {
        if (i < subtitle.length) {
            document.getElementById("subtitle").textContent += subtitle[i];
            i++;
            setTimeout(typeSubtitle, 30);
        } else {
            startCredits();
        }
    }

    
    const creditsData = [
        "> EXECUTIVE_PRODUCTION:",
        "Campus Observation Project",

        "> DEVELOPMENT:",
        "Andrey Celestino de Oliveira", "Gabriel Cavalcanti Martins",  "Kawã Weber Nascimento Brito", "Nathan Carvalho de Farias",

        "> VISUAL_INTERFACE:",
        "Terminal UI System",

        "> SPECIAL_THANKS:",
        "FATEC / Testadores / Inspiração",

        "> SYSTEM_STATUS:",
        "FINALIZED ✔"
    ];

    const creditsBox = document.getElementById("credits");

    let index = 0;

    function showNextLine() {
        if (index >= creditsData.length) {
            document.getElementById("title").classList.add("glitch");
            return;
        }

        const line = document.createElement("div");
        line.classList.add("line");

        const text = creditsData[index];
        line.textContent = text;

        creditsBox.appendChild(line);

        setTimeout(() => line.classList.add("show"), 50);

        index++;

       
        creditsBox.scrollTop = creditsBox.scrollHeight;

        setTimeout(showNextLine, 600);
    }

    function startCredits() {
        showNextLine();
        returnToMenuAfterDelay() 
    }

   
    window.onload = () => {
        document.body.classList.add("glitch");
        setTimeout(() => document.body.classList.remove("glitch"), 600);

        setTimeout(typeSubtitle, 500);
    };

    function returnToMenuAfterDelay() {
    setTimeout(() => {
        localStorage.clear();

        window.location.href = "../index.html";
    }, 10000); 
}
