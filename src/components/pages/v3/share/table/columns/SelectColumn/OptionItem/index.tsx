import {ValueComponent} from '../type';
import {MoreDropdown} from './MoreDropdown';
import {Check} from 'lucide-react';

interface OptionItemProps<T> {
    option: T;
    selectedOption?: T;
    clickOption: (option: T) => Promise<void>;
    ValueComponent: ValueComponent<T>;
    valueOfOption: (option: T) => any;
    className?: string;
    destroyRequest?: (option: T) => false | Promise<boolean>;
}

export const OptionItem = <T,>(props: OptionItemProps<T>) => {
    const {option, selectedOption, ValueComponent, valueOfOption, clickOption, className = '', destroyRequest} = props;
    const val = selectedOption ? valueOfOption(selectedOption) : selectedOption;
    const isCurrent = valueOfOption(option) === val;

    return (
        <li onClick={() => clickOption(option)} className={`cursor-pointer flex px-[4px] group`} data-focusable="true">
            <div
                className={`flex rounded-[4px] bg-white text-inherit items-center pt-[1px] px-[10px] pb-[1px] min-h-[28px] ${className} ${
                    !isCurrent
                        ? 'group-hover:bg-gray-300 group-hover:bg-opacity-30 active:bg-gray-200'
                        : '!bg-opacity-0'
                }`}
            >
                <ValueComponent value={option} />

                {destroyRequest ? (
                    <div className="ml-auto">
                        <MoreDropdown
                            className="flex"
                            isCurrent={isCurrent}
                            option={option}
                            destroyRequest={destroyRequest}
                        />
                    </div>
                ) : (
                    <div className="ml-auto">{isCurrent && <Check />}</div>
                )}
            </div>
        </li>
    );
};
OptionItem.displayName = 'OptionItem';
