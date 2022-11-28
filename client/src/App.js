import './App.css';
import React,{useEffect,useState} from 'react';
import Search from './components/Search';
import Container from '@mui/material/Container';
import DisplayWishLists from './components/displayWishLists';
import AddNewWishList from './components/addWishList';
import { Stack } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
// import axios from 'axios';
// axios.get('http://localhost:9000/getallwishlist')
//   .then(function (response) {
//     console.log(response.data);
//   })

const App =()=> {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: "#0069c0",
  }));
      return (
        <div className="font-loader">
          <Container maxWidth="md">
               <Search />   
               <Stack sx={{'& > :not(style)': { m: 0.5, width: '90%' },}}><Item><b>Wish list's</b></Item></Stack>         
              <DisplayWishLists/>
              <AddNewWishList /> 
          </Container>
        </div>
      );
}


export default App;


