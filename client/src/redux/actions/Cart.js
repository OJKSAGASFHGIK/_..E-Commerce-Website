import axios from "axios";
import {
    ITEM_ADD_TO_CART,
    ITEM_REMOVE_FROM_CART,

    CART_SAVE_SHIPPING_ADRESS,
    SAVE_PAYMENT_METHOD
} from "./../constants/Cart";

import { BASE_URL } from "./../constants/BASE_URL";

export const addToCartAction = (id, quantity) => async(dispatch, getState) => {
    try {
        const {data} = await axios.get(`${BASE_URL}/api/products/${id}`);
        dispatch({
            type: ITEM_ADD_TO_CART,
            payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                quantity
            }
        })

        const cartItems = getState().cartReducer.cartItems;
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
    } catch(error){
        console.log(error);
    }
}

export const removeFromCartAction = (id) => async(dispatch, getState) => {
    dispatch({
        type: ITEM_REMOVE_FROM_CART,
        payload: id
    })

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddressAction = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADRESS,
        payload: data
    })

    localStorage.setItem("shippingAddress", JSON.stringify(data))
}

export const savePaymentMethodAction = (data) => (dispatch) => {
    dispatch({
        type: SAVE_PAYMENT_METHOD,
        payload: data
    })

    localStorage.setItem("paymentMethod", JSON.stringify(data))
}
