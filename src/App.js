import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Login from './components/Login';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
const App = () => {
    return (
            <Router>
                <Switch>
                   <Route exact path="/login" component={Login} />
                   <PrivateRoute exact path="/" component={Home} />
                </Switch>
            </Router>
    );
};

export default App;

