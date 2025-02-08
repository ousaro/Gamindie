import { firstValueFrom } from "rxjs";
import { ChatRoomRequest, ChatRoomResponse } from "../models";
import { ChatRoomService } from "../services";


export async function createChatroom(chatRoomService:ChatRoomService, request: ChatRoomRequest): Promise<number> {
    try {
        const response =  await firstValueFrom(chatRoomService.createChatRoom({"body":request}));
        return response;
      } catch (error) {
        console.error('Failed to create chatroom');
      }
    
      return -1;
}

export async function getOwnerChatroom(chatRoomService:ChatRoomService): Promise<ChatRoomResponse[]> {
    try {
        const response =  await firstValueFrom(chatRoomService.getChatRoomOwner());
        return response;
      } catch (error) {
        console.error('Failed to get owner chatrooms');
      }
    
        return [];
}

export async function getChatroomById(chatRoomService:ChatRoomService, id: number): Promise<ChatRoomResponse> {
  try {
      const response =  await firstValueFrom(chatRoomService.getChatRoomById({"id": id}));
      return response;
  } catch (error) {
      console.error('Failed to get chatroom by id');
  }
  return {};
}