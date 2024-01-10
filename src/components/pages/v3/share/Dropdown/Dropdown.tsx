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

interface DropdownProps extends WithChildren {
    Trigger: (props: {visible: boolean}) => JSX.Element;
    className?: string;
    placement?: Placement;
    onOpen?: () => any;
    onClose?: () => any;
}

export const Dropdown = memo((props: DropdownProps) => {
    const triggerRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const show = () => setVisible(true);
    const hide = () => setVisible(false);
    const {Trigger, className = '', placement = 'bottom-end', children} = props;
    const {onOpen, onClose} = props;

    return (
        <div
            className={`dropdown ${className}`}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
        >
            <div onClick={show} ref={triggerRef}>
                <Trigger visible={visible} />
            </div>

            <DropdownContent
                visible={visible}
                hide={hide}
                triggerRef={triggerRef}
                backdrop={true}
                placement={placement}
            >
                {children}
            </DropdownContent>
        </div>
    );
});
Dropdown.displayName = 'Dropdown';
