import { validateInput } from "../../Utils/logUtils";
import { clientListActionType, LogActionType } from "../Action-Types";
import { clientListAction, logAction } from "../Actions";
import { Client, ClientList } from "../type";


export const initialState: ClientList = {
    count: 0,
    list: []
  };

export const clientListReducer = (state: ClientList = initialState, action: clientListAction) => {
    switch (action.type) {
        case clientListActionType.ADDCLIENT: {
            return {
                ...state,
                count: state.count + 1,
                list: [...state.list, action.payload]
              };
        }
        case clientListActionType.REMOVECLIENT: {
            return {
                ...state,
                count: state.count - 1,
                list: state.list.filter(item => item.id !== action.payload.id)
              };
          }
        default:
        return state;
    }
};

