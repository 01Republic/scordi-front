import {GmailItemDto} from '^models/InvoiceAccount/type';

export enum SelectedProperty {
    title = 'title',
    snippet = 'snippet',
    content = 'content',
    attachment_1 = 'attachment_1',
    attachment_2 = 'attachment_2',
}

export function propertyValueOfEmail(selectedProperty: SelectedProperty, email: GmailItemDto, html: string) {
    switch (selectedProperty) {
        case SelectedProperty.title:
            return email.title;
        case SelectedProperty.snippet:
            return email.snippet;
        case SelectedProperty.content:
            return html;
        // case SelectedProperty.attachment_1:
        //     return email.attachments[0];
        // case SelectedProperty.attachment_2:
        //     return email.attachments[1];
        default:
            return '';
    }
}
