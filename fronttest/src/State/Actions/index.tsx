import { ActionType, LogActionType, MsgActionType } from "../Action-Types"
import { msgList } from "../type"

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

export type logAction = SetUsernameAction

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