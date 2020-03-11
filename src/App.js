import React from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';

import SearchFormComponent from './components/SearchFormComponent'
import AnalysisSentimentComponent from './components/AnalysisSentimentComponent'
import ResultAnalysisSentimentComponent from './components/ResultAnalysisSentimentComponent'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' render={(props) => <SearchFormComponent {...props}/>}/>
      <Route path='/process' render={(props) => <AnalysisSentimentComponent {...props}/>}/>
      <Route path='/result' render={(props) => <ResultAnalysisSentimentComponent {...props}/>}/>
    </Switch>
  </main>
)

export default Main;
