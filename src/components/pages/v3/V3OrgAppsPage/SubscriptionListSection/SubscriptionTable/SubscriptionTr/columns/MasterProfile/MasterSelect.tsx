import React, {memo} from 'react';
import {SubscriptionDto} from '^models/Subscription/types';
import {SelectColumn} from '^v3/share/table/columns/SelectColumn';
import {TeamMemberDto, useTeamMembers} from '^models/TeamMember';
import {subscriptionApi} from '^models/Subscription/api';
import {useToast} from '^hooks/useToast';
import {TeamMemberProfileOption} from '^models/TeamMember/components/TeamMemberProfile';
import {TagUI} from '^v3/share/table/columns/share/TagUI';

interface MasterSelectProps {
    subscription: SubscriptionDto;
    onChange: (teamMember?: TeamMemberDto) => any;
}

export const MasterSelect = memo((props: MasterSelectProps) => {
    const {toast} = useToast();
    const {search} = useTeamMembers();
    const {subscription, onChange} = props;

    const getOptions = async (keyword?: string) => {
        return search(
            {
                keyword,
                where: {organizationId: subscription.organizationId},
                itemsPerPage: 0,
            },
            false,
            true,
        ).then((res) => res?.items || []);
    };

    const onSelect = async (teamMember: TeamMemberDto) => {
        if (teamMember.id === subscription.master?.id) return;

        return subscriptionApi
            .update(subscription.id, {masterId: teamMember.id})
            .then(() => onChange(teamMember))
            .finally(() => toast.success('변경사항을 저장했어요.'));
    };

    const optionDetach = async () => {
        return subscriptionApi
            .update(subscription.id, {masterId: null})
            .then(() => onChange())
            .finally(() => toast.success('연결을 해제했어요.'));
    };

    return (
        <div className="w-40 overflow-x-hidden">
            <SelectColumn
                value={subscription.master}
                getOptions={getOptions}
                ValueComponent={MasterProfile}
                valueOfOption={(member) => member.id}
                textOfOption={(member) => member.name}
                keywordFilter={(member, keyword) => member.name.includes(keyword)}
                onSelect={onSelect}
                inputDisplay
                inputPlainText
                optionWrapperClass="!py-1.5"
                optionListBoxTitle="담당자를 변경할까요?"
                optionDetach={optionDetach}
                detachableOptionBoxTitle="연결된 담당자"
                EmptyComponent={() => <TagUI className="text-gray-300 w-40 !justify-start">비어있음</TagUI>}
            />
        </div>
    );
});
MasterSelect.displayName = 'MasterSelect';

const MasterProfile = memo((props: {value: TeamMemberDto | string}) => {
    const {value} = props;

    if (typeof value === 'string') {
        return <p>{value}</p>;
    }

    // return <MasterProfileOption member={value} />;
    return <TeamMemberProfileOption item={value} placeholder="관리자 없음" />;
});
