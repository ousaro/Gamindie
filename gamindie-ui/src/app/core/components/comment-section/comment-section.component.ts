import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';

export interface Comment {
  id: string;
  user: string;
  avatarUrl?: string; // Optional for user avatars
  content: string;
  timestamp: Date;
  replies?: Comment[]; // Nested replies
}


@Component({
  selector: 'app-comment-section',
  imports: [CommonModule, FormsModule, AngularSvgIconModule],
  templateUrl: './comment-section.component.html',
  styleUrl: './comment-section.component.scss'
})
export class CommentSectionComponent {
  
  @Input() comments?: Comment[] = [];
  @Output() addReply = new EventEmitter<{ reply: Comment; parentId: string }>();

  newCommentContent: string = '';
  replyContent: { [key: string]: string } = {}; // Holds reply content for each comment

  // Add a new comment
  addComment() {
    if (!this.newCommentContent.trim()) return;

    const newComment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      user: 'Current User', // Replace with actual user data
      avatarUrl: 'assets/user-avatar-placeholder.png',
      content: this.newCommentContent,
      timestamp: new Date(),
      replies: [],
    };

    if (this.comments) {
      this.comments.push(newComment);
    }
    this.newCommentContent = '';
  }

  // Add a reply to a specific comment
  addReplyToComment(parentId: string) {
    const content = this.replyContent[parentId]?.trim();
    if (!content) return;

    const reply: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      user: 'Current User', // Replace with actual user data
      avatarUrl: 'assets/user-avatar-placeholder.png',
      content,
      timestamp: new Date(),
      replies: [],
    };

    const parentComment = this.comments ? this.findCommentById(parentId, this.comments) : undefined;
    if (parentComment) {
      parentComment.replies = [...(parentComment.replies || []), reply];
    }

    this.replyContent[parentId] = ''; // Clear reply input
  }

  // Find a comment by its ID
  findCommentById(id: string, comments: Comment[]): Comment | undefined {
    for (const comment of comments) {
      if (comment.id === id) return comment;
      if (comment.replies) {
        const found = this.findCommentById(id, comment.replies);
        if (found) return found;
      }
    }
    return undefined;
  }
}
