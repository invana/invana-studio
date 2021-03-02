const {app, BrowserWindow} = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const electron = require('electron');

let mainWindow;
var shell = require('electron').shell;

function openLinkInNewBrowser(linkString) {
    shell.openExternal(linkString);

}

function createWindow() {
    let mainScreen = electron.screen.getPrimaryDisplay();

    mainWindow = new BrowserWindow({
        width: mainScreen.size.width,
        height: mainScreen.size.height,
        show: false,
        // resizable: false,
        frame: true,
        webPreferences: {contextIsolation: true}
    });

    console.log("IsDev", isDev);
    const startURL = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html#/add')}`;
    // const startURL = isDev ? 'http://localhost:3000' : 'index.html';
    console.log("startURL", startURL)
    mainWindow.loadURL(startURL);

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        mainWindow.maximize();

    });
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    mainWindow.on('new-window', function (event, url) {
        event.preventDefault();
        openLinkInNewBrowser(url);
    });

}

app.on('ready', createWindow);