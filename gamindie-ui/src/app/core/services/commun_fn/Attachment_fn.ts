import { firstValueFrom } from "rxjs";
import { UploadAttachment$Params } from "../fn/attachment/upload-attachment";
import { AttachmentService } from "../services";
import { AttachmentRequest } from "../models";


export async function uploadAttachment(attachmentService: AttachmentService, attachmentRequest: AttachmentRequest, sourceFile: Blob): Promise<number> {
  try {
    const response =  await firstValueFrom(attachmentService.uploadAttachment(
      {"request" : attachmentRequest , "body" : { "sourceFile" : sourceFile }}));
    return response;
  } catch (error) {
    console.error('Failed to create attachment:', error);
  }

    return -1;
}

export async function deleteAttachment(attachmentService: AttachmentService, attachmentId: number): Promise<void> {
  try {
    await firstValueFrom(attachmentService.deleteAttachment({"id":attachmentId}));
  } catch (error) {
    console.error('Failed to delete attachment:', error);
  }
}