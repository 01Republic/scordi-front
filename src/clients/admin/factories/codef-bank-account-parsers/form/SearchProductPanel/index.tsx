import React, {memo} from 'react';
import {ContentPanel, ContentPanelItem, ContentPanelList} from '^layouts/ContentLayout';
import {ProductDto} from '^models/Product/type';
import {ProductSelect} from './ProductSelect';
import {SearchProductInput} from './SearchProductInput';

interface Props {
    defaultValue: ProductDto | undefined;
    onChange: (product?: ProductDto) => any;
}

export const SearchProductPanel = memo((props: Props) => {
    const {defaultValue, onChange} = props;

    return (
        <ContentPanel title="[2단계] 파서와 연결할 SaaS Product 를 설정합니다." stickyHeader>
            <ContentPanelList>
                <ContentPanelItem itemsAlign="start">
                    <ProductSelect defaultValue={defaultValue} onChange={onChange} />

                    <div className="flex-1">
                        <SearchProductInput readOnly={!!defaultValue} />
                        <p className="text-12">
                            {defaultValue ? 'Product 가 선택되었습니다. 변경하려면 왼쪽에서 선택을 해제해주세요.' : ''}{' '}
                        </p>
                    </div>
                </ContentPanelItem>
            </ContentPanelList>
        </ContentPanel>
    );
});
SearchProductPanel.displayName = 'SearchProductPanel';
