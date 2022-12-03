export type LoginDto = {
    email: string;
    password: string;
};

export type LoginWithVerify = {
    email: string;
    password: string;
    verificationCode: string;
};
