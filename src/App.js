import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import './App.css';
import MainApp from "./app/app.index";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/app">
                    <MainApp/>
                </Route>
                <Route path="/" >
                    <p>khuubi</p>
                </Route>
            </Switch>
        </Router>
    )
}

export default App;