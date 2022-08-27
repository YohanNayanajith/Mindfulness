import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
    productQuantity: 0, //a product
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.productQuantity = action.payload.quantity;
      state.total += action.payload.price * action.payload.quantity;
    },
    removeProduct: (state, action) => {
      state.products.map((item) => {
        if (item._id === action.payload.productId) {
          state.quantity -= 1;
          state.products.pop();
          state.total -= action.payload.productPrice;
        }
      });
    },
    decreaseAddProduct: (state, action) => {
      state.products.map((item) => {
        if (item._id === action.payload.productId) {
          const index = state.products.findIndex((object) => {
            return object.id === item._id;
          });
          if (index !== -1) {
            if (state.products[index].quantity === 1) {
              state.quantity -= 1;
              state.products.pop();
              state.total -= action.payload.productPrice;
            } else {
              state.products[index].quantity -= 1;
              state.total -= action.payload.price * 1;
              // state.productQuantity -= 1;
            }
          }
        }
      });
    },
    increaseAddProduct: (state, action) => {
      state.products.map((item) => {
        if (item._id === action.payload.productId) {
          const index = state.products.findIndex((object) => {
            return object.id === item._id;
          });
          if (index !== -1) {
            state.products[index].quantity += 1;
            state.total += action.payload.price * 1;
          }
          // state.productQuantity -= 1;
        }
      });
    },
    removeAllProduct: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
      state.productQuantity = 0;
    },
  },
});

export const {
  addProduct,
  removeProduct,
  decreaseAddProduct,
  increaseAddProduct,
  removeAllProduct,
} = cartSlice.actions;
export default cartSlice.reducer;
