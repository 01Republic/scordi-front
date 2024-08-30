import {memo, useEffect} from 'react';
import {IoClose} from '@react-icons/all-files/io5/IoClose';
import {useRecoilState, useRecoilValue} from 'recoil';
import toast from 'react-hot-toast';

import {currentOrgAtom} from '^models/Organization/atom';
import {UserNotificationsStateDto} from '^models/User/types';

import {AnimatedModal} from '^components/modals/_shared/AnimatedModal';
import {UserAvatar} from '^models/User/components/UserAvatar';
import {currentUserAtom, userNotificationsStateAtom} from '^models/User/atom';
import SwitchNotificationCard from './SwitchNotificationCard';
import {userApi, userSessionApi} from '^models/User/api/session';

interface EditUserProfileModalProps {
    isOpened: boolean;
    onClose: () => void;
}

export const EditUserProfileModal = memo((props: EditUserProfileModalProps) => {
    const {isOpened, onClose} = props;

    const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);
    const currentOrg = useRecoilValue(currentOrgAtom);
    const [notifications, setNotifications] = useRecoilState<UserNotificationsStateDto>(userNotificationsStateAtom);

    if (!currentUser) return <></>;

    const {profileImgUrl, name, email, phone, memberships} = currentUser;
    const {isEmailNoticeAllowed, isSMSNoticeAllowed, isAgreeForMarketingTerm} = currentUser;

    const handleNotificationState = (notification: string) => async () => {
        const updateValue = !notifications[notification];

        try {
            await userApi.registration.update({
                [notification]: updateValue,
            });

            setNotifications((prev) => ({
                ...prev,
                [notification]: updateValue,
            }));

            const req = await userSessionApi.index();
            setCurrentUser(req.data);

            toast.success('변경사항이 저장되었습니다.');
        } catch (error) {
            toast.error('프로필 수정을 다시 시도해주세요.');
        }
    };

    useEffect(() => {
        setNotifications({
            isEmailNoticeAllowed,
            isSMSNoticeAllowed,
            isAgreeForMarketingTerm,
        });
    }, [setNotifications]);

    if (!currentOrg || !memberships) return <></>;

    return (
        <AnimatedModal open={isOpened} onClose={onClose}>
            <div className="w-full min-w-[350px] max-w-3xl m-4 sm:m-6 bg-white px-6 py-4 sm:px-12 sm:py-10 rounded-2xl flex flex-col gap-5 sm:gap-8">
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
                                {memberships[0].level.toLowerCase()} @{currentOrg?.name}
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
                                    <SwitchNotificationCard
                                        label="Email"
                                        content={`${email}로 scordi 관련 알림 메일이 발송됩니다.`}
                                        checked={notifications.isEmailNoticeAllowed}
                                        onSwitch={handleNotificationState('isEmailNoticeAllowed')}
                                    />
                                    <SwitchNotificationCard
                                        label="SMS"
                                        content={`${phone}(으)로 scordi 관련 알림 SMS가 발송됩니다.`}
                                        checked={notifications.isSMSNoticeAllowed}
                                        onSwitch={handleNotificationState('isSMSNoticeAllowed')}
                                    />
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold text-16 mb-2">혜택 및 이벤트 알림</h4>
                                <SwitchNotificationCard
                                    label="마케팅 정보 수신 동의"
                                    content="scordi의 혜택·정보를 받아 볼 수 있습니다."
                                    checked={notifications.isAgreeForMarketingTerm}
                                    onSwitch={handleNotificationState('isAgreeForMarketingTerm')}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedModal>
    );
});
