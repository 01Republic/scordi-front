// Deprecated

import axios from 'axios';
// import {gmailPath} from '^api/tasting.api/gmail/constant';
// import {GmailContent} from '^api/tasting.api';
//
// export type GetGmailAttachmentParam = {
//     accessToken: string;
//     messageId: string;
//     attachmentId: string;
// };
//
// export type GmailAttachmentContent = {
//     data: string;
//     size: number;
// };
//
// export const getAttachment = (params: GetGmailAttachmentParam) => {
//     const {accessToken, messageId, attachmentId} = params;
//     const headers = {Authorization: `Bearer ${accessToken}`, Accept: 'application/json'};
//     return axios
//         .get<GmailAttachmentContent>(gmailPath(`gmail/v1/users/me/messages/${messageId}/attachments/${attachmentId}`), {
//             headers,
//         })
//         .then((res) => res.data);
// };
