import {memo} from 'react';
import {MembershipDto} from '^models/Membership/types';
import {Dropdown} from '^v3/share/Dropdown';
import {IoIosMore} from 'react-icons/io';
import {eventCut} from '^utils/event';
import {RemoveMembershipButton} from './RemoveMembershipButton';
import {ResendInvitationButton} from './ResendInvitationButton';

interface MembershipMoreDropdownProps {
    membership: MembershipDto;
    reload?: () => any;
}

export const MembershipMoreDropdown = memo((props: MembershipMoreDropdownProps) => {
    const {membership, reload} = props;

    return (
        <Dropdown
            offset={[0, -3]}
            Trigger={() => {
                return (
                    <button className="btn btn-sm btn-square !bg-transparent !border-transparent text-gray-400 hover:text-black">
                        <IoIosMore fontSize={20} />
                    </button>
                );
            }}
            Content={() => {
                return (
                    <div
                        className="dropdown-content p-0 menu shadow-lg bg-base-100 rounded-btn border border-gray-200 min-w-[8rem]"
                        onClick={eventCut}
                    >
                        {/* 초대 재전송 버튼 */}
                        {!membership.userId && <ResendInvitationButton membership={membership} reload={reload} />}

                        <RemoveMembershipButton membership={membership} reload={reload} />
                    </div>
                );
            }}
        />
    );
});
MembershipMoreDropdown.displayName = 'MembershipMoreDropdown';
