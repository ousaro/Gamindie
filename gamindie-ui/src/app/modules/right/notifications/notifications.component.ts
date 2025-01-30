import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Notification {
  type: 'follow' | 'message';
  text: string;
  isSeen?: boolean;
}


@Component({
  selector: 'app-notifications',
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent {

  notifications: Notification[] = [
    // {
    //   type: 'follow',
    //   text: 'Start following you',
    //   isSeen: true
    // },
    // {
    //   type: 'message',
    //   text: 'Send you message',
    //   isSeen: true
    // },
    // {
    //   type: 'message',
    //   text: 'Send you message',
    //   isSeen: false
    // },
    // {
    //   type: 'message',
    //   text: 'Send you message',
    //   isSeen: false
    // }
    
  ];

  markAsSeen(index: number) {
    this.notifications[index].isSeen = true;
  }

  handleNotificationClick(index: number){
    console.log('Notification clicked', this.notifications[index].text);
    this.markAsSeen(index);
  }
  



}
