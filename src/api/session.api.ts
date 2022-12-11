import {JwtContainer, UserDto, UserEditProfileRequestDto, UserLoginRequestDto} from "^types/user.type";
import {api} from "./api";

export const postUserSession = (data: UserLoginRequestDto) => {
    return api.post<JwtContainer>('/users/session', data)
}

export const getUserSession = () => {
    return api.get<UserDto>('/users/session')
}

export const putUserSession = () => {
    return api.put<JwtContainer>('/users/session')
}

export const postUser = (data: UserLoginRequestDto) => {
    return api.post<UserDto>('/users', data)
}

export const modifyUser = (data: UserEditProfileRequestDto) => {
    return api.patch(`/users/my`, data)
}