import { ActionType, MsgActionType } from "../Action-Types"
import { msg } from "../type"

//pour le chat
type MsgAddAction = {
    type: MsgActionType.ADDMSG
    payload: msg
}

export type msgAction = MsgAddAction

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