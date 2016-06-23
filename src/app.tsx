/// <reference path="../typings/globals/react/index.d.ts" />
/// <reference path="../typings/globals/react-dom/index.d.ts" />
/// <reference path="../typings/modules/react-bootstrap/index.d.ts" />
/// <reference path="./ioc.ts" />

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

import React = require("react");
import ReactDOM = require("react-dom");
import ModelList = require("./components/ModelList");
import {IModelService} from "./services/interfaces/IModelService";
import Model from "./models/model";
import ioc = require("./ioc");
import Rx = require("rxjs");

Rx.Observable.of("RxJS", "is", "working").subscribe(n => console.log(n));

var setup = require("./app.setup");

class App extends React.Component<AppProps, AppState> {

  private modelService: IModelService = ioc.resolve<IModelService>("IModelService");

  constructor(
    props: AppProps
  ) {
    super(props);
    this.state = {
      models: new Array<Model>()
    };
  }

  componentDidMount() {
    //start modifing state here
    this.modelService.readModels(models => {
      this.setState({
        models: models
      });
    });
  }

  componentWillUnmount() {
    //cleanup
  }

  render() {
    return (
      <ModelList models={this.state.models}/>
    );
  }
}

interface AppProps {

}

interface AppState {
  models?: Array<Model>;
}

// Render to ID content in the DOM
ReactDOM.render(
  <App/>,
  document.getElementById('app')
);

export = App;