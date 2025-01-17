import { Component, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouteTrackerService } from '../../services/routeTracker/route-tracker.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-left-bar',
  imports: [AngularSvgIconModule, CommonModule],
  templateUrl: './left-bar.component.html',
  styleUrl: './left-bar.component.scss',
})
export class LeftBarComponent implements OnInit {

  isMenuModalOpen: boolean = false;
  isSettingsModalOpen: boolean = false;
  currentUrl: string = '';
  activeSection: string = '';
  activeMenuItem: string | null = null;

  private breakpointSubscription: Subscription | undefined;

  constructor(
    private routeTrackerService: RouteTrackerService,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.routeTrackerService.currentUrl$.subscribe((url) => {
      this.currentUrl = url;
      this.updateActiveSection();
    });

    this.breakpointSubscription = this.breakpointObserver
          .observe([Breakpoints.Handset, Breakpoints.Medium])
          .subscribe(result => {
            if (!result.matches) {
              this.isMenuModalOpen = false;
              this.isSettingsModalOpen = false;
            } 
    });
  }

  isActive(section: string): boolean {
    return this.activeSection === section;
  }

  isMenuItemActive(item: string): boolean {
    return this.activeMenuItem === item;
  }


  updateActiveSection(): void {
    if (this.currentUrl.includes('explore')) {
      this.activeSection = 'explore';
    } else if (this.currentUrl.includes('create')) {
      this.activeSection = 'create';
    } else if (this.currentUrl.includes('store')) {
      this.activeSection = 'store';
    } else if (this.currentUrl.includes('saved')) {
      this.activeSection = 'saved';
    } else if (this.currentUrl.includes('profile')) {
      this.activeSection = 'profile';
    } else if (this.currentUrl.includes('friends-requests')) {
      this.activeSection = 'friends-requests';
    } else if (this.currentUrl.includes('chat')) {
      this.activeSection = 'chat';
    } else if (this.currentUrl.includes('notifications')) {
      this.activeSection = 'notifications';
    } else {
      this.activeSection = '';
    }

  }

  navigateToSection(section: string): void {
    const updatedUrl = this.currentUrl.replace(
      /\(center\/[^/]+(?:\/[^/]+)?\/\//, 
      `(center/${section}//`
    );
    this.router.navigateByUrl(updatedUrl);
  }

  toggleMenuModal() {
    this.isMenuModalOpen = !this.isMenuModalOpen;
  }
  
  toggleSettingsModal() {
    this.isSettingsModalOpen = !this.isSettingsModalOpen;
  }

  selectMenuItem(item: string) {
    this.activeMenuItem = item;
    
    switch(item) {
      case 'logout':
        console.log('Logging out...');
        break;
      case 'delete':
        console.log('Deleting...');
        break;
    }

    this.toggleSettingsModal();
  }

  rightNavigateTo(section: string) {
    this.isSettingsModalOpen = false;
    this.toggleMenuModal();
    this.navigateToSection(section);
   
  }

  
}
