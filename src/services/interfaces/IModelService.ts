import {IService} from "./IService";
import Model from "../../models/model";

export interface IModelService extends IService{
    readModels(cb:(hosts:Array<Model>)=>void):void;
}