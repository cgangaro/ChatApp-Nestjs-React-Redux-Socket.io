import { combineReducers } from "redux";
import bankReducer from "./bankReducers";
import { clientListReducer } from "./clientList";
import { logReducer } from "./logReducer";
import { msgReducer } from "./msgReducer";
import { utilsReducer } from "./utilsReducer";

const reducers = combineReducers({
    msg: msgReducer,
    bank: bankReducer,
    log: logReducer,
    utils: utilsReducer,
    clientList: clientListReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>