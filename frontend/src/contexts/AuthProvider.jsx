import React, { useCallback, useState, useContext } from 'react';
import MyContext from './context.jsx';
import { io } from 'socket.io-client';
import { setCurrentChannelId, addChannel, renameChannel, removeChannel } from '../slices/channelsSlice.js';
import { addMessage } from '../slices/messagesSlice';
import store from '../slices/store.js';

const socket = io();
socket
  .on('connect_error', () => {
    console.log('socket "connect_error"');
  })
  .on('disconnect', (reason) => {
    console.log(`socket "disconnect" (${reason})`);
  })
  .on('newMessage', (data) => {
    store.dispatch(addMessage(data));
  })
  .on('newChannel', (data) => {
    store.dispatch(addChannel(data));
    store.dispatch(setCurrentChannelId(data.id));
  })
  .on('removeChannel', (data) => {
    store.dispatch(removeChannel(data.id));
  })
  .on('renameChannel', (data) => {
    store.dispatch(renameChannel(data));
  });


const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(!!JSON.parse(localStorage.getItem('user')));
    const userData = JSON.parse(localStorage.getItem('user'));
    const isLogin = () => !!loggedIn;

    const logIn = useCallback(() => {
      setLoggedIn(true);
    }, []);

    const logOut = useCallback(() => {
      localStorage.removeItem('user');
      setLoggedIn(false);
    }, []);

    const getAuthHeader = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.token) {
        return { Authorization: `Bearer ${user.token}` };
      }
      return {};
    };

    return (
      <MyContext.Provider value={{
        loggedIn, logIn, logOut, userData, socket, isLogin, getAuthHeader,
      }}
      >
        {children}
      </MyContext.Provider>
    );
  };

export default AuthProvider;