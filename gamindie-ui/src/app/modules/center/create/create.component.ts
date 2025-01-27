import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { User } from '../../../core/services/models';

@Component({
  selector: 'app-post-card',
  imports : [AngularSvgIconModule, CommonModule, FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  postContent: string = '';
   user: User = {
      id: 1,
      username: 'johnwill22',
      profilePicture: './Imgs/postImgs.JPG'
    }

  submitPost() {
    if (this.postContent.trim()) {
      console.log('Posted:', this.postContent);
      this.postContent = ''; // Clear the textarea after posting
    } else {
      console.warn('Cannot post an empty message.');
    }
  }

  handleAttachmentClick() {
    console.log('Attachment icon clicked');
    // You can implement a file upload dialog here.
  }
}
