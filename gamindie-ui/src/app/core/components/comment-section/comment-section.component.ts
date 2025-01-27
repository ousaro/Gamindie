import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Comment, User } from '../../services/models';

@Component({
  selector: 'app-comment-section',
  imports: [CommonModule, FormsModule, AngularSvgIconModule],
  templateUrl: './comment-section.component.html',
  styleUrl: './comment-section.component.scss'
})
export class CommentSectionComponent {


  
  @Input() comments?: Comment[] = [];
  @Input() isReply: boolean = false;
  @Output() addReply = new EventEmitter<{ reply: Comment; parentId: number }>();

  user: User = {
    id: 1,
    username: 'johnwill22',
    profilePicture: './Imgs/postImgs.JPG'
  }

  newCommentContent: string = '';
  replyContent: { [key: number]: string } = {}; // Holds reply content for each comment
  isExpandedContent: boolean = false;
  maxLengthContent : number= 100;
  isExpandedReplies: boolean = false;
  maxLengthReply : number= 1;
 

  toggleReplies(comment: Comment) {
    this.isExpandedReplies = !this.isExpandedReplies;}
  // Add a new comment
  addComment() {
    if (this.newCommentContent.trim()) {
      this.comments?.unshift({
        id: Date.now(),
        owner: {
          username: 'CurrentUser',
          profilePicture: this.user.profilePicture,
        },
        content: this.newCommentContent,
        createdData: new Date().toISOString(),
        replies: [],
      });
      this.newCommentContent = '';
    }
  }

  // Add a reply to a specific comment
  addReplyToComment(commentId: number) {
    const comment = this.comments?.find((c) => c.id === commentId);
    if (comment && this.replyContent[commentId]?.trim()) {
      comment.replies?.push({
        id: Date.now(),
        owner: {
          username: 'CurrentUser',
          profilePicture: this.user.profilePicture,
        },
        content: this.replyContent[commentId],
        createdData: new Date().toISOString(),
      });
      this.replyContent[commentId] = '';
    }
  }

}
