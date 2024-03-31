import React, {memo, useEffect, useState} from 'react';
import {ContentPanel, ContentPanelInput, ContentPanelItem, ContentPanelList} from '^layouts/ContentLayout';
import {ProductDto} from '^models/Product/type';
import {debounce} from 'lodash';
import {LoadableBox} from '^components/util/loading';
import {FindOperatorType, FindOperatorUnitDto} from '../../CodefParserFactory/CreateCodefParserDto';
import {codefParserFactoryApi} from '../../CodefParserFactory/api';
import {ConditionLikeInputGroup} from '../share/ConditionLikeInputGroup';
import {getLikeQueryString} from '../share/get-like-query-string';
import {CodefParserFormReturn} from '../CodefParserForm';
import {ValidateMessage} from './ValidateMessage';
import {SearchedProductItem} from './SearchedProductItem';

interface SearchProductPanelProps {
    form: CodefParserFormReturn;
    reloadOnReady?: boolean;
}

export const SearchProductPanel = memo((props: SearchProductPanelProps) => {
    const {form, reloadOnReady = false} = props;
    const [products, setProducts] = useState<ProductDto[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showInputs, setShowInputs] = useState(true);

    useEffect(() => {
        if (reloadOnReady) {
            const values = form.getValues();
            const {ops = FindOperatorType.Like, fo, bo, value = ''} = values.searchText || {};
            search({ops, fo, bo, value});
        }
    }, [reloadOnReady]);

    const search = async (params: FindOperatorUnitDto) => {
        const {ops, fo = false, bo = false, value = ''} = params;
        if (!value) {
            setProducts([]);
            return;
        }
        setIsLoading(true);
        return codefParserFactoryApi
            .searchProducts({ops, value: getLikeQueryString(fo, bo, value)})
            .then((res) => setProducts(res.data))
            .finally(() => setIsLoading(false));
    };

    const onChangeFo = debounce((fo?: boolean) => {
        const values = form.getValues();
        const {bo, value = ''} = values?.searchText || {};
        form.setValue('searchText.fo', fo);
        search({fo, bo, value, ops: FindOperatorType.Like});
    }, 500);

    const onChangeBo = debounce((bo?: boolean) => {
        const values = form.getValues();
        const {fo, value = ''} = values?.searchText || {};
        form.setValue('searchText.bo', bo);
        search({fo, bo, value, ops: FindOperatorType.Like});
    }, 500);

    const onChangeInput = debounce((value: string = '', cb = () => {}) => {
        const values = form.getValues();
        const {fo, bo} = values?.searchText || {};
        form.setValue('searchText.value', value);
        return search({fo, bo, value, ops: FindOperatorType.Like}).finally(cb);
    }, 500);

    const values = form.getValues();

    return (
        <ContentPanel title="[2단계] 파서와 연결할 SaaS Product 를 설정합니다.">
            <ContentPanelList>
                <ContentPanelItem itemsAlign="start">
                    <div className="flex-1 pr-4 pt-2">
                        <ValidateMessage value={`${values.searchText?.value}`} resultLength={products.length} />
                        <LoadableBox isLoading={isLoading} noPadding>
                            {products.map((product, i) => (
                                <SearchedProductItem
                                    key={i}
                                    product={product}
                                    copyToInput={(searchText) => {
                                        setShowInputs(false);
                                        onChangeInput(searchText, () => setShowInputs(true));
                                    }}
                                />
                            ))}
                        </LoadableBox>
                    </div>

                    <div className="flex-1">
                        {showInputs && (
                            <ConditionLikeInputGroup
                                isLoading={isLoading}
                                fo={{value: values.searchText?.fo, onChange: onChangeFo}}
                                bo={{value: values.searchText?.bo, onChange: onChangeBo}}
                                value={{value: values.searchText?.value, onChange: onChangeInput}}
                            />
                        )}
                    </div>
                </ContentPanelItem>
            </ContentPanelList>
        </ContentPanel>
    );
});
SearchProductPanel.displayName = 'SearchProductPanel';
