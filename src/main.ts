/// <reference path="../typings/globals/node/index.d.ts" />
/// <reference path="../typings/globals/github-electron/index.d.ts" />

// import {IoC} from "./ioc";
// var ioc: IoC = require("./ioc").default;
import ioc = require("./ioc");
import Model from "./models/model";
// const os = require('os');

const electron = require('electron');
const BrowserWindow: typeof Electron.BrowserWindow = electron.BrowserWindow;
const {app} = electron;
const {autoUpdater} = electron;
const {ipcMain} = electron;
// let reactDevToolsExtensionPath = process.env["LocalAppData"] + "\\Google\\Chrome\\User Data\\Default\\Extensions\\fmkadmapgofadopljbjfkapdkoienihi\\0.14.11_0";
// BrowserWindow.addDevToolsExtension(reactDevToolsExtensionPath);


var setup = require("./main.setup");
require('electron-reload')(__dirname);

var mainWindow:Electron.BrowserWindow = null;


var updateFeed = 'http://localhost:3000/updates/latest';
var isDevelopment = process.env.NODE_ENV === 'development';
var feedURL = "";

// Don't use auto-updater if we are in development 
if (!isDevelopment) {
    autoUpdater.addListener("update-available", (event:any)=> {
        console.log("A new update is available")
        if (mainWindow) {
            mainWindow.webContents.send('update-message', 'update-available');
        }
    });
    autoUpdater.addListener("update-downloaded", (event:any, releaseNotes:any, releaseName:any, releaseDate:any, updateURL:string)=> {
        console.log("A new update is ready to install", `Version ${releaseName} is downloaded and will be automatically installed on Quit`)
        if (mainWindow) {
            mainWindow.webContents.send('update-message', 'update-downloaded');
        }
    });
    autoUpdater.addListener("error", (error:any)=> {
        console.log(error)
        if (mainWindow) {
            mainWindow.webContents.send('update-message', 'update-error');
        }
    });
    autoUpdater.addListener("checking-for-update", (event:any)=> {
        console.log("checking-for-update")
        if (mainWindow) {
            mainWindow.webContents.send('update-message', 'checking-for-update');
        }
    });
    autoUpdater.addListener("update-not-available", ()=> {
        console.log("update-not-available")
        if (mainWindow) {
            mainWindow.webContents.send('update-message', 'update-not-available');
        }
    });
    
    const appVersion = require('../package.json').version;
    const feedURL = updateFeed + '?v=' + appVersion;
    autoUpdater.setFeedURL(feedURL);
}

app.on('window-all-closed', ()=> {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('ready', ()=> {
    mainWindow = new BrowserWindow({width: 1920, height: 1000});    
    prepareMainWindow(mainWindow);
        
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    
    mainWindow.on('closed', ()=> {
        mainWindow = null;
    });
});

function prepareMainWindow(window:Electron.BrowserWindow) {
    if (process.platform != 'darwin') {
        // mainWindow.setMenu(null);
    }
    // mainWindow.setKiosk(true);
    mainWindow.setTitle("iDlyd");

    //load react dev tools (fmkadmapgofadopljbjfkapdkoienihi)
}


ipcMain.on("testevent", (event,args)=>{
    console.log("args: "+args);
})