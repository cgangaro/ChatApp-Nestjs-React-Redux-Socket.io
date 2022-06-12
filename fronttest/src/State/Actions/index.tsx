import { ActionType, clientListActionType, LogActionType, MsgActionType } from "../Action-Types"
import { Client, msgList } from "../type"


type ClientAddAction = {
    type: clientListActionType.ADDCLIENT
    payload: Client
}

type ClientRemoveAction = {
    type: clientListActionType.REMOVECLIENT
    payload: Client
}


export type clientListAction = ClientAddAction | ClientRemoveAction

//pour le chat
type MsgAddAction = {
    type: MsgActionType.ADDMSG
    payload: msgList
}

export type msgAction = MsgAddAction

type SetUsernameAction = {
    type: LogActionType.SETUSERNAME
    payload: string
}

type SetIdAction = {
    type: LogActionType.SETID
    payload: string
}

export type logAction = SetUsernameAction | SetIdAction

//exemple
type DepositAction = {
    type: ActionType.DEPOSIT
    payload: number //le payload?: veut dire que ce parametre est facultatif
}

type WithdrawAction = {
    type: ActionType.WITHDRAW
    payload: number
}

type BankruptAction = {
    type: ActionType.BANKRUPT
}

export type Action = DepositAction | WithdrawAction | BankruptAction