import {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {Check} from 'lucide-react';

export interface SelectOptionProps extends WithChildren {
    value?: any;
    text?: string;
    selected?: boolean;
    onSelect?: (value: any) => any;
}

export const SelectOption = memo((props: SelectOptionProps) => {
    const {value: v, text, selected = false, onSelect, children} = props;
    const value: any = v || text;

    return (
        <li>
            <a onClick={() => onSelect && onSelect(value)}>
                <span>{text || children || value}</span>
                {selected && <Check />}
            </a>
        </li>
    );
});
