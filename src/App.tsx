import React from 'react';
import NewsList from './components/NewsList';
import NewsDetail from './components/NewsDetail';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
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

    <React.Fragment>
      <Container maxWidth="md">
        <Grid container spacing={4}>
            <Grid item md={5}>
                <NewsList handleIdChange={handleIdChange} postDelete={isDelete} />
            </Grid>
            <Grid item md={7}>
                <NewsDetail id={id} handlePostDelete={handlePostDelete}/>
            </Grid>
        </Grid>
      </Container>
    </React.Fragment>

  );
}

export default App;
