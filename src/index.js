import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Helmet} from "react-helmet";

import ContributionsWidget from './contributions/ContributionsWidget';
import reportWebVitals from './reportWebVitals';

window.initializeWidget = (targetElement, label) => {
  
  const root = ReactDOM.createRoot(targetElement);
  root.render(
    <React.StrictMode>
      <div>
    
        <ContributionsWidget label={label} />
      </div>
    </React.StrictMode>
  )
  reportWebVitals();
  
};

