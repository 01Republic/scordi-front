import React, {memo, useState} from 'react';
import {UseFormReturn} from 'react-hook-form';
import {
    CreateCodefParserDto,
    FindOperatorType,
    FindOperatorUnitDto,
} from '^admin/factories/codef-parser-factories/CodefParserFactory/CreateCodefParserDto';
import {ContentPanel, ContentPanelInput, ContentPanelList} from '^layouts/ContentLayout';
import {ProductDto} from '^models/Product/type';
import {debounce} from 'lodash';
import {codefParserFactoryApi} from '^admin/factories/codef-parser-factories/CodefParserFactory/api';
import {ValidateMessage} from './ValidateMessage';
import {SearchedProductItem} from './SearchedProductItem';
import {ConditionLikeInputGroup} from '^admin/factories/codef-parser-factories/form/share/ConditionLikeInputGroup';
import {LoadableBox} from '^admin/factories/codef-parser-factories/form/share/LoadableBox';
import {getLikeQueryString} from '^admin/factories/codef-parser-factories/form/share/get-like-query-string';

interface SearchProductPanelProps {
    form: UseFormReturn<CreateCodefParserDto>;
}

export const SearchProductPanel = memo((props: SearchProductPanelProps) => {
    const {form} = props;
    const [products, setProducts] = useState<ProductDto[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const search = (params: FindOperatorUnitDto) => {
        const {ops, fo = false, bo = false, value = ''} = params;
        if (!value) {
            setProducts([]);
            return;
        }
        setIsLoading(true);
        codefParserFactoryApi
            .searchProducts({ops, value: getLikeQueryString(fo, bo, value)})
            .then((res) => setProducts(res.data))
            .finally(() => setIsLoading(false));
    };

    const onChangeFo = debounce((fo?: boolean) => {
        const values = form.getValues();
        const {bo, value} = values?.searchText || {};
        form.setValue('searchText.fo', fo);
        search({fo, bo, value, ops: FindOperatorType.Like});
    }, 500);

    const onChangeBo = debounce((bo?: boolean) => {
        const values = form.getValues();
        const {fo, value} = values?.searchText || {};
        form.setValue('searchText.bo', bo);
        search({fo, bo, value, ops: FindOperatorType.Like});
    }, 500);

    const onChangeInput = debounce((value: string = '') => {
        const values = form.getValues();
        const {fo, bo} = values?.searchText || {};
        form.setValue('searchText.value', value);
        search({fo, bo, value, ops: FindOperatorType.Like});
    }, 500);

    return (
        <ContentPanel title="[2단계] 파서와 연결할 SaaS Product 를 설정합니다.">
            <ContentPanelList>
                <ContentPanelInput
                    title="서비스 선택"
                    required={true}
                    text="한 개의 검색 결과만 선택될 수 있도록 검색어를 입력해주세요."
                >
                    <ConditionLikeInputGroup
                        isLoading={isLoading}
                        fo={{value: form.getValues('searchText.fo'), onChange: onChangeFo}}
                        bo={{value: form.getValues('searchText.bo'), onChange: onChangeBo}}
                        value={{value: form.getValues('searchText.value'), onChange: onChangeInput}}
                    />

                    <LoadableBox isLoading={isLoading}>
                        <ValidateMessage
                            value={`${form.getValues('searchText.value')}`}
                            resultLength={products.length}
                        />

                        {products.map((product, i) => (
                            <SearchedProductItem key={i} product={product} />
                        ))}
                    </LoadableBox>
                </ContentPanelInput>
            </ContentPanelList>
        </ContentPanel>
    );
});
SearchProductPanel.displayName = 'SearchProductPanel';
