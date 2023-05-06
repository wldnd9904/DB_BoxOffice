import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App';
import { RecoilRoot } from 'recoil';
import 'bootstrap/dist/css/bootstrap.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <RecoilRoot>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </RecoilRoot>
);
