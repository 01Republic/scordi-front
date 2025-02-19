import {MoreDropdownMain} from './MoreDropdownMain';
import {MoreDropdownDefaultTrigger} from './MoreDropdownDefaultTrigger';
import {MoreDropdownContent} from './MoreDropdownContent';
import {MoreDropdownItemButton} from './MoreDropdownItemButton';
import {MoreDropdownMenuItem} from './MoreDropdownMenuItem';

export const MoreDropdown = Object.assign(MoreDropdownMain, {
    DefaultTrigger: MoreDropdownDefaultTrigger,
    Content: MoreDropdownContent,
    ItemButton: MoreDropdownItemButton,
    MenuItem: MoreDropdownMenuItem,
});
