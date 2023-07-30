export type NewsLetterSubscriberDto = {
    id: number;
    email: string;
    createdAt: string;
    updatedAt: string;
};

export type CreateNewsLetterSubscriberDto = {
    email: string;
    isPrivacyTermAgreed: boolean;
};
