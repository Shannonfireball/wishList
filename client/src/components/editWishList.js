import React from 'react'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';

import { useSnackbar } from 'notistack';
import { EditLISTS } from '../slice/loadWishListss';
import {  useDispatch } from 'react-redux'

import axios from 'axios';
import ModeIcon from '@mui/icons-material/Mode';

export default function EditWishList(props) {
  const base64String = btoa(String.fromCharCode(...new Uint8Array(props.word.photo.data.data)));
    const valueRef = React.useRef('')
    
    const [itemName, setitemName] = React.useState(props.word.item_name);
    const [file, setFile] = React.useState(base64String);
    const [brandName, setBrandName] = React.useState(props.word.brand_name);
    const [open, setOpen] = React.useState(false);
    const [changeFile, setChangeFile] = React.useState('');
    const {enqueueSnackbar}= useSnackbar()
    
    const dispatch = useDispatch()
    
    const handleClickOpen = () => {
        setOpen(true);
      };
    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
          setOpen(false);
        }
    };  
    const DialogStyle={
        background:'#e3f2fd',
        color:'#0068bf'
    }
    const handleChange = (event) => {
        setitemName(event.target.value);
      };
    const handleChangeBrandName = (event) => {
        setBrandName(event.target.value);
    };
    const handleChangeFile=(e)=> {
        console.log(e.target.files);
        setFile(e.target.files[0]);
        setChangeFile('change');
    }
    const handleAdd = (e)=>{
      e.preventDefault();
      let formData = new FormData();
      formData.append('id',props.word._id);
      if(props.word.item_name!==itemName){
        formData.append('item_name',itemName);

      }
      if(props.word.brand_name!==brandName){
        formData.append('brand_name',brandName);
      }
      if(changeFile==='change'){
        formData.append('file',file);
      }
      
      
      
      // formData.append('file',file);
      axios.put("http://localhost:9000/editwishlist",formData).then((response) => {
      
        dispatch(EditLISTS(response.data))
        console.log("data is here",response.data)
  
        if(response.data._id){
          const message = 'Success list edited';
          enqueueSnackbar(message, { variant: 'success' })
          }else{
          const messageError = 'Error list not edited';
          enqueueSnackbar(messageError, { variant: 'error' })
        }
  
      }).catch(err => {
        console.log(err);
     });
      handleClose()
      console.log(...formData)
      
      
    }
    

  return (
    <div>
    <Button onClick={handleClickOpen}><ModeIcon></ModeIcon>Edit list</Button>
    <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle sx={DialogStyle}>Edit wish list</DialogTitle>
        <DialogContent sx={DialogStyle}>
            <form  encType="multipart/form-data">
                <p>Item name</p>
                <TextField  sx={{background:'#ffff'}} name="item_name" inputRef={valueRef} value={itemName} onChange={handleChange}/>
                <p>Brand name</p>
                <TextField  sx={{background:'#ffff'}} name="brand_name" inputRef={valueRef} value={brandName} onChange={handleChangeBrandName}/>
                <p>Upload image</p>
                <input type="file" name="file" accept='image/*' onChange={handleChangeFile} />
                {changeFile===''?<img  src={`data:image/${props.word.photo.contentType};base64,${base64String}`}/>:<img src={URL.createObjectURL(file)}/>}
            </form> 
        </DialogContent>
        <DialogActions sx={DialogStyle} >
            <Button onClick={handleClose}>Cancel</Button>
            <Button type='submit' onClick={handleAdd}>Ok</Button>
        </DialogActions>
    </Dialog>
    </div>
  )
}
