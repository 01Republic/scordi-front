// import axios from 'axios';
// import {gmailPath} from './constant';
//
// export types GetGmailContentParam = {
//     accessToken: string;
//     id: string;
// };

export type GmailContentPayloadHeader = {
    name: string;
    value: string;
};

export type GmailContentPayloadPartText = {
    partId: string;
    mimeType: 'text/plain' | 'text/html';
    filename: string;
    headers: GmailContentPayloadHeader[];
    body: {
        size: number;
        data: string;
    };
};

export type GmailContentPayloadPartAlternative = {
    partId: string;
    mimeType: 'multipart/alternative';
    filename: string;
    headers: GmailContentPayloadHeader[];
    body: {size: number};
    parts: GmailContentPayloadPartText[];
};

export type GmailContentPayloadPartMixed = {
    partId: string;
    mimeType: 'multipart/mixed';
    filename: string;
    headers: GmailContentPayloadHeader[];
    body: {size: number};
    parts: GmailContentPayloadParts[];
};

export type GmailContentPayloadPartAttachment = {
    partId: string;
    mimeType: 'application/pdf' | 'application/vnd.ms-excel';
    filename: string;
    headers: GmailContentPayloadHeader[];
    body: {
        size: number;
        attachmentId: string;
    };
};

export type GmailContentPayloadParts =
    | GmailContentPayloadPartText
    | GmailContentPayloadPartAlternative
    | GmailContentPayloadPartAttachment;

export type GmailContent = {
    id: string;
    threadId: string;
    labelIds: string[];
    snippet: string;
    payload: GmailContentPayloadPartMixed | GmailContentPayloadPartText;
    sizeEstimate: number;
    historyId: string;
    internalDate: string;
};

// export const getGmailContent = async (params: GetGmailContentParam) => {
//     const {accessToken, id} = params;
//     const headers = {Authorization: `Bearer ${accessToken}`, Accept: 'application/json'};
//     return axios.get<GmailContent>(gmailPath(`gmail/v1/users/me/messages/${id}`), {headers}).then((res) => res.data);
// };
