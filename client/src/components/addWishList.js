import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { TextField } from '@mui/material';
import { AddLISTS } from '../slice/loadWishListss';
// import { ADD_WORD } from '../graphQlReq/graphQlReq';
import axios from 'axios';
import { useSnackbar } from 'notistack';


import { useSelector, useDispatch } from 'react-redux'


export default function AddNewWishList() {
  const [open, setOpen] = React.useState(false);
  const [itemName, setitemName] = React.useState('');
  const [file, setFile] = React.useState(null);
  const [brandName, setBrandName] = React.useState('');
  const {enqueueSnackbar}= useSnackbar()

  const fabStyle = {
    position: 'fixed',
    bottom: 16,
    right: 16,

  };
  const sizeStyle = {
    minHeight:45,
    minWidth:45,
    maxHeight:65,
    maxWidth:65
  }
  const DialogStyle={
    background:'#e3f2fd',
    color:'#0068bf'
  }


  const valueRef = React.useRef('') //creating a refernce for TextField Component
  const dispatch = useDispatch()
  

  const handleChange = (event) => {
    setitemName(event.target.value);
  };
  const handleChangeBrandName = (event) => {
    setBrandName(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };
  const handleChangeFile=(e)=> {
    console.log(e.target.files);
    setFile(e.target.files[0]);
  }
  // const words = useSelector(state => state.load.words);

  const handleAdd = (e)=>{
    e.preventDefault();
    // const duplicate = words.find(words=> words.word=== valueRef.current.value)
    // if(duplicate){
    //   const duplicateMessage = 'Word already exists'
    //   return enqueueSnackbar(duplicateMessage,{ variant: 'warning' })
    // }
    // ADD_WORD(valueRef.current.value)
    //       dispatch(AddLISTS(List)).then(List=> {
    //       if(List.word){
    //         const message = 'Success list added';
    //         enqueueSnackbar(message, { variant: 'success' })

    //       }
    //       console.log(List)
    //   }).catch(error=>{
    //     const messageError = 'Error not list added';
    //     enqueueSnackbar(messageError, { variant: 'error' })
    //   });
    let formData = new FormData();
    
    formData.append('item_name',itemName);
    formData.append('brand_name',brandName);
    formData.append('file',file);
    axios.post("http://localhost:9000/addlist",formData).then((response) => {
      
      dispatch(AddLISTS(response.data.list))
      console.log(response.data.list)

      if(response.data.list._id){
        const message = 'Success list added';
        enqueueSnackbar(message, { variant: 'success' })
        }else{
        const messageError = 'Error list not added';
        enqueueSnackbar(messageError, { variant: 'error' })
      }



      // axios.get("http://localhost:9000/getwishlist",{'body':{'id':response.data._id}},{}).then((response) => {
      //   console.log(response.data);
        
      // });

    }).catch(err => {
      console.log(err);
   });
    setitemName('')
    handleClose()
    console.log(...formData)
    
  }
  
  return (
    <div >
      <Button sx={fabStyle}  onClick={handleClickOpen}><AddCircleIcon sx={sizeStyle}/>Wish list</Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
      
        <DialogTitle sx={DialogStyle}>Add Wish list</DialogTitle>
        <DialogContent sx={DialogStyle}>
          <form onSubmit={handleAdd} enctype="multipart/form-data">
              <p>Item name</p>
              <TextField sx={{background:'#ffff'}} name="item_name" inputRef={valueRef} value={itemName} onChange={handleChange}/>
              <p>Brand name</p>
              <TextField sx={{background:'#ffff'}} name="brand_name" inputRef={valueRef} value={brandName} onChange={handleChangeBrandName}/>
              <p>Upload image</p>
              <input type="file" name="file" accept='image/*' onChange={handleChangeFile}></input>
              {file===null?<img src={file}/>:<img src={URL.createObjectURL(file)}/>} {/* ) */}
          </form>    
        </DialogContent>
        <DialogActions sx={DialogStyle} >
          <Button onClick={handleClose}>Cancel</Button>
          <Button type='submit' onClick={handleAdd}>Ok</Button>
        </DialogActions>
        
      </Dialog>
    </div>
  );
}
