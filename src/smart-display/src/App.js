import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import SmartScreen from './pages/SmartScreen';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/tiny" component={TinyScreen} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;