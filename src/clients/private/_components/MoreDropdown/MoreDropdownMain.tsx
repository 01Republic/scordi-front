import React, {memo} from 'react';
import {Dropdown, DropdownProps} from '^v3/share/Dropdown';
import {MoreDropdownDefaultTrigger} from './MoreDropdownDefaultTrigger';

interface MoreDropdownMainProps extends Omit<DropdownProps, 'Trigger'> {
    Trigger?: DropdownProps['Trigger'];
}

export const MoreDropdownMain = memo((props: MoreDropdownMainProps) => {
    const {Trigger, ...res} = props;

    return <Dropdown Trigger={Trigger || MoreDropdownDefaultTrigger} {...res} />;
});
MoreDropdownMain.displayName = 'MoreDropdownMain';
