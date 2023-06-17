// Deprecated

import axios from 'axios';
// import {gmailPath} from './constant';
//
// type GetGmailListParam = {
//     accessToken: string;
// };
//
// export interface GmailListItem {
//     id: string;
//     threadId: string;
// }
//
// export interface GmailListData {
//     messages: GmailListItem[];
//     nextPageToken: string;
//     resultSizeEstimate: number;
// }
//
// export const getGmailList = async (param: GetGmailListParam): Promise<GmailListData> => {
//     const {accessToken} = param;
//     const headers = {Authorization: `Bearer ${accessToken}`, Accept: 'application/json'};
//     const params = {maxResults: 100};
//     return axios.get<GmailListData>(gmailPath(`gmail/v1/users/me/messages`), {headers, params}).then((res) => res.data);
// };
