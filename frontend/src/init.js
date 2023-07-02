import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import { ErrorBoundary, Provider as RollbarProvider } from '@rollbar/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import filter from 'leo-profanity';
import AuthProvider from './contexts/AuthProvider.jsx';
import store from './slices/store.js';
import ru from './locales/ru/ru';
import App from './App';

const runApp = async () => {
  const i18n = i18next.createInstance();
  await i18n
    .use(initReactI18next)
    .init({
      lng: 'ru',
      debug: false,
      resources: {
        ru,
      },
    });

  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));

  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
    environment: 'production',
  };

  return (
    <I18nextProvider i18n={i18n}>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <BrowserRouter>
            <Provider store={store}>
              <AuthProvider>
                <App />
              </AuthProvider>
            </Provider>
          </BrowserRouter>
        </ErrorBoundary>
      </RollbarProvider>
    </I18nextProvider>
  );
};

export default runApp;
