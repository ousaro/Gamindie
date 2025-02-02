import { CommonModule } from '@angular/common';
import { Component, effect, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Comment, CommentRequest, CommentResponse, User, UserResponse } from '../../services/models';
import { AuthContext } from '../../../shared/contexts/auth-context';
import { createComment, getDirectReplies, getTopLevelComments } from '../../services/commun_fn/Comment_fn';
import { CommentService } from '../../services/services';
import { getFormattedDate } from '../../services/commun_fn/utilities';

interface CommentWithState extends CommentResponse {
  isExpandedContent: boolean;
  isExpandedReplies: boolean;
}

@Component({
  selector: 'app-comment-section',
  imports: [CommonModule, FormsModule, AngularSvgIconModule],
  templateUrl: './comment-section.component.html',
  styleUrl: './comment-section.component.scss'
})
export class CommentSectionComponent implements OnInit {
  private authContext = inject(AuthContext);
    
  userSignal = this.authContext.user;
  isLoading = this.authContext.isLoading;
 
  user: UserResponse | null = null;
  comments: CommentWithState[] | null = null;

  @Input() postId: number | undefined = undefined;
  @Input() commentId: number | undefined = undefined;
  @Input() isReply: boolean = false;


  newCommentContent: string = '';
  maxLengthContent: number = 60;

  constructor(private commentService: CommentService) {
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

  async ngOnInit(): Promise<void> {
    await this.loadComments();
  }

  async loadComments() {
    let fetchedComments: CommentResponse[] | null = null;
    
    if (this.postId !== undefined) {
      fetchedComments = await getTopLevelComments(this.commentService, this.postId, 0);
    }
    if (this.commentId !== undefined) {
      fetchedComments = await getDirectReplies(this.commentService, this.commentId, 0);
    }

    if (fetchedComments) {
      this.comments = fetchedComments.map(comment => ({
        ...comment,
        isExpandedContent: false,
        isExpandedReplies: false
      }));
    }
  }

  async toggleReplies(comment: CommentWithState) {
    comment.isExpandedReplies = !comment.isExpandedReplies;
  }

  getDate(comment: CommentWithState): string {
    return getFormattedDate(comment.createdData);
  }

  toggleContent(comment: CommentWithState) {
    comment.isExpandedContent = !comment.isExpandedContent;
  }

  async addComment() {
    if (this.newCommentContent === '') {
      return;
    }
    const request: CommentRequest = {
      content: this.newCommentContent,
      postId: this.postId,
      parentId: this.commentId
    };
    await createComment(this.commentService, request);
    this.newCommentContent = '';
    await this.loadComments();
  }


  getProfileUrl(profilePicture:String|undefined): string {
    const baseURL = "http://localhost:3000/";

    // Remove leading './' or extra slashes
    const cleanPath = profilePicture?.replace(/\\/g, '/').replace(/^\.?\//, '').replace(/\/+/g, '/') ?? '';
    console.log(baseURL + cleanPath);
    return  baseURL + cleanPath;
    

  }
}