import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import root from './reducers/root';

const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({

        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk)
);

const store = createStore(root, enhancer);

export default store;
