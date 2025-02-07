import { firstValueFrom } from "rxjs";
import { ChatRoomResponse } from "../models";
import { ChatRoomService } from "../services";


export async function getOwnerChatroom(chatRoomService:ChatRoomService): Promise<ChatRoomResponse[]> {
    try {
        const response =  await firstValueFrom(chatRoomService.getChatRoomOwner());
        return response;
      } catch (error) {
        console.error('Failed to get chatrooms');
      }
    
        return [];
}

export async function getChatroomById(chatRoomService:ChatRoomService, id: number): Promise<ChatRoomResponse> {
  try {
      const response =  await firstValueFrom(chatRoomService.getChatRoomById({"id": id}));
      return response;
  } catch (error) {
      console.error('Failed to get chatroom');
  }
  return {};
}