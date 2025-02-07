import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AttachmentRequest, UserRequest, UserResponse } from '../../../core/services/models';
import { AuthContext } from '../../../shared/contexts/auth-context';
import { uploadAttachment } from '../../../core/services/commun_fn/Attachment_fn';
import { AttachmentService, UserService } from '../../../core/services/services';
import { updateUser } from '../../../core/services/commun_fn/User_fn';

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

  isSubmitting = false;

  user:UserResponse|null = null;
  showPasswordModal = false;
  userRequest: UserRequest = {
    id: this.user?.id ?? -1,
  };
  attachmentRequest: AttachmentRequest ={
    name:'',
    type:''
  }
  file:File|null = null;
  attachmentFile: { type: string; url: string } | null = {url:'' ,type:''};

  profilePictureUrl = '';

  currentPassword = '';
  newPassword = '';
  confirmPassword = '';

  constructor(
    private attachmentService: AttachmentService,
    private userService: UserService
  ) {
    effect(() => {
      this.getUserValue();
    });
  }

  getUserValue() {
    if (this.isLoading()) {
      return;
    }
    this.user = this.userSignal();
    this.userRequest= {
      id: this.user?.id ?? -1,
      bio: this.user?.bio ?? '',
      firstName: this.user?.firstName ?? '',
      lastName: this.user?.lastName ?? '',
      email: this.user?.email ?? '',
    }
    this.attachmentFile = {url: this.getProfileUrl(), type: ''};

  }

  // Navigation function to go back
  goBack() {
    // Navigate to the previous page (e.g., Profile Page)
    window.history.back();
  }

  // Function triggered when the form is submitted
  async submitForm() : Promise<void> {
    this.isSubmitting = true;

    if(this.file && this.attachmentFile?.type !== '' && this.attachmentFile?.url !== ''){
      const attId = await uploadAttachment(this.attachmentService, this.attachmentRequest,this.file);
      this.userRequest = {...this.userRequest, profilePrictureId: attId};
    }
    await updateUser(this.userService, this.userRequest);
    this.isSubmitting = false;
    this.goBack();
    
    
  }

  getProfileUrl(): string {
    const baseURL = "http://localhost:3000/";

    // Remove leading './' or extra slashes
    const cleanPath = this.user?.profilePicture?.replace(/\\/g, '/').replace(/^\.?\//, '').replace(/\/+/g, '/') ?? '';
    console.log(baseURL + cleanPath);
    return  baseURL + cleanPath;
    

  }


    async changePhoto(event: Event): Promise<void> {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        this.file = input.files[0];
        const reader = new FileReader();
        
        reader.onload = async () => {
          if (typeof reader.result === 'string' && this.file) {
            this.attachmentFile={
              type: this.file.type,
              url: reader.result,
            };
          }
        };
        reader.readAsDataURL(this.file);
  
  
        if(this.file){
          this.attachmentRequest = {
            name: this.file.name,
            type: this.file.type,
          };
        }
        
  

       
      }
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
