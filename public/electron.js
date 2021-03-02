const {app, BrowserWindow} = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        // frame:false,
        webPreferences: {contextIsolation: true}
    });

    console.log("IsDev", isDev);
    const startURL = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html#/add')}`;
    // const startURL = isDev ? 'http://localhost:3000' : 'index.html';
    console.log("startURL", startURL)
    mainWindow.loadURL(startURL);

    mainWindow.once('ready-to-show', () => mainWindow.show());
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    mainWindow.maximize();
    mainWindow.show();
}

app.on('ready', createWindow);