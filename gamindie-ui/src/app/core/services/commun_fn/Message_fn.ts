import { firstValueFrom } from "rxjs";
import { MessageService } from "../services";
import { MessageResponse } from "../models";


export async function getMessageByChatroomId(messageService:MessageService, chatRoomId: number): Promise<MessageResponse[]> {
  try {
      const response =  await firstValueFrom(messageService.getAllMessages({"chatRoomId": chatRoomId}));
      return response;
  } catch (error) {
      console.error('Failed to get messages');
  }
  return [];
}