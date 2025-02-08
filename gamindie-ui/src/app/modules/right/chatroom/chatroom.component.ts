import { CommonModule } from '@angular/common';
import { Component, effect, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { RouteTrackerService } from '../../../core/services/routeTracker/route-tracker.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import {  ChatRoomResponse, MessageRequest, MessageResponse, UserResponse } from '../../../core/services/models';
import { getChatroomById } from '../../../core/services/commun_fn/Chatroom_fn';
import { ChatRoomService, MessageService, UserService } from '../../../core/services/services';
import { WebsocketService } from '../../../core/services/websocket/websocket.service';
import { AuthContext } from '../../../shared/contexts/auth-context';
import { getMessageByChatroomId } from '../../../core/services/commun_fn/Message_fn';
import { getFormattedDate } from '../../../core/services/commun_fn/utilities';
import { getUserById } from '../../../core/services/commun_fn/User_fn';

@Component({
  selector: 'app-chatroom',
  imports: [CommonModule, FormsModule,AngularSvgIconModule],
  templateUrl: './chatroom.component.html',
  styleUrl: './chatroom.component.scss'
})
export class ChatroomComponent implements OnInit {

  
      private authContext = inject(AuthContext);
    
      userSignal = this.authContext.user;
      isLoading = this.authContext.isLoading;
    
      user: UserResponse | null = null;

  recipient: UserResponse | null = null;

  chatRoom: ChatRoomResponse = {}
  messages : MessageResponse[] = [];
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
    private messageService: MessageService,
    private userService: UserService,
    private websocketService: WebsocketService
  ) {

      effect(() => {
          this.getUserValue();
        });
  }

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
        await this.fetchMessages();
        await this.fetchRecipient();
      }

      this.websocketService.connect();
      this.scrollToBottom();

       // Subscribe to real-time messages
      this.websocketService.message$.subscribe((message) => {
        if (message.chatRoomId === this.chatRoom.id) {
          this.messages.push(message); // Add the new message directly
          this.scrollToBottom();       // Scroll to the latest message
        }
      });
          
    }

    getUserValue() {
      if (this.isLoading()) {
        return;
      }
      this.user = this.userSignal();
    }

    async fetchRecipient() {
      if (this.chatRoom.id) {
        const recipientId : number = this.user?.id === this.chatRoom.user1Id ? this.chatRoom.user2Id || -1 : this.chatRoom.user1Id || -1;
        this.recipient = await getUserById(this.userService, recipientId);
      }
        
    }
  
    async fetchMessages() {
      if (this.chatRoom.id) {
        this.messages = await getMessageByChatroomId(this.messageService, this.chatRoom.id);
      }
    }
    async fetchChatRoom(id: number) {
      this.chatRoom = await getChatroomById(this.chatRoomService, id);
    }

    getProfileUrl(profilePicture:String|undefined): string {
      const baseURL = "http://localhost:3000/";
  
      // Remove leading './' or extra slashes
      const cleanPath = profilePicture?.replace(/\\/g, '/').replace(/^\.?\//, '').replace(/\/+/g, '/') ?? '';
      return  baseURL + cleanPath;
      
  
    }
  
    getFormattedDate(date:string|undefined): string {
          return getFormattedDate(date);
      }

  async sendMessage() {

    if (!this.newMessage.trim()) return; // Prevent sending empty messages

    const message: MessageRequest = {
      chatRoomId: this.chatRoom.id,
      content: this.newMessage,
      ownerId: this.user?.id,

      recipientEmail: this.recipient?.email,

    }
    
    this.websocketService.sendPrivateMessage(message);
    
      // Add message locally for immediate feedback
    this.messages.push({
      ...message,
      id: Date.now(), // Temporary ID until server sends the actual message
      ownerId: this.user?.id,
      sentAt: Date.now().toFixed(),
      status: "SENT",
    });

    this.scrollToBottom();


    this.newMessage = '';
  }

  scrollToBottom(): void {
    setTimeout(() => {
      const chatContainer = document.getElementById('chat-container');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 100);
  }
  

  goBack() {
    window.history.back();
  }

  
}
