import { SnackbarProvider } from 'notistack'
import { ApolloProvider } from '@apollo/client';
// import { client } from './graphQlReq/graphQlReq';
import store from './store/store';
import { Provider } from 'react-redux'

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/material';
const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <ApolloProvider client={client}> */}
      <SnackbarProvider>
        <App/> 
      </SnackbarProvider>  
      {/* </ApolloProvider>    */}
    </Provider>
  </React.StrictMode>
);

if(<App/>===null){
  root.render(
    <Box sx={{ '& > :not(style)': { m: 20, width: '90%'}, display:"flex",justifyContent:'center', alignItems:'center'  }}>
    <CircularProgress />
  </Box>
  );
}
