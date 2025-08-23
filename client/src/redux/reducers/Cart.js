import {
    ITEM_ADD_TO_CART,
    ITEM_REMOVE_FROM_CART,
    ITEM_CART_CLEAR,
    CART_SAVE_SHIPPING_ADRESS,
    SAVE_PAYMENT_METHOD
} from "./../constants/Cart";

export const cartReducer = (
    state = {cartItems:[], shippingAddress:{}}, action
) => {
    switch(action.type){
        case ITEM_ADD_TO_CART:
            const item = action.payload;
            const existItem = state.cartItem.find((x) => x.product === item.product)
            if(existItem){
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) => {
                        return x.product === existItem.product ? item : x;
                    })
                }
            } else {
                return {
                    ...state,
                    cartItems:[...state.cartItems, item]
                }
            }

        case ITEM_REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.product !== action.payload)
            }
        case ITEM_CART_CLEAR:
            return {
                ...state,
                cartItems: []
            }
        case CART_SAVE_SHIPPING_ADRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }
        case SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }
        default:
            return {}
    }
}
