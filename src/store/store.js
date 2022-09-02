// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./DataSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
}

//const persistedReducer = persistReducer(persistConfig, dataReducer)

export const store = configureStore({
  reducer: persistReducer(persistConfig, dataReducer),
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
})

export const persistor = persistStore(store)