import { useContext } from 'react';
import { createContext } from 'react';

export const AuthContext = createContext({});

export const useAuthContent = () => useContext(AuthContext);

