import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, inject, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { RouteTrackerService } from '../../../core/services/routeTracker/route-tracker.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { centerNavigateTo, rightNavigateTo } from '../../../core/services/commun_fn/Navigation_fn';
import { ChatRoomResponse, UserResponse } from '../../../core/services/models';
import { AuthContext } from '../../../shared/contexts/auth-context';
import { ChatRoomService } from '../../../core/services/services';
import { getOwnerChatroom } from '../../../core/services/commun_fn/Chatroom_fn';



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
  private subscriptions: Subscription[] = [];

  chatRooms: ChatRoomResponse[] = [];

  constructor(
    private routeTrackerService: RouteTrackerService,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
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

  async getUserChatRooms(): Promise<void> {
    if (this.user?.id === undefined) return;

    this.chatRooms = await getOwnerChatroom(this.chatRoomService);
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