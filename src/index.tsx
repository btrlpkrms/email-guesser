import React from 'react';
import ReactDOM from 'react-dom/client';
import {MainPageContainer} from "./container/MainPage/MainPageContainer";
import {ErrorBoundaries} from "./components/ErrorBoundaries";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <ErrorBoundaries>
        <MainPageContainer/>
    </ErrorBoundaries>
);

