import { Dispatch } from "redux"
import { clientListActionType, LogActionType } from "../Action-Types"
import { clientListAction, logAction } from "../Actions"
import { Client, msg } from "../type"

//ClientList
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

export const addMsg = (item: msg) => {
    return (dispatch: Dispatch<clientListAction>) => {
        dispatch({
            type: clientListActionType.ADDMSG,
            payload: item
        })
    }
}

export const setActivConvers = (item: string) => {
    return (dispatch: Dispatch<clientListAction>) => {
        dispatch({
            type: clientListActionType.SETACTIVECONVERS,
            payload: item
        })
    }
}

//LogData
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