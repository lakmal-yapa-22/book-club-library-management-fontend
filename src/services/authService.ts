import type {User} from "../types/User.ts";
import apiClient from "./apiClient.ts";


export interface signUpResponse {
    firstName: string;
    lastName: string;
    email: string;

    _id: string
}

export interface loginResponse {
    firstName: string;
    lastName: string;
    email: string;
    accessToken: string;
    _id: string;
}
export interface LogoutResponse {
    message: string
}

export const signUpUser = async (userData:User) : Promise<signUpResponse> => {
    const response = await apiClient.post("/auth/signUp",userData)
    return response.data;
}

export const loginUser = async(loginData:Omit<User, "firstName" | "lastName" | "role">) :Promise<loginResponse> =>{
    const response = await apiClient.post("/auth/login",loginData)
    return response.data;
}
export const logOutUser = async (): Promise<loginResponse> => {
    const response = await apiClient.post("/auth/logout")
    return response.data
}
