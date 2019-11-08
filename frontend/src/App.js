import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Main from "./container/Main";
import WebtoonHome from "./container/WebtoonHome";
import Viewer from "./container/Viewer";
class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Main} />
                    {/* ":" 뒤에 있는 것은 prams */}
                    <Route path="/webtoon/:webtoonId" component={WebtoonHome} /> 
                    <Route path="/viewer/:episodeId" component={Viewer} />
                </div>
            </Router>);
    }
}
export default App;

