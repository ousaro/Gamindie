import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { RouteTrackerService } from '../../services/routeTracker/route-tracker.service';
import { centerNavigateTo } from '../../services/commun_fn/Navigation_fn';
import { Comment, LikeRequest, Post, PostResponse } from '../../services/models';
import { CommentSectionComponent } from "../comment-section/comment-section.component";
import { getFormattedDate } from '../../services/commun_fn/utilities';
import { getPostCommentsCount } from '../../services/commun_fn/Comment_fn';
import { CommentService, LikeService } from '../../services/services';
import { getLikesCount, isOwnerLiked, toggleLike } from '../../services/commun_fn/Likes_fn';


@Component({
  selector: 'app-post-card',
   imports: [CommonModule, FormsModule, AngularSvgIconModule, CommentSectionComponent],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss'
})
export class PostCardComponent implements OnInit {


  @Input() post!: PostResponse;

  @Input() isMyFeed: boolean = false;
  @Input() isMyProfile: boolean = false;

  isMenuOpen: boolean = false;
  currentUrl: string = '';
  openPostId: number | null = null;
  isCommentSectionOpen:boolean = false;
  isLiked :boolean = false;
  maxLength:number = 100; // Maximum length of text before truncating
  isExpanded:boolean = false; // State to track whether content is expanded
  attachmentsURL: string[] = [];
  commentsCount: number = 0;
  likesCount: number = 0;
  
 

  constructor( 
    private routeTrackerService: RouteTrackerService,
    private router: Router,
    private commentService: CommentService,
    private likeService: LikeService
  ){}

  async ngOnInit(): Promise<void> {
    this.routeTrackerService.currentUrl$.subscribe((url) => {
    this.currentUrl = url;
    });
    
    this.getAttachmentURLs();
    await this.getCommentsCount();
    await this.getLikesCount();
    await this.isOwnerLiked();
      
  }

  getFormattedDate(): string {
      return getFormattedDate(this.post.createdData);
  }

  getAttachmentURLs(): void {
    const baseURL = "http://localhost:3000/";

    this.attachmentsURL = this.post.attachments
      ?.map((attachment) => {
        if (!attachment.url) return undefined;

        // Remove leading './' or extra slashes
        const cleanPath = attachment.url.replace(/\\/g, '/').replace(/^\.?\//, '').replace(/\/+/g, '/');

        return baseURL + cleanPath;
      })
      .filter((url): url is string => url !== undefined) || [];

    }

    getProfileUrl(profilePicture:String|undefined): string {
      const baseURL = "http://localhost:3000/";
  
      // Remove leading './' or extra slashes
      const cleanPath = profilePicture?.replace(/\\/g, '/').replace(/^\.?\//, '').replace(/\/+/g, '/') ?? '';
      console.log(baseURL + cleanPath);
      return  baseURL + cleanPath;
      
  
    }
  
  async getCommentsCount(): Promise<void> {
    if (this.post.id !== undefined){
     this.commentsCount = await getPostCommentsCount(this.commentService, this.post.id);
    }
  }

  async getLikesCount(): Promise<void> {
    if (this.post.id !== undefined){
      this.likesCount = await getLikesCount(this.likeService, this.post.id);
    }
  }

  async isOwnerLiked(): Promise<void> {
    if (this.post.id !== undefined){
      this.isLiked = await isOwnerLiked(this.likeService, this.post.id);
    }
  }


  toggleExpanded(): void {
    this.isExpanded = !this.isExpanded;
  }


  async toggleCommentSection(postId: number|undefined): Promise<void> {
    await this.getCommentsCount();
    if(postId === undefined) return;
    this.openPostId = this.openPostId === postId ? null : postId;
    this.isCommentSectionOpen = !this.isCommentSectionOpen;
  }

  async toggleLike(postId: number|undefined) {
    if(postId === undefined) return;
    const request:LikeRequest = {"postId": postId};
    await toggleLike(this.likeService,request);
    await this.getLikesCount();
    await this.isOwnerLiked();
  }

  sharePost(postId: number|undefined) {
    console.log("share");
  }
  
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleSave() {
    this.isMenuOpen = false; 
  }

  navigateToPostDetails(postId: number | undefined): void {
    const path:string = `post/${postId}`;
    centerNavigateTo(path,this.currentUrl,this.router);
  }

  navigateToProfile(userId: number | undefined): void {
    const path:string = `profile`;
    centerNavigateTo(path,this.currentUrl,this.router);
  }
}
