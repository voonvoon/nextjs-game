import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Game } from "@/model/game";

interface CartState {
  showCart: boolean;
  cartItems: Game[];
} 

const cartFromLocalStorage =
  typeof localStorage !== "undefined" && localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart")!) // add ! to relax ts cuz ts wld worry undefine
    : [];

const initialState: CartState = {
  showCart: false,
  cartItems: cartFromLocalStorage,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart(state) {
      state.showCart = !state.showCart;
    },
    addItemToCart: (state, action: PayloadAction<Game>) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item._id === newItem._id
      );
      if (existingItem) {
        existingItem.quantity = newItem.quantity; // if item exist jz +1
      } else {
        state.cartItems.push(newItem); // else add item
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems)); // also set localStorage the updated new {}
    },
    removeItemFromCart: (state, action: PayloadAction<{ _id: string }>) => {
      const itemId = action.payload._id;
      const updatedState = state.cartItems.filter((item) => item._id !== itemId); // rm item
      state.cartItems.splice(0, state.cartItems.length, ...updatedState);
      //*splice() :0=start from index 0 |state.cartItems.length = number length to rm | replace with updatedState[]
      //above way effectively replace the []
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    removeAllItemsFromCart: (state) => {
      state.cartItems = []; // Set cartItems to an empty array
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
  },
});

export const { toggleCart, addItemToCart, removeItemFromCart, removeAllItemsFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
