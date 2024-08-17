const { ipcRenderer } = require('electron');

document.getElementById('loginBtn').addEventListener('click', () => {
  ipcRenderer.send('login-success'); // Envia o evento para o processo principal
});

// Adiciona um listener de evento a cada botão
document.addEventListener('DOMContentLoaded', () => {
  const entregarButtons = document.querySelectorAll('.entregar');

  entregarButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      console.log('Entregar button clicked');
      ipcRenderer.send('entregue', index + 1);
    });
  });
});