import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {Avatar} from '^components/Avatar';
import {CardTablePanel} from '../../../share/panels/CardTablePanel';
import {adminUserDetail} from '../../AdminUserDetailPage';

/**
 * TODO: [어드민/회원상세p/소셜계정연동정보] 소셜계정 목록을 user 에서 뽑지말고 api 로 index 호출해야 합니다.
 */
export const SocialAccountListTabContent = memo(() => {
    const user = useRecoilValue(adminUserDetail);

    if (!user) return <></>;

    const socialAccounts = user.socialAccounts || [];

    return (
        <div className="w-full">
            <h2 className="mb-6">
                {socialAccounts.length}
                <small>개의 소셜 계정이 연동되어있습니다.</small>
            </h2>

            <CardTablePanel
                gridClass="grid-cols-7"
                entries={socialAccounts}
                columns={[
                    {th: '아이디', render: (account) => account.id},
                    {th: '소셜로그인공급자', render: (account) => account.provider},
                    {th: '이메일', render: (account) => account.email},
                    {th: '이름', render: (account) => account.name},
                    {
                        th: '프로필이미지',
                        render: (account) => <Avatar src={account.profileImageUrl || undefined} className="w-[32px]" />,
                    },
                    {
                        th: '생성일시',
                        render: (account) => (
                            <div className="whitespace-nowrap">{new Date(account.createdAt).toLocaleString()}</div>
                        ),
                    },
                ]}
            />
        </div>
    );
});
