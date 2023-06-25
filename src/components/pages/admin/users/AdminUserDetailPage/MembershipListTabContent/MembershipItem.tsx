import {memo} from 'react';
import {MembershipDto} from '^types/membership.type';
import {WithChildren} from '^types/global.type';
import {V3OrgHomePageRoute} from '^pages/v3/orgs/[orgId]';
import {serviceHost} from '^config/environments';
import {Avatar} from '^components/Avatar';

interface MembershipLiProps extends WithChildren {
    gridClass?: string;
    className?: string;
}

export const MembershipLi = memo((props: MembershipLiProps) => {
    const {gridClass = 'grid-cols-5', className = '', children} = props;

    return (
        <li>
            <div className={`py-2 px-4 grid ${gridClass} gap-2 ${className}`}>{children}</div>
        </li>
    );
});

interface MembershipItemProps {
    membership: MembershipDto;
    borderBottom?: boolean;
}

export const MembershipItem = memo((props: MembershipItemProps) => {
    const {membership, borderBottom = true} = props;

    const org = membership.organization;
    const orgLink = `${serviceHost}${V3OrgHomePageRoute.path(org.id)}`;

    const copyLink = (link: string) => {
        window.navigator.clipboard.writeText(link).then(() => alert('복사되었습니다.'));
    };

    return (
        <MembershipLi
            gridClass="grid-cols-7"
            className={`text-sm items-center hover:bg-neutral ${borderBottom ? 'border-b' : ''}`}
        >
            <div>
                <div className="flex gap-2 items-center">
                    <Avatar src={org.image} className="w-[32px]" />
                    <p className="text-left whitespace-nowrap">
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
        </MembershipLi>
    );
});
