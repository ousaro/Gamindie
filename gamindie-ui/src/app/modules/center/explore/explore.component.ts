import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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

  constructor(
    private postService: PostService) { }
  

  posts:PostResponse[] = [];

  async ngOnInit(): Promise<void> {
    await this.fetchPosts();
  }

  fetchPosts = async () => {
    this.posts = await loadPosts(this.postService)
  }

}
