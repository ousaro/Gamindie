import { firstValueFrom } from "rxjs";
import { UserRequest, UserResponse } from "../models";
import { UserService } from "../services";


export async function updateUser(userService:UserService, request:UserRequest) : Promise<void> {
    try {
        const response = await firstValueFrom( userService.updateUser({'body': request}));
       
    } catch (error) {
        console.error('Error in updateUser:', error);
    }
}


export async function getUserById(userService:UserService, userId:number) : Promise<UserResponse> {
    try {
        const response = await firstValueFrom( userService.getUserById({"user-id":userId}));
        return response;
    } catch (error) {
        console.error('Error in getUserById:', error);
        return {};
    }
}