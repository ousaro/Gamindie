import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FriendShip } from '../../../core/services/models';


@Component({
  selector: 'app-friend-requests',
  imports: [CommonModule,AngularSvgIconModule],
  templateUrl: './friend-requests.component.html',
  styleUrl: './friend-requests.component.scss'
})
export class FriendRequestsComponent {
  
  friendRequests: FriendShip[] = [
    {
      id: 1,
      sender: {
        id: 1,
        username: 'JohnDoe',
        profilePicture: ''
      },
      receiver: {
        id: 2,
        username: 'JaneDoe',
        profilePicture: ''
      },
      status: 'pending'
    },
    {
      id: 2,
      sender: {
        id: 3,
        username: 'Alice',
        profilePicture: ''
      },
      receiver: {
        id: 4,
        username: 'JaneDoe',
        profilePicture: ''
      },
      status: 'pending'
    }
  ]
  

  handleFollowBack(requestId: number): void {
    console.log('Following back user with ID:', requestId);
    this.friendRequests = this.friendRequests.filter(request => request.id !== requestId);
  }
}
