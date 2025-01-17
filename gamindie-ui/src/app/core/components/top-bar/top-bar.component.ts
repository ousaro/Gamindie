import { Component, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { RouteTrackerService } from '../../services/routeTracker/route-tracker.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-top-bar',
  imports: [AngularSvgIconModule, CommonModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent implements OnInit {

  sectionName: string = '';
  currentUrl: string = '';

  private breakpointSubscription: Subscription | undefined;

  
  constructor(
    private routeTrackerService: RouteTrackerService,
    private router: Router,
    private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.routeTrackerService.currentUrl$.subscribe((url) => {
      this.currentUrl = url;
      this.updateSection();
    });

    this.breakpointSubscription = this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Medium])
      .subscribe(result => {
        if (!result.matches) {
          this.router.navigateByUrl("/");
        } 
      });
  }

  centerNavigateTo(section: string): void {
    const updatedUrl = this.currentUrl.replace(
      /\(center\/[^/]+(?:\/[^/]+)?\/\//, 
      `(center/${section}//`
    );
    this.router.navigateByUrl(updatedUrl);
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

  isActive(section: string): boolean {
    return this.currentUrl.includes(section);
  }

  rightNavigateTo(section: string): void {
    const updatedUrl = this.currentUrl.replace(/:right(\/[^]*)?/, `:right/${section}`);
    this.router.navigateByUrl(updatedUrl);
  
  }


}
