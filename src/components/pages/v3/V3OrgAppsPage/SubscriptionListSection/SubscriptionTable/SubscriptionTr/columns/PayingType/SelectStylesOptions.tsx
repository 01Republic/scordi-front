import Select, {
    components,
    ContainerProps,
    ControlProps,
    MenuListProps,
    MenuProps,
    OptionProps,
    SingleValueProps,
} from 'react-select';
import React from 'react';
import {HiOutlineXMark} from 'react-icons/hi2';
import {tagApi} from '^models/Tag/api';
import {useSetRecoilState} from 'recoil';
import {tagOptionsState} from '^v3/V3OrgAppsPage/SubscriptionListSection/SubscriptionTable/SubscriptionTr/columns/PayingType/PayingTypeSelect';
import {usePayingTypeTags} from '^models/Tag/hook';

export const selectStylesOptions = {
    placeholder: () => ({
        display: 'none',
    }),

    dropdownIndicator: () => ({display: 'none'}),
    indicatorsContainer: () => ({display: 'none'}),
};

export const SelectContainer = (props: ContainerProps<any>) => {
    return <components.SelectContainer {...props}>{props.children}</components.SelectContainer>;
};

export const Control = (props: ControlProps<any>) => {
    return (
        <components.Control {...props} className="!border-none !cursor-pointer text-sm">
            {props.children}
        </components.Control>
    );
};
export const Menu = (props: MenuProps<any>) => {
    return (
        <components.Menu {...props} className="z-[1] py-2 shadow bg-base-100 !rounded-box mt-1 text-sm">
            {props.children}
        </components.Menu>
    );
};

export const MenuList = (props: MenuListProps<any>) => {
    return (
        <components.MenuList {...props}>
            <div className="text-xs text-center text-gray-500 py-2">옵션 선택 또는 생성</div>
            {props.children}
        </components.MenuList>
    );
};

export const SingleValue = (props: SingleValueProps<any>) => {
    return (
        <components.SingleValue {...props}>
            <span className="btn btn-xs btn-outline btn-scordi px-5 font-normal">{props.children}</span>
        </components.SingleValue>
    );
};

export const Option = (props: OptionProps<any>) => {
    const {search: getTags} = usePayingTypeTags();
    const setTagOptions = useSetRecoilState(tagOptionsState);

    // 보류
    // const onDelete = () => {
    //     const tagId = props.data.id;
    //
    //     if (!tagId) return;
    //
    //     const req = tagApi.destroy(tagId);
    //
    //     req.then(() => getTags({}).then((res) => setTagOptions(res.items)));
    // };

    return (
        <components.Option {...props} className="!bg-white">
            <div className="flex gap-1">
                <div className="btn btn-xs btn-outline btn-scordi flex gap-2 justify-between w-fit px-2 font-normal bg-white">
                    {props.children}
                </div>
                {/*<button*/}
                {/*    onClick={onDelete}*/}
                {/*    className="relative text-gray-400 hover:text-gray-600 transition-all text-end"*/}
                {/*>*/}
                {/*    <HiOutlineXMark size={12} />*/}
                {/*</button>*/}
            </div>
        </components.Option>
    );
};
