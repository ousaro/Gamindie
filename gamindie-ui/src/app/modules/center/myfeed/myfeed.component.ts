import { CommonModule } from '@angular/common';
import { Component, effect, HostListener, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { PostCardComponent } from '../../../core/components/post-card/post-card.component';
import { PostResponse, UserResponse } from '../../../core/services/models';
import { PostService } from '../../../core/services/services';
import { loadOwnerFeed } from '../../../core/services/commun_fn/Post_fn';
import { AuthContext } from '../../../shared/contexts/auth-context';

@Component({
  selector: 'app-myfeed',
  imports:[CommonModule, FormsModule, AngularSvgIconModule, PostCardComponent],
  templateUrl: './myfeed.component.html',
  styleUrl: './myfeed.component.scss'
})
export class MyfeedComponent {

    private authContext = inject(AuthContext);
      
    // Track both the user and loading state
    userSignal = this.authContext.user;
    isLoadingAuth = this.authContext.isLoading;
   
    user: UserResponse | null = null;

  posts: PostResponse[] = [];
  page: number = 0;
  isLoading: boolean = false;
  hasMorePosts: boolean = true;

  constructor(private postService: PostService) {
    effect(() => {
      this.getAuthUserValue();
      if(this.user?.id) {
        this.fetchPosts();
      }
    });
  }

  ngOnInit(): void {

  }

  getAuthUserValue() {
    if (this.isLoadingAuth()) {
      return;
    }
    this.user = this.userSignal();

  }

  async fetchPosts() {
    if (this.isLoading || !this.hasMorePosts || this.user?.id === undefined) return;

    this.isLoading = true;

    const newPosts = await loadOwnerFeed(this.postService,this.user?.id, this.page);

    if (newPosts.length > 0) {
      this.posts = [...this.posts, ...newPosts];
      this.page++;
    } else {
      this.hasMorePosts = false; // No more posts available
    }

    this.isLoading = false;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
      this.fetchPosts();
    }
  }

  
}
