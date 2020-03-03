import React from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';
import SearchFormComponent from './components/SearchFormComponent'
import AnalysisSentimentComponent from './components/AnalysisSentimentComponent'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' render={(props) => <SearchFormComponent {...props}/>}/>
      <Route path='/process' render={(props) => <AnalysisSentimentComponent {...props}/>}/>
    </Switch>
  </main>
)

export default Main;
