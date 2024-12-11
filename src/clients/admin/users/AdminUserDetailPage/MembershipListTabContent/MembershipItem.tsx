import {memo} from 'react';
import {MembershipDto, MembershipLevel} from '^models/Membership/types';
import {MembershipLevelDropdown} from '^models/Membership/components';
import {OrgMainPageRoute} from '^pages/orgs/[id]';
import {serviceHost} from '^config/environments';
import {Avatar} from '^components/Avatar';
import {CardTableTR} from '^admin/share';
import {OpenButtonColumn} from '^clients/private/_components/table/OpenButton';
import {AdminOrgPageRoute} from '^pages/admin/orgs/[id]';
import {hh_mm, yyyy_mm_dd} from '^utils/dateTime';
import {membershipApi} from '^models/Membership/api';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';
import {copyText} from '^components/util/copy';

interface MembershipItemProps {
    membership: MembershipDto;
    borderBottom?: boolean;
    reload?: () => any;
}

export const MembershipItem = memo((props: MembershipItemProps) => {
    const {membership, borderBottom = true, reload} = props;

    const org = membership.organization;
    const orgLink = `${serviceHost}${OrgMainPageRoute.path(org.id)}`;
    const detailPath = AdminOrgPageRoute.path(membership.organizationId);

    const copyLink = (link: string) => copyText(link).then(() => alert('복사되었습니다.'));

    const remove = () => {
        if (!confirm('정말 삭제할까요?\n관리자 권한으로 삭제하므로 이 작업은 복구가 불가능합니다.')) return;
        membershipApi
            .destroy(membership.id)
            .then(() => toast.success('삭제했습니다.'))
            .then(() => reload && reload())
            .catch(errorToast);
    };

    return (
        <CardTableTR gridClass="grid-cols-7" borderBottom={borderBottom}>
            <div className="col-span-2">
                <OpenButtonColumn href={detailPath}>
                    <div className="flex gap-2 items-center">
                        <Avatar src={org.image} className="w-6" />
                        <p className="text-left whitespace-nowrap overflow-hidden hover:overflow-visible hover:bg-neutral hover:pr-3 z-[1]">
                            <span className="text-xs text-gray-500 mr-1">(#{org.id})</span>
                            <span className="">{org.name}</span>
                        </p>
                    </div>
                </OpenButtonColumn>
            </div>
            <div>
                <MembershipLevelDropdown
                    membership={membership}
                    reload={reload}
                    levelOptions={[MembershipLevel.MEMBER, MembershipLevel.OWNER, MembershipLevel.ADMIN]}
                />
            </div>
            <div>{membership.approvalStatus}</div>
            <div>
                <button className="btn btn-xs btn-scordi" onClick={() => copyLink(orgLink)}>
                    Copy
                </button>
            </div>
            <div>
                <div className="text-12 flex items-center gap-1.5">
                    <span>{yyyy_mm_dd(membership.createdAt, '. ')}</span>
                    <span>{hh_mm(membership.createdAt)}</span>
                </div>
            </div>

            <div>
                <MoreDropdown
                    Trigger={() => <button className="btn btn-sm btn-scordi no-animation btn-animation">더보기</button>}
                >
                    {({hide}) => (
                        <MoreDropdown.Content className="!py-0">
                            <li>
                                <MoreDropdown.ItemButton href={detailPath} className="hover:bg-scordi-50">
                                    보기
                                </MoreDropdown.ItemButton>
                            </li>
                            <li className="divider m-0" />
                            <li>
                                <MoreDropdown.ItemButton
                                    text="삭제"
                                    onClick={remove}
                                    className="text-red-500 hover:bg-red-50"
                                />
                            </li>
                        </MoreDropdown.Content>
                    )}
                </MoreDropdown>
            </div>
        </CardTableTR>
    );
});
