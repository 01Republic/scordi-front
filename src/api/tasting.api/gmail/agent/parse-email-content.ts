import {
    GmailContent,
    GmailContentPayloadPartAlternative,
    GmailContentPayloadParts,
    GmailContentPayloadPartText,
} from '^api/tasting.api';
import {Base64} from 'js-base64';

export function parseEmailContent(email: GmailContent): string[] {
    switch (email.payload.mimeType) {
        case 'multipart/mixed':
            return email.payload.parts.map(parseContent).flat() as string[];
        case 'text/plain':
            return [parseContent(email.payload)].flat() as string[];
        default:
            return [];
    }
}

function parseContent(payload: GmailContentPayloadParts) {
    const parseTextPart = (part: GmailContentPayloadPartText) => Base64.decode(part.body.data);

    switch (payload.mimeType) {
        case 'text/html':
        case 'text/plain':
            return parseTextPart(payload);
        case 'multipart/alternative':
            return payload.parts.map(parseTextPart);
        default:
            break;
    }
}
