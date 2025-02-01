import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { PostCardComponent } from '../../../core/components/post-card/post-card.component';
import { PostResponse } from '../../../core/services/models';
import { PostService } from '../../../core/services/services';
import { loadPosts } from '../../../core/services/commun_fn/Post_fn';


@Component({
  selector: 'app-explore',
  imports: [CommonModule, FormsModule, AngularSvgIconModule, PostCardComponent],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.scss'
})
export class ExploreComponent implements OnInit {

  posts: PostResponse[] = [];
  page: number = 0;
  isLoading: boolean = false;
  hasMorePosts: boolean = true;

  constructor(
    private postService: PostService,
    private cdRef: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
    await this.fetchPosts();
  }

  async fetchPosts() {
    if (this.isLoading || !this.hasMorePosts) return;
    
    this.isLoading = true;

    const newPosts = await loadPosts(this.postService, this.page);
    
    if (newPosts.length > 0) {
      this.posts = [...this.posts, ...newPosts];
      this.page++;
    } else {
      this.hasMorePosts = false; // No more posts available
    }

    this.isLoading = false;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const threshold = 100; // Load more when user is 100px from bottom
    const position = window.innerHeight + window.scrollY;
    const height = document.documentElement.scrollHeight;

    if (position >= height - threshold) {
      this.fetchPosts();
    }
  }

}
