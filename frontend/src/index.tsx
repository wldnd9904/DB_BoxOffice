import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App';
import { RecoilRoot } from 'recoil';
import 'bootstrap/dist/css/bootstrap.css';
import { CookiesProvider } from 'react-cookie';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <RecoilRoot>
    <React.StrictMode>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </React.StrictMode>
  </RecoilRoot>
);
