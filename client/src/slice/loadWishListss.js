import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// import { GET_WORDS } from "../graphQlReq/graphQlReq";
// import {ApolloClient,InMemoryCache,gql} from '@apollo/client'
// export const client = new ApolloClient({
//     uri:'http://localhost:9000/getallwishlist',
//     cache:new InMemoryCache()
// });
import axios from 'axios';




// createAsyncThunk simplifies our Redux app by returning an action creator that dispatches promise lifecycle actions for us so we don't have to dispatch them ourselves.
export const loadWishLists = createAsyncThunk(
  "allWishLists/loadWishLists",
  async () => {
    var data='';
    // const { loading, error, data } = useQuery(GET_WORDS_NEW);
    const response = await fetch('http://localhost:9000/getallwishlist');
    const farmatted = await response.json();
  //   axios.get('http://localhost:9000/getallwishlist')
  // .then(async (response)=> {
  //   // console.log(response.data);
  //   data= response.data;
  // })
    return farmatted;

  }
);

const sliceOptions = {
  name: "allWishLists",
  initialState: {
    words:[],
    isLoading: false,
    hasError: false
  },
  reducers: {
    AddLISTS:(state,action)=>{
      state.words.push(action.payload)
    },
    EditLISTS:(state,action)=>{
      state.words = state.words.filter((word)=>word._id!==action.payload._id);
      state.words.push(action.payload)
    }
  },
  extraReducers: {
    [loadWishLists.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [loadWishLists.fulfilled]: (state, action) => {
      state.words = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [loadWishLists.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    }
  }
}

export const allWishListsSlice = createSlice(sliceOptions);

export const { AddLISTS,EditLISTS } = allWishListsSlice.actions

export const selectAllWishLists = (state) => state.allWishLists.words;

export default allWishListsSlice.reducer;