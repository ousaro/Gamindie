import { firstValueFrom } from "rxjs";
import { FriendShipControllerService } from "../services";
import { FriendShipRequest, FriendShipResponse } from "../models";


export async function sendFriendRequest(friendService:FriendShipControllerService ,request:FriendShipRequest): Promise<any> {
    try {
      const response =  await firstValueFrom(friendService.sendFriendRequest({"body":request}));
      return response;
    } catch (error) {
      console.error('Failed to create attachment:', error);
      return -1;
    }
  
}


export async function acceptFriendRequest(friendService:FriendShipControllerService ,friendShipId:number): Promise<any> {
    try {
      const response =  await firstValueFrom(friendService.acceptFriendRequest({"id":friendShipId}));
      return response;
    } catch (error) {
      console.error('Failed to create attachment:', error);
      return -1;
    }   
}

export async function getUserFriendShip(friendService:FriendShipControllerService ,userId:number,page:number,size:number=10): Promise<FriendShipResponse[]> {
    try {
      const response =  await firstValueFrom(friendService.getFriends({"userId":userId,"page":page,"size":size}));
      return response.content || []; 
    } catch (error) {
      console.error('Failed to create attachment:', error);
      return [];
    }   
}

export async function getUserPendingFriendShip(friendService:FriendShipControllerService ,userId:number,page:number,size:number=10): Promise<FriendShipResponse[]> {
    try {
      const response =  await firstValueFrom(friendService.getgetPendingRequestsFriends({"userId":userId,"page":page,"size":size}));
      return response.content || [];
    } catch (error) {
      console.error('Failed to create attachment:', error);
      return [];
    }   
}

export async function deleteFriendShip(friendService:FriendShipControllerService ,friendShipId:number): Promise<any> {
    try {
      const response =  await firstValueFrom(friendService.deleteFriendRequest({"id":friendShipId}));
      return response;
    } catch (error) {
      console.error('Failed to create attachment:', error);
      return -1;
    }   
}