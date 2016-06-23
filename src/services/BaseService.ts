import ioc = require("../ioc");

export abstract class BaseService{
    
    constructor(
        protected ipcMain:Electron.IPCMain = ioc.resolve<Electron.IPCMain>("IPCMain")
        ){
        
    }
    
}