import { firstValueFrom } from "rxjs";
import { LikeService } from "../services";
import { LikeRequest } from "../models";


export async function getLikesCount(likeService: LikeService, postId : number) : Promise<number> {
    try {
        const response = await firstValueFrom(
        likeService.countLikes({"postId": postId})
    );
        return response;
    } catch (error) {
        console.error('Error fetching likes count:', error);
        return 0;
    }
}

export async function isOwnerLiked(likeService: LikeService, postId : number) : Promise<boolean> {
    try {
        const response = await firstValueFrom(
        likeService.getOwnerLike({"postId": postId})
    );
        return response;
    } catch (error) {
        console.error('Error fetching isOwnerLiked:', error);
        return false;
    }
    
}

export async function toggleLike(likeService: LikeService,  request : LikeRequest) : Promise<void> {
    try {
        await firstValueFrom(
        likeService.createLike({"body": request})
    );
    } catch (error) {
        console.error('Error toggling like:', error);
    }
}