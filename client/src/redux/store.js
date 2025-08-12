import { combineReducers, createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { productListReducer, productReducer } from "./reducers/Product";

const persistConfig = {
    key: "root",
    storage,
    version: 1
};

const rootReducer = combineReducers({
    productListReducer, productReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    persistedReducer,
    applyMiddleware(thunk) // apply thunk middleware
);

export const persistor = persistStore(store);
