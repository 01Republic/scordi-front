import {MemoExoticComponent, useEffect, useRef, useState} from 'react';
import {useDropdown} from '^hooks/useDropdown';
import {FcCheckmark} from 'react-icons/fc';
import {Placement} from '@popperjs/core';
import {TagUI} from '^v3/share/table/columns/share/TagUI';

type Component<T> = (props: {value: T}) => JSX.Element;
type ValueComponent<T> = Component<T> | MemoExoticComponent<Component<T>>;

interface SelectColumnProps<T> {
    value: T;
    getOptions: (keyword?: string) => Promise<T[]>;
    onOptionClick: (option: T) => any;
    ValueComponent?: ValueComponent<T>;
    contentMinWidth?: string;
    optionListBoxTitle?: string;
    placement?: Placement;
}

export const SelectColumn = <T,>(props: SelectColumnProps<T>) => {
    const {setSelectEl, setReferenceEl, blur, styles, attributes} = useDropdown(props.placement || 'bottom-start');
    const [options, setOptions] = useState<T[]>([]);
    const {value, ValueComponent, getOptions, onOptionClick} = props;
    const {contentMinWidth = '300px', optionListBoxTitle = '옵션 선택 또는 생성'} = props;

    useEffect(() => {
        getOptions().then(setOptions);
    }, []);

    const optionClick = (option: T) => {
        onOptionClick(option);
        // blur();
    };

    const ValueUI = ValueComponent || ((p: {value: T}) => <TagUI>{`${p.value}`}</TagUI>);

    return (
        <div className="dropdown relative w-full">
            <div ref={setReferenceEl} tabIndex={0} className="cursor-pointer flex py-[6px] px-[8px]">
                <ValueUI value={value} />
            </div>
            <div
                ref={setSelectEl}
                style={styles.popper}
                {...attributes.popper}
                tabIndex={0}
                className={`dropdown-content w-full min-w-[${contentMinWidth}] !z-[1] border shadow-lg bg-base-100 rounded-[6px]`}
            >
                <div className="py-[6px]">
                    <div
                        className="flex px-[14px] mt-[6px] mb-[8px] text-[12px] font-[500] no-selectable leading-[120%]"
                        style={{
                            color: 'rgba(55, 53, 47, 0.65)',
                            fill: 'rgba(55, 53, 47, 0.45)',
                        }}
                    >
                        <div className="overflow-hidden whitespace-nowrap" style={{textOverflow: 'ellipsis'}}>
                            {optionListBoxTitle}
                        </div>
                    </div>
                    <ul className="menu py-0">
                        {options.map((option, i) => {
                            const isCurrent = option === value;
                            return (
                                <li
                                    key={i}
                                    onClick={() => optionClick(option)}
                                    className="cursor-pointer flex px-[4px] group"
                                >
                                    <div
                                        className={`flex rounded-[4px] items-center pt-[2px] px-[10px] pb-0 min-h-[28px] ${
                                            !isCurrent
                                                ? 'group-hover:bg-gray-300 group-hover:bg-opacity-30'
                                                : '!bg-opacity-0'
                                        }`}
                                    >
                                        <ValueUI key={i} value={option} />
                                        <div className="ml-auto">{isCurrent && <FcCheckmark />}</div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};
SelectColumn.displayName = 'SelectColumn';
