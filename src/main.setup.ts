// import ioc from "./ioc";
import ioc = require("./ioc");
import {ModelService} from "./services/ModelService";
import {IModelService} from "./services/interfaces/IModelService";
const electron = require('electron');
const {ipcMain} = electron;

ioc.registerSingleton<Electron.IPCMain>("IPCMain", ()=>ipcMain);
ioc.registerSingleton<IModelService>("IModelService", () => new ModelService());

// console.log("services: "+ioc.resolveTheUnresolved());