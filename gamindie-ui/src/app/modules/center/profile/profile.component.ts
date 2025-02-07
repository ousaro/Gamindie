import { CommonModule } from '@angular/common';
import { Component, effect, HostListener, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { PostCardComponent } from "../../../core/components/post-card/post-card.component";
import { RouteTrackerService } from '../../../core/services/routeTracker/route-tracker.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostResponse, UserResponse } from '../../../core/services/models';
import { centerNavigateTo } from '../../../core/services/commun_fn/Navigation_fn';
import { AuthContext } from '../../../shared/contexts/auth-context';
import { loadOwnerPosts } from '../../../core/services/commun_fn/Post_fn';
import { PostService, UserService } from '../../../core/services/services';
import { getUserById } from '../../../core/services/commun_fn/User_fn';

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
 
  authUser: UserResponse | null = null;
  user: UserResponse | null = null;
  posts:PostResponse[] = [];
  postsCount: number = 0;
  followers: number = 0;
  following: number = 0;
  currentUrl: string = '';


 // Pagination variables
  page: number = 0;
  isLoadingPosts: boolean = false;
  hasMorePosts: boolean = true;

  // Tab state
  activeTab: 'posts' | 'saved' = 'posts';


  async ngOnInit(): Promise<void> {
    this.routeTrackerService.currentUrl$.subscribe((url) => {
      this.currentUrl = url;
    });
    const userId = this.route.snapshot.paramMap.get('id') || this.authUser?.id;
    await this.fetchUser(Number(userId));
    await this.fetchOwnerPosts();
    this.editUserInfo();
  }
  
  constructor( 
    private routeTrackerService: RouteTrackerService,
    private router: Router,
    private postService: PostService,
    private route: ActivatedRoute,
    private userService: UserService
  ){
    effect(() => {
      this.getAuthUserValue();
    });
  }

  getAuthUserValue() {
    if (this.isLoading()) {
      return;
    }
    this.authUser = this.userSignal();

  }

  async fetchUser(userId: number) {
    this.user = await getUserById(this.userService, userId);
  }
  async fetchOwnerPosts() {
   if (this.isLoadingPosts || !this.hasMorePosts || this.user?.id === undefined) return;
   
       this.isLoadingPosts = true;
   
       const newPosts = await loadOwnerPosts(this.postService,this.user?.id, this.page);
   
       if (newPosts.length > 0) {
         this.posts = [...this.posts, ...newPosts];
         this.editUserInfo();
         this.page++;
       } else {
         this.hasMorePosts = false; // No more posts available
       }
   
       this.isLoadingPosts = false;
  }

  getProfileUrl(profilePicture:String|undefined): string {
    const baseURL = "http://localhost:3000/";

    // Remove leading './' or extra slashes
    const cleanPath = profilePicture?.replace(/\\/g, '/').replace(/^\.?\//, '').replace(/\/+/g, '/') ?? '';
    console.log(baseURL + cleanPath);
    return  baseURL + cleanPath;
    

  }


  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
      this.fetchOwnerPosts();
    }
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

  isMyProfile(): boolean {
    return this.authUser?.id === this.user?.id;
  }

}
