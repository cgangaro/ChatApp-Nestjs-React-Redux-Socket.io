import { MsgActionType } from "../Action-Types";
import { msgAction } from "../Actions";
import { msg } from "../type";

interface Conversation {
  count: number;
  msg: msg[];
}

export const initialState: Conversation = {
  count: 1,
  msg: [{
    text : "textTest",
    sender : "senderTest"
  }]
};

export const msgReducer = (state: Conversation = initialState, action: msgAction) => {
  switch (action.type) {
    case MsgActionType.ADDMSG: {
        return {
          ...state,
          count: state.count + 1,
          msg: [...state.msg, action.payload]
        };
    }
    default:
      return state;
  }
};

// case actionTypes.ADD: {
//   return {
//     ...state,
//     count: state.count + 1,
//     list: [...state.list, action.payload]
//   };
// }
// case actionTypes.DELETE: {
//   const oldList = [...state.list];
//   const newList = oldList;

//   return {
//     ...state,
//     count: state.count - 1,
//     list: newList
//   };
// }