import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { RouteTrackerService } from '../../../core/services/routeTracker/route-tracker.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { ChatRoom } from '../../../core/services/models';
import { centerNavigateTo } from '../../../core/services/commun_fn/Navigation_fn';

@Component({
  selector: 'app-chatroom',
  imports: [CommonModule, FormsModule,AngularSvgIconModule],
  templateUrl: './chatroom.component.html',
  styleUrl: './chatroom.component.scss'
})
export class ChatroomComponent implements OnInit {

  chatRoom: ChatRoom = {
    name: 'Alice',
    id: 1,
    user1: {
      id: 1,
      username: 'Alice',
      profilePicture: ''
    },
    user2: {
      id: 2,
      username: 'Bob',
      profilePicture: ''
    },
    messages: [
      {
        content: 'Hello Bob',
        createdBy: 1,
        sentAt: '2021-06-01T00:00:00',
        status: 'SENT'
      },
      {
        content: 'Hello Alice',
        createdBy: 2,
        sentAt: '2021-06-01T00:00:01',
        status: 'SENT'
      }
    ]

  }
 
  newMessage = '';
  currentUrl: string = '';
  isCenterRoute: boolean = false;

  private breakpointSubscription: Subscription | undefined;

  constructor(
     private routeTrackerService: RouteTrackerService,
     private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
      this.routeTrackerService.currentUrl$.subscribe((url) => {
        this.currentUrl = url;
      });

      this.breakpointSubscription = this.breakpointObserver
            .observe([Breakpoints.Handset, Breakpoints.Medium])
            .subscribe(result => {
              this.isCenterRoute = result.matches;
      });
  
      
    }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.chatRoom.messages?.push({
        content: this.newMessage,
        createdBy: 1,
        sentAt: new Date().toISOString(),
      });
      this.newMessage = '';
    }
  }

  goBack() {
    window.history.back();
  }

  
}
