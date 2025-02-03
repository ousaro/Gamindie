import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AttachmentRequest, PostRequest, UserResponse } from '../../../core/services/models';
import { AuthContext } from '../../../shared/contexts/auth-context';
import { AttachmentService, PostService } from '../../../core/services/services';
import { createPost } from '../../../core/services/commun_fn/Post_fn';
import { UploadAttachment$Params } from '../../../core/services/fn/attachment/upload-attachment';
import { uploadAttachment } from '../../../core/services/commun_fn/Attachment_fn';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [AngularSvgIconModule, CommonModule, FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  private authContext = inject(AuthContext);

  userSignal = this.authContext.user;
  isLoading = this.authContext.isLoading;

  user: UserResponse | null = null;
  postRequest: PostRequest = {
    Content: '',
  };
  postContent: string = '';
  attachmentFile: { type: string; url: string } | null = null;

  constructor(
    private postService: PostService,
    private attachmentService: AttachmentService
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
  }

  async submitPost(): Promise<void> {
    if (this.postContent.trim()) {
      this.postRequest.Content = this.postContent;
      await createPost(this.postService, this.postRequest);
      this.postContent = '';
      this.removeAttachment();
    } else {
      console.warn('Cannot post an empty message.');
    }
  }

  async handleFileInput(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      
      reader.onload = async () => {
        if (typeof reader.result === 'string') {
          this.attachmentFile={
            type: file.type,
            url: reader.result,
          };
        }
      };
      reader.readAsDataURL(file);


      const attachmentRequest: AttachmentRequest = {
        name: file.name,
        type: file.type,
      };

     

      const attId = await uploadAttachment(this.attachmentService, attachmentRequest,file);
      this.postRequest = {...this.postRequest, attachmentIds: [attId]};
    }
  }

  removeAttachment(): void {
    this.attachmentFile = null;

    // Reset the file input to allow re-uploading the same file
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; // Clears the input field
    }
  }

  isTypeOf(value: string): boolean {
    if(value.includes('image') || value.includes('audio') || value.includes('video') || value.includes('document')) {
      return true;
    }
    return false;

  }

  getProfileUrl(profilePicture:String|undefined): string {
    const baseURL = "http://localhost:3000/";

    // Remove leading './' or extra slashes
    const cleanPath = profilePicture?.replace(/\\/g, '/').replace(/^\.?\//, '').replace(/\/+/g, '/') ?? '';
    console.log(baseURL + cleanPath);
    return  baseURL + cleanPath;
    

  }
}
