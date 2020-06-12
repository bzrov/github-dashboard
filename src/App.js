import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {HomePage} from './HomePage/HomePage.js'
import {RepoCard} from './RepoCard/RepoCard.js'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path={'/'} exact component={HomePage}/>
          <Route path={'/repository-card/:name'} exact component={RepoCard}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
