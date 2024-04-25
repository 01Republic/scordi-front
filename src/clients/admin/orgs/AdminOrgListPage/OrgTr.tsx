import {memo} from 'react';
import {CardTableTR} from '^admin/share';
import {OrganizationDto} from '^models/Organization/type';
import {AdminOrgPageRoute} from '^pages/admin/orgs/[id]';
import {LinkTo} from '^components/util/LinkTo';
import {Avatar} from '^components/Avatar';
import {MembershipLevel} from '^models/Membership/types';
import {yyyy_mm_dd_hh_mm} from '^utils/dateTime';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {FaRegFolderOpen} from 'react-icons/fa';

interface OrgTrProps {
    org: OrganizationDto;
}

export const OrgTr = memo((props: OrgTrProps) => {
    const {org} = props;

    const detailPagePath = AdminOrgPageRoute.path(org.id);

    const allMemberships = org.memberships || [];
    const exceptAdminMemberships = allMemberships.filter((membership) => membership.level !== MembershipLevel.ADMIN);
    const ownerships = exceptAdminMemberships.filter((membership) => membership.level === MembershipLevel.OWNER);
    const memberships = exceptAdminMemberships.filter((membership) => membership.level === MembershipLevel.MEMBER);
    const [ownership, ...otherOwners] = ownerships;
    const owner = ownership?.user;
    const users = exceptAdminMemberships.map((membership) => membership.user);

    return (
        <CardTableTR gridClass="grid-cols-8 group text-12">
            {/* 조직명 */}
            <div className="col-span-2 flex items-center justify-between">
                <div className="flex gap-2 items-center">
                    <div>
                        <TagUI className="bg-gray-200">{org.id}</TagUI>
                    </div>
                    <div>{org.name}</div>
                </div>

                <div className="hidden group-hover:flex">
                    <LinkTo href={AdminOrgPageRoute.path(org.id)} displayLoading={false}>
                        <TagUI className="bg-gray-200 btn-animation no-selectable gap-1 hover:bg-gray-300">
                            <FaRegFolderOpen size={10} />
                            <span className="text-10">열기</span>
                        </TagUI>
                    </LinkTo>
                </div>

                {/*<div className="flex gap-2 items-center">*/}
                {/*    /!*<Avatar src={org.image} className="w-[32px]" />*!/*/}
                {/*    <div className="text-left">*/}
                {/*        <p>*/}
                {/*            <span className="mr-1">{org.name}</span>*/}
                {/*            <span className="text-xs text-gray-500">(#{org.id})</span>*/}
                {/*        </p>*/}
                {/*        <p className="text-xs text-gray-500">*/}
                {/*            /!*<span className="mr-1">{user.email}</span>*!/*/}
                {/*            /!*<span>/ {user.phone || '전화번호가 입력되지 않음'}</span>*!/*/}
                {/*        </p>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>

            {/*생성일시*/}
            <div className="">{yyyy_mm_dd_hh_mm(org.createdAt)}</div>

            {/*멤버십 수*/}
            <div className="col-span-2 text-center">
                <span>{exceptAdminMemberships.length.toLocaleString()}명</span>
                <small>
                    ({ownerships.length.toLocaleString()}명/
                    {memberships.length.toLocaleString()}명)
                </small>
            </div>

            {/*회원 수*/}
            <div className="text-center">{users.length.toLocaleString()}명</div>

            {/*소유자*/}
            <div className="col-span-2 flex items-center gap-4 justify-between">
                {owner && (
                    <div className="flex gap-2 items-center">
                        <Avatar src={owner.profileImgUrl} className="w-[32px]" />
                        <div className="text-left">
                            <div className="flex gap-2 items-center">
                                <div>
                                    <TagUI className="bg-gray-200">{owner.id}</TagUI>
                                </div>
                                <div className="font-semibold">{owner.name}</div>
                            </div>
                            <p
                                className="text-xs text-gray-500 tooltip tooltip-success"
                                data-tip={owner.phone || '전화번호가 입력되지 않음'}
                            >
                                <span className="mr-1">{owner.email}</span>
                            </p>
                        </div>
                    </div>
                )}

                {otherOwners.length > 0 && (
                    <div
                        className="tooltip tooltip-left tooltip-warning cursor-pointer"
                        data-tip={otherOwners
                            .map((ownership) => {
                                return `${ownership.user.name} (${ownership.user.email})`;
                            })
                            .join(' / ')}
                    >
                        외 {otherOwners.length.toLocaleString()} 명
                    </div>
                )}
            </div>
        </CardTableTR>
    );
});
OrgTr.displayName = 'OrgTr';
