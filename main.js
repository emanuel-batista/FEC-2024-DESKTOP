const { app, BrowserWindow, ipcMain } = require('electron');
require('electron-reload')(__dirname);
let mainWin; 

function createMainWindow() {
  mainWin = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false 
    }
  });

  mainWin.loadFile('index.html');
  mainWin.setMenu(null);
}

function createDashboardWindow() {
  const dashboardWin = new BrowserWindow({
    fullscreen: false,
    height: 1000,
    width: 1000,
    webPreferences: {
      nodeIntegration: true
    }
  });

  dashboardWin.loadFile('public/reservas.html');
  dashboardWin.setMenu(null);

  if (mainWin) {
    mainWin.close();
  }
}

function createDeliverWindow(mesa) {
  console.log(`Abrindo janela de entrega para a mesa ${mesa}`);
  const deliverWin = new BrowserWindow({
    width: 400,
    height: 400,
    webPreferences: {
      nodeIntegration: true
    }
  });

  deliverWin.loadFile('public/entregar-reserva.html');
  deliverWin.setMenu(null);
}

app.whenReady().then(createMainWindow);

ipcMain.on('login-success', () => {
  createDashboardWindow();
});

ipcMain.on('entregue', (mesa) => {
  createDeliverWindow(mesa);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});
