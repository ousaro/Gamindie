import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { RouteTrackerService } from '../../../core/services/routeTracker/route-tracker.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

interface ChatUser {
  id: number;
  name: string;
  messagesNB: number;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  searchQuery: string = '';
  currentUrl: string = '';
  isCenterRoute: boolean = false;
  private subscriptions: Subscription[] = [];

  users: ChatUser[] = [
    { id: 1, name: 'Oussama O.', messagesNB: 1000 },
    { id: 2, name: 'Oussama O.', messagesNB: 1000 }
  ];

  constructor(
    private routeTrackerService: RouteTrackerService,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.routeTrackerService.currentUrl$.subscribe(url => {
        this.currentUrl = url;
      })
    );

    this.subscriptions.push(
      this.breakpointObserver
        .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
        .subscribe(result => {
          this.isCenterRoute = result.matches;
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  rightNavigateTo(section: string): void {
    try {
      if (this.currentUrl.includes(':right')) {
        const baseUrl = this.currentUrl.split(':right')[0];
        const newUrl = `${baseUrl}:right/${section}`;
        this.router.navigateByUrl(newUrl);
      }
    } catch (error) {
      console.error('Error in rightNavigateTo:', error);
    }
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

  openChatroom(user: ChatUser): void {
    const chatPath = `chat/chatroom/${user.id}`;

    if (this.isCenterRoute) {
      this.centerNavigateTo(chatPath);
    } else {
      this.rightNavigateTo(chatPath);
    }
  }

  get filteredUsers(): ChatUser[] {
    return this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}