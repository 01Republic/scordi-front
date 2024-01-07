import {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {IoIosMore, IoMdMore} from 'react-icons/io';
import {Portal} from '^components/util/Partal';
import {useDropdown} from '^hooks/useDropdown';
import {MoreDropdownListItem} from '^v3/share/table/columns/SelectColumn/OptionItem/MoreDropdown/ListItem';
import {FaRegTrashAlt} from 'react-icons/fa';
import {FcCheckmark} from 'react-icons/fc';

interface MoreDropdownProps<T> extends WithChildren {
    isCurrent: boolean;
    option: T;
    destroyRequest?: (option: T) => false | Promise<boolean>;
}

export const MoreDropdown = <T,>(props: MoreDropdownProps<T>) => {
    const {visible, openDropdown, closeDropdown, styles, attributes, setTriggerRef, setContentRef, backdropRef} =
        useDropdown('bottom');
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
                    <div onClick={() => openDropdown()} ref={setTriggerRef}>
                        <button className="btn btn-xs btn-square !border-none hover:bg-gray-200">
                            <IoIosMore size={16} />
                        </button>
                    </div>

                    {visible && (
                        <Portal>
                            <div
                                ref={backdropRef}
                                className="dropdown-backdrop z-10 focus"
                                onClick={() => closeDropdown()}
                            />
                            <ul
                                ref={setContentRef}
                                style={styles.popper}
                                {...attributes.popper}
                                tabIndex={0}
                                className="dropdown-portal-content focus menu p-2 border shadow-lg bg-base-100 rounded-md w-40 z-10"
                            >
                                {destroyRequest && (
                                    <MoreDropdownListItem
                                        onClick={() => {
                                            return Promise.resolve(destroyRequest(option)).then((isSuccess) => {
                                                if (isSuccess) closeDropdown();
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
                        </Portal>
                    )}
                </div>
            </div>
        </>
    );
};
MoreDropdown.displayName = 'MoreDropdown';
