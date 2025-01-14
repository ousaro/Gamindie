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
      this.updateSection();
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
