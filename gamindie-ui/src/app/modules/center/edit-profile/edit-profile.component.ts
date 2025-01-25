import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-edit-profile',
  imports: [AngularSvgIconModule,CommonModule,FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent {
  // User object for form pre-filling
  user = {
    avatar: 'path_to_avatar', // Placeholder for the user's avatar URL
    bio: '',
    firstName: '',
    lastName: '',
    email: ''
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
    // Validate and submit the form data
    const updatedProfile = {
      bio: this.user.bio,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email
    };

    console.log('Profile updated:', updatedProfile);

    // Call an API service to save the data (if backend is connected)
    // Example: this.profileService.updateProfile(updatedProfile).subscribe();
  }

  // Placeholder for changing the avatar
  changePhoto() {
    console.log('Change photo clicked');
    // Logic to open a file picker or avatar upload modal
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
