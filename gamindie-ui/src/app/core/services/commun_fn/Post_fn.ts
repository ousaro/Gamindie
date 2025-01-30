import { firstValueFrom } from "rxjs";
import { PostService } from "../services";
import { PostResponse } from "../models";

  
  
export async function loadPosts(postService:PostService): Promise<PostResponse[]> {
    try {
      const response = await firstValueFrom(
        postService.findAllPosts({ page: 0, size: 10 })
      );
      return response.content || [];
    } catch (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
  }

export async function loadOwnerPosts(postService:PostService): Promise<PostResponse[]> {
    try {
      const response = await firstValueFrom(
        postService.findAllPostsByOwner()
      );
      return response.content || [];
    } catch (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
}

export async function loadPostById(postService:PostService, postId:number): Promise<PostResponse> {
    try {
      const response = await firstValueFrom(
        postService.findPostById({ 'post-id':postId })
      );
      return response || {};
    } catch (error) {
      console.error('Error fetching post:', error);
      return {};
    }
}