import {MenuContainer, MenuItem, MenuList} from '../MenuDropdown';
import {useEffect, useState} from 'react';
import {ArrowDown, ArrowDownUp, ArrowUp, MoveDown, MoveUp} from 'lucide-react';

interface SortMenuProps {
    isVisible: boolean;
    onMouseEnter: () => void;
    onSort: (direct: 'ASC' | 'DESC') => any;
}

export const SortMenu = (props: SortMenuProps) => {
    const {isVisible, onMouseEnter, onSort} = props;
    const [visibleIndex, setVisibleIndex] = useState(-1);

    useEffect(() => {
        setVisibleIndex(-1);
    }, [isVisible]);

    return (
        <MenuItem
            isVisible={isVisible}
            onMouseEnter={onMouseEnter}
            render={(p) => (
                <MenuContainer {...p}>
                    <MenuList>
                        <MenuItem
                            isVisible={visibleIndex === 0}
                            onMouseEnter={() => setVisibleIndex(0)}
                            onClick={() => onSort('ASC')}
                        >
                            <div>
                                <ArrowUp fontSize={16} />
                            </div>
                            <div>오름차순</div>
                        </MenuItem>

                        <MenuItem
                            isVisible={visibleIndex === 1}
                            onMouseEnter={() => setVisibleIndex(1)}
                            onClick={() => onSort('DESC')}
                        >
                            <div>
                                <ArrowDown fontSize={16} />
                            </div>
                            <div>내림차순</div>
                        </MenuItem>
                    </MenuList>
                </MenuContainer>
            )}
        >
            <div>
                <ArrowDownUp fontSize={16} />
            </div>
            <div>정렬</div>
        </MenuItem>
    );
};
