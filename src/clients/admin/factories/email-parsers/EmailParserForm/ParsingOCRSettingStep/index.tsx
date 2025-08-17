import {memo, useEffect} from 'react';
import {ContentPanel, ContentPanelBody, ContentPanelList} from '^layouts/ContentLayout';
import {useFormContext} from 'react-hook-form';
import {FilterQuery} from '^lib/notion-like-filter';
import {EmailParserFormData} from '^models/EmailParser/types';
import {useEmailItemsForOCRStep, useFocusedEmailItem} from './hooks';
import {ParsingEmailStepHeader} from './ParsingEmailStepHeader';
import {EmailItemsContainer} from './EmailItemsContainer';
import {EmailParserForm} from './EmailParserForm';

interface Props {
    parserFilterQuery?: FilterQuery;
}

// 4단계
export const ParsingOCRSettingStep = memo((props: Props) => {
    const {parserFilterQuery} = props;
    const form = useFormContext<{filterQuery: string; parserData: EmailParserFormData}>();
    const {params, setParams, emails, pagination, refetch, isFetching, fetchNextPage} = useEmailItemsForOCRStep(
        form.getValues('filterQuery') || '',
    );
    const {focusedIndex, setFocusedIndex, email, html, attachments} = useFocusedEmailItem(emails);

    // 수정페이지에서, 파서에 저장되어있던 값을 받아 상태 셋업
    useEffect(() => {
        if (parserFilterQuery) setParams((prev) => ({...prev, filterQuery: parserFilterQuery.toUrlParams()}));
    }, [parserFilterQuery]);

    return (
        <ContentPanel bodyWrap={false}>
            <ParsingEmailStepHeader
                params={params}
                setParams={setParams}
                refetch={refetch}
                isFetching={isFetching}
                pagination={pagination}
            />

            <ContentPanelBody>
                <ContentPanelList>
                    <EmailItemsContainer
                        emails={emails}
                        isLoading={isFetching}
                        focusedIndex={focusedIndex}
                        onFocus={setFocusedIndex}
                        onNext={() => fetchNextPage()}
                        currentPage={pagination.currentPage}
                        totalPage={pagination.totalPage}
                    />

                    {email && html && (
                        <EmailParserForm
                            email={email}
                            html={html}
                            attachments={attachments}
                            focusedIndex={focusedIndex}
                            totalItemCount={emails.length}
                            onPrev={() => setFocusedIndex((i) => (i - 1 >= 0 ? i - 1 : i))}
                            onNext={() => setFocusedIndex((i) => (i + 1 < emails.length ? i + 1 : i))}
                        />
                    )}
                </ContentPanelList>
            </ContentPanelBody>
        </ContentPanel>
    );
});
ParsingOCRSettingStep.displayName = 'ParsingOCRSettingStep';
