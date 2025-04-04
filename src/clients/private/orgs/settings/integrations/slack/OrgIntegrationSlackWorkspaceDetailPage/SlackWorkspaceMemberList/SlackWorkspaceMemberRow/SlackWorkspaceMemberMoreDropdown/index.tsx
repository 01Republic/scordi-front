import {memo} from 'react';
import {Ellipsis} from 'lucide-react';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';
import {IntegrationSlackMemberDto} from '^models/integration/IntegrationSlackMember/type/IntegrationSlackMember.dto';

interface SlackWorkspaceMemberMoreDropdownProps {
    item: IntegrationSlackMemberDto;
}

export const SlackWorkspaceMemberMoreDropdown = memo((props: SlackWorkspaceMemberMoreDropdownProps) => {
    const {item} = props;

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
                <li>
                    <MoreDropdown.ItemButton
                        text="삭제"
                        onClick={() => console.log(item)}
                        className="text-red-500 hover:bg-red-50"
                    />
                </li>
            </MoreDropdown.Content>
        </MoreDropdown>
    );
});
SlackWorkspaceMemberMoreDropdown.displayName = 'SlackWorkspaceMemberMoreDropdown';
