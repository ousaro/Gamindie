import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { User } from '../../../core/services/models';

@Component({
  selector: 'app-edit-profile',
  imports: [AngularSvgIconModule,CommonModule,FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent {
  

   user:User = {
      id: 1,
      username: 'johnwill22',
      firstname: 'John',
      lastname: 'Williams',
      profilePicture: './Imgs/postImgs.JPG',
      bio: 'I love gaming and coding!',
    };
  

  showPasswordModal = false;
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';

  // Navigation function to go back
  goBack() {
    // Navigate to the previous page (e.g., Profile Page)
    window.history.back();
  }

  // Function triggered when the form is submitted
  submitForm() {
    
  }

  // Placeholder for changing the avatar
  changePhoto() {
    console.log('Change photo clicked');
  }

  // Function to update the bio character counter
  updateBioCount(event: Event) {
    const bioInput = (event.target as HTMLTextAreaElement).value;
    this.user.bio = bioInput;
  }

  openChangePasswordModal() {
    this.showPasswordModal = true;
  }

  closeChangePasswordModal() {
    this.showPasswordModal = false;
  }

  changePassword() {
    if (this.newPassword !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Perform password change logic
    alert('Password changed successfully!');
    this.closeChangePasswordModal();
  }

}
