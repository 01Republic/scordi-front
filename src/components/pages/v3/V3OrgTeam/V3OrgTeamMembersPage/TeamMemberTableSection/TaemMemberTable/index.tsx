import {memo} from 'react';
import {TeamMemberDto, useTeamMembersInTeamMembersTable} from '^models/TeamMember';
import {TeamMemberTableRow} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/TeamMemberTableSection/TaemMemberTable/TeamMemberTableRow';
import Qs from 'qs';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {SortableTH} from '^v3/share/table/columns/share/SortableTH';
import {Table} from '^v3/share/table/Table';
import {TBody} from '^v3/share/table/TBody';

export const TeamMemberTable = memo(() => {
    const {isLoading, result, query, search, reload} = useTeamMembersInTeamMembersTable();
    const teamMembers = result.items;

    const onSort = (sortKey: string, value: 'ASC' | 'DESC') => {
        if (!query || !search) return;

        const newOrder = Qs.parse(`${sortKey}=${value}`);
        const searchQuery: FindAllQueryDto<TeamMemberDto> = {...query, page: 1};

        searchQuery.order = newOrder;
        search(searchQuery);
    };

    return (
        <div className="card bg-white shadow">
            <div className="overflow-x-auto w-full">
                <Table isLoading={isLoading}>
                    <thead>
                        <tr>
                            <SortableTH sortKey="[name]" onClick={onSort}>
                                멤버
                            </SortableTH>

                            {/* 이용 앱 수 */}
                            <SortableTH sortKey="[subscriptionCount]" onClick={onSort}>
                                이용 앱 수
                            </SortableTH>
                            {/* 팀 */}
                            <SortableTH sortKey="[teams][id]" onClick={onSort} className="pl-3">
                                팀
                            </SortableTH>
                            {/* 권한 */}
                            <SortableTH sortKey="[membership][level]" onClick={onSort} className="justify-center">
                                권한
                            </SortableTH>
                            {/* 상태 */}
                            <SortableTH
                                sortKey="[membership][approvalStatus]"
                                onClick={onSort}
                                className="mr-12 justify-end"
                            >
                                상태
                            </SortableTH>
                        </tr>
                    </thead>

                    <TBody entries={teamMembers} cols={5} isLoading={isLoading}>
                        {teamMembers.map((teamMember, i) => (
                            <TeamMemberTableRow key={i} teamMember={teamMember} reload={reload} />
                        ))}
                    </TBody>
                </Table>
            </div>
        </div>
    );
});
