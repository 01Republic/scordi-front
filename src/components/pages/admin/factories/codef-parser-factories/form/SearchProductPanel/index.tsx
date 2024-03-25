import React, {memo, useState} from 'react';
import {UseFormReturn} from 'react-hook-form';
import {
    CreateParserDto,
    QueryUnitDto,
} from '^admin/factories/codef-parser-factories/CodefParserFactory/CreateParserDto';
import {ContentPanel, ContentPanelInput, ContentPanelList} from '^layouts/ContentLayout';
import {TextInput} from '^components/TextInput';
import {ProductDto} from '^models/Product/type';
import {debounce} from 'lodash';
import {codefParserFactoryApi} from '^admin/factories/codef-parser-factories/CodefParserFactory/api';
import {CheckBoxInput} from '^admin/factories/codef-parser-factories/form/SearchProductPanel/CheckBoxInput';
import {ProductAvatar} from '^v3/share/ProductAvatar';
import {FaCheckCircle, FaExclamationTriangle} from 'react-icons/fa';
import {ValidateMessage} from './ValidateMessage';
import {SearchedProductItem} from './SearchedProductItem';
import {LikeConditionInputGroup} from '^admin/factories/codef-parser-factories/form/share/LikeConditionInputGroup';
import {LoadableBox} from '^admin/factories/codef-parser-factories/form/share/LoadableBox';

interface SearchProductPanelProps {
    form: UseFormReturn<CreateParserDto>;
}

export const SearchProductPanel = memo((props: SearchProductPanelProps) => {
    const {form} = props;
    const [products, setProducts] = useState<ProductDto[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const search = (params: QueryUnitDto) => {
        const {fo = false, bo = false, text = ''} = params;
        if (!text) {
            setProducts([]);
            return;
        }
        setIsLoading(true);
        codefParserFactoryApi
            .searchProducts({fo, bo, text: text.replace(/%/g, '%25')})
            .then((res) => setProducts(res.data))
            .finally(() => setIsLoading(false));
    };

    const onChangeFo = debounce((fo: boolean) => {
        const values = form.getValues();
        const {bo, text} = values?.searchText || {};
        form.setValue('searchText.fo', fo);
        search({fo, bo, text});
    }, 500);

    const onChangeBo = debounce((bo: boolean) => {
        const values = form.getValues();
        const {fo, text} = values?.searchText || {};
        form.setValue('searchText.bo', bo);
        search({fo, bo, text});
    }, 500);

    const onChangeInput = debounce((text: string) => {
        const values = form.getValues();
        const {fo, bo} = values?.searchText || {};
        form.setValue('searchText.text', text);
        search({fo, bo, text});
    }, 500);

    return (
        <ContentPanel title="[2단계] 파서와 연결할 SaaS Product 를 설정합니다.">
            <ContentPanelList>
                <ContentPanelInput
                    title="서비스 선택"
                    required={true}
                    text="한 개의 검색 결과만 선택될 수 있도록 검색어를 입력해주세요."
                >
                    <LikeConditionInputGroup
                        fo={{value: form.getValues('searchText.fo'), onChange: onChangeFo}}
                        bo={{value: form.getValues('searchText.bo'), onChange: onChangeBo}}
                        text={{value: form.getValues('searchText.text'), onChange: onChangeInput}}
                    />

                    <LoadableBox isLoading={isLoading}>
                        <ValidateMessage
                            value={`${form.getValues('searchText.text')}`}
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
