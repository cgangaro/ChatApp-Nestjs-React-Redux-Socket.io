import { combineReducers } from "redux";
import { clientListReducer } from "./clientListReducer";
import { logReducer } from "./logReducer";
import { utilsReducer } from "./utilsReducer";

const reducers = combineReducers({
    log: logReducer,
    utils: utilsReducer,
    clientList: clientListReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>