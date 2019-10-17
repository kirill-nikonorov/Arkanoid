import React from "react";
import {render} from "react-dom";
import Root from './components/Root/Root'

import {createStore, applyMiddleware} from 'redux'


import {Provider} from 'react-redux';

import {rootReducer} from './reducers/rootReducer'

import thunk from 'redux-thunk';


const store = createStore(rootReducer, {platformCoordinate: 0}, applyMiddleware(thunk));

render(
    <Provider store={store}>
        <Root/>
    </Provider>,
    document.getElementById("root"));

if (module.hot) {
    module.hot.accept();
}
