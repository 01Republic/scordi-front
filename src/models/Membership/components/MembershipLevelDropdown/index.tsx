import {memo} from 'react';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {Dropdown} from '^v3/share/Dropdown';
import {eventCut} from '^utils/event';
import {membershipApi} from '../../api';
import {MembershipDto, MembershipLevel} from '../../types';
import {MembershipLevelButton} from './MembershipLevelButton';
import {MembershipLevelItem} from './MembershipLevelItem';

interface MembershipLevelDropdownProps {
    membership: MembershipDto;
    reload?: () => any;
    levelOptions?: MembershipLevel[];
}

export const MembershipLevelDropdown = memo((props: MembershipLevelDropdownProps) => {
    const {membership, reload, levelOptions = [MembershipLevel.MEMBER, MembershipLevel.OWNER]} = props;

    const onChange = (level: MembershipLevel) => {
        return membershipApi
            .update(membership.id, {level})
            .then(() => toast.success('권한을 변경했어요'))
            .then(() => reload && reload())
            .catch(errorToast);
    };

    return (
        <div onClick={eventCut}>
            <Dropdown
                disabled={!membership.userId}
                offset={[0, 3]}
                Trigger={() => <MembershipLevelButton membership={membership} />}
                Content={() => {
                    return (
                        <div
                            className="dropdown-content p-0 menu shadow-lg bg-base-100 rounded-btn border border-gray-200 min-w-[5rem]"
                            onClick={eventCut}
                        >
                            {levelOptions.map((level, i) => (
                                <MembershipLevelItem
                                    key={i}
                                    level={level}
                                    onClick={() => onChange(level)}
                                    isCurrent={membership.level === level}
                                />
                            ))}
                        </div>
                    );
                }}
            />
        </div>
    );
});
MembershipLevelDropdown.displayName = 'MembershipLevelDropdown';
