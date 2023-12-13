import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './components/App/App';
import './index.scss';
import './reset.scss';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = (ReactDOM as any).createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
}