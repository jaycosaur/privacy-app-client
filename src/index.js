import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store, { history } from './store/'
import { Provider } from "react-redux"
import Raven from 'raven-js'
import { ConnectedRouter } from 'connected-react-router'


if(process.env.NODE_ENV === "production"){
    Raven.config('https://6757ef1240c14116835a7f2a5e05875f@sentry.io/1264321').install()
}

ReactDOM.render((
    <Provider store={store}>
        <ConnectedRouter history={history}> 
            <App history={history}/>
        </ConnectedRouter> 
    </Provider>
), document.getElementById('root'));

registerServiceWorker();
