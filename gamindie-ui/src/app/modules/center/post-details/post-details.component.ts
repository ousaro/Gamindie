import { CommonModule,Location } from '@angular/common';
import { Component, effect, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Post,Comment, PostRequest, PostResponse, UserResponse, LikeRequest } from '../../../core/services/models';
import { CommentSectionComponent } from '../../../core/components/comment-section/comment-section.component';
import { deletePost, loadPostById } from '../../../core/services/commun_fn/Post_fn';
import { AttachmentService, CommentService, LikeService, PostService } from '../../../core/services/services';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthContext } from '../../../shared/contexts/auth-context';
import { deleteAttachment } from '../../../core/services/commun_fn/Attachment_fn';
import { getFormattedDate } from '../../../core/services/commun_fn/utilities';
import { getPostCommentsCount } from '../../../core/services/commun_fn/Comment_fn';
import { getLikesCount, isOwnerLiked, toggleLike } from '../../../core/services/commun_fn/Likes_fn';
import { centerNavigateTo } from '../../../core/services/commun_fn/Navigation_fn';
import { RouteTrackerService } from '../../../core/services/routeTracker/route-tracker.service';

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


    currentUrl: string = '';
    isExpanded: boolean = false;
    maxLength: number = 100;
    isEditing: boolean = false; 
    isLiked :boolean = false;
    isMenuOpen: boolean = false;
    openPostId: number | null = null;
    attachmentsURL: string[] = [];
    user:UserResponse | null = null;
    post:PostResponse | null = {} ;
    commentsCount: number = 0;
    likesCount: number = 0;


  async ngOnInit(): Promise<void> {
    this.routeTrackerService.currentUrl$.subscribe((url) => {
      this.currentUrl = url;
    });
    const postId = this.route.snapshot.paramMap.get('id'); // 'id' should match the route parameter
    if (postId) {
      await this.fetchPostById(+postId); // Convert to number and fetch post
      this.openPostId = this.post?.id !== undefined ? this.post.id : null;
      this.getAttachmentURLs();
      await this.getCommentsCount();
      await this.getLikesCount();
      await this.isOwnerLiked();
    }
  }

  constructor(
    private location: Location,
    private postService: PostService,
    private attachmentService: AttachmentService,
    private commentService: CommentService,
    private likeService: LikeService,
    private route: ActivatedRoute,
    private routeTrackerService: RouteTrackerService,
    private router: Router,) {

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
    return getFormattedDate(this.post?.createdData);
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

    getProfileUrl(profilePicture:String|undefined): string {
      const baseURL = "http://localhost:3000/";
  
      // Remove leading './' or extra slashes
      const cleanPath = profilePicture?.replace(/\\/g, '/').replace(/^\.?\//, '').replace(/\/+/g, '/') ?? '';
      console.log(baseURL + cleanPath);
      return  baseURL + cleanPath;
      
  
    }

     async getCommentsCount(): Promise<void> {
        if (this.post?.id !== undefined){
         this.commentsCount = await getPostCommentsCount(this.commentService, this.post.id);
        }
      }

      async getLikesCount(): Promise<void> {
          if (this.post?.id !== undefined){
            this.likesCount = await getLikesCount(this.likeService, this.post.id);
          }
        }

        async isOwnerLiked(): Promise<void> {
          if (this.post?.id !== undefined){
            this.isLiked = await isOwnerLiked(this.likeService, this.post.id);
          }
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

  navigateToProfile(userId: number | undefined): void {
      const path:string = `profile`;
      centerNavigateTo(path,this.currentUrl,this.router);
  }


}
