import { channelsReducer } from './channelsSlice.js';
import { messagesReducer } from './messagesSlice.js';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    channelsReducer,
    messagesReducer,
  },
});

export default store;
