import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import { trucksReducer } from "./redux/reducer"

const sagaMiddleware = createSagaMiddleware()

export const reducers = combineReducers({
    trucks: trucksReducer

});
export type RootState = ReturnType<typeof reducers>
export const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga)
