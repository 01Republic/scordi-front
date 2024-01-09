import {useRef, useState} from 'react';
import {WithChildren} from '^types/global.type';
import {IoIosMore} from 'react-icons/io';
import {MoreDropdownListItem} from './ListItem';
import {FaRegTrashAlt} from 'react-icons/fa';
import {FcCheckmark} from 'react-icons/fc';
import {DropdownContent} from '../../DropdownContent';

interface MoreDropdownProps<T> extends WithChildren {
    isCurrent: boolean;
    option: T;
    destroyRequest?: (option: T) => false | Promise<boolean>;
}

export const MoreDropdown = <T,>(props: MoreDropdownProps<T>) => {
    const triggerRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const show = () => setVisible(true);
    const hide = () => setVisible(false);
    const {isCurrent, option, destroyRequest, children} = props;

    return (
        <>
            <div className={visible ? 'hidden' : `group-hover:hidden`}>{isCurrent && <FcCheckmark />}</div>
            <div className={`${visible ? 'flex' : 'hidden group-hover:flex'}`}>
                <div
                    className="dropdown pt-1"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                >
                    <div onClick={show} ref={triggerRef}>
                        <button className="btn btn-xs btn-square !border-none hover:bg-gray-200">
                            <IoIosMore size={16} />
                        </button>
                    </div>
                </div>
            </div>

            <DropdownContent visible={visible} hide={hide} triggerRef={triggerRef}>
                <ul
                    tabIndex={0}
                    className="dropdown-portal-content focus menu p-2 border shadow-lg bg-base-100 rounded-md w-40 z-10"
                >
                    {destroyRequest && (
                        <MoreDropdownListItem
                            onClick={() => {
                                return Promise.resolve(destroyRequest(option)).then((isSuccess) => {
                                    if (isSuccess) hide();
                                    return isSuccess;
                                });
                            }}
                        >
                            <div className="flex items-center gap-3 w-full">
                                <FaRegTrashAlt />
                                <p>삭제</p>
                            </div>
                        </MoreDropdownListItem>
                    )}
                </ul>
            </DropdownContent>
        </>
    );
};
MoreDropdown.displayName = 'MoreDropdown';
