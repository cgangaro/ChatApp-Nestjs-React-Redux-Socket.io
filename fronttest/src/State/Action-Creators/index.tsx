import { Dispatch } from "redux"
import { action } from "typesafe-actions";
import { ActionType, clientListActionType, LogActionType, MsgActionType } from "../Action-Types"
import { Action, clientListAction, logAction, msgAction } from "../Actions"
import { Client, msg } from "../type"

// export const todoActions = {
//     add: (item: string) => action(actionTypes.ADD, item),
//     delete: (idx: number) => action(actionTypes.DELETE, idx)
// };

export const addClient = (item: Client) => {
    return (dispatch: Dispatch<clientListAction>) => {
        dispatch({
            type: clientListActionType.ADDCLIENT,
            payload: item
        })
    }
}

export const removeClient = (item: Client) => {
    return (dispatch: Dispatch<clientListAction>) => {
        dispatch({
            type: clientListActionType.REMOVECLIENT,
            payload: item
        })
    }
}


export const setUsername = (item: string) => {
    return (dispatch: Dispatch<logAction>) => {
        dispatch({
            type: LogActionType.SETUSERNAME,
            payload: item
        })
    }
}

export const setId = (item: string) => {
    return (dispatch: Dispatch<logAction>) => {
        dispatch({
            type: LogActionType.SETID,
            payload: item
        })
    }
}


export const msgAdd = (item: msg) => {
    return (dispatch: Dispatch<msgAction>) => { //Dispatch<Action> indique que nous envoyons une action Action
        dispatch({
            type: MsgActionType.ADDMSG,
            payload: item
        })
    }
}

export const conversAdd = (item: string) => {
    return (dispatch: Dispatch<msgAction>) => { //Dispatch<Action> indique que nous envoyons une action Action
        dispatch({
            type: MsgActionType.ADDCONVERS,
            payload: item
        })
    }
}

export const setActivConvers = (item: string) => {
    return (dispatch: Dispatch<msgAction>) => { //Dispatch<Action> indique que nous envoyons une action Action
        dispatch({
            type: MsgActionType.SETACTIVECONVERS,
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