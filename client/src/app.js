import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

//PAGES
import MainPage from './components/index/index';
import LoginPage from './components/login/login';
import NotFoundPage from './components/404';
import RegisterPage from './components/register/register';

class App extends React.Component{
    render(){
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={MainPage} />
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/register" component={RegisterPage} />
                    <Route exact path="/404" component={NotFoundPage} />
                    <Redirect to="/404" />
                    
                </Switch>
            </Router>
        );
    } 
}
export default App
