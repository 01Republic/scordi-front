import {Dispatch, SetStateAction} from 'react';
import {ContentPanelHeading} from '^layouts/ContentLayout';
import {FindAllGmailItemQueryDto} from '^models/InvoiceAccount/type';
import {useFormContext} from 'react-hook-form';
import {EmailParserFormData} from '^models/EmailParser/types';

interface Props {
    params: FindAllGmailItemQueryDto;
    setParams: Dispatch<SetStateAction<FindAllGmailItemQueryDto>>;
    isFetching: boolean;
    refetch: () => any;
}

export const ParsingEmailStepHeader = (props: Props) => {
    const {params, setParams, isFetching, refetch} = props;
    const form = useFormContext<{filterQuery: string; parserData: EmailParserFormData}>();

    return (
        <ContentPanelHeading
            stickyHeader
            title={
                <span
                    onClick={() => {
                        console.log('params', params);
                        console.log('form.getValues()', form.getValues());
                    }}
                >
                    [4단계] 이메일로부터 값을 추출하는 방법을 구성합니다.
                </span>
            }
        >
            <div className="ml-auto flex items-center gap-2">
                <button
                    type="button"
                    className={`btn btn-white btn-xs no-animation btn-animation ${isFetching ? 'loading' : ''}`}
                    onClick={() => {
                        const query = form.getValues('filterQuery');
                        params.filterQuery == query ? refetch() : setParams((prev) => ({...prev, filterQuery: query}));
                    }}
                >
                    3단계 데이터 불러오기
                </button>
            </div>
        </ContentPanelHeading>
    );
};
