import { validateInput } from "../../Utils/logUtils";
import { LogActionType } from "../Action-Types";
import { logAction } from "../Actions";

interface LogData {
  username: string;
  id: string;
}

export const initialState: LogData = {
  username: "",
  id: ""
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
        case LogActionType.SETID: {
          if (validateInput(action.payload))
              return {
              ...state,
              id: action.payload
              };
          else
              return state;
        }
        default:
        return state;
    }
};

