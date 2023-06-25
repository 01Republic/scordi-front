import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {adminUserDetail} from '../index';
import {CardTable, CardTablePanel, CardTableTH} from '../../../share/panels/CardTablePanel';
import {MembershipItem} from './MembershipItem';

export const MembershipListTabContent = memo(() => {
    const user = useRecoilValue(adminUserDetail);

    if (!user) return <></>;

    const memberships = user.memberships || [];

    return (
        <div className="w-full">
            <h2 className="mb-6">
                {memberships.length}
                <small>개의 조직에 소속되어 있습니다.</small>
            </h2>

            <CardTablePanel
                gridClass="grid-cols-7"
                entries={memberships}
                ths={['조직', '조직내 권한', '조직 가입 승인상태', '조직 링크', '가입일시']}
                entryComponent={(membership, i, arr) => (
                    <MembershipItem membership={membership} key={i} borderBottom={i + 1 < arr.length} />
                )}
            />
        </div>
    );
});
