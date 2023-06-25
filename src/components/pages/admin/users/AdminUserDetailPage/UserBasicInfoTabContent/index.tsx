import {memo} from 'react';
import {Avatar} from '^components/Avatar';
import {AdminInfoPanel} from '../../../share/panels/AdminInfoPanel';
import {useRecoilValue} from 'recoil';
import {adminUserDetail} from '../index';

export const UserBasicInfoTabContent = memo(() => {
    const user = useRecoilValue(adminUserDetail);

    if (!user) return <></>;

    return (
        <div className="w-full">
            <AdminInfoPanel
                // title="세부 정보"
                items={[
                    {label: 'id', value: user.id},
                    {label: '회원명', value: user.name},
                    {label: '이메일', value: user.email},
                    {label: '전화번호', value: user.phone},
                    {label: '프로필이미지', value: <Avatar src={user.profileImgUrl} className="w-[32px]" />},
                    {label: '생성일시(가입일시)', value: new Date(user.createdAt).toLocaleString()},
                    {
                        label: '[약관] 서비스이용약관 동의 일시 (필수)',
                        value: new Date(user.serviceUsageTermAgreedAt).toLocaleString(),
                    },
                    {
                        label: '[약관] 개인정보이용약관 동의 일시 (필수)',
                        value: new Date(user.privacyPolicyTermAgreedAt).toLocaleString(),
                    },
                    {
                        label: '[약관] 마케팅/광고 수신 동의 일시 (선택)',
                        value: user.marketingTermAgreedAt ? new Date(user.marketingTermAgreedAt).toLocaleString() : '',
                    },
                    {
                        label: '이메일 알림 수신 여부',
                        value: <input type="checkbox" className="toggle" checked={user.isEmailNoticeAllowed} />,
                    },
                    {
                        label: '문자 알림 수신 여부',
                        value: <input type="checkbox" className="toggle" checked={user.isSMSNoticeAllowed} />,
                    },
                ]}
            />
        </div>
    );
});
