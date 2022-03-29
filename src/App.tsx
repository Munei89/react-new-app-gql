import React from 'react';
import logo from './logo.svg';
import NewsList from './components/NewsList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <NewsList />
    </div>
  );
}

export default App;
