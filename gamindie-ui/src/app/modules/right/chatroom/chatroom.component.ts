import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Message {
  text: string;
  sender: 'user' | 'other';
  seen?: boolean;
  timestamp: Date;
}

@Component({
  selector: 'app-chatroom',
  imports: [CommonModule, FormsModule],
  templateUrl: './chatroom.component.html',
  styleUrl: './chatroom.component.scss'
})
export class ChatroomComponent {
  otherUser = 'Oussama O.';
  messages: Message[] = [
    {
      text: 'Hello !',
      sender: 'other',
      timestamp: new Date()
    },
    {
      text: 'Hi',
      sender: 'user',
      seen: true,
      timestamp: new Date()
    }
  ];
  newMessage = '';

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({
        text: this.newMessage,
        sender: 'user',
        timestamp: new Date()
      });
      this.newMessage = '';
    }
  }
}
