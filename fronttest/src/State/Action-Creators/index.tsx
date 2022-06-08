import { Dispatch } from "redux"
import { action } from "typesafe-actions";
import { ActionType, MsgActionType } from "../Action-Types"
import { Action, msgAction } from "../Actions"
import { msg } from "../type"

// export const todoActions = {
//     add: (item: string) => action(actionTypes.ADD, item),
//     delete: (idx: number) => action(actionTypes.DELETE, idx)
// };

export const msgAdd = (item: msg) => {
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