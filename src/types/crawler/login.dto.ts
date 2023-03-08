export type LoginDto = {
    email: string;
    password: string;
};

export type LoginWithVerify = {
    email: string;
    password: string;
    verificationCode: string;
};

export type LoginWithOrgs = {
    // email: string;
    // password: string;
    // verificationCode?: string;
    organizationName?: string;
};
