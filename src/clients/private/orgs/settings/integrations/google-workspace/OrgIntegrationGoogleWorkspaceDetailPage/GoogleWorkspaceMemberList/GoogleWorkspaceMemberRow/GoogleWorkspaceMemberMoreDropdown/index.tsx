import {memo} from 'react';
import {Ellipsis} from 'lucide-react';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';
import {IntegrationGoogleWorkspaceMemberDto} from '^models/integration/IntegrationGoogleWorkspaceMember/type/IntegrationGoogleWorkspaceMember.dto';
import {MoreDropdownRemoveItem} from './MoreDropdownRemoveItem';

interface GoogleWorkspaceMemberMoreDropdownProps {
    item: IntegrationGoogleWorkspaceMemberDto;
    reload?: () => any;
}

export const GoogleWorkspaceMemberMoreDropdown = memo((props: GoogleWorkspaceMemberMoreDropdownProps) => {
    const {item, reload} = props;

    return (
        <MoreDropdown
            Trigger={() => (
                <div className="px-2 py-2 cursor-pointer opacity-50 hover:opacity-100 transition-all rounded-lg bg-transparent btn-animation">
                    <Ellipsis />
                </div>
            )}
            offset={[0, 0]}
        >
            <MoreDropdown.Content className="!py-0">
                <MoreDropdownRemoveItem item={item} reload={reload} />
            </MoreDropdown.Content>
        </MoreDropdown>
    );
});
GoogleWorkspaceMemberMoreDropdown.displayName = 'GoogleWorkspaceMemberMoreDropdown';
