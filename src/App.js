import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import './App.css';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/app">
                    <p>salam</p>
                </Route>
                <Route path="/" >
                    <p>khuubi</p>
                </Route>
            </Switch>
        </Router>
    )
}

export default App;