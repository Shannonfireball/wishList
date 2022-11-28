import React, { useEffect } from 'react'

import LinearProgress from '@mui/material/LinearProgress';
import { Stack } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux'
import { loadWishLists } from '../slice/loadWishListss';
import BasicCard from './Card';


import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import EditWishList from './editWishList';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));

export default function AddNewWishList() {
    
    const words = useSelector(state => state.load.words);
    const dispatch = useDispatch()
    
    useEffect(()=>{
      dispatch(loadWishLists())
    },[dispatch])
    console.log(words);
    const search = useSelector(state => state.search);
    const filteredItemNames = words.filter(words=>{
      return words.item_name.toLowerCase().includes(search.toLowerCase())
    })
    // // const filterecwords = useSelector(selectFilteredWords);
    // // console.log(filteredItemNames);
    // const display = filteredItemNames.length<=0
  return (
    <div>
    {/* {display&&<LinearProgress/>} */}
    {filteredItemNames.map(word =>{
      {/* let base64String = btoa(String.fromCharCode(...new Uint8Array(word.photo.data.data))); */}
      
      return <Stack sx={{
        '& > :not(style)': { m: 0.5, width: '90%' },
      }} >
      <Item>
      <BasicCard word={word}  />
      {/* {word.brand_name} {word.item_name} */}
      {/* <EditWishList word={word}/> */}
      </Item>
      </Stack>
    })}
    </div>
  )
}
