import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root',
})
export class WebsocketTestService {
  private stompClient: Client | null = null;
  private serverUrl = 'http://localhost:8088/api/v1/ws'; // WebSocket endpoint


  constructor() { }

  connect(): void {
    if (this.stompClient && this.stompClient.active) return; // Prevent duplicate connections

    this.stompClient = new Client({
      webSocketFactory: () => new SockJS(this.serverUrl),
      connectHeaders: {
        Authorization: ' Bearer ' + localStorage.getItem('token'),
      },
      reconnectDelay: 5000, // Auto-reconnect after 5s
      //debug: (msg) => console.log(`STOMP Debug: ${msg}`), // Optional debugging
      onConnect: () => {
        console.log('✅ Connected to WebSocket');
        this.subscribeToTestChannel();
      },
      onStompError: (frame) => {
        console.error('❌ STOMP Error:', frame);
      },
      onWebSocketError: (error) => {
        console.error('❌ WebSocket Error:', error);
      },
    });

    this.stompClient.activate();
  }

  subscribeToTestChannel(): void {
    if (!this.stompClient || !this.stompClient.connected) {
      console.log('❌ STOMP client is not connected!');
      return;
    }
  
    this.stompClient.subscribe('/user/test', (message) => {
      try {
        const parsedMessage = JSON.parse(message.body);
        console.log('✅ Parsed message:', parsedMessage);
      } catch (error) {
        console.error('❌ Failed to parse message:', error);
      }
    });

  }
  
  

  sendMessage(): void {
    if (!this.stompClient || !this.stompClient.connected) return;

    const message = {
      content: 'Hello from Angular!',
      chatroomId: 2,
      ownerId: 202,
    };

    this.stompClient.publish({
      destination: '/app/chat.test',
      body: JSON.stringify(message),
    });
  }

}
