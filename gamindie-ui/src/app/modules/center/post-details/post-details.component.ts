import { CommonModule,Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Post,Comment } from '../../../core/services/models';
import { CommentSectionComponent } from '../../../core/components/comment-section/comment-section.component';

@Component({
  selector: 'app-post-details',
  imports: [AngularSvgIconModule,CommonModule,FormsModule,CommentSectionComponent],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss'
})
export class PostDetailsComponent {


  
    isExpanded: boolean = false;
    maxLength: number = 100;
    isEditing: boolean = false; 
    isLiked :boolean = false;
    isMenuOpen: boolean = false;
    openPostId: number | null = null;


  constructor(private location: Location) {
    this.openPostId = this.post.id !== undefined ? this.post.id : null;
  }


  

  post:Post = {
    id: 1,
    content: 'This is an example post content that exceeds the maximum length for display purposes.This is an example post content that exceeds the maximum length for display purposes.This is an example post content that exceeds the maximum length for display purposes.This is an example post content that exceeds the maximum length for display purposes.',
    createdBy: 1,
    createdData: '2021-09-01',
    lastModifiedBy: 1,
    lastModifiedDate: '2021-09-01',
    likes: [],
    owner: {
      id: 1,
      email: 'johnwill22@gmail.com',
      firstname: 'John',
      lastname: 'Will',
      username: 'johnwill22',
      password: 'password',
      lastModifiedDate: '2021-09-01',
      profilePicture: './Imgs/postImgs.JPG'
    },
    tags: ['tag1', 'tag2'],
    attachments: [
      {
        id: 1,
        createdBy: 1,
        createdData: '2021-09-01',
        lastModifiedBy: 1,
        lastModifiedDate: '2021-09-01',
        metadata: 'metadata',
        name: 'attachment1',
        type: 'image',
        url: './Imgs/postImgs.JPG'
      }
    ],
    comments: [
      {
        id:1,
        content: 'This is a comment',
        createdBy: 1,
        createdData: '2021-09-01',
        lastModifiedBy: 1,
        lastModifiedDate: '2021-09-01',
        owner: {
          id: 1,
          email: 'jogonwil@gmail.com',
          firstname: 'John',
          lastname: 'Will',
          username: 'johnwill22',
          profilePicture: "./Imgs/postImgs.JPG"
        },
        replies: [
          {
            content: 'This is a reply This is a reply This is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a reply',
            createdBy: 1,
            createdData: '2021-09-01',
            id: 2,
            lastModifiedBy: 1,
            lastModifiedDate: '2021-09-01',
            owner: {
              id: 1,
              email: 'jogonwil@gmail.com',
              firstname: 'John',
              lastname: 'Will',
              username: 'johnwill22',
              profilePicture: './Imgs/postImgs.JPG'
            },
          },
          {
            content: 'This is a reply This is a reply This is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a reply',
            createdBy: 1,
            createdData: '2021-09-01',
            id: 2,
            lastModifiedBy: 1,
            lastModifiedDate: '2021-09-01',
            owner: {
              id: 1,
              email: 'jogonwil@gmail.com',
              firstname: 'John',
              lastname: 'Will',
              username: 'johnwill22',
              profilePicture: './Imgs/postImgs.JPG'
            },
          }, {
            content: 'This is a reply',
            createdBy: 1,
            createdData: '2021-09-01',
            id: 2,
            lastModifiedBy: 1,
            lastModifiedDate: '2021-09-01',
            owner: {
              id: 1,
              email: 'jogonwil@gmail.com',
              firstname: 'John',
              lastname: 'Will',
              username: 'johnwill22',
              profilePicture: './Imgs/postImgs.JPG'
            },
          }, {
            content: 'This is a reply',
            createdBy: 1,
            createdData: '2021-09-01',
            id: 2,
            lastModifiedBy: 1,
            lastModifiedDate: '2021-09-01',
            owner: {
              id: 1,
              email: 'jogonwil@gmail.com',
              firstname: 'John',
              lastname: 'Will',
              username: 'johnwill22',
              profilePicture: './Imgs/postImgs.JPG'
            },
          }, {
            content: 'This is a reply',
            createdBy: 1,
            createdData: '2021-09-01',
            id: 2,
            lastModifiedBy: 1,
            lastModifiedDate: '2021-09-01',
            owner: {
              id: 1,
              email: 'jogonwil@gmail.com',
              firstname: 'John',
              lastname: 'Will',
              username: 'johnwill22',
              profilePicture: './Imgs/postImgs.JPG'
            },
          }, {
            content: 'This is a reply',
            createdBy: 1,
            createdData: '2021-09-01',
            id: 2,
            lastModifiedBy: 1,
            lastModifiedDate: '2021-09-01',
            owner: {
              id: 1,
              email: 'jogonwil@gmail.com',
              firstname: 'John',
              lastname: 'Will',
              username: 'johnwill22',
              profilePicture: './Imgs/postImgs.JPG'
            },
          }, {
            content: 'This is a reply',
            createdBy: 1,
            createdData: '2021-09-01',
            id: 2,
            lastModifiedBy: 1,
            lastModifiedDate: '2021-09-01',
            owner: {
              id: 1,
              email: 'jogonwil@gmail.com',
              firstname: 'John',
              lastname: 'Will',
              username: 'johnwill22',
              profilePicture: './Imgs/postImgs.JPG'
            },
          }, {
            content: 'This is a reply',
            createdBy: 1,
            createdData: '2021-09-01',
            id: 2,
            lastModifiedBy: 1,
            lastModifiedDate: '2021-09-01',
            owner: {
              id: 1,
              email: 'jogonwil@gmail.com',
              firstname: 'John',
              lastname: 'Will',
              username: 'johnwill22',
              profilePicture: './Imgs/postImgs.JPG'
            },
          }, {
            content: 'This is a reply',
            createdBy: 1,
            createdData: '2021-09-01',
            id: 2,
            lastModifiedBy: 1,
            lastModifiedDate: '2021-09-01',
            owner: {
              id: 1,
              email: 'jogonwil@gmail.com',
              firstname: 'John',
              lastname: 'Will',
              username: 'johnwill22',
              profilePicture: './Imgs/postImgs.JPG'
            },
          }, {
            content: 'This is a reply',
            createdBy: 1,
            createdData: '2021-09-01',
            id: 2,
            lastModifiedBy: 1,
            lastModifiedDate: '2021-09-01',
            owner: {
              id: 1,
              email: 'jogonwil@gmail.com',
              firstname: 'John',
              lastname: 'Will',
              username: 'johnwill22',
              profilePicture: './Imgs/postImgs.JPG'
            },
          },
        ],
        
      }
    ]
  }


   handleAddReply($event: { reply: Comment; parentId: number; }) {
      console.log($event);
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

  deletePost() {
    console.log('Post deleted:', this.post);
    this.toggleMenu();
  }


  toggleLike(postId: number|undefined) {
    this.isLiked = !this.isLiked;
    console.log("like");
  }

  sharePost(postId: number|undefined) {
    console.log("share");
  }
}
