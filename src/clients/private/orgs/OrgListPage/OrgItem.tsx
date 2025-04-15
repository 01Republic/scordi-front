import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {ChevronRight} from 'lucide-react';
import {formatRelative, formatDistance} from 'date-fns';
import {ko} from 'date-fns/locale';
import {MembershipDto, t_membershipLevel} from '^models/Membership/types';
import {LinkTo} from '^components/util/LinkTo';
import {OrgMainPageRoute} from '^pages/orgs/[id]';
import {orgListAltModeAtom} from './atom';

interface OrgItemProps {
    membership: MembershipDto;
}

export const OrgItem = memo((props: OrgItemProps) => {
    const {membership} = props;
    const isAltMode = useRecoilValue(orgListAltModeAtom);
    const orgId = membership.organizationId;
    const org = membership.organization;

    return (
        <LinkTo
            href={OrgMainPageRoute.path(orgId)}
            className="btn btn-lg btn-block border-gray-300 text-gray-700 bg-white hover:bg-slate-50 hover:text-gray-800 capitalize text-16 font-medium btn-animation"
            displayLoading={false}
        >
            <div className="flex flex-col items-start">
                <div>{membership.organization.name}</div>
                {isAltMode && (
                    <div className="flex items-center gap-2 text-gray-400 text-12">
                        {/*<div>{org.createdAt.toISOString()}</div>*/}
                        {/*<div>{new Date().toISOString()}</div>*/}
                        <div>{formatRelative(org.createdAt, new Date(), {locale: ko})} 에 생성됨</div>
                        <div>&middot;</div>
                        <div>{t_membershipLevel(membership.level)}</div>
                    </div>
                )}
            </div>
            <div className="ml-auto">
                <ChevronRight />
            </div>
        </LinkTo>
    );
});
OrgItem.displayName = 'OrgItem';
