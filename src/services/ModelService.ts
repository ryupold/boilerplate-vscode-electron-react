import {IModelService} from "./interfaces/IModelService"
import {BaseService} from "./BaseService"
import Model from "../models/model"
import ioc = require("../ioc");

declare var electron: Electron.ElectronMainAndRenderer;

export class ModelService extends BaseService implements IModelService {
    
    constructor() {
        super();
    }
    
    public readModels(cb:(models:Array<Model>)=>void): void {
        cb([
            {title: "Hello", description:"World"},
            {title: "Foo", description:"Bar"}
        ]);
    }
}