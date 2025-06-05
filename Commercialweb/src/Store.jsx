import { configureStore } from "@reduxjs/toolkit";
import reducer from "./Reducer";

let store = configureStore({
     reducer : {
        x : reducer
     }
})

export default store;