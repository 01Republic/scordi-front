// import {GmailContent} from '../api.detail';

export type GmailPermittedMetadata = {
    date: Date;
    subject: string;
    from: string;
    to: string;
    sender: string;
    receiver: string;
};

// export function getEmailMetadata(email: GmailContent): GmailPermittedMetadata {
//     const headers = email.payload.headers;
//     // const permittedNames = ['Date', 'Subject', 'From', 'To', 'X-Original-Sender', 'Delivered-To'];
//     // const metadataList = headers.filter((header) => permittedNames.includes(header.name));
//
//     const metadataPreset = {} as GmailPermittedMetadata;
//     headers.forEach((header) => {
//         const preprocessor = {
//             Date: () => (metadataPreset.date = new Date(header.value)),
//             Subject: () => (metadataPreset.subject = header.value),
//             From: () => (metadataPreset.from = header.value),
//             To: () => (metadataPreset.to = header.value),
//             'X-Original-Sender': () => (metadataPreset.sender = header.value),
//             Sender: () => (metadataPreset.sender = header.value),
//             'Delivered-To': () => (metadataPreset.receiver = header.value),
//         }[header.name];
//         if (preprocessor) preprocessor();
//     });
//
//     return {
//         date: metadataPreset.date,
//         subject: metadataPreset.subject,
//         from: metadataPreset.from,
//         to: metadataPreset.to,
//         sender: metadataPreset.sender,
//         receiver: metadataPreset.receiver,
//     };
// }
