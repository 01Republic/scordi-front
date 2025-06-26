import {memo} from 'react';
import {CardTableTR} from '^admin/share';
import {OrganizationConnectStatusDto} from '^models/Organization/type';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {WithChildren} from '^types/global.type';
import {AdminOrgPageRoute} from '^pages/admin/orgs/[id]';
import {LinkTo} from '^components/util/LinkTo';
import {FolderOpen} from 'lucide-react';

interface OrgItemForConnectStatusProps {
    org: OrganizationConnectStatusDto;
}

export const OrgItemForConnectStatus = memo((props: OrgItemForConnectStatusProps) => {
    const {org} = props;

    return (
        <CardTableTR gridClass="grid-cols-10" className="!gap-0 !p-0 !items-stretch group">
            {/* 조직명 */}
            <Cell className="col-span-2 flex items-center justify-between pl-4">
                <div className="flex gap-2 items-center">
                    <div>
                        <TagUI className="bg-gray-200">{org.id}</TagUI>
                    </div>
                    <div>{org.name}</div>
                </div>

                <div className="hidden group-hover:flex">
                    <LinkTo href={AdminOrgPageRoute.path(org.id)} displayLoading={false}>
                        <TagUI className="bg-gray-200 btn-animation no-selectable gap-1 hover:bg-gray-300">
                            <FolderOpen size={10} />
                            <span className="text-10">열기</span>
                        </TagUI>
                    </LinkTo>
                </div>
            </Cell>

            {/* 워크스페이스연동_횟수 */}
            <Cell className="bg-blue-100 text-right col-span-2">{org.workspaceSyncHistoriesCount}</Cell>

            {/* 인보이스연동_계정수 */}
            <Cell className="bg-green-100 text-right">{org.invoiceAccountsCount}</Cell>

            {/* 카드사연동_여부 */}
            <Cell className="bg-yellow-100 text-center">
                <input type="checkbox" readOnly checked={org.isCodefCardsSigned} />
            </Cell>

            {/* 카드사수 */}
            <Cell className="bg-yellow-100 text-right">{org.codefAccountsCardsCount}</Cell>

            {/* 불러온_카드수 */}
            <Cell className="bg-yellow-100 text-right">{org.codefCardsCount}</Cell>

            {/* 연동된_카드수 */}
            <Cell className="bg-yellow-100 text-right">{org.creditCardsCount}</Cell>

            {/* 구독수 */}
            <Cell className="bg-red-100 text-right pr-4">{org.subscriptionsCount}</Cell>

            {/* actions */}
            {/*<Cell className="col-span-1"></Cell>*/}
        </CardTableTR>
    );
});
OrgItemForConnectStatus.displayName = 'OrgItemForConnectStatus';

const Cell = (
    props: {
        className?: string;
    } & WithChildren,
) => {
    const {className = '', children} = props;
    return <div className={`py-2 px-2 text-12 ${className}`}>{children}</div>;
};
