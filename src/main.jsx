import * as atatus from 'atatus-spa';
atatus.config('1ada05214e5845a9811ffdba8101df3d').install();

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

