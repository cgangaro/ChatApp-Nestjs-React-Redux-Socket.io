import react from 'react'
import { io, Socket } from 'socket.io-client';

export interface msg{
    text: string,
    sender: string,
    recipient: string
}

export interface Client {
    username: string;
    id: string;
}

export interface ClientList {
    count: number;
    list: Client[];
}

export interface contextType {
    socket: Socket;
}