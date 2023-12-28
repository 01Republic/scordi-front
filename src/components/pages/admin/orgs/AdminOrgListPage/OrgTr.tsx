import {memo} from 'react';
import {CardTableTR} from '^admin/share';
import {OrganizationDto} from '^models/Organization/type';
import {AdminOrgPageRoute} from '^pages/admin/orgs/[id]';
import {LinkTo} from '^components/util/LinkTo';
import {Avatar} from '^components/Avatar';
import {MembershipLevel} from '^models/Membership/types';
import {yyyy_mm_dd_hh_mm} from '^utils/dateTime';

interface OrgTrProps {
    org: OrganizationDto;
}

export const OrgTr = memo((props: OrgTrProps) => {
    const {org} = props;

    const detailPagePath = AdminOrgPageRoute.path(org.id);

    const ownership = (org.memberships || []).find((membership) => membership.level === MembershipLevel.OWNER);
    const owner = ownership?.user;

    return (
        <CardTableTR gridClass="grid-cols-6">
            {/* 조직명 */}
            <div>
                <div className="flex gap-2 items-center">
                    {/*<Avatar src={org.image} className="w-[32px]" />*/}
                    <div className="text-left">
                        <p>
                            <span className="mr-1">{org.name}</span>
                            <span className="text-xs text-gray-500">(#{org.id})</span>
                        </p>
                        <p className="text-xs text-gray-500">
                            {/*<span className="mr-1">{user.email}</span>*/}
                            {/*<span>/ {user.phone || '전화번호가 입력되지 않음'}</span>*/}
                        </p>
                    </div>
                </div>
            </div>

            {/*소유자*/}
            <div>
                {owner && (
                    <div className="flex gap-2 items-center">
                        <Avatar src={owner.profileImgUrl} className="w-[32px]" />
                        <div className="text-left">
                            <p>
                                <span className="mr-1">{owner.name}</span>
                                <span className="text-xs text-gray-500">(#{owner.id})</span>
                            </p>
                            <p className="text-xs text-gray-500">
                                <span className="mr-1">{owner.email}</span>
                                <span>/ {owner.phone || '전화번호가 입력되지 않음'}</span>
                            </p>
                        </div>
                    </div>
                )}
            </div>
            {/*워크스페이스 연동*/}
            <div className="text-right">
                <input type="checkbox" readOnly={true} className="checkbox" checked={!!org.lastGoogleSyncHistoryId} />
            </div>
            {/*인보이스 계정 연동*/}
            <div className="text-right"></div>
            {/*/!*멤버 수*!/*/}
            {/*<div className="text-center">*/}
            {/*    <p>{org.memberCount.toLocaleString()}명</p>*/}
            {/*</div>*/}
            {/*생성일시*/}
            <div className="text-right">
                <p>{yyyy_mm_dd_hh_mm(org.createdAt)}</p>
            </div>
            <div className="text-right">
                <LinkTo text="상세" href={detailPagePath} className="btn btn-sm btn-info" />
            </div>
        </CardTableTR>
    );
});
OrgTr.displayName = 'OrgTr';
