import {memo, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {adminUserDetail} from '../index';
import {MembershipDto} from '^types/membership.type';
import {CardPanel} from '^components/pages/admin/share/panels/CardPanel';
import {MembershipItem, MembershipLi} from './MembershipItem';

export const MembershipListTabContent = memo(() => {
    const user = useRecoilValue(adminUserDetail);
    const [memberships, setMemberships] = useState<MembershipDto[]>([]);

    useEffect(() => {
        if (!user) return;

        console.log(user);
        setMemberships(user.memberships || []);
    }, [user]);

    if (!user) return <></>;

    return (
        <div className="w-full">
            <h2 className="mb-6">
                {memberships.length}
                <small>개의 조직에 소속되어 있습니다.</small>
            </h2>
            <CardPanel>
                <ul className="overflow-x-auto">
                    <MembershipLi
                        gridClass="grid-cols-7"
                        className="font-semibold border-b bg-gray-300 rounded-tl-box rounded-tr-box"
                    >
                        <div>조직</div>
                        <div>조직내 권한</div>
                        <div>조직 가입 승인상태</div>
                        <div>조직 링크</div>
                        <div>가입일시</div>
                    </MembershipLi>
                    {memberships.map((membership, i) => (
                        <MembershipItem membership={membership} key={i} borderBottom={i + 1 < memberships.length} />
                    ))}
                </ul>
            </CardPanel>
        </div>
    );
});
