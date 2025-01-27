import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { PostCardComponent } from "../../../core/components/post-card/post-card.component";
import { RouteTrackerService } from '../../../core/services/routeTracker/route-tracker.service';
import { Router } from '@angular/router';
import { Post, User } from '../../../core/services/models';
import { centerNavigateTo } from '../../../core/services/commun_fn/Navigation_fn';

@Component({
  selector: 'app-profile',
  imports: [AngularSvgIconModule, CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  // User data
  user:User = {
    id: 1,
    username: 'johnwill22',
    profilePicture: './Imgs/postImgs.JPG'
  };

  postsCount: number = 1;
  followers: number = 10;
  following: number = 10;
 
  // Posts data
   posts:Post[] = [
      {
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
      },
      
    ]

  // Tab state
  activeTab: 'posts' | 'saved' = 'posts';

  // Menu state for each post
  menuState: { [postId: number]: boolean } = {};

  currentUrl: string = '';
  
  constructor( 
    private routeTrackerService: RouteTrackerService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.routeTrackerService.currentUrl$.subscribe((url) => {
      this.currentUrl = url;
    });

    
  }

  navigateToPostDetails(postId: number | undefined): void {
      const path:string = `post/${postId}`;
      centerNavigateTo(path,this.currentUrl,this.router);
  }

  // Switch between Posts and Saved tabs
  setActiveTab(tab: 'posts' | 'saved') {
    this.activeTab = tab;
  }

  // Toggle menu for a specific post
  toggleMenu(postId: number) {
    this.menuState[postId] = !this.menuState[postId];
  }

  // Check if a menu is open for a post
  isMenuOpen(postId: number): boolean {
    return !!this.menuState[postId];
  }

  // Save a post
  toggleSave(postId: number) {
    console.log(`Toggled save for post ID: ${postId}`);
  }

  // Edit a post
  editPost(postId: number) {
    console.log(`Edit post with ID: ${postId}`);
  }

  centerNavigateTo(section: string): void {
    try {
      // Find the base part of the URL before (center/
      const baseUrlMatch = this.currentUrl.match(/(.*?\(center\/)/);
      if (!baseUrlMatch) {
        console.error('Could not find center pattern in URL');
        return;
      }

      // Extract the trailing part after the double slash
      const trailingMatch = this.currentUrl.match(/\/\/([^)]*)/);
      const trailing = trailingMatch ? trailingMatch[1] : '';

      // Construct the new URL
      const baseUrl = baseUrlMatch[1];
      const newUrl = `${baseUrl}${section}//${trailing}`;
      
      
      this.router.navigateByUrl(newUrl);
    } catch (error) {
      console.error('Error in centerNavigateTo:', error);
      console.error('Current URL:', this.currentUrl);
    }
  }

  editProfile(){
    this.centerNavigateTo('edit-profile');
  }

}
