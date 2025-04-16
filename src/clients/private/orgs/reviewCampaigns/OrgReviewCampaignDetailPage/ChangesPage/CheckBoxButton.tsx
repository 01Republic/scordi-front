import {Checkbox} from '^public/components/ui/checkbox';
import {WithChildren} from '^types/global.type';

interface CheckBoxButtonProps extends WithChildren {
    checked?: boolean;
    onChange?: (checked: boolean) => any;
    className?: string;
}

export function CheckBoxButton(props: CheckBoxButtonProps) {
    const {checked = false, onChange, className = '', children} = props;

    return (
        <label
            className={`flex items-center gap-2 text-sm border rounded-lg py-1.5 px-2.5 cursor-pointer btn-animation ${
                // text
                checked ? 'text-scordi' : 'text-gray-700 hover:text-scordi'
            } ${
                // border
                checked ? 'border-scordi' : 'border-gray-300 hover:border-scordi-200'
            } ${
                // bg
                checked ? 'bg-scordi-light-100' : 'bg-gray-50 hover:bg-scordi-50'
            } ${className}`}
        >
            <Checkbox
                checked={checked}
                onCheckedChange={(value) => {
                    onChange && onChange(Boolean(value));
                }}
            />
            {children}
        </label>
    );
}
