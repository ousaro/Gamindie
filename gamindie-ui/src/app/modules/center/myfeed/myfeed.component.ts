import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { PostCardComponent } from '../../../core/components/post-card/post-card.component';
import { Post, PostResponse } from '../../../core/services/models';
import { PostService } from '../../../core/services/services';
import { loadPosts } from '../../../core/services/commun_fn/Post_fn';

@Component({
  selector: 'app-myfeed',
  imports:[CommonModule, FormsModule, AngularSvgIconModule, PostCardComponent],
  templateUrl: './myfeed.component.html',
  styleUrl: './myfeed.component.scss'
})
export class MyfeedComponent {

  constructor(
      private postService: PostService) { }
    
  
    posts:PostResponse[] = [];
  
    async ngOnInit(): Promise<void> {
      this.posts = await loadPosts(this.postService)
    }

  
}
