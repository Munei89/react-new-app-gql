import React from 'react';
import logo from './logo.svg';
import NewsList from './components/NewsList';
import NewsDetail from './components/NewsDetail';
import './App.css';

function App() {
   const [id, setId] = React.useState(42);
  const handleIdChange = React.useCallback(newId => {
    setId(newId);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <NewsList handleIdChange={handleIdChange} />
      <NewsDetail id={id} />
    </div>
  );
}

export default App;
