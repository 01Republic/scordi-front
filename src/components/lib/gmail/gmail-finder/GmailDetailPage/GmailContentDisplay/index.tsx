import React, {memo} from 'react';
import {GmailContentPayloadTextType, GmailContentReadableDto} from '^models/InvoiceAccount/type';

interface GmailContentDisplayProps {
    isDataMode: boolean;
    isLoading: boolean;
    email?: GmailContentReadableDto;
    rawData?: object;
}

export const GmailContentDisplay = memo((props: GmailContentDisplayProps) => {
    const {isDataMode, isLoading, email, rawData} = props;

    return (
        <section
            className={`h-full max-h-screen overflow-auto ${isDataMode ? 'bg-gray-800 text-white' : 'no-scrollbar'}`}
        >
            {!isDataMode ? (
                <GmailContentDisplayByType content={email?.content} className="p-8" />
            ) : (
                <div className="w-full whitespace-pre p-8">{JSON.stringify(rawData, null, 4)}</div>
            )}
        </section>
    );
});
GmailContentDisplay.displayName = 'GmailContentDisplay';

interface Props {
    content?: GmailContentPayloadTextType;
    className?: string;
}

export const GmailContentDisplayByType = ({content, className = ''}: Props) => {
    const isHtml = content?.mimeType === 'text/html';
    const data = content?.body.data;

    if (isHtml) {
        return (
            <div className="h-full">
                <iframe
                    frameBorder="0"
                    srcDoc={data}
                    className="w-full h-full"
                    scrolling="no"
                    onLoad={(e) => {
                        const self = e.target as HTMLIFrameElement;
                        const innerDoc = self.contentWindow?.document;
                        if (innerDoc) {
                            self.setAttribute(
                                'style',
                                `
                            height: ${`${innerDoc.body.scrollHeight + 30}px`};
                            overflow-y: hidden;
                            `,
                            );
                        }
                    }}
                />
            </div>
        );
    }

    return <div className={`${className}`} dangerouslySetInnerHTML={{__html: data || ''}} />;
};
