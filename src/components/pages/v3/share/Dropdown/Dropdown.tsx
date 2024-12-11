import {Dispatch, memo, ReactNode, SetStateAction, useEffect, useRef, useState} from 'react';
import {ReactComponentLike} from 'prop-types';
import {Placement} from '@popperjs/core';
import {WithChildren} from '^types/global.type';
import {DropdownContent} from './DropdownContent';

type Combination<BaseType, AddSetType> =
    | (BaseType & Partial<Record<keyof AddSetType, never>>)
    | (BaseType & AddSetType);

// type DropdownControlProps = {
//     visible: boolean;
//     setVisible: Dispatch<SetStateAction<boolean>>;
//     show: () => any;
//     hide: () => any;
// };
// type DropdownProps = Combination<DropdownBasicProps, DropdownControlProps> & WithChildren;

export interface DropdownProps
    extends WithChildren<(props: {visible: boolean; show: () => any; hide: () => any}) => JSX.Element> {
    Trigger: (props: {visible: boolean}) => JSX.Element;
    Content?: (props: {visible: boolean; show: () => any; hide: () => any}) => JSX.Element;
    className?: string;
    placement?: Placement;
    backdrop?: boolean; // default: true
    allowScroll?: boolean; // default: false
    interactiveBorder?: number; // default: 30
    offset?: [number, number]; // default: undefined
    onOpen?: () => any;
    onClose?: () => any;
    disabled?: boolean;
}

export const Dropdown = memo((props: DropdownProps) => {
    const triggerRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const show = () => setVisible(true);
    const hide = () => setVisible(false);
    const {Trigger, Content, className = '', placement = 'bottom-end', children} = props;
    const {disabled = false, backdrop = true, allowScroll = false, interactiveBorder = 30, offset} = props;
    const {onOpen, onClose} = props;

    const openDropdown = () => {
        if (disabled) return;
        show();
        onOpen && onOpen();
    };

    const closeDropdown = () => {
        hide();
        onClose && onClose();
    };

    return (
        <div
            className={`dropdown ${className}`}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
        >
            <div onClick={openDropdown} ref={triggerRef}>
                <Trigger visible={visible} />
            </div>

            <DropdownContent
                visible={visible}
                hide={closeDropdown}
                triggerRef={triggerRef}
                backdrop={backdrop}
                allowScroll={allowScroll}
                placement={placement}
                interactiveBorder={interactiveBorder}
                offset={offset}
            >
                {Content ? (
                    <Content visible={visible} show={openDropdown} hide={closeDropdown} />
                ) : typeof children === 'function' ? (
                    children({visible, show: openDropdown, hide: closeDropdown})
                ) : (
                    children
                )}
            </DropdownContent>
        </div>
    );
});
Dropdown.displayName = 'Dropdown';
