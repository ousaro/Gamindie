import { CommonModule } from '@angular/common';
import { Component, effect, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Comment, CommentResponse, User, UserResponse } from '../../services/models';
import { AuthContext } from '../../../shared/contexts/auth-context';
import { getDirectReplies, getTopLevelComments } from '../../services/commun_fn/Comment_fn';
import { CommentService } from '../../services/services';
import { getFormattedDate } from '../../services/commun_fn/utilities';

@Component({
  selector: 'app-comment-section',
  imports: [CommonModule, FormsModule, AngularSvgIconModule],
  templateUrl: './comment-section.component.html',
  styleUrl: './comment-section.component.scss'
})
export class CommentSectionComponent implements OnInit {
 private authContext = inject(AuthContext);
    
  // Track both the user and loading state
  userSignal = this.authContext.user;
  isLoading = this.authContext.isLoading;
 
  user: UserResponse | null = null;
  comments: CommentResponse[] | null= null;

  @Input() postId: number | undefined = undefined;
  @Input() commentId?: number | undefined = undefined;
  @Input() isReply: boolean = false;
  @Output() addReply = new EventEmitter<{ reply: Comment; parentId: number }>();

  newCommentContent: string = '';
  replyContent: { [key: number]: string } = {}; // Holds reply content for each comment
  isExpandedContent: boolean = false;
  maxLengthContent : number= 100;
  isExpandedReplies: boolean = false;
  maxLengthReply : number= 1;

  async ngOnInit(): Promise<void> {
    await this.loadComments();
  }

  constructor(
    private commentService: CommentService
  ){
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
 
  async loadComments() {
    if(this.postId !== undefined){
      this.comments = await getTopLevelComments(this.commentService, this.postId, 0);
    }
    if(this.commentId !== undefined){
      this.comments = await getDirectReplies(this.commentService, this.commentId, 0);
    }
  }

  async toggleReplies() {
   
    await this.loadComments();
    this.isExpandedReplies = !this.isExpandedReplies;

  }

  getDate(index:number):string{
    console.log(this.comments![index].createdData);
    return getFormattedDate(this.comments![index].createdData);
  }


  addComment() {
    
  }

  addReplyToComment(commentId: number) {
    
  }

}
