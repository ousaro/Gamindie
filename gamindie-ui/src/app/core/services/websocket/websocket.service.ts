import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { MessageRequest } from '../models';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private stompClient: Client | null = null;
  private token = localStorage.getItem('token');
  private serverUrl = `http://localhost:8088/api/v1/ws?token=${this.token}`; // WebSocket endpoint


  constructor() { }

  connect(): void {
    if (this.stompClient && this.stompClient.active) return; // Prevent duplicate connections

    this.stompClient = new Client({
      webSocketFactory: () => new SockJS(this.serverUrl),
      reconnectDelay: 5000, // Auto-reconnect after 5s
      //debug: (msg) => console.log(`STOMP Debug: ${msg}`), // Optional debugging
      onConnect: () => {
        console.log('✅ Connected to WebSocket');
        this.subscribeToPrivateMessages();
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

  subscribeToPrivateMessages(): void {
    if (!this.stompClient || !this.stompClient.connected) {
      console.log('❌ STOMP client is not connected!');
      return;
    }
  
    this.stompClient.subscribe('/user/queue/messages', (message) => {
      try {
        const parsedMessage = JSON.parse(message.body);
        console.log('📥 Private Message Received:', parsedMessage);
      } catch (error) {
        console.error('❌ Failed to parse message:', error);
      }
    });
  }
  
  
  

  sendPrivateMessage(message:MessageRequest): void {
    if (!this.stompClient || !this.stompClient.connected) return;
  
    this.stompClient.publish({
      destination: '/app/chat.sendMessage', // Send message to the server
      body: JSON.stringify(message),
    });
  }
  

}
