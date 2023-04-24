import {GmailContent, GmailContentPayloadPartAttachment} from '^api/tasting.api';

export function parseEmailAttachments(email: GmailContent) {
    if (email.payload.mimeType !== 'multipart/mixed') return [];

    const parts = email.payload.parts.filter((part) => {
        return part.mimeType.startsWith('application');
    });

    return parts as GmailContentPayloadPartAttachment[];
}
