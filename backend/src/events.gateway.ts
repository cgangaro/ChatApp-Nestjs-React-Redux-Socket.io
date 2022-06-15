import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  import { Logger } from '@nestjs/common';

  interface Client {
    id: string;
    username: string;
  }

  let arrClient: Client[] = [];

  @WebSocketGateway({
    cors: {
      origin: '*',
    },
  })
  export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
    @WebSocketServer()
    server: Server;

    private logger: Logger = new Logger('AppGateway');
  
    handleDisconnect(client: any) {
        this.logger.log( `Client disconnected: ${client.id}`);
        const indexOfClient = arrClient.findIndex(obj => obj.id === client.id);
        for (let i = 0; i < arrClient.length; i++) {
          if (arrClient.find(obj => obj.id !== client.id) && arrClient.find(obj => obj.username.length > 0))
            this.server.to(arrClient[i].id).emit('removeFriend', arrClient[indexOfClient]);
        }
        if (indexOfClient !== -1)
        arrClient.splice(indexOfClient, 1);
    }

    handleConnection(client: any, ...args: any[]) {
        this.logger.log( `Client connected: ${client.id}`);
        const newClient: Client = {
          id: client.id,
          username: "",
        };
        arrClient.push(newClient);
    }
    
    async afterInit(server: any) {
        this.logger.log('Init');
    }

    @SubscribeMessage('msgConnection')
    async handleMessage(client: Socket, message: string) {
      const _client_temp = arrClient.find(obj => obj.id === client.id);
      const newmessage = `Hey! You have the id: ${client.id}, ${_client_temp.id} and your username is: ${_client_temp.username}. Welcome to our server!`;
      this.server.to(client.id).emit('msgToClient', newmessage);
      this.server.to(client.id).emit('ID', client.id);
    }

    @SubscribeMessage('msgToServer')
    async msgReceived(client: Socket, data: any) {
      this.logger.log(`${client.id} said: ${data.text}`);
      this.server.to(client.id).emit('msgToClient', 505);
    }

    @SubscribeMessage('msgToOtherClient')
    async msgToOtherClient(client: Socket, data: any) {
      this.logger.log(`${data.sender} said: ${data.text} to ${data.recipient}`);
      const _client_temp = arrClient.find(obj => obj.username === data.recipient);
      if (_client_temp != null)
        this.server.to(_client_temp.id).emit('msgInputToOtherClient', data);
    }

    @SubscribeMessage('setUsername')
    async setUsername(client: Socket, data: string) {
      this.logger.log(`${client.id} set his username: ${data}`);
      if (arrClient.find(obj => obj.username === data))
      {
        this.server.to(client.id).emit('usernameRefused', arrClient);
      }
      else
      {
        arrClient.find(obj => obj.id === client.id).username = data;
        this.server.to(client.id).emit('usernameAccepted', arrClient);
      }
    }

    @SubscribeMessage('usernameRegistered')
    async usernameRegistered(client: Socket, data: string) {
      const _client_temp = arrClient.find(obj => obj.id === client.id);
      for (let i = 0; i < arrClient.length; i++) {
        if (arrClient[i].id !== client.id && arrClient[i].username.length > 0)
        {
          this.logger.log(`Envoie new friends ${_client_temp.username} to ${arrClient[i].username}, id = ${arrClient[i].id}`);
          this.server.to(arrClient[i].id).emit('newFriend', _client_temp);
        }
      this.server.to(client.id).emit('friendsList', arrClient);
      }
    }

    @SubscribeMessage('friendsListRequest')
    async listFriendsRequest(client: Socket) {
      this.logger.log(`${arrClient.find(obj => obj.id === client.id).username} request her friends list`);
      this.server.to(client.id).emit('friendsList', arrClient);
    }
  }