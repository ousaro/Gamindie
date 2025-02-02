import { Component, effect, inject, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { RouteTrackerService } from '../../services/routeTracker/route-tracker.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { centerNavigateTo, rightNavigateTo } from '../../services/commun_fn/Navigation_fn';
import { User, UserResponse } from '../../services/models';
import { AuthContext } from '../../../shared/contexts/auth-context';


@Component({
  selector: 'app-top-bar',
  imports: [AngularSvgIconModule, CommonModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent implements OnInit {
  private authContext = inject(AuthContext);
  
  // Track both the user and loading state
  userSignal = this.authContext.user;
  isLoading = this.authContext.isLoading;

  sectionName: string = '';
  currentUrl: string = '';
  user: UserResponse | null = null;

  private breakpointSubscription: Subscription | undefined;

  
  constructor(
    private routeTrackerService: RouteTrackerService,
    private router: Router,
    private breakpointObserver: BreakpointObserver) {
      effect(() => {
        this.getUserValue();
      });
    }


  ngOnInit(): void {
    this.routeTrackerService.currentUrl$.subscribe((url) => {
      this.currentUrl = url;
      this.updateSection();
    });

    this.breakpointSubscription = this.breakpointObserver
      .observe([Breakpoints.Handset,Breakpoints.Small, Breakpoints.Medium])
      .subscribe(result => {
        if (!result.matches) {
          if (!sessionStorage.getItem('pageReloaded')) {
            sessionStorage.setItem('pageReloaded', 'true');
            window.location.reload();
          }
          
        } 
      });

    
  }


  ngOnDestroy(): void {
    this.breakpointSubscription?.unsubscribe();
  }

  getUserValue() {
    if (this.isLoading()) {
      return;
    }
    this.user = this.userSignal();

  }

  center_NavigateTo(section: string): void {
   centerNavigateTo(section, this.currentUrl, this.router);
  }

  right_NavigateTo(section: string): void {
    rightNavigateTo(section,this.currentUrl, this.router);
  }

  updateSection():void {
    if (this.currentUrl.includes('explore')) {
      this.sectionName = 'explore';
    } else if (this.currentUrl.includes('create')) {
      this.sectionName = 'create';
    } else if (this.currentUrl.includes('store')) {
      this.sectionName = 'store';
    } else if (this.currentUrl.includes('saved')) {
      this.sectionName = 'saved';
    } else if (this.currentUrl.includes('profile')) {
      this.sectionName = 'profile';
    } else if (this.currentUrl.includes('friends-requests')) {
      this.sectionName = 'requests';
    } else if (this.currentUrl.includes('chat')) {
      this.sectionName = 'chat';
    } else if (this.currentUrl.includes('notifications')) {
      this.sectionName = 'notifications';
    } else {
      this.sectionName = 'explore';
    }
   
  }

  getProfileUrl(profilePicture:String|undefined): string {
    const baseURL = "http://localhost:3000/";

    // Remove leading './' or extra slashes
    const cleanPath = profilePicture?.replace(/\\/g, '/').replace(/^\.?\//, '').replace(/\/+/g, '/') ?? '';
    console.log(baseURL + cleanPath);
    return  baseURL + cleanPath;
    

  }

  isActive(section: string): boolean {
    return this.currentUrl.includes(section);
  }

 


}
