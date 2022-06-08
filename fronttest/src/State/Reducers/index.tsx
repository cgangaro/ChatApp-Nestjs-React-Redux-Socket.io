import { combineReducers } from "redux";
import bankReducer from "./bankReducers";
import { msgReducer } from "./msgReducer";

const reducers = combineReducers({
    msg: msgReducer,
    bank: bankReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>