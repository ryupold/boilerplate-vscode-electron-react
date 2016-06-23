import React = require('react');
import ReactDOM = require('react-dom');
import Model from "../models/model";
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import ioc = require("../ioc");
import {IModelService} from "../services/interfaces/IModelService";

class ModelList extends React.Component<ModelListProps, ModelListState> {
    constructor(props?: ModelListProps, context?: any) {
        super(props, context);
    }

    private convertModels(models:Array<Model>):Array<ListGroupItem>{
        return models.map<ListGroupItem>((model:Model, index:number)=>{
            return (
                <ListGroupItem key={index} className="model-list-item" header={model.title}>
                    {model.description}
                </ListGroupItem>
            );
        });
    }

    render() {
        return (
            <ListGroup className="model-list">{this.convertModels(this.props.models)}</ListGroup>
        );
    }
}

interface ModelListProps {
    models?: Array<Model>;
}

interface ModelListState {

}

export = ModelList;