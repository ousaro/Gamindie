import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { RouteTrackerService } from '../../../core/services/routeTracker/route-tracker.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChatRoom } from '../../../core/services/models';
import { centerNavigateTo, rightNavigateTo } from '../../../core/services/commun_fn/Navigation_fn';
import { WebsocketTestService } from '../../../core/services/websocketTest/websocket-test.service';



@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  searchQuery: string = '';
  currentUrl: string = '';
  isCenterRoute: boolean = false;
  private subscriptions: Subscription[] = [];

  chatRooms: ChatRoom[] = [
    {
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

    },
    {
      name: 'Bob',
      id: 2,
      user1: {
        id: 2,
        username: 'Bob',
        profilePicture: ''
      },
      user2: {
        id: 1,
        username: 'Alice',
        profilePicture: ''
      },
      messages: [
        {
          content: 'Hello Alice',
          createdBy: 2,
          sentAt: '2021-06-01T00:00:01',
          status: 'SENT'
        },
        {
          content: 'Hello Bob',
          createdBy: 1,
          sentAt: '2021-06-01T00:00:00',
          status: 'SENT'
        }
      ]
    },
    
  ]

  constructor(
    private routeTrackerService: RouteTrackerService,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private WebSocketTestService: WebsocketTestService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.routeTrackerService.currentUrl$.subscribe(url => {
        this.currentUrl = url;
      })
    );

    this.subscriptions.push(
      this.breakpointObserver
        .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
        .subscribe(result => {
          this.isCenterRoute = result.matches;
        })
    );

    this.WebSocketTestService.connect();
    
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  openChatroom(chatRoom: ChatRoom): void {
    const chatPath = `chat/chatroom/${chatRoom.id}`;

    if (this.isCenterRoute) {
      centerNavigateTo(chatPath, this.currentUrl, this.router);
    } else {
      rightNavigateTo(chatPath, this.currentUrl, this.router);
    }
  }

  sendMessage(){
    this.WebSocketTestService.sendMessage();
  }

}