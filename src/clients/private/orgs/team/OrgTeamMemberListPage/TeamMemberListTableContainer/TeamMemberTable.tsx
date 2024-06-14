import {memo} from 'react';
import {TeamMemberDto, useTeamMembersInTeamMembersTable} from '^models/TeamMember';
import Qs from 'qs';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {Table} from '^v3/share/table/Table';
import {TBody} from '^v3/share/table/TBody';
import {SortableTH} from '^v3/share/table/columns/share/SortableTH';
import {TeamMemberTableRow} from './TeamMemberTableRow';

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
        <div className="card bg-white border rounded-md">
            <div className="overflow-x-auto w-full">
                <Table isLoading={isLoading}>
                    <thead>
                        <tr>
                            <SortableTH sortKey="[name]" onClick={onSort} className="!bg-slate-100 rounded-tl-md">
                                이름
                            </SortableTH>
                            {/* 팀 */}
                            <SortableTH sortKey="[teams][id]" onClick={onSort} className="!bg-slate-100">
                                팀
                            </SortableTH>

                            <th className="bg-slate-100">이메일</th>
                            <th className="bg-slate-100">전화번호</th>

                            {/* 이용 앱 수 */}
                            <SortableTH
                                sortKey="[subscriptionCount]"
                                sortVal="DESC"
                                onClick={onSort}
                                className="!bg-slate-100"
                            >
                                이용 앱 수
                            </SortableTH>

                            {/*/!* 권한 *!/*/}
                            {/*<th className="bg-slate-100" />*/}
                            {/*<SortableTH sortKey="[membership][level]" onClick={onSort} className="justify-center">*/}
                            {/*    권한*/}
                            {/*</SortableTH>*/}

                            {/* 상태 */}
                            <th className="bg-slate-100 rounded-tr-md" />
                            {/*<SortableTH*/}
                            {/*    sortKey="[membership][approvalStatus]"*/}
                            {/*    onClick={onSort}*/}
                            {/*    className="mr-10 justify-end !bg-slate-100"*/}
                            {/*>*/}
                            {/*    초대 상태*/}
                            {/*</SortableTH>*/}
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
TeamMemberTable.displayName = 'TeamMemberTable';
