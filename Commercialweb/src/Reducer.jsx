import { createSlice } from "@reduxjs/toolkit";

let xyz = createSlice({
   name: 'User',
   initialState: {
      bool: false,
      User: {},
      bool2: false,
      Products: [],
      total: null
   },
   reducers: {
      DisplayLogin: (state, action) => {
         state.bool = action.payload.bool
      },
      CheckLogin: (state, action) => {
         state.User = action.payload.obj
         state.bool2 = action.payload.bool2
         state.bool = action.payload.bool
      },
      CheckLogin2: (state, action) => {
         state.bool = action.payload.bool
      },
      Logout: (state, action) => {
         state.User = action.payload.obj
         state.bool2 = action.payload.bool2
         state.bool = action.payload.bool
      },
      addProduct: (state, action) => {
         state.Products = action.payload.data
      },
      updateUser: (state, action) => {
         state.User = action.payload.data
      },
      updateCart: (state, action) => {
         let obj = state.User.cart.find((v) => {
            return v.id == action.payload.object3.id
         })
         obj.qty = action.payload.object3.qty
         obj.price = action.payload.object3.price
         obj.totalPrice = action.payload.object3.totalPrice

      },
      updateCart2 : (state,action)=>{
         let obj = state.User.cart.find((v) => {
            return v.id == action.payload.obj.id
         })
         obj.totalPrice = action.payload.obj.totalPrice
      },
      changeqty: (state, action) => {
         let obj = state.User.cart.find((v) => {
            return v.id == action.payload.id
         })
         obj.qty = action.payload.qty
      },
      Remove: (state, action) => {
         state.User.cart = state.User.cart.filter((v) => {
            return v.id != action.payload.id
         })
      }
   }
   })
export const { DisplayLogin } = xyz.actions
export const { CheckLogin, CheckLogin2 } = xyz.actions
export const { Logout } = xyz.actions
export const { addProduct, updateUser, updateCart, changeqty, Remove,updateCart2 } = xyz.actions

export default xyz.reducer;