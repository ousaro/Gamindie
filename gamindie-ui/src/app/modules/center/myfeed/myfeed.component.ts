import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { PostCardComponent } from '../../../core/components/post-card/post-card.component';
import { Post, PostResponse } from '../../../core/services/models';
import { PostService } from '../../../core/services/services';
import { loadOwnerFeed } from '../../../core/services/commun_fn/Post_fn';

@Component({
  selector: 'app-myfeed',
  imports:[CommonModule, FormsModule, AngularSvgIconModule, PostCardComponent],
  templateUrl: './myfeed.component.html',
  styleUrl: './myfeed.component.scss'
})
export class MyfeedComponent {

  posts: PostResponse[] = [];
  page: number = 0;
  isLoading: boolean = false;
  hasMorePosts: boolean = true;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  async fetchPosts() {
    if (this.isLoading || !this.hasMorePosts) return;

    this.isLoading = true;

    const newPosts = await loadOwnerFeed(this.postService, this.page);

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
