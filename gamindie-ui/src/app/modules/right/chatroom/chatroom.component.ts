import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { RouteTrackerService } from '../../../core/services/routeTracker/route-tracker.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import {  ChatRoomResponse, MessageRequest } from '../../../core/services/models';
import { getChatroomById } from '../../../core/services/commun_fn/Chatroom_fn';
import { ChatRoomService } from '../../../core/services/services';
import { WebsocketService } from '../../../core/services/websocket/websocket.service';

@Component({
  selector: 'app-chatroom',
  imports: [CommonModule, FormsModule,AngularSvgIconModule],
  templateUrl: './chatroom.component.html',
  styleUrl: './chatroom.component.scss'
})
export class ChatroomComponent implements OnInit {

  chatRoom: ChatRoomResponse = {}
 
  newMessage = '';
  currentUrl: string = '';
  isCenterRoute: boolean = false;

  private breakpointSubscription: Subscription | undefined;

  constructor(
     private routeTrackerService: RouteTrackerService,
     private router: Router,
     private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    private chatRoomService: ChatRoomService,
    private websocketService: WebsocketService
  ) {}

  async ngOnInit(): Promise<void> {
      this.routeTrackerService.currentUrl$.subscribe((url) => {
        this.currentUrl = url;
      });

      this.breakpointSubscription = this.breakpointObserver
            .observe([Breakpoints.Handset, Breakpoints.Medium])
            .subscribe(result => {
              this.isCenterRoute = result.matches;
      });

      const chatRoomId = this.route.snapshot.paramMap.get('id');
      if(chatRoomId) {
        await this.fetchChatRoom(Number(chatRoomId));
      }

      this.websocketService.connect();
      
    }

    async fetchChatRoom(id: number) {
      this.chatRoom = await getChatroomById(this.chatRoomService, id);
    }

  sendMessage() {
    const message: MessageRequest = {
      chatRoomId: this.chatRoom.id,
      content: "hello again user-1",
      ownerId: 202,

      recipientEmail: "johnWill3@gmail.com",

    }
    
    this.websocketService.sendPrivateMessage(message);
  }

  goBack() {
    window.history.back();
  }

  
}
