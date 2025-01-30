import { CommonModule,Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Post,Comment, PostRequest, PostResponse } from '../../../core/services/models';
import { CommentSectionComponent } from '../../../core/components/comment-section/comment-section.component';
import { loadPostById } from '../../../core/services/commun_fn/Post_fn';
import { PostService } from '../../../core/services/services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-details',
  imports: [AngularSvgIconModule,CommonModule,FormsModule,CommentSectionComponent],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss'
})
export class PostDetailsComponent implements OnInit {


  
    isExpanded: boolean = false;
    maxLength: number = 100;
    isEditing: boolean = false; 
    isLiked :boolean = false;
    isMenuOpen: boolean = false;
    openPostId: number | null = null;
    attachmentsURL: string[] = [];
    post:PostResponse | null = {} ;;


  async ngOnInit(): Promise<void> {
    const postId = this.route.snapshot.paramMap.get('id'); // 'id' should match the route parameter
    if (postId) {
      await this.fetchPostById(+postId); // Convert to number and fetch post
      this.openPostId = this.post?.id !== undefined ? this.post.id : null;
      this.getAttachmentURLs();
    }
  }

  constructor(
    private location: Location,
    private postService: PostService,
    private route: ActivatedRoute) {
   
  }


  fetchPostById = async (postId:number) => {
    this.post = await loadPostById(this.postService, postId)
  }

  getFormattedDate(): string {
    const date = new Date(this.post?.createdData ?? '');
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

    this.attachmentsURL = this.post?.attachments
      ?.map((attachment) => {
        if (!attachment.url) return undefined;

        // Remove leading './' or extra slashes
        const cleanPath = attachment.url.replace(/\\/g, '/').replace(/^\.?\//, '').replace(/\/+/g, '/');

        return baseURL + cleanPath;
      })
      .filter((url): url is string => url !== undefined) || [];


    }


   handleAddReply($event: { reply: Comment; parentId: number; }) {
      console.log($event);
    }

  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
    }

    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    }
  

  goBack(): void {
    this.location.back();
  }

  toggleEditMode() {
    this.isEditing = !this.isEditing;
  }

  onImageUpload(event: Event) {
   
  }

  submitPost() {
    console.log('Post submitted:', this.post);
    // Call your API to save the updated post
  }

  deletePost() {
    console.log('Post deleted:', this.post);
    this.toggleMenu();
  }


  toggleLike(postId: number|undefined) {
    this.isLiked = !this.isLiked;
    console.log("like");
  }

  sharePost(postId: number|undefined) {
    console.log("share");
  }
}
