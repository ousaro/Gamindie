import { CommonModule,Location } from '@angular/common';
import { Component, effect, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Post,Comment, PostRequest, PostResponse, UserResponse } from '../../../core/services/models';
import { CommentSectionComponent } from '../../../core/components/comment-section/comment-section.component';
import { deletePost, loadPostById } from '../../../core/services/commun_fn/Post_fn';
import { AttachmentService, PostService } from '../../../core/services/services';
import { ActivatedRoute } from '@angular/router';
import { AuthContext } from '../../../shared/contexts/auth-context';
import { deleteAttachment } from '../../../core/services/commun_fn/Attachment_fn';

@Component({
  selector: 'app-post-details',
  imports: [AngularSvgIconModule,CommonModule,FormsModule,CommentSectionComponent],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss'
})
export class PostDetailsComponent implements OnInit {

  private authContext = inject(AuthContext);
      
  // Track both the user and loading state
  userSignal = this.authContext.user;
  isLoading = this.authContext.isLoading;


  
    isExpanded: boolean = false;
    maxLength: number = 100;
    isEditing: boolean = false; 
    isLiked :boolean = false;
    isMenuOpen: boolean = false;
    openPostId: number | null = null;
    attachmentsURL: string[] = [];
    user:UserResponse | null = null;
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
    private attachmentService: AttachmentService,
    private route: ActivatedRoute) {

      effect(() => {
        this.getUserValue();
      });
   
  }

  
    getUserValue() {
      if (this.isLoading()) {
        return;
      }
      this.user = this.userSignal();
  
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


    isOwner(): boolean {
      return this.user?.id === this.post?.ownerId;
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

  async deletePost() {
    if (!this.post || !this.post.id) return;
  
    try {
      // Delete attachments in parallel if they exist
      if (this.post.attachments && this.post.attachments.length > 0) {
        await Promise.all(
          this.post.attachments
            .filter(attachment => attachment.id !== undefined) // Exclude undefined IDs
            .map(attachment => deleteAttachment(this.attachmentService, attachment.id as number))
        );
      }
      
  
      // Delete the post itself
      await deletePost(this.postService, this.post.id);
  
      // Navigate back and close the menu
      this.goBack();
      this.toggleMenu();
      
    } catch (error) {
      console.error("Error deleting post:", error);
      // Optionally, show an error message to the user
    }
  }
  


  toggleLike(postId: number|undefined) {
    this.isLiked = !this.isLiked;
    console.log("like");
  }

  sharePost(postId: number|undefined) {
    console.log("share");
  }
}
