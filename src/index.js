import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store, { history } from './store/'
import { Provider } from "react-redux"
import { ConnectedRouter } from 'connected-react-router'

ReactDOM.render((
    <Provider store={store}>
        <ConnectedRouter history={history}> 
            <App history={history}/>
        </ConnectedRouter> 
    </Provider>
), document.getElementById('root'));

registerServiceWorker();
