import {FcCheckmark} from 'react-icons/fc';
import {ValueComponent} from '../type';

interface OptionItemProps<T> {
    option: T;
    selectedOption?: T;
    clickOption: (option: T) => Promise<void>;
    ValueComponent: ValueComponent<T>;
    valueOfOption: (option: T) => any;
}

export const OptionItem = <T,>(props: OptionItemProps<T>) => {
    const {option, selectedOption, ValueComponent, valueOfOption, clickOption} = props;
    const val = selectedOption ? valueOfOption(selectedOption) : selectedOption;
    const isCurrent = valueOfOption(option) === val;

    return (
        <li onClick={() => clickOption(option)} className="cursor-pointer flex px-[4px] group" data-focusable="true">
            <div
                className={`flex rounded-[4px] bg-white text-inherit items-center pt-[2px] px-[10px] pb-0 min-h-[28px] ${
                    !isCurrent
                        ? 'group-hover:bg-gray-300 group-hover:bg-opacity-30 active:bg-gray-200'
                        : '!bg-opacity-0'
                }`}
            >
                <ValueComponent value={option} />
                <div className="ml-auto">{isCurrent && <FcCheckmark />}</div>
            </div>
        </li>
    );
};
OptionItem.displayName = 'OptionItem';
