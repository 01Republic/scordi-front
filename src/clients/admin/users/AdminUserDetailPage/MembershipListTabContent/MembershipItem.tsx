import {memo} from 'react';
import {MembershipDto} from 'src/models/Membership/types';
import {V3OrgHomePageRoute} from '^pages/v3/orgs/[orgId]';
import {OrgMainPageRoute} from '^pages/orgs/[id]';
import {serviceHost} from '^config/environments';
import {Avatar} from '^components/Avatar';
import {CardTableTR} from '../../../share/panels/CardTablePanel';

interface MembershipItemProps {
    membership: MembershipDto;
    borderBottom?: boolean;
}

export const MembershipItem = memo((props: MembershipItemProps) => {
    const {membership, borderBottom = true} = props;

    const org = membership.organization;
    const orgLink = `${serviceHost}${OrgMainPageRoute.path(org.id)}`;

    const copyLink = (link: string) => {
        window.navigator.clipboard.writeText(link).then(() => alert('복사되었습니다.'));
    };

    return (
        <CardTableTR gridClass="grid-cols-6" borderBottom={borderBottom}>
            <div className="">
                <div className="flex gap-2 items-center">
                    <Avatar src={org.image} className="w-[32px]" />
                    <p className="text-left whitespace-nowrap overflow-hidden hover:overflow-visible hover:bg-neutral hover:pr-3 z-[1]">
                        <span className="text-xs text-gray-500 mr-1">(#{org.id})</span>
                        <span className="">{org.name}</span>
                    </p>
                </div>
            </div>
            <div>{membership.level}</div>
            <div>{membership.approvalStatus}</div>
            <div>
                <button className="btn btn-xs btn-scordi" onClick={() => copyLink(orgLink)}>
                    Copy
                </button>
            </div>
            <div>
                <span className="whitespace-nowrap">{new Date(membership.createdAt).toLocaleString()}</span>
            </div>
            <div></div>
        </CardTableTR>
    );
});
