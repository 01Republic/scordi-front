import {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {CardPanel} from '../CardPanel';
import {AdminInfoListItem, AdminInfoListItemProps} from './ListItem';

interface AdminInfoPanelProps extends WithChildren {
    title?: string;
    items: AdminInfoListItemProps[];
}

export const AdminInfoPanel = memo((props: AdminInfoPanelProps) => {
    const {title, items, children} = props;

    return (
        <CardPanel className="mb-10" title={title}>
            <ul className={title ? `border-t` : ''}>
                {items.map((item, i) => (
                    <AdminInfoListItem
                        key={i}
                        label={item.label}
                        value={item.value}
                        borderBottom={i + 1 < items.length}
                    />
                ))}
            </ul>
        </CardPanel>
    );
});
