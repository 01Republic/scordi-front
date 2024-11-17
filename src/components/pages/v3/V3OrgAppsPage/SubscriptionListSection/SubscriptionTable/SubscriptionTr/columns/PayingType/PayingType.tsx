import {memo} from 'react';
import {SubscriptionDto} from '^models/Subscription/types';
import {SelectColumn} from '^v3/share/table/columns/SelectColumn';
import {usePayingTypeTags} from '^models/Tag/hook';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {TagDto} from '^models/Tag/type';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {getColor, palette} from '^components/util/palette';
import {subscriptionApi} from '^models/Subscription/api';
import {useToast} from '^hooks/useToast';
import {
    c_PricingModelValue,
    PricingModelOptions,
    PricingModelValues,
    t_SubscriptionPricingModel,
} from '^models/Subscription/types/PricingModelOptions';

interface PayingTypeProps {
    subscription: SubscriptionDto;
    onChange: (value: PricingModelOptions) => any;
}

/**
 * 과금 방식
 * subscription.pricingModel: PricingModelOptions
 */
export const PayingType = memo((props: PayingTypeProps) => {
    const {toast} = useToast();
    const {subscription, onChange} = props;

    const onSelect = async (pricingModel: PricingModelOptions) => {
        if (pricingModel === subscription.pricingModel) return;

        return subscriptionApi
            .update(subscription.id, {pricingModel})
            .then(() => onChange(pricingModel))
            .finally(() => toast.success('저장했습니다'));
    };

    return (
        <SelectColumn
            value={subscription.pricingModel}
            getOptions={async () => PricingModelValues}
            onSelect={onSelect}
            ValueComponent={PayingTypeTag}
            contentMinWidth="240px"
            inputDisplay={false}
        />
    );
});
PayingType.displayName = 'PayingType';

export const PayingTypeTag = memo((props: {value: PricingModelOptions | string}) => {
    const {value} = props;
    const colorClass = c_PricingModelValue(value as PricingModelOptions);
    const text = t_SubscriptionPricingModel(value as PricingModelOptions);

    return <TagUI className={colorClass}>{text}</TagUI>;
});

interface PayingTypeCreatableProps {
    subscription: SubscriptionDto;
    onChange: (value: TagDto) => any;
}

export const PayingTypeCreatable = memo((props: PayingTypeCreatableProps) => {
    // const {subscription} = props;
    //
    // const locale = (router.locale as Locale) || Locale.ko;
    //
    // /* 태그들로 표시해 줄 것: 연, 고정, 사용량, 크레딧, 1인당 */
    // TODO: "과금 방식" 이거 행에서 직접 사용자가 수정 가능하고,
    //  이렇게 '사용자편집' 된 billingType 을
    //  subscription 엔티티에 저장해둘 수 있으면 좋겠다.
    //  그리고 사용자에게 보여줄 때 우선순위는
    //  '크롤러가 발견해온거' (크롤러가 발견해온건 걍 편집 더이상 안되게 ui 처리) > '사용자편집' > '인보이스로부터 알아낸거'
    // return <PayingTypeSelect subscription={subscription} />;

    const {toast} = useToast();
    const organizationId = useRecoilValue(orgIdParamState);
    const {search, createByName} = usePayingTypeTags();
    const {subscription, onChange} = props;
    const billingType = subscription.getRecurringTypeText(true);

    const getOptions = async (keyword?: string) => {
        return search({organizationId, keyword, itemsPerPage: 0}).then((res) => res.items);
    };

    const onSelect = async (tag: TagDto) => {
        if (tag.id === subscription.recurringTypeTag?.id) return;

        return subscriptionApi
            .update(subscription.id, {recurringTypeTagId: tag.id})
            .then(() => onChange(tag))
            .finally(() => toast.success('저장했습니다'));
    };

    const onCreate = async (tagName: string) => {
        return createByName(tagName, organizationId).then((newTag) => {
            onSelect(newTag);
        });
    };

    return (
        <SelectColumn
            value={subscription.recurringTypeTag}
            getOptions={getOptions}
            ValueComponent={PayingTypeCreatableTag}
            valueOfOption={(tag) => tag.name}
            contentMinWidth="240px"
            onSelect={onSelect}
            onCreate={onCreate}
        />
    );
});
PayingTypeCreatable.displayName = 'PayingTypeCreatable';

const PayingTypeCreatableTag = memo((props: {value: TagDto | string}) => {
    const {value} = props;
    const colorClass =
        typeof value === 'string' ? 'bg-gray-300' : getColor(value.name.length + value.id, palette.notionColors);

    return <TagUI className={colorClass}>{typeof value === 'string' ? value : value.name}</TagUI>;
});
