import { Component, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { RouteTrackerService } from '../../services/routeTracker/route-tracker.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-top-bar',
  imports: [AngularSvgIconModule, CommonModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent implements OnInit {
  sectionName: string = '';
  currentUrl: string = '';
  
  constructor(
    private routeTrackerService: RouteTrackerService,
    private router: Router) {}

  ngOnInit(): void {
    this.routeTrackerService.currentUrl$.subscribe((url) => {
      this.currentUrl = url;
      
      // extract the subpath of center
      const centerMatch = this.currentUrl.match(/\/\(center\/([^/]+)/);
      if (centerMatch) {
        this.updateIcon(centerMatch[1]);
      } else {
        console.log('No match found for center path');
      }
    });
  }

  isExplorePath(): boolean {
    return this.sectionName === 'explore';
  }

  isMyFeed(): boolean {
    return this.currentUrl.includes('myfeed');
  }
  
  navigateToExplore(): void {
    const updatedUrl = this.currentUrl.replace(/\/explore(\/myfeed)?/, '/explore');
    this.router.navigateByUrl(updatedUrl);
  }
  
  navigateToMyFeed(): void {
    const updatedUrl = this.currentUrl.includes('/explore/myfeed')
      ? this.currentUrl
      : this.currentUrl.replace('/explore', '/explore/myfeed');
    this.router.navigateByUrl(updatedUrl);
  }

  updateIcon(subPath: string):void {
    switch(subPath) {
      case 'explore':
        this.sectionName = 'explore';
        break; 
      case 'create':
        this.sectionName = 'create';
        break;
      default:
        this.sectionName = 'home';
    }
  }


  isFriendActive(): boolean {
    return this.currentUrl.includes('friend-requests');
  }

  isChatActive(): boolean {
    return this.currentUrl.includes('chat');
  }

  isNotificationActive(): boolean {
    return this.currentUrl.includes('notifications');
  }

  navigateToFriend(): void {
    const updatedUrl = this.currentUrl.replace(/:right(\/[^]*)?/, ':right/friend-requests');
    this.router.navigateByUrl(updatedUrl);
  }

  navigateToChat(): void {
    const updatedUrl = this.currentUrl.replace(/:right(\/[^]*)?/, ':right/chat');
    console.log('updatedUrl', updatedUrl);
    this.router.navigateByUrl(updatedUrl);
  }

  navigateToNotification(): void {
    const updatedUrl = this.currentUrl.replace(/:right(\/[^]*)?/, ':right/notifications');
    this.router.navigateByUrl(updatedUrl);
  }



}
