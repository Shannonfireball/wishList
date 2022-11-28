import {configureStore} from "@reduxjs/toolkit"
import loadReducer from "../slice/loadWishListss"
import SearchTermReducer  from "../slice/searchTermSlice";


export default configureStore({
    reducer:{
       load: loadReducer,
       search:SearchTermReducer,     
    }
});