import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/store';
import App from './App';

ReactDOM.render(
    <StrictMode>
        <Provider store={configureStore}>
            <App />
        </Provider>
    </StrictMode>,
    document.getElementById('root')
);
