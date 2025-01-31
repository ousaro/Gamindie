import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { PostCardComponent } from "../../../core/components/post-card/post-card.component";
import { RouteTrackerService } from '../../../core/services/routeTracker/route-tracker.service';
import { Router } from '@angular/router';
import { Post, PostResponse, User, UserResponse } from '../../../core/services/models';
import { centerNavigateTo } from '../../../core/services/commun_fn/Navigation_fn';
import { AuthContext } from '../../../shared/contexts/auth-context';
import { loadOwnerPosts } from '../../../core/services/commun_fn/Post_fn';
import { PostService } from '../../../core/services/services';

@Component({
  selector: 'app-profile',
  imports: [AngularSvgIconModule, CommonModule, FormsModule, PostCardComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
   private authContext = inject(AuthContext);
    
  // Track both the user and loading state
  userSignal = this.authContext.user;
  isLoading = this.authContext.isLoading;
 
  user: UserResponse | null = null;
  posts:PostResponse[] | null= [];
  postsCount: number = 0;
  followers: number = 0;
  following: number = 0;
  currentUrl: string = '';
  // Tab state
  activeTab: 'posts' | 'saved' = 'posts';


  async ngOnInit(): Promise<void> {
    this.routeTrackerService.currentUrl$.subscribe((url) => {
      this.currentUrl = url;
    });

    await this.fetchOwnerPosts();
    this.editUserInfo();
  }
  
  constructor( 
    private routeTrackerService: RouteTrackerService,
    private router: Router,
    private postService: PostService
  ){
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

  fetchOwnerPosts = async () => {
      this.posts = await loadOwnerPosts(this.postService)
    }

  hasAttachments(post: PostResponse): boolean {
    return !!post.attachments && post.attachments.length > 0;
  }

  getPostAttachmentURLs(post : PostResponse): string[] {
    const baseURL = "http://localhost:3000/";

    return post.attachments
      ?.map((attachment) => {
        if (!attachment.url) return undefined;

        // Remove leading './' or extra slashes
        const cleanPath = attachment.url.replace(/\\/g, '/').replace(/^\.?\//, '').replace(/\/+/g, '/');

        return baseURL + cleanPath;
      })
      .filter((url): url is string => url !== undefined) || [];

  }

  navigateToPostDetails(postId: number | undefined): void {
      const path:string = `post/${postId}`;
      centerNavigateTo(path,this.currentUrl,this.router);
  }

  // Switch between Posts and Saved tabs
  setActiveTab(tab: 'posts' | 'saved') {
    this.activeTab = tab;
  }

  // Save a post
  toggleSave(postId: number) {
    console.log(`Toggled save for post ID: ${postId}`);
  }

  editUserInfo(){
    this.postsCount = this.posts?.length || 0;
  }

  // Edit a post
  editPost(postId: number) {
    console.log(`Edit post with ID: ${postId}`);
  }

  editProfile(){
    centerNavigateTo('edit-profile',this.currentUrl,this.router);
  }

}
