import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, inject, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { RouteTrackerService } from '../../../core/services/routeTracker/route-tracker.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { centerNavigateTo, rightNavigateTo } from '../../../core/services/commun_fn/Navigation_fn';
import { ChatRoomRequest, ChatRoomResponse, FriendShipResponse, UserResponse } from '../../../core/services/models';
import { AuthContext } from '../../../shared/contexts/auth-context';
import { ChatRoomService, FriendShipControllerService, UserService } from '../../../core/services/services';
import { createChatroom, getOwnerChatroom } from '../../../core/services/commun_fn/Chatroom_fn';
import { getUserById } from '../../../core/services/commun_fn/User_fn';
import { getUserFriendShip } from '../../../core/services/commun_fn/FriendShip_fn';



@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  private authContext = inject(AuthContext);
    
      userSignal = this.authContext.user;
      isLoading = this.authContext.isLoading;
    
      user: UserResponse | null = null;
  searchQuery: string = '';
  currentUrl: string = '';
  isCenterRoute: boolean = false;
  isFriendsModalOpen = false;
  private subscriptions: Subscription[] = [];

  chatRooms: ChatRoomResponse[] = [];

  recipients: { [key: number]: UserResponse } = {};

  friendsList : FriendShipResponse[] | null = null;

  constructor(
    private routeTrackerService: RouteTrackerService,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private friendShipService: FriendShipControllerService,
    private chatRoomService: ChatRoomService
  ) {
     effect(() => {
          this.getUserValue();
          if (this.user?.id) { 
            this.getUserChatRooms();
          }
        });
  }

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
    
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  getUserValue() {
    if (this.isLoading()) {
      return;
    }
    this.user = this.userSignal();
  }

  async fetchRecipients(): Promise<void> {
    for (const chatroom of this.chatRooms) {
      if (chatroom.id) {
        const recipientId : number = this.user?.id === chatroom.user1Id ? chatroom.user2Id || -1 : chatroom.user1Id || -1;
        this.recipients[chatroom.id] = await getUserById(this.userService, recipientId);
      }
    }        
  }

  async fetchFriends(): Promise<void> {
    this.friendsList = await getUserFriendShip(this.friendShipService, this.user?.id || -1, 0);
  }

  async getUserChatRooms(): Promise<void> {
    if (this.user?.id === undefined) return;

    this.chatRooms = await getOwnerChatroom(this.chatRoomService);
    this.fetchRecipients();
  }

  getProfileUrl(profilePicture:String|undefined): string {
    const baseURL = "http://localhost:3000/";

    // Remove leading './' or extra slashes
    const cleanPath = profilePicture?.replace(/\\/g, '/').replace(/^\.?\//, '').replace(/\/+/g, '/') ?? '';
    return  baseURL + cleanPath;
    

  }

  async startChatWithFriend(friend: FriendShipResponse) : Promise<void> {
    
    await this.createChatroom(friend);
    this.closeFriendsModal();
    window.location.reload();
  }

  async openFriendsModal() {
    await this.fetchFriends();
    this.isFriendsModalOpen = true;
  }

  async createChatroom(friend: FriendShipResponse) {
    const request : ChatRoomRequest = {
      isActive: true,
      user1Id: this.user?.id || -1,
      user2Id: friend.receiverId === this.user?.id ? friend.senderId || -1 : friend.receiverId || -1,
      name: `${friend.receiverUsername} - ${friend.senderUsername}`


    }
    await createChatroom(this.chatRoomService,request);
  }
  
  closeFriendsModal() {
    this.isFriendsModalOpen = false;
  }

  getFriendProfilePicture(friend: FriendShipResponse): string {
    return friend.receiverId === this.user?.id ? this.getProfileUrl(friend.senderAvatar) : this.getProfileUrl(friend.receiverAvatar);
  }

  getFriendName(friend: FriendShipResponse): string | undefined {
    return friend.receiverId === this.user?.id ? friend.senderUsername : friend.receiverUsername;
  }

  openChatroom(chatRoom: ChatRoomResponse): void {
    const chatPath = `chat/chatroom/${chatRoom.id}`;

    if (this.isCenterRoute) {
      centerNavigateTo(chatPath, this.currentUrl, this.router);
    } else {
      rightNavigateTo(chatPath, this.currentUrl, this.router);
    }
  }


}