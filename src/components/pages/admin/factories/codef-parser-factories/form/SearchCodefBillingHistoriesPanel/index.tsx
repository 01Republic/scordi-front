import React, {memo, useState} from 'react';
import {debounce} from 'lodash';
import {UseFormReturn} from 'react-hook-form';
import {CodefBillingHistoryDto, FindAllCodefBillingHistoryQueryDto} from '^models/CodefBillingHistory/type';
import {LikeConditionInputGroup} from '^admin/factories/codef-parser-factories/form/share/LikeConditionInputGroup';
import {codefParserFactoryApi} from '^admin/factories/codef-parser-factories/CodefParserFactory/api';
import {
    CreateParserDto,
    QueryUnitDto,
} from '^admin/factories/codef-parser-factories/CodefParserFactory/CreateParserDto';
import {ContentPanel, ContentPanelInput, ContentPanelItem, ContentPanelList} from '^layouts/ContentLayout';
import {LoadableBox} from '../share/LoadableBox';
import {SearchedCodefBillingHistoryItem} from '^admin/factories/codef-parser-factories/form/SearchCodefBillingHistoriesPanel/SearchedCodefBillingHistoryItem';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {SelectedCodefCard} from '^admin/factories/codef-parser-factories/form/SearchCodefBillingHistoriesPanel/SelectedCodefCard';

interface SearchCodefBillingHistoriesPanelProps {
    form: UseFormReturn<CreateParserDto>;
}

export const SearchCodefBillingHistoriesPanel = memo((props: SearchCodefBillingHistoriesPanelProps) => {
    const {form} = props;
    const [codefBillingHistories, setCodefBillingHistories] = useState<CodefBillingHistoryDto[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCodefCard, selectCodefCard] = useState<CodefCardDto>();

    const search = (params: QueryUnitDto, codefCard?: CodefCardDto) => {
        const {fo = false, bo = false, text = ''} = params;
        if (!codefCard && !text) {
            setCodefBillingHistories([]);
            return;
        }

        setIsLoading(true);
        const query = {} as FindAllCodefBillingHistoryQueryDto;
        if (codefCard) query.where = {codefCardId: codefCard.id};
        query.like = {fo, bo, text: text.replace(/%/g, '%25')};
        codefParserFactoryApi
            .searchCodefBillingHistories(query)
            .then((res) => setCodefBillingHistories(res.data))
            .finally(() => setIsLoading(false));
    };

    const onCardSelect = (codefCard?: CodefCardDto) => {
        selectCodefCard(codefCard);
        const values = form.getValues();
        const {fo, bo, text} = values?.resMemberStoreName || {};
        search({fo, bo, text}, codefCard);
    };

    const onChangeFo = debounce((fo: boolean) => {
        const values = form.getValues();
        const {bo, text} = values?.resMemberStoreName || {};
        form.setValue('resMemberStoreName.fo', fo);
        search({fo, bo, text}, selectedCodefCard);
    }, 500);

    const onChangeBo = debounce((bo: boolean) => {
        const values = form.getValues();
        const {fo, text} = values?.resMemberStoreName || {};
        form.setValue('resMemberStoreName.bo', bo);
        search({fo, bo, text}, selectedCodefCard);
    }, 500);

    const onChangeInput = debounce((text: string) => {
        const values = form.getValues();
        const {fo, bo} = values?.resMemberStoreName || {};
        form.setValue('resMemberStoreName.text', text);
        search({fo, bo, text}, selectedCodefCard);
    }, 500);

    return (
        <ContentPanel title="[3단계] 카드내역에서 위 서비스의 결제만 추출하는 결제메세지의 패턴을 찾습니다.">
            <ContentPanelList>
                <ContentPanelItem itemsAlign="start">
                    <div className="flex-1 pr-4 pt-2">
                        <SelectedCodefCard codefCard={selectedCodefCard} onClick={() => onCardSelect(undefined)} />
                        <LoadableBox loadingType={2} isLoading={isLoading} noPadding>
                            <div className="grid grid-cols-7 text-12"></div>
                            {codefBillingHistories.map((codefBillingHistory, i) => (
                                <SearchedCodefBillingHistoryItem
                                    key={i}
                                    data={codefBillingHistory}
                                    onCardSelect={onCardSelect}
                                />
                            ))}
                        </LoadableBox>
                    </div>
                    <div className="flex-1">
                        <LikeConditionInputGroup
                            fo={{value: form.getValues('resMemberStoreName.fo'), onChange: onChangeFo}}
                            bo={{value: form.getValues('resMemberStoreName.bo'), onChange: onChangeBo}}
                            text={{value: form.getValues('resMemberStoreName.text'), onChange: onChangeInput}}
                        />
                    </div>
                </ContentPanelItem>
            </ContentPanelList>
        </ContentPanel>
    );
});
SearchCodefBillingHistoriesPanel.displayName = 'SearchCodefBillingHistoriesPanel';
