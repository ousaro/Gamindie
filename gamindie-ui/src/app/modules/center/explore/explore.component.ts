import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { PostCardComponent } from '../../../core/components/post-card/post-card.component';

@Component({
  selector: 'app-explore',
  imports: [CommonModule, FormsModule, AngularSvgIconModule, PostCardComponent],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.scss'
})
export class ExploreComponent {

  constructor(private route: ActivatedRoute) { }

  posts = [
    {
      id: 1,
      user: 'Oussama Ouldrhila',
      time: '12 minutes ago',
      content:
        'This is my first 2D game using Unity. I want to share it with you guys and get some feedback.',
      imageUrl: './Imgs/postImgs.JPG',
    },
    {
      id: 2,
      user: 'Jane Doe',
      time: '30 minutes ago',
      content:
        'Just finished my first pixel art piece! What do you think?',
      imageUrl: './Imgs/postImgs.JPG',
    },
    {
      id: 3,
      user: 'John Smith',
      time: '1 hour ago',
      content:
        'Sharing a sneak peek of my game! Looking forward to your thoughts.',
      imageUrl: './Imgs/postImgs.JPG',
    },
  ];

}
