import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { User, UserResponse } from '../../../core/services/models';
import { AuthContext } from '../../../shared/contexts/auth-context';

@Component({
  selector: 'app-edit-profile',
  imports: [AngularSvgIconModule,CommonModule,FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent {
  private authContext = inject(AuthContext);
      
  // Track both the user and loading state
  userSignal = this.authContext.user;
  isLoading = this.authContext.isLoading;


  user:UserResponse|null = null;
  showPasswordModal = false;
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';

  constructor() {
    effect(() => {
      this.getUserValue();
    });
  }

  getUserValue() {
    if (this.isLoading()) {
      return;
    }
    this.user = this.userSignal();

  }

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
    if (this.user) {
      this.user.bio = bioInput;
    }
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
