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