import {memo} from 'react';
import {OrganizationConnectStatusDto} from '^models/Organization/type';
import {OrgItemForConnectStatus} from '^admin/orgs/AdminOrgListPage/OrgItemForConnectStatus';
import {CardTablePanel} from '^admin/share';
import {WithChildren} from '^types/global.type';

interface OrgTablePanelForConnectStatusProps {
    entries: OrganizationConnectStatusDto[];
}

export const OrgTablePanelForConnectStatus = memo((props: OrgTablePanelForConnectStatusProps) => {
    const {entries} = props;

    return (
        <CardTablePanel
            gridClass="grid-cols-12"
            entries={entries}
            entryComponent={(org, i) => <OrgItemForConnectStatus org={org} key={i} />}
        >
            <Line className="text-12 rounded-tl-box rounded-tr-box">
                <Cell className="col-span-2 pl-4"></Cell>
                <Cell className="bg-blue-300 text-center col-span-2">구글 G-suite API</Cell>
                <Cell className="bg-green-300 text-center">Gmail API</Cell>
                <Cell className="bg-yellow-300 text-center col-span-4">코드에프 카드 연동</Cell>
                <Cell className="bg-red-300 text-center pr-4">결과</Cell>
                {/*<Cell className="!pr-0 col-span-1"></Cell>*/}
            </Line>
            <Line className="text-12">
                <Cell className="col-span-2 pl-4">조직명</Cell>
                <Cell className="bg-blue-200 text-center col-span-2">워크스페이스 연동횟수</Cell>
                <Cell className="bg-green-200 text-center">인보이스연동 계정수</Cell>
                <Cell className="bg-yellow-200 text-center">카드사연동 여부</Cell>
                <Cell className="bg-yellow-200 text-center">카드사수</Cell>
                <Cell className="bg-yellow-200 text-center">불러온 카드수</Cell>
                <Cell className="bg-yellow-200 text-center">연동된 카드수</Cell>
                <Cell className="bg-red-200 text-center pr-4">구독수</Cell>
                {/*<Cell className="!pr-0 col-span-1"></Cell>*/}
            </Line>
        </CardTablePanel>
    );
});
OrgTablePanelForConnectStatus.displayName = 'OrgTablePanelForConnectStatus';

const Line = (
    props: {
        className?: string;
    } & WithChildren,
) => {
    const {className = '', children} = props;
    return (
        <li>
            <div className={`px-0 grid grid-cols-10 items-center font-semibold border-b bg-gray-300 ${className}`}>
                {children}
            </div>
        </li>
    );
};

const Cell = (
    props: {
        className?: string;
    } & WithChildren,
) => {
    const {className = '', children} = props;
    return <div className={`py-2 px-1 ${className}`}>{children}</div>;
};
