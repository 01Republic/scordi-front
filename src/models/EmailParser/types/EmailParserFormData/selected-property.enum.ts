import {FetchedAttachmentFile, GmailItemDto} from '^models/InvoiceAccount/type';

export enum SelectedProperty {
    title = 'title',
    snippet = 'snippet',
    content = 'content',
    attachment_1 = 'attachment_1',
    attachment_2 = 'attachment_2',
    attachment_3 = 'attachment_3',
}

export function propertyValueOfEmail(
    selectedProperty: SelectedProperty,
    email: GmailItemDto,
    html: string,
    attachments: FetchedAttachmentFile[] = [],
) {
    switch (selectedProperty) {
        case SelectedProperty.title:
            return email.title;
        case SelectedProperty.snippet:
            return email.snippet;
        case SelectedProperty.content:
            return html;
        case SelectedProperty.attachment_1:
            return attachments[0]?.data || '';
        case SelectedProperty.attachment_2:
            return attachments[1]?.data || '';
        case SelectedProperty.attachment_3:
            return attachments[2]?.data || '';
        default:
            return '';
    }
}
