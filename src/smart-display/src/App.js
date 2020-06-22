import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import SmartScreen from './pages/SmartScreen';
import TinyScreen from './pages/TinyScreen';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/tiny" component={TinyScreen} />
        <Route path="/" component={SmartScreen} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;