import { createStore,combineReducers,applyMiddleware,compose } from "redux";
import thunk from 'redux-thunk';

//reducers
import {categoriesReducers} from './reducers/categoriesReducers';
import { productsReducers } from "./reducers/productsReducer";
import { usersReducers } from "./reducers/usersReducers";
import { ordersReducer } from "./reducers/ordersReducers";
import { messagesReducer } from "./reducers/messagesReducer";
import { articleReducer } from "./reducers/articlesReducers";
import { commentsReducer } from "./reducers/commentsReducers";

const middlewares = [thunk];
const initialState = {};

const rootReducer = combineReducers({
    categories:categoriesReducers,
    products:productsReducers,
    users:usersReducers,
    orders:ordersReducer,
    messages:messagesReducer,
    articles:articleReducer,
    comments:commentsReducer
});

const store = createStore(rootReducer,initialState,compose(
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()


));


export default store;