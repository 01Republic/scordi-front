import {useEffect, useState} from 'react';
import {UseFormReturn} from 'react-hook-form';
import {toast} from 'react-hot-toast';
import {GmailContentReadableDto} from '^models/InvoiceAccount/type';
import {
    GmailMessageListFetchParamQueryDto,
    GmailMessageListFetchResultDto,
} from '^models/InvoiceAccount/type/invoiceAccountGmailTextApi.type';

interface GmailListNavigatorConfig {
    data?: GmailMessageListFetchResultDto;
    form: UseFormReturn<GmailMessageListFetchParamQueryDto, any>;
    currentEmail?: GmailContentReadableDto;
    setCurrentEmail: (email?: GmailContentReadableDto) => any;
}

export const useGmailListNavigator = (config: GmailListNavigatorConfig) => {
    const {data, form, currentEmail, setCurrentEmail} = config;
    const [pageTokens, setPageTokens] = useState<string[]>(['']);
    const [firstEmail, setFirstEmail] = useState<GmailContentReadableDto>();
    const [beforePageIndex, setBeforePageIndex] = useState<number>(0);

    const {messages = []} = data || {};
    const params = form.watch();

    // Page Values
    const currentPageIndex = pageTokens.findIndex((token) => token === params.pageToken);
    const currentPageNum = currentPageIndex + 1;
    const prevPageToken = pageTokens[currentPageIndex - 1];
    const nextPageToken = pageTokens[currentPageIndex + 1] || data?.nextPageToken;

    // Email Values
    const getSubject = (email?: GmailContentReadableDto) => email?.metadata.subject;
    const indexOf = (email: GmailContentReadableDto) => messages.findIndex((msg) => msg.id === email.id);
    const prevEmail = currentEmail ? messages[indexOf(currentEmail) - 1] : undefined;
    const nextEmail = currentEmail ? messages[indexOf(currentEmail) + 1] : undefined;

    useEffect(() => {
        const oldFirstEmail = firstEmail;
        const newFirstEmail = messages[0];
        const newLastEmail = messages[messages.length - 1];

        // console.log('[모달이 열려있으면]', getSubject(currentEmail), {
        //     currentPageIndex,
        //     beforePageIndex,
        //     oldFirstEmail: oldFirstEmail?.id,
        //     newFirstEmail: newFirstEmail?.id,
        // });
        // 모달이 열려있으면
        if (currentEmail) {
            if (oldFirstEmail && newFirstEmail) {
                // page changed
                if (oldFirstEmail.id !== newFirstEmail.id) {
                    if (beforePageIndex < currentPageIndex) {
                        // next direction moved
                        // console.log({beforePageIndex, currentPageIndex, newFirstEmail: getSubject(newFirstEmail)});
                        setCurrentEmail(newFirstEmail);
                    } else {
                        // prev direction moved
                        // console.log({beforePageIndex, currentPageIndex, newLastEmail: getSubject(newLastEmail)});
                        setCurrentEmail(newLastEmail);
                    }
                }
            }
        }

        if (newFirstEmail) setFirstEmail(newFirstEmail);
    }, [messages, firstEmail, currentPageIndex, beforePageIndex]);

    const goPrevEmail = () => {
        if (prevEmail) {
            setCurrentEmail(prevEmail);
        } else {
            goPrevPage();
        }
    };

    const goNextEmail = () => {
        if (nextEmail) {
            setCurrentEmail(nextEmail);
        } else {
            goNextPage();
        }
    };

    const goFirstOfPage = () => {
        if (!messages.length) return;
        setCurrentEmail(messages[0]);
    };

    const goLastOfPage = () => {
        if (!messages.length) return;
        setCurrentEmail(messages[messages.length - 1]);
    };

    const goPage = (pageToken: string) => {
        form.setValue('pageToken', pageToken);
        setBeforePageIndex(currentPageIndex);
    };

    const goPrevPage = () => {
        if (typeof prevPageToken === 'undefined') return toast('첫 페이지 입니다.');
        goPage(prevPageToken);
    };

    const goNextPage = () => {
        if (typeof nextPageToken === 'undefined') return toast('마지막 페이지 입니다.');
        setPageTokens((tokens) => {
            return tokens.includes(nextPageToken) ? [...tokens] : [...tokens, nextPageToken];
        });
        goPage(nextPageToken);
    };

    const changePageSize = (size: number) => {
        setPageTokens(['']);
        form.setValue('pageToken', '');
        form.setValue('maxResults', size);
    };

    const searchInputSubmit = (value: string) => {
        changePageSize(20);
        form.setValue('q', value);
    };

    return {
        params,
        currentPageNum,
        pageTokens,
        prevPageToken,
        nextPageToken,
        prevEmail,
        nextEmail,
        goPrevEmail,
        goNextEmail,
        goFirstOfPage,
        goLastOfPage,
        goPage,
        goPrevPage,
        goNextPage,
        changePageSize,
        searchInputSubmit,
        getSubject,
    };
};

export type GmailListNavigator = ReturnType<typeof useGmailListNavigator>;
