import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js'
import App from './App.js';
import { store, persistor } from './redux/store'
import ErrorBoundary from '../src/pages/ErrorBoundary';
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <ErrorBoundary>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </ErrorBoundary>
);
