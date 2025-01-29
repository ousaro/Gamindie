import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { RouteTrackerService } from '../../services/routeTracker/route-tracker.service';
import { centerNavigateTo } from '../../services/commun_fn/Navigation_fn';
import { Comment, Post, PostResponse } from '../../services/models';
import { CommentSectionComponent } from "../comment-section/comment-section.component";


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
  isModalOpen:boolean = false;
  selectedImage: string | null = null;
  isCommentSectionOpen:boolean = false;
  isLiked :boolean = false;
  maxLength:number = 100; // Maximum length of text before truncating
  isExpanded:boolean = false; // State to track whether content is expanded
  attachmentsURL: string[] = [];

  
 

  constructor( 
    private routeTrackerService: RouteTrackerService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.routeTrackerService.currentUrl$.subscribe((url) => {
    this.currentUrl = url;
    });
    
    this.getAttachmentURLs();
      
  }

  getFormattedDate(): string {
      const date = new Date(this.post.createdData ?? '');
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();

      const seconds = Math.floor(diffMs / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const weeks = Math.floor(days / 7);
      const months = Math.floor(days / 30);
      const years = Math.floor(days / 365);

      if (seconds < 60) return `${seconds} seconds ago`;
      if (minutes < 60) return `${minutes} minutes ago`;
      if (hours < 24) return `${hours} hours ago`;
      if (days < 7) return `${days} days ago`;
      if (weeks < 4) return `${weeks} weeks ago`;
      if (months < 12) return `${months} months ago`;
      return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
      }); // Example: "January 29, 2025"
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
  

  openModal(imageUrl: string|undefined): void {
    if(imageUrl === undefined) return;
    this.selectedImage = imageUrl;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedImage = null;
  }

  toggleExpanded(): void {
    this.isExpanded = !this.isExpanded;
  }


  toggleCommentSection(postId: number|undefined): void {
    if(postId === undefined) return;
    this.openPostId = this.openPostId === postId ? null : postId;
    this.isCommentSectionOpen = !this.isCommentSectionOpen;
  }

  toggleLike(postId: number|undefined) {
    this.isLiked = !this.isLiked;
    console.log("like");
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

  handleAddReply($event: { reply: Comment; parentId: number; }) {
    console.log($event);
  }
}
