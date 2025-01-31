import { firstValueFrom } from "rxjs";
import { PostService } from "../services";
import { PostRequest, PostResponse } from "../models";


export async function createPost(postService:PostService, postRequest:PostRequest): Promise<number | null> {
    try {
      const response = await firstValueFrom(
        postService.createPost({ body: postRequest })
      );
      return response || null;
    } catch (error) {
      console.error('Error creating post:', error);
      return null;
    }
}
  
  
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

export async function loadFriendFeed(postService:PostService): Promise<PostResponse[]> {
    try {
      const response = await firstValueFrom(
        postService.getFriendFeed()
      );
      return response.content || [];
    } catch (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
}

export async function loadOwnerFeed(postService: PostService): Promise<PostResponse[]> {
  try {
    // Fetch both owner posts and friend feed
    const [ownerPosts, friendFeed] = await Promise.all([
      loadOwnerPosts(postService),
      loadFriendFeed(postService)
    ]);

    // Merge and remove duplicates based on post ID
    const uniquePosts = [...new Map(
      [...ownerPosts, ...friendFeed].map(post => [post.id, post])
    ).values()];

    // Sort by createdDate (assuming `createdDate` exists in PostResponse)
    uniquePosts.sort((a, b) => {
      const dateA = a.createdData ? new Date(a.createdData).getTime() : 0;
      const dateB = b.createdData ? new Date(b.createdData).getTime() : 0;
      return dateB - dateA;
    });

    return uniquePosts;
  } catch (error) {
    console.error('Error loading owner feed:', error);
    return [];
  }
}
