import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { RouteTrackerService } from '../../services/routeTracker/route-tracker.service';

@Component({
  selector: 'app-post-card',
   imports: [CommonModule, FormsModule, AngularSvgIconModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss'
})
export class PostCardComponent implements OnInit {
  @Input() post!: {
    id: number;
    user: string;
    time: string;
    content: string;
    imageUrl: string;
  };

  @Input() isMyFeed: boolean = false;

  isMenuOpen: boolean = false;
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

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleSave() {
    this.isMenuOpen = false; 
  }

  editPost() {
    this.isMenuOpen = false;
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

  navigateToPostDetails(postId: number): void {
    this.centerNavigateTo(`post/${postId}`);
  }
}
