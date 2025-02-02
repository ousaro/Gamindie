import { firstValueFrom } from "rxjs";
import { UserRequest } from "../models";
import { UserService } from "../services";


export async function updateUser(userService:UserService, request:UserRequest) : Promise<void> {
    try {
        const response = await firstValueFrom( userService.updateUser({'body': request}));
       
    } catch (error) {
        console.error('Error in updateUser:', error);
    }
}