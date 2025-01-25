import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { PostCardComponent } from "../../../core/components/post-card/post-card.component";
import { RouteTrackerService } from '../../../core/services/routeTracker/route-tracker.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [AngularSvgIconModule, CommonModule, FormsModule, PostCardComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  // User data
  user = {
    name: 'Oussama Ouldrhila',
    postsCount: 1,
    followers: 10,
    following: 10,
  };

  // Posts data
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
