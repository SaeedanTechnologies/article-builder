import { applyMiddleware, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {persistStore, persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import rootReducer from "./reducers";
import storage from "redux-persist/lib/storage";
const persistConfig = {
    key:'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
    reducer : persistedReducer,
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
    })
})
export const persistor = persistStore(store);