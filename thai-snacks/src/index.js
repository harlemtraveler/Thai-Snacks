import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
// import './index.css';
import App from './App';
import Amplify from "aws-amplify";
import aws_exports from './aws-exports';

// import reportWebVitals from './reportWebVitals';
Amplify.configure(aws_exports);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// reportWebVitals();
