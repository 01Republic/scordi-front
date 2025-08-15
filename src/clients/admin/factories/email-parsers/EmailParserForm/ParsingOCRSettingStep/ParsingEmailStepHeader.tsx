import {Dispatch, SetStateAction} from 'react';
import {ContentPanelHeading} from '^layouts/ContentLayout';
import {FindAllGmailItemQueryDto} from '^models/InvoiceAccount/type';
import {useFormContext} from 'react-hook-form';
import {EmailParserFormData} from '^models/EmailParser/types';
import {PaginationMetaData} from '^types/utils/paginated.dto';
import {unitFormat} from '^utils/number';

interface Props {
    params: FindAllGmailItemQueryDto;
    setParams: Dispatch<SetStateAction<FindAllGmailItemQueryDto>>;
    isFetching: boolean;
    refetch: () => any;
    pagination: PaginationMetaData;
}

export const ParsingEmailStepHeader = (props: Props) => {
    const {params, setParams, isFetching, refetch, pagination} = props;
    const form = useFormContext<{filterQuery: string; parserData: EmailParserFormData}>();

    const {totalItemCount, totalPage, currentPage} = pagination;

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
                {totalItemCount > 0 && (
                    <div className="text-12">
                        결과: 총 {unitFormat(totalItemCount)} <span className="mx-2">&middot;</span> 페이지:{' '}
                        {unitFormat(totalPage, 'p')} 중 {unitFormat(currentPage, 'p')}
                    </div>
                )}

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
