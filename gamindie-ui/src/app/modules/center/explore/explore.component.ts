import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { PostCardComponent } from '../../../core/components/post-card/post-card.component';
import { Post, PostResponse } from '../../../core/services/models';
import { firstValueFrom } from 'rxjs';
import { PostService } from '../../../core/services/services';


@Component({
  selector: 'app-explore',
  imports: [CommonModule, FormsModule, AngularSvgIconModule, PostCardComponent],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.scss'
})
export class ExploreComponent implements OnInit {

  constructor(
    private route: ActivatedRoute, 
    private postService: PostService,
    private http: HttpClient) { }
  

  posts:PostResponse[] = [];

  async ngOnInit(): Promise<void> {
    await this.loadPosts();
    console.log(this.posts);
  }

  

  async loadPosts(): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.postService.findAllPosts({ page: 0, size: 10 })
      );
      this.posts = response.content || [];
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }



}
