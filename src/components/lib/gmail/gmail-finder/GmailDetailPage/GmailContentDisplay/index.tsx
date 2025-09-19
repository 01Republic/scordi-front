import React, {memo, useMemo, useState} from 'react';
import {GmailContentPayloadTextType, GmailContentReadableDto} from '^models/InvoiceAccount/type';
import {cn} from '^public/lib/utils';
import {api, errorToast} from '^api/api';

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

interface Props {
    src?: string;
    srcDoc?: string;
    className?: string;
}

export const GmailContentDisplayByUrl = ({src, srcDoc, className = ''}: Props) => {
    const [html, setHtml] = useState<string>();

    useMemo(() => {
        if (!src) return;

        api.get('/proxy', {params: {url: encodeURIComponent(src)}})
            .then((res) => res.data)
            .then(setHtml)
            .catch(errorToast);
    }, [src]);

    if (!srcDoc && !html) return <></>;

    return (
        <iframe
            frameBorder="0"
            srcDoc={html || srcDoc}
            className={cn(`w-full h-full`, className)}
            scrolling="no"
            onLoad={(e) => {
                const self = e.target as HTMLIFrameElement;
                const innerHeight = self.contentWindow?.document?.body.scrollHeight;
                if (innerHeight) {
                    self.setAttribute(
                        'style',
                        `
                            height: ${`${innerHeight}px`};
                            overflow-y: auto;
                            `,
                    );
                }
            }}
        />
    );
};
