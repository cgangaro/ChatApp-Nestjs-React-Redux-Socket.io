import { Dispatch } from "redux"
import { action } from "typesafe-actions";
import { ActionType, LogActionType, MsgActionType } from "../Action-Types"
import { Action, logAction, msgAction } from "../Actions"
import { msgList } from "../type"

// export const todoActions = {
//     add: (item: string) => action(actionTypes.ADD, item),
//     delete: (idx: number) => action(actionTypes.DELETE, idx)
// };

export const setUsername = (item: string) => {
    return (dispatch: Dispatch<logAction>) => { //Dispatch<Action> indique que nous envoyons une action Action
        dispatch({
            type: LogActionType.SETUSERNAME,
            payload: item
        })
    }
}

export const msgAdd = (item: msgList) => {
    return (dispatch: Dispatch<msgAction>) => { //Dispatch<Action> indique que nous envoyons une action Action
        dispatch({
            type: MsgActionType.ADDMSG,
            payload: item
        })
    }
}

//exemple
export const depositMoney = (amount: number) => {
    return (dispatch: Dispatch<Action>) => { //Dispatch<Action> indique que nous envoyons une action Action
        dispatch({
            type: ActionType.DEPOSIT,
            payload: amount
        })
    }
}

export const withdrawMoney = (amount: number) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.WITHDRAW,
            payload: amount
        })
    }
}

export const bankrupt = () => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.BANKRUPT
        })
    }
}