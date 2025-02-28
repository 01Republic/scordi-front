import {TypeCast} from '^types/utils/class-transformer';
import {captures} from '^utils/array';

export namespace GmailContent {
    namespace Payload {
        type Header = {name: string; value: string};

        type TextType = {
            partId: string;
            mimeType: 'text/plain' | 'text/html';
            filename: string;
            headers: Header[];
            body: {size: number; data: string};
        };
    }
}

export class GmailContentPayloadHeader {
    name: string;
    value: string;
}

export class GmailContentPayloadTextType {
    partId: string;
    mimeType: 'text/plain' | 'text/html';
    filename: string;
    headers: GmailContentPayloadHeader[];
    body: {size: number; data: string};
}

export class GmailContentPayloadAlternativeType {
    partId: string;
    mimeType: 'multipart/alternative';
    filename: string;
    headers: GmailContentPayloadHeader[];
    body: {size: number};
    parts: GmailContentPayloadPart[];
}

export class GmailContentPayloadMixedType {
    partId: string;
    mimeType: 'multipart/mixed';
    filename: string;
    headers: GmailContentPayloadHeader[];
    body: {size: number};
    parts: GmailContentPayloadPart[];
}

export class GmailContentPayloadRelatedType {
    partId: string;
    mimeType: 'multipart/related';
    filename: string;
    headers: GmailContentPayloadHeader[];
    body: {size: number};
    parts: GmailContentPayloadPart[];
}

export class GmailContentPayloadAttachmentType {
    partId: string;
    mimeType: 'application/pdf' | 'application/vnd.ms-excel' | 'text/html';
    filename: string;
    headers: GmailContentPayloadHeader[];
    body: {size: number; attachmentId: string};
}

export type GmailContentPayloadPart =
    | GmailContentPayloadTextType
    | GmailContentPayloadAlternativeType
    | GmailContentPayloadAttachmentType
    | GmailContentPayloadRelatedType
    | GmailContentPayloadAttachmentTextType
    | GmailContentPayloadMixedType;

export type GmailContentPayloadPartInFlat =
    | GmailContentPayloadTextType
    | GmailContentPayloadAttachmentType
    | GmailContentPayloadAttachmentTextType;

export class GmailAttachment {
    partId: string;
    mimeType: 'application/pdf' | 'application/vnd.ms-excel' | 'application/octet-stream' | 'text/html';
    filename: string;
    headers: GmailContentPayloadHeader[];
    body: {size: number; attachmentId: string; data: string};
}

export class GmailContentPayloadAttachmentTextType {
    partId: string;
    mimeType: 'text/plain' | 'text/html';
    filename: string;
    headers: GmailContentPayloadHeader[];
    body: {size: number; attachmentId: string};
}

export class GmailContent {
    id: string;
    threadId: string;
    labelIds: string[];
    snippet: string;
    payload: GmailContentPayloadPart;
    sizeEstimate: number;
    historyId: string;
    internalDate: string;
}

export class GmailContentDto {
    id: string;
    threadId: string;
    labelIds: string[];
    snippet: string;
    payload: GmailContentPayloadPart;
    sizeEstimate: number;
    historyId: string;
    internalDate: string;

    @TypeCast(() => GmailPermittedMetadata)
    _metadata: GmailPermittedMetadata;

    _content: string[];

    @TypeCast(() => GmailAttachment)
    _attachments?: GmailAttachment[]; // post processing data

    get headers() {
        return this.payload.headers;
    }

    get mimeType() {
        return this.payload.mimeType;
    }

    /**
     * subject, sender 는 보장되는 값이 아닙니다.
     */
    public get metadata() {
        return this._metadata;
    }
}

export class GmailContentReadableDto {
    id: string;
    threadId: string;
    labelIds: string[];
    snippet: string;
    historyId: string;
    sizeEstimate: number;
    internalDate: string;

    @TypeCast(() => GmailPermittedMetadata)
    metadata: GmailPermittedMetadata;

    contents: GmailContentPayloadPartInFlat[];

    attachments: GmailAttachment[];

    get date() {
        if (this.metadata.date) return this.metadata.date;
        return new Date(Number(this.internalDate));
    }

    get content(): GmailContentPayloadTextType | undefined {
        const contents = this.contents.filter((content) => {
            return content.mimeType === 'text/plain' || content.mimeType === 'text/html';
        });
        const htmlContent = contents.find((content) => content.mimeType === 'text/html');
        return (htmlContent || contents[0]) as GmailContentPayloadTextType | undefined;
    }
}

export class GmailPermittedMetadata {
    @TypeCast(() => Date) date?: Date;
    subject: string;
    from: string;
    to: string;
    sender: string;
    receiver: string;
    originId: string;

    get fromName() {
        return this.from
            .replace(/\<.+\>/, '')
            .replace(/"/g, '')
            .trim();
    }

    get fromEmail() {
        return captures(this.from, /\<(.+)\>/)[0];
    }
}

export function getUrlFromBase64Data(data: string, type?: string) {
    const binary = atob(`${data}`.replace(/\s/g, ''));
    const len = binary.length;
    const buffer = new ArrayBuffer(len);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < len; i++) {
        view[i] = binary.charCodeAt(i);
    }
    const blob = new Blob([view], {type});
    return URL.createObjectURL(blob);
}

export function attachmentClickHandler(attachment: GmailAttachment) {
    const data = attachment.body.data || '';
    const open = (url: string) => window.open(url, '_blank');
    const download = (url: string, filename: string) => {
        const aTag = document.createElement('a');
        aTag.href = url;
        aTag.download = filename;
        aTag.target = '_blank';
        aTag.click();
    };
    switch (attachment.mimeType) {
        case 'application/pdf':
            return open(getUrlFromBase64Data(data, 'application/pdf'));
        case 'application/octet-stream':
            return download(getUrlFromBase64Data(data, 'application/octet-stream'), attachment.filename);
        default:
            return;
    }
}
