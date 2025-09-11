import { combineReducers, createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

import { productListReducer, productReducer } from "./reducers/Product";
import { userLoginReducer, userRegisterReducer } from './reducers/User';
import { cartReducer } from './reducers/Cart';
import { orderReducer, orderDetailReducer, orderPaymentReducer, orderListReducer } from './reducers/Order';

const persistConfig = {
    key: "root",
    storage,
    version: 1
};

const rootReducer = combineReducers({
    productListReducer, productReducer,
    userLoginReducer, userRegisterReducer,
    cartReducer,

    orderReducer, orderDetailReducer, orderPaymentReducer, orderListReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    persistedReducer,
    applyMiddleware(thunk) // apply thunk middleware
);

export const persistor = persistStore(store);
