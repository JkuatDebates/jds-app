import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { store } from './redux/store.js';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { googleClientId } from './assets/urls.js';

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={googleClientId}> 
    <Provider store={store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>,
)
