import { validateInput } from "../../Utils/logUtils";
import { clientListActionType } from "../Action-Types";
import { clientListAction } from "../Actions";
import { ClientList } from "../type";

export const initialState: ClientList = {
    count: 0,
    active: "",
    list: []
  };

export const clientListReducer = (state: ClientList = initialState, action: clientListAction) => {
  switch (action.type) {
    case clientListActionType.ADDCLIENT: {
      if (state.list.find(item => item.username === action.payload.username))
        return state;
      else
        return {
          ...state,
          count: state.count + 1,
          active: state.active,
          list: [...state.list, action.payload]
        };
    }
    case clientListActionType.REMOVECLIENT: {
      let _temp_active = state.active;
      if (state.active == action.payload.username)
        _temp_active = "";
      return {
          ...state,
          count: state.count - 1,
          active: _temp_active,
          list: state.list.filter(item => item.id !== action.payload.id)
        };
    }
    case clientListActionType.ADDMSG: {
      let index = -1;
      let newState = state;
      if (action.payload.sender == "Me")
      {
        index = state.list.findIndex(item => item.username === action.payload.recipient);
      }
      else
      {
        index = state.list.findIndex(item => item.username === action.payload.sender);
      }
      if (index >= 0)
      {
        newState.list[index].convers.msg = [...newState.list[index].convers.msg, action.payload];
        return {
          ...state,
          count: state.count,
          active: state.active,
          list: newState.list
        };
      }
      else {
        return state;
      }
    }
    case clientListActionType.SETACTIVECONVERS: {
      return {
        ...state,
        count: state.count,
        active: action.payload,
        list: state.list
      }
    }
    default:
      return state;
  }
};