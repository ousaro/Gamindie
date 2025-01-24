import { CommonModule,Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-post-details',
  imports: [AngularSvgIconModule,CommonModule,FormsModule],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss'
})
export class PostDetailsComponent {

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }

  post = {
    id: '1',
    user: 'Oussama O.',
    time: '2 hours ago',
    content: 'This is my first 2D game using Unity...',
    imageUrl: './Imgs/postImgs.JPG'
  };

  isEditing: boolean = false; // State to toggle between view and edit mode

  toggleEditMode() {
    this.isEditing = !this.isEditing;
  }

  onImageUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.post.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  submitPost() {
    console.log('Post submitted:', this.post);
    // Call your API to save the updated post
  }

  deletePost() {
    console.log('Post deleted:', this.post);
  }
}
