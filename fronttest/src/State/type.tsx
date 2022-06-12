import react from 'react'

export interface msgList{
    text: string,
    sender: string
}

export interface Client {
    username: string;
    id: string;
}

export interface ClientList {
    count: number;
    list: Client[];
}
  