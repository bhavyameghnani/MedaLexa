import "./App.css";
import { Route, Switch, HashRouter } from "react-router-dom";
import Home from "./Components/Home/Home";
import Symptomps from "./Components/Symptomps/Symptomps";
import ICD from "./Components/ICD/ICD";
import Workspace from "./Components/Workspace/Workspace";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Symptomps" component={Symptomps} />
          <Route exact path="/icd" component={ICD} />
          <Route exact path="/chat" component={Workspace} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
