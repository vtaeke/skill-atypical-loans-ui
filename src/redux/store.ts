import { createStore, combineReducers } from 'redux';
import formReducers from "./formReducers";

const rootReducer = combineReducers({
    form: formReducers,
});

const store = createStore(rootReducer);

export default store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch
