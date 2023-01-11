import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {MainPageContainer} from "./container/MainPageContainer";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <MainPageContainer></MainPageContainer>
  </React.StrictMode>
);

reportWebVitals();
