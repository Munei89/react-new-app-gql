import React from 'react';
import logo from './logo.svg';
import NewsList from './components/NewsList';
import NewsDetail from './components/NewsDetail';
import './App.css';

function App() {
   const [id, setId] = React.useState("");
   const [isDelete, setIsDelete] = React.useState(false);
  const handleIdChange = React.useCallback(newId => {
    setId(newId);
  }, []);

  const handlePostDelete = () => {
    setIsDelete(!isDelete);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <NewsList handleIdChange={handleIdChange} postDelete={isDelete} />
      <NewsDetail id={id} handlePostDelete={handlePostDelete}/>
    </div>
  );
}

export default App;
