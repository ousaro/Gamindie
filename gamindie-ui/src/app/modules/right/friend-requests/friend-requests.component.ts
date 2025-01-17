import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

interface FriendRequest {
  id: number;
  name: string;
  avatarUrl?: string;
}


@Component({
  selector: 'app-friend-requests',
  imports: [CommonModule,AngularSvgIconModule],
  templateUrl: './friend-requests.component.html',
  styleUrl: './friend-requests.component.scss'
})
export class FriendRequestsComponent {
  
  friendRequests: FriendRequest[] = [
    { id: 1, name: 'Oussama O.' },
    { id: 2, name: 'Oussama O.' },
    { id: 3, name: 'Oussama O.' },
  ];

  handleFollowBack(requestId: number): void {
    console.log('Following back user with ID:', requestId);
    this.friendRequests = this.friendRequests.filter(request => request.id !== requestId);
  }
}
