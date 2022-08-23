export type UserSignUpRequestDto = {
    name: string;
    email: string;
    password: string;
}

export type UserDto = {
    id: number;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export type UserLoginRequestDto = {
    email: string;
    password: string;
}

export type JwtContainer = {
    token: string;
}