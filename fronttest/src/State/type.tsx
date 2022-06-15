import { Socket } from 'socket.io-client';

export interface msg{
    text: string,
    sender: string,
    recipient: string
}

export interface msgList {
    count: number;
    msg: msg[];
}

export interface Client {
    username: string;
    id: string;
    convers: msgList;
}

export interface ClientList {
    count: number;
    active: string;
    list: Client[];
} 

export interface contextType {
    socket: Socket;
}