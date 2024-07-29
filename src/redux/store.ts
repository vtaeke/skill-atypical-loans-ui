import { createStore, combineReducers } from 'redux';
import formReducers from "./reducers/formReducer";
import formSettlement from "./reducers/formSettlementReducer";

const rootReducer = combineReducers({
    form: formReducers,
    formSettlement: formSettlement,
});

const store = createStore(rootReducer);

export default store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch
