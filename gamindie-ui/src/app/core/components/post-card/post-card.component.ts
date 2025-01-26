import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { RouteTrackerService } from '../../services/routeTracker/route-tracker.service';
import { Comment, CommentSectionComponent } from '../comment-section/comment-section.component';
import { centerNavigateTo } from '../../services/commun_fn/Navigation_fn';

// export interface Attachment {
//   createdBy?: number;
//   createdData?: string;
//   id?: number;
//   lastModifiedBy?: number;
//   lastModifiedDate?: string;
//   message?: Message;
//   metadata?: string;
//   name?: string;
//   post?: Post;
//   type?: string;
//   url?: string;
// }

// export interface Post {
//   attachments?: Array<Attachment>;
//   comments?: Array<Comment>;
//   content?: string;
//   createdBy?: number;
//   createdData?: string;
//   id?: number;
//   lastModifiedBy?: number;
//   lastModifiedDate?: string;
//   likes?: Array<Likes>;
//   owner?: User;
//   tags?: Array<string>;
// }


@Component({
  selector: 'app-post-card',
   imports: [CommonModule, FormsModule, AngularSvgIconModule, CommentSectionComponent],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss'
})
export class PostCardComponent implements OnInit {

  @Input() post!: {
    id: number;
    user: string;
    time: string;
    content: string;
    imageUrl: string;
  };

  @Input() isMyFeed: boolean = false;
  @Input() isMyProfile: boolean = false;

  isMenuOpen: boolean = false;
  currentUrl: string = '';

  openPostId: number | null = null;

  comments: Comment[] =  [
    { id: "1", user: 'User1', content: 'Great post!',timestamp: new Date(), replies: [] },
    { id: "2", user: 'User2', content: 'Thanks for sharing!',timestamp: new Date(), replies: [] },
  ];


 
  constructor( 
    private routeTrackerService: RouteTrackerService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.routeTrackerService.currentUrl$.subscribe((url) => {
    this.currentUrl = url;
    });
  
      
  }


  toggleCommentSection(postId: number): void {
    this.openPostId = this.openPostId === postId ? null : postId;
  }
  
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleSave() {
    this.isMenuOpen = false; 
  }

  editPost() {
    this.isMenuOpen = false;
  }

  navigateToPostDetails(postId: number): void {
    const path:string = `post/${postId}`;
    centerNavigateTo(path,this.currentUrl,this.router);
  }

  handleAddReply($event: { reply: Comment; parentId: string; }) {
    throw new Error('Method not implemented.');
  }
}
