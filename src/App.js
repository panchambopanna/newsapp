import './App.css';
import React, { useState } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default function App () {
  const pageSize = 15;
  const country = 'in';
  const apiKey = process.env.REACT_APP_NEWS_API;

  const [progress, setProgress] = useState(0)

    return (
      <Router>
        <NavBar/>
        <LoadingBar
          color='#f11946'
          progress={progress}          
        />

        <Switch>
          <Route exact path="/business"><News setProgress={setProgress} apiKey={apiKey} key='business' pageSize={pageSize} country={country} category='business' /></Route>
          <Route exact path="/entertainment"><News setProgress={setProgress} apiKey={apiKey} key='entertainment' pageSize={pageSize} country={country} category='entertainment' /></Route>
          <Route exact path="/health"><News setProgress={setProgress} apiKey={apiKey} key='health' pageSize={pageSize} country={country} category='health' /></Route>
          <Route exact path="/science"><News setProgress={setProgress} apiKey={apiKey} key='science' pageSize={pageSize} country={country} category='science' /></Route>
          <Route exact path="/sports"><News setProgress={setProgress} apiKey={apiKey} key='sports' pageSize={pageSize} country={country} category='sports' /></Route>
          <Route exact path="/technology"><News setProgress={setProgress} apiKey={apiKey} key='technology' pageSize={pageSize} country={country} category='technology' /></Route>
          <Route exact path="/"><News setProgress={setProgress} apiKey={apiKey} key='home' pageSize={pageSize} country={country} /></Route>
        </Switch>
      </Router>
    )
  }