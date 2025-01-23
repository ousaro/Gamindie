import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { RouteTrackerService } from '../../../core/services/routeTracker/route-tracker.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

interface Message {
  text: string;
  sender: 'user' | 'other';
  seen?: boolean;
  timestamp: Date;
}

@Component({
  selector: 'app-chatroom',
  imports: [CommonModule, FormsModule,AngularSvgIconModule],
  templateUrl: './chatroom.component.html',
  styleUrl: './chatroom.component.scss'
})
export class ChatroomComponent implements OnInit {

  otherUser = 'Oussama O.';
  messages: Message[] = [
    {
      text: 'Hello !',
      sender: 'other',
      timestamp: new Date()
    },
    {
      text: 'Hi',
      sender: 'user',
      seen: true,
      timestamp: new Date()
    }
  ];
  newMessage = '';
  currentUrl: string = '';
  isCenterRoute: boolean = false;

  private breakpointSubscription: Subscription | undefined;

  constructor(
     private routeTrackerService: RouteTrackerService,
     private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
      this.routeTrackerService.currentUrl$.subscribe((url) => {
        this.currentUrl = url;
      });

      this.breakpointSubscription = this.breakpointObserver
            .observe([Breakpoints.Handset, Breakpoints.Medium])
            .subscribe(result => {
              this.isCenterRoute = result.matches;
      });
  
      
    }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({
        text: this.newMessage,
        sender: 'user',
        timestamp: new Date()
      });
      this.newMessage = '';
    }
  }

  closeChat() {

    if(this.isCenterRoute){
      console.log('center');
      this.centerNavigateTo('chat');
    }else{
      console.log('right');
      this.rightNavigateTo('chat');
    }
    
  }

  rightNavigateTo(section: string): void {
    const updatedUrl = this.currentUrl.replace(/:right(\/[^]*)?/, `:right/${section}`);
    this.router.navigateByUrl(updatedUrl);
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

  
}
