

function terminalMessage(
    elementId,
    texto,
    velocidade = 25,
    callback = null
) {

    const terminal = document.getElementById(elementId);

    if (!terminal) return;

    terminal.innerHTML = "";
    terminal.classList.add("typing-text");

    let i = 0;

    function escrever() {

        if (i < texto.length) {

            const char = texto.charAt(i);

            if (char === "\n") {
                terminal.innerHTML += "<br>";
            } else {
                terminal.innerHTML += char;
            }

            i++;
            setTimeout(escrever, velocidade);

        } else {

            terminal.classList.remove("typing-text");

            if (callback) {
                callback();
            }
        }
    }

    escrever();
}

function triggerGlitch() {

    const container =
        document.querySelector(".container");

    if (!container) return;

    container.classList.add("anomaly-active");

    setTimeout(() => {
        container.classList.remove("anomaly-active");
    }, 400);
}


function nextStep(step) {

    const atual =
        document.querySelector(".step.active");

    if (!atual) return;

    atual.style.opacity = "0";

    setTimeout(() => {

        atual.classList.remove("active");

        const proximo =
            document.getElementById(`step${step}`);

        if (!proximo) return;

        proximo.classList.add("active");

        proximo.style.opacity = "0";

        requestAnimationFrame(() => {
            proximo.style.opacity = "1";
        });

        triggerGlitch();

    }, 250);
}


function registrar() {

    const usuario =
        document.getElementById("usuario")
        .value
        .trim();

    const senha =
        document.getElementById("senha")
        .value
        .trim();

    if (!usuario || !senha) {

        triggerGlitch();

        terminalMessage(
            "mensagem",
`> ERRO

> PREENCHA TODOS OS CAMPOS`,
            20
        );

        return;
    }

    terminalMessage(
        "mensagem",
`> VALIDANDO IDENTIDADE...

> CRIANDO REGISTRO...

> SINCRONIZANDO TERMINAL...`,
        20
    );

    setTimeout(() => {

        localStorage.setItem(
            "usuario",
            usuario
        );

        localStorage.setItem(
            "senha",
            senha
        );

        localStorage.setItem(
            "tutorialConcluido",
            "true"
        );

        triggerGlitch();

        terminalMessage(
            "mensagem",
`> IDENTIDADE REGISTRADA

> ACESSO AUTORIZADO

> REDIRECIONANDO...`,
            25
        );

        setTimeout(() => {

            document.body.style.opacity = "0";

            setTimeout(() => {
                window.location.href =
                    "login.html";
            }, 600);

        }, 2500);

    }, 1800);
}

document.addEventListener(
    "DOMContentLoaded",
    () => {

        document
            .querySelectorAll("input")
            .forEach(input => {

                input.addEventListener(
                    "focus",
                    () => {
                        triggerGlitch();
                    }
                );

            });

    }
);

window.addEventListener("load", () => {

    terminalMessage(
        "boot-terminal",

`> SISTEMA INICIADO

> CANAL CRIPTOGRAFADO ESTABELECIDO

> CARREGANDO PROTOCOLOS...

> AGUARDANDO OPERADOR...`,

        18,

        () => {

            const terminal =
                document.querySelector(".terminal");

            if (!terminal) return;

            setTimeout(() => {

                terminal.classList.add(
                    "terminal-hide"
                );

                setTimeout(() => {
                    terminal.remove();
                }, 1000);

            }, 800);

        }
    );

});