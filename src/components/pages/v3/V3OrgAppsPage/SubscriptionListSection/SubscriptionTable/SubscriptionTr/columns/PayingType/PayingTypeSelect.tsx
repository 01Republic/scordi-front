import {memo, useState} from 'react';
import {atom, useRecoilState} from 'recoil';
import {GroupBase, MultiValue, SingleValue as SingleValueType} from 'react-select';
import CreatableSelect from 'react-select/creatable';
import {
    Control,
    Menu,
    MenuList,
    Option,
    SelectContainer,
    selectStylesOptions,
    SingleValue,
} from '^v3/V3OrgAppsPage/SubscriptionListSection/SubscriptionTable/SubscriptionTr/columns/PayingType/SelectStylesOptions';
import {subscriptionApi} from '^models/Subscription/api';
import {SubscriptionDto} from '^models/Subscription/types';
import {useCurrentSubscription} from '^models/Subscription/hook';
import {TagDto} from '^models/Tag/type';
import {usePayingTypeTags} from '^models/Tag/hook';

// tag options state
export const tagOptionsState = atom<TagDto[]>({
    key: 'tagOptionsState',
    default: [],
});

type SelectOption = {id: number; label: string; name: string};
type SelectOptions = SelectOption | GroupBase<any>;

interface PayingTypeSelectProps {
    subscription: SubscriptionDto;
}

export const PayingTypeSelect = memo((props: PayingTypeSelectProps) => {
    const [newTagId, setNewTagId] = useState<number>(0);
    const [tagOptions, setTagOptions] = useRecoilState(tagOptionsState);
    const {reload: reloadCurrentApp} = useCurrentSubscription();
    const {createByName} = usePayingTypeTags();

    const {subscription} = props;
    const billingType = subscription.getRecurringTypeText(true);

    if (!subscription) return <></>;

    // 기존 등록된 Options -> Select Option 형태로 변경해주는 함수
    const getOptions = (options: TagDto[]): SelectOptions[] => {
        return options.map((option) => {
            return {
                id: option.id,
                label: option.name,
                name: option.name,
            };
        });
    };

    const onChange = (e: SelectOption | null) => {
        if (!e) return;

        // Options 있는지 확인
        const isExist = tagOptions?.find((tag) => {
            return tag.name === e.label;
        });

        // Tag option 생성
        if (!isExist) {
            createByName(e.label).then((res) => {
                setTagOptions([...tagOptions, res]);
                setNewTagId(res.id);
            });
        }

        const tagId = newTagId === 0 ? e.id : newTagId;
        subscriptionApi.update(subscription.id, {recurringTypeTagId: tagId});

        reloadCurrentApp();
    };

    const defaultValue = {
        label: billingType,
        name: billingType,
    };

    return (
        <CreatableSelect
            isClearable
            defaultValue={defaultValue}
            styles={selectStylesOptions}
            options={getOptions(tagOptions)}
            isMulti={false}
            onChange={(e) => {
                if (e) onChange(e as SelectOption);
            }}
            components={{SelectContainer, Control, Menu, MenuList, SingleValue, Option}}
        />
    );
});
