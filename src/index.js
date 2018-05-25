import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store, { history } from './store/'
import { Provider } from "react-redux"

ReactDOM.render((
    <Provider store={store}>
        <App history={history}/>
    </Provider>
), document.getElementById('root'));

registerServiceWorker();
