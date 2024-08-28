import {useCallback, useEffect} from 'react';
import {IoClose} from '@react-icons/all-files/io5/IoClose';
import {useRecoilState, useRecoilValue} from 'recoil';

import {MembershipLevel} from '^models/Membership/types';
import {currentOrgAtom} from '^models/Organization/atom';
import {UserDto, UserNotificationsStateDto} from '^models/User/types';

import {AnimatedModal} from '^components/modals/_shared/AnimatedModal';
import {UserAvatar} from '^models/User/components/UserAvatar';
import {userNotificationsStateAtom} from '^models/User/atom';

interface EditUserProfileModalProps {
    currentUser: UserDto;
    membershipLevel: MembershipLevel;
    isOpened: boolean;
    onClose: () => void;
}

/**
TODO
- [x] 스위치 기능 만들기
- [ ] 반응형 UI 수정
- [ ] 컴포넌트 리팩토링
- [ ] API 연동하기
 */

export const EditUserProfileModal = (props: EditUserProfileModalProps) => {
    const {currentUser, membershipLevel, isOpened, onClose} = props;
    const {profileImgUrl, name, email, phone} = currentUser;
    const {isEmailNoticeAllowed, isSMSNoticeAllowed, marketingTermAgreedAt} = currentUser;

    const currentOrg = useRecoilValue(currentOrgAtom);
    const [notifications, setNotifications] = useRecoilState<UserNotificationsStateDto>(userNotificationsStateAtom);

    /* 알림에 대한 동의 여부 스위치 기능 */
    const handleChangeSwitch = useCallback(
        (notification: string) => () => {
            setNotifications((prev) => ({
                ...prev,
                [notification]: !prev[notification],
            }));
            // TODO 프로필 수정 API 호출 후, recoil 변경
        },
        [setNotifications],
    );

    // TODO 초기값은 API에서 받은 데이터가 보여져야 함
    useEffect(() => {
        setNotifications({
            isEmailNoticeAllowed,
            isSMSNoticeAllowed,
            isAgreeForMarketingTerm: !!marketingTermAgreedAt,
        });
    }, [setNotifications]);

    console.log(isEmailNoticeAllowed, isSMSNoticeAllowed, marketingTermAgreedAt); // 삭제 예정 false false null
    console.log(profileImgUrl, name, email, phone, membershipLevel); // 삭제 예정

    if (!currentOrg) return <></>;

    return (
        <AnimatedModal open={isOpened} onClose={onClose}>
            <div className="w-[48rem] bg-white px-6 py-4 sm:px-12 sm:py-10 rounded-2xl flex flex-col gap-5 sm:gap-8">
                <div className="w-full flex justify-between items-center">
                    <h3 className="font-bold text-18">내 계정</h3>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-stroke-gray text-gray-500 hover:text-gray-900 transition-colors duration-200"
                    >
                        <IoClose size={26} />
                    </button>
                </div>

                <div className="w-full flex flex-col sm:flex-row gap-6 sm:gap-8">
                    <UserAvatar src={profileImgUrl} className="w-20 h-20 sm:w-24 sm:h-24" alt="프로필 이미지" />
                    <div className="grow">
                        <div>
                            <h4 className="font-bold text-18 mb-1">{name}</h4>
                            <p className="text-gray-700 capitalize mb-6">
                                {membershipLevel.toLowerCase()} @{currentOrg?.name}
                            </p>
                            <div className="mb-6 flex flex-col gap-2 text-14 text-gray-900">
                                <p className="flex items-center gap-4">
                                    <span className="w-32">휴대전화 번호</span>
                                    <span>{phone}</span>
                                </p>
                                <p className="flex items-center gap-4">
                                    <span className="w-32">이메일</span>
                                    <span>{email}</span>
                                </p>
                            </div>
                            <p>
                                <button className="cursor-not-allowed text-gray-300 mb-6">비밀번호 변경하기</button>
                            </p>
                        </div>

                        <div className="h-[1.5px] w-full bg-stroke-gray mb-6"></div>

                        <div className="w-full flex flex-col gap-4">
                            <div>
                                <h4 className="font-semibold text-16 mb-2">알림</h4>
                                <div className="flex flex-col gap-3">
                                    <div className="rounded-2xl border border-stroke-gary p-4 flex flex-col gap-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-14 font-medium">Email</span>
                                            <input
                                                type="checkbox"
                                                className="toggle"
                                                // defaultChecked={isEmailNoticeAllowed}
                                                onChange={handleChangeSwitch('isEmailNoticeAllowed')}
                                                checked={notifications.isEmailNoticeAllowed}
                                            />
                                        </div>
                                        <p className="text-12 text-gray-400">
                                            {email}로 scordi 관련 알림 메일이 발송됩니다.
                                        </p>
                                    </div>
                                    <div className="rounded-2xl border border-stroke-gary p-4 flex flex-col gap-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-14 font-medium">SMS</span>
                                            <input
                                                type="checkbox"
                                                className="toggle"
                                                // defaultChecked={isSMSNoticeAllowed}
                                                onChange={handleChangeSwitch('isSMSNoticeAllowed')}
                                                checked={notifications.isSMSNoticeAllowed}
                                            />
                                        </div>
                                        <p className="text-12 text-gray-400">
                                            {phone}(으)로 scordi 관련 알림 SMS가 발송됩니다.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-semibold text-16 mb-2">혜택 및 이벤트 알림</h4>
                                <div className="rounded-2xl border border-stroke-gary p-4 flex flex-col gap-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-14 font-medium">마케팅 정보 수신 동의</span>
                                        <input
                                            type="checkbox"
                                            className="toggle"
                                            // defaultChecked={!!marketingTermAgreedAt}
                                            onChange={handleChangeSwitch('marketingTermAgreedAt')}
                                            checked={notifications.isAgreeForMarketingTerm}
                                        />
                                    </div>
                                    <p className="text-12 text-gray-400">scordi의 혜택·정보를 받아 볼 수 있습니다.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedModal>
    );
};
