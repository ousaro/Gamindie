import { firstValueFrom } from "rxjs";
import { CommentRequest, CommentResponse } from "../models";
import { CommentService } from "../services";


export async function createComment(commentService:CommentService,request:CommentRequest): Promise<void> {
    try {
      await firstValueFrom(
        commentService.createComment({"body":request})
      );
    } catch (error) {
      console.error('Error creating comment:', error);
    }
} 


export async function getTopLevelComments(commentService:CommentService,postId: number, page:number, size:number=10): Promise<CommentResponse[]> {
    try {
      const response = await firstValueFrom(
        commentService.getTopLevelComments({ 'postId':postId, 'page':page, 'size':size })
      );
      return response.content || [];
    } catch (error) {
      console.error('Error fetching comments:', error);
      return [];
    }
}

export async function getDirectReplies(commentService:CommentService,commentId: number, page:number, size:number=10): Promise<CommentResponse[]> {
    try {
      const response = await firstValueFrom(
        commentService.getDirectReplies({ 'id':commentId, 'page':page, 'size':size })
      );
      return response.content || [];
    } catch (error) {
      console.error('Error fetching replies:', error);
      return [];
    }
}

export async function getPostCommentsCount(commentService:CommentService,postId: number): Promise<number> {
    try {
      const response = await firstValueFrom(
        commentService.countComments({ 'postId':postId })
      );
      return response;
    } catch (error) {
      console.error('Error fetching comments count:', error);
      return 0;
    }
}
