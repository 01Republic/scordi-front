import {memo, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {SubscriptionDto} from '^models/Subscription/types';
import CreatableSelect from 'react-select/creatable';
import {
    Control,
    Menu,
    MenuList,
    SelectContainer,
    selectStylesOptions,
    SingleValue,
} from '^v3/V3OrgAppsPage/SubscriptionListSection/SubscriptionTable/SubscriptionTr/columns/PayingType/SelectStylesOptions';
import {usePayingTypeTags} from '^models/Tag/hook';
import {TagDto} from '^models/Tag/type';
import {GroupBase} from 'react-select';

type SelectOptions = {id: number; label: string; name: string} | GroupBase<any>;

interface PayingTypeSelectProps {
    subscription: SubscriptionDto;
}

export const PayingTypeSelect = memo((props: PayingTypeSelectProps) => {
    const form = useForm();
    const {createByName, result} = usePayingTypeTags();
    const {subscription} = props;
    const billingType = subscription.getRecurringTypeText(true);

    const tagOptions = result.items;

    useEffect(() => {
        form.setValue('tagName', billingType);
    }, []);

    const getOptions = (options: TagDto[]): SelectOptions[] => {
        return options.map((option) => {
            return {
                id: option.id,
                label: option.name,
                name: option.name,
            };
        });
    };

    const onCreate = (name: string) => {
        console.log('실행');
        if (!name) return;

        // options에 있는지 확인
        const isExist = tagOptions?.find((tag) => {
            tag.name === name;
        });

        // 있으면 변경 요청
        if (isExist) {
        }

        // 없으면 생성 / 변경
        if (!isExist) {
            // 생성
            createByName(name).then((res) => console.log(res));
        }
    };

    const defaultValue = {
        label: billingType,
        name: billingType,
    };

    return (
        <>
            <CreatableSelect
                isClearable
                defaultValue={defaultValue}
                styles={selectStylesOptions}
                options={getOptions(tagOptions)}
                onChange={(e) => onCreate(e.value)}
                components={{SelectContainer, Control, Menu, MenuList, SingleValue}}
            />
        </>
    );
});
