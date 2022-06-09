import { combineReducers } from "redux";
import bankReducer from "./bankReducers";
import { logReducer } from "./logReducer";
import { msgReducer } from "./msgReducer";
import { utilsReducer } from "./utilsReducer";

const reducers = combineReducers({
    msg: msgReducer,
    bank: bankReducer,
    log: logReducer,
    utils: utilsReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>