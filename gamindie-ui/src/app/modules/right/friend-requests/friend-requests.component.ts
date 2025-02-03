import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FriendShipRequest, FriendShipResponse, UserResponse } from '../../../core/services/models';
import { FriendShipControllerService } from '../../../core/services/services';
import { acceptFriendRequest, getUserPendingFriendShip, sendFriendRequest } from '../../../core/services/commun_fn/FriendShip_fn';
import { AuthContext } from '../../../shared/contexts/auth-context';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-friend-requests',
  imports: [CommonModule,AngularSvgIconModule],
  templateUrl: './friend-requests.component.html',
  styleUrl: './friend-requests.component.scss'
})
export class FriendRequestsComponent implements OnInit {

  
    private authContext = inject(AuthContext);
  
    userSignal = this.authContext.user;
    isLoading = this.authContext.isLoading;
  
    user: UserResponse | null = null;
  
  friendRequests: FriendShipResponse[] = [];

  constructor(
    private friendShipService: FriendShipControllerService,
  ) {
    effect(() => {
      this.getUserValue();
      if (this.user?.id) { 
        this.getPengindFriendShips();
      }
    });
    
   }

  ngOnInit(): void {
    
  }

  getUserValue() {
    if (this.isLoading()) {
      return;
    }
    this.user = this.userSignal();
  }


  async getPengindFriendShips(): Promise<void> {
    if(this.user?.id === undefined) return ;
    this.friendRequests = await getUserPendingFriendShip(this.friendShipService,this.user?.id,0);
    
  }

  async acceptFriendRequest(friendShipId: number|undefined): Promise<void> {
    if(friendShipId === undefined) return ;
    await acceptFriendRequest(this.friendShipService, friendShipId);
    this.getPengindFriendShips();
  }

  getProfileUrl(profilePicture:String|undefined): string {
    const baseURL = "http://localhost:3000/";

    // Remove leading './' or extra slashes
    const cleanPath = profilePicture?.replace(/\\/g, '/').replace(/^\.?\//, '').replace(/\/+/g, '/') ?? '';
    return  baseURL + cleanPath;
    

  }

  

  handleFollowBack(requestId: number): void {
   
  }
}
