import React, {memo, useState} from 'react';
import {FindAllProductQuery, ProductDto} from '^models/Product/type';
import {ContentPanel, ContentPanelItem, ContentPanelList} from '^layouts/ContentLayout';
import {ProductSelect} from './ProductSelect';
import {SearchProductInput} from './SearchProductInput';
import {useQuery} from '@tanstack/react-query';
import {productApi} from '^models/Product/api';
import {Paginated} from '^types/utils/paginated.dto';

interface Props {
    defaultValue: ProductDto | undefined;
    onChange: (product?: ProductDto) => any;
}

export const SearchProductPanel = memo((props: Props) => {
    const {defaultValue, onChange} = props;
    const [keyword, setKeyword] = useState('');
    const {data, isFetching, refetch} = useQuery({
        queryKey: ['SearchProductPanel', keyword],
        queryFn: async () =>
            productApi
                .index({
                    where: {},
                    keyword: keyword ? encodeURI(keyword) : '',
                    order: {id: 'DESC'},
                    itemsPerPage: 10,
                })
                .then((res) => res.data),
        initialData: Paginated.init(),
        enabled: !!keyword,
        retryOnMount: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    return (
        <ContentPanel title="[2단계] 파서와 연결할 SaaS Product 를 설정합니다." stickyHeader>
            <ContentPanelList>
                <ContentPanelItem itemsAlign="start">
                    <ProductSelect
                        result={data}
                        isLoading={isFetching}
                        defaultValue={defaultValue}
                        onChange={onChange}
                    />

                    <div className="flex-1">
                        <SearchProductInput onChange={setKeyword} keyword={keyword} readOnly={!!defaultValue} />
                        <p className="text-12">
                            {defaultValue ? 'Product 가 선택되었습니다. 변경하려면 왼쪽에서 선택을 해제해주세요.' : ''}{' '}
                        </p>
                    </div>
                </ContentPanelItem>
            </ContentPanelList>
        </ContentPanel>
    );
});
