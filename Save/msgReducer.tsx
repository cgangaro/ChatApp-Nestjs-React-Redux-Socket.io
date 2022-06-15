import { MsgActionType } from "../Action-Types";
import { msgAction } from "../Actions";
import { msg, msgList } from "../type";



interface Conversations {
  active: msgList;
  count: number;
  list: msgList[];
}

export const initialState: Conversations = {
  active: {name: "", count: 0, msg: []},
  count: 0,
  list: []
};

export const msgReducer = (state: Conversations = initialState, action: msgAction) => {
  switch (action.type) {
    case MsgActionType.ADDMSG: {
      const newState = state;
      let index = -1;
      if (action.payload.sender == "Me")
      {
        index = state.list.findIndex(item => item.name === action.payload.recipient);
      }
      else
      {
        index = state.list.findIndex(item => item.name === action.payload.sender);
      }
      console.log(`reducer add msg, index = ${index}`);
      if (index >= 0)
      {
        console.log(`reducer index = ${index}`)
        console.log(`count = ${state.list[index].count}`)
        // newState.list[index].count;
        newState.list[index].msg = [...newState.list[index].msg, action.payload];
        newState.list[index].count = newState.list[index].count + 1;
        return {
          ...state,
          list: newState.list
        };
        // return {
        //   ...state,
        //   list: state.list[index].count + 1,
        //   list: [...state.msg, action.payload]
        // };
      }
      else
      {
        console.log(`reducer create msglist`)
        let sender = "";
        if (action.payload.sender == "Me")
        {
          sender = action.payload.recipient;
        }
        else
        {
          sender = action.payload.sender;
        }
        const newMsgList: msgList = {
          name: sender,
          count: 1,
          msg: []
        }
        newMsgList.msg = [...newMsgList.msg, action.payload];
        newState.list = [...newState.list, newMsgList];
        return {
          ...state,
          list: newState.list,
          count: state.count + 1
        };
      }
    }
    case MsgActionType.ADDCONVERS: {
      if (state.list.find(item => item.name === action.payload))
        return state;
      const newState = state;
      const newMsgList: msgList = {
        name: action.payload,
        count: 0,
        msg: []
      }
      newState.list = [...newState.list, newMsgList];
      return {
        ...state,
        list: newState.list
      };
    }
    case MsgActionType.SETACTIVECONVERS: {
      console.log('reducer set active convers');
      return {
        ...state,
        active: action.payload
      }
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