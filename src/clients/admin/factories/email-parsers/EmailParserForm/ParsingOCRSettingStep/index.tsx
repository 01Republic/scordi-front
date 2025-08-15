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
    const {params, setParams, data, refetch, isFetching} = useEmailItemsForOCRStep(form.getValues('filterQuery') || '');
    const {focusedIndex, setFocusedIndex, email, html} = useFocusedEmailItem(data);

    // 수정페이지에서, 파서에 저장되어있던 값을 받아 상태 셋업
    useEffect(() => {
        if (parserFilterQuery) setParams((prev) => ({...prev, filterQuery: parserFilterQuery.toUrlParams()}));
    }, [parserFilterQuery]);

    return (
        <ContentPanel bodyWrap={false}>
            <ParsingEmailStepHeader params={params} setParams={setParams} refetch={refetch} isFetching={isFetching} />

            <ContentPanelBody>
                <ContentPanelList>
                    <EmailItemsContainer data={data} focusedIndex={focusedIndex} setFocusedIndex={setFocusedIndex} />

                    {email && html && (
                        <EmailParserForm
                            email={email}
                            html={html}
                            pagination={data.pagination}
                            focusedIndex={focusedIndex}
                            setFocusedIndex={setFocusedIndex}
                        />
                    )}
                </ContentPanelList>
            </ContentPanelBody>
        </ContentPanel>
    );
});
ParsingOCRSettingStep.displayName = 'ParsingOCRSettingStep';
