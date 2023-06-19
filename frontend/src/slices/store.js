import { configureStore } from '@reduxjs/toolkit';
import { channelsReducer } from './channelsSlice.js';
import { messagesReducer } from './messagesSlice.js';

const store = configureStore({
  reducer: {
    channelsReducer,
    messagesReducer,
  },
});

export default store;
