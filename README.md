# Campus Observation 📹👁️

Projeto Disciplinar do Curso de **Programação de Sítios para Internet**, utilizando HTML, CSS, Java Script e Manipulação do DOM.

## 📖 Sobre o Projeto
O **Campus Observation** é um jogo de terror psicológico e observação desenvolvido para a disciplina de Programação de Sítios para Internet. Nele, o jogador assume o papel de um segurança monitorando câmeras de um campus universitário. O objetivo é sobreviver até o final do turno (06:00 AM) identificando e corrigindo anomalias sutis nas imagens antes que elas se acumulem e causem uma falha catastrófica.

Este projeto foca fortemente na manipulação do **DOM** (inserção, alteração, leitura e remoção), eventos dinâmicos e uso de **localStorage** para manutenção de estado, sem utilizar variáveis globais e com forte adesão ao padrão ECMAScript moderno.

---

## 🏗️ Estrutura Atual
- **Páginas (Total: 8):**
  - Menu Principal (`index.html`)
  - Instruções (`instrucoes.html`)
  - Configurações (`configuracoes.html`)
  - Game Over (`gameover.html`)
  - Câmera 1 - LAB 105 (`camera1.html`)
  - Câmera 2 - CORREDOR (`camera2.html`)
  - Câmera 3 - ESCADAS (`camera3.html`)
  - Câmera 4 - BIBLIOTECA (`camera4.html`)
- Estilização modularizada e limpa (`style.css` e `cameras.css`).

---

## 📝 Lista de Tarefas Pendentes (TO-DO)

A estrutura visual e o scaffold já estão finalizados. As próximas etapas envolvem exclusivamente a programação da Lógica do Jogo (`gameLogic.js`) e as regras acadêmicas:

- [ ] **Criar Arquivo `gameLogic.js`**: Centralizar a lógica das câmeras em um único script protegido sem variáveis globais (usando IIFE ou blocos de escopo).
- [ ] **Sistema de LocalStorage**: 
  - Salvar `tempoInicio`, `estadoCameras` e `anomaliasAtivas`.
  - Proteger contra "trapaças" com o botão Voltar do navegador (`window.onload`).
- [ ] **Timer in-game**: Relógio no canto superior que passa o tempo proporcionalmente ao tempo real até chegar às 06:00 AM.
- [ ] **Sorteio de Anomalias**: Sistema que rola probabilidades para ativar uma anomalia em uma câmera.
- [ ] **Manipulação Completa do DOM (Requisito Obrigatório)**:
  - **Alteração**: Trocar o `src` da imagem normal para `cameraX_anomalia.webp`.
  - **Inserção**: Criar dinamicamente a div invisível da "hitbox" para o jogador clicar (`document.createElement`).
  - **Traversal e Remoção**: Ao clicar na anomalia, utilizar navegação no DOM (`parentNode`) para remover a hitbox da tela e limpar o status.
- [ ] **Gerar Imagens das Anomalias**: Criar as imagens alternativas via IA para as 4 câmeras.
- [ ] **Lógica do Game Over e Vitória**: Disparar redirecionamento de tela quando acumular 4 anomalias ou o tempo acabar.
- [ ] **Finalizar página de Configurações**: Integrar som ou ajustes caso a equipe decida implementar.
