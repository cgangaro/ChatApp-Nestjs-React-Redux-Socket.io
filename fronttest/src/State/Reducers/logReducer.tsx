import { validateInput } from "../../Utils/logUtils";
import { LogActionType } from "../Action-Types";
import { logAction } from "../Actions";

interface LogData {
  username: string;
}

export const initialState: LogData = {
  username: ""
};

export const logReducer = (state: LogData = initialState, action: logAction) => {
    switch (action.type) {
        case LogActionType.SETUSERNAME: {
            if (validateInput(action.payload))
                return {
                ...state,
                username: action.payload
                };
            else
                return state;
        }
        default:
        return state;
    }
};

