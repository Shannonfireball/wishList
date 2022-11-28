import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm, clearSearchTerm, selectSearchTerm } from '../slice/searchTermSlice';

import { Stack } from '@mui/material';

import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : "#ffffff",
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



export default function Search() {
  const searchTerm = useSelector(selectSearchTerm);
  const dispatch = useDispatch();

  const onSearchTermChangeHandler = (e) => {
    const userInput = e.target.value;
    dispatch(setSearchTerm(userInput));
  };

  const onClearSearchTermHandler = () => {
    dispatch(clearSearchTerm());
  };

  // const search = useSelector(state => state.search);
  

  // console.log(search);

  return (
    <Stack sx={{
      '& > :not(style)': { m: 2, width: '89%' },
    }}>
    <Item>
    <Box
      component="span"
      sx={{
        '& > :not(style)': { m: 2, width: '90%' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic"
      value={searchTerm}
      onChange={onSearchTermChangeHandler} 
      placeholder='Item name?' 
      label={<SearchIcon/>} 
      variant="outlined" />
      {/* {(searchTerm.length > 0) && (<Button onClick={onClearSearchTermHandler} type='button' >clear</Button>)} */}
    </Box>
    </Item>
    </Stack>
  );
}
