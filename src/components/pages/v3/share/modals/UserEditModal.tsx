import {InputHTMLAttributes, memo, useCallback, useEffect, useState} from 'react';
import {atom, useRecoilState, useRecoilValue} from 'recoil';
import {UserAvatar} from '^v3/share/UserAvatar';
import {useCurrentUser} from '^models/User/hook';
import {currentOrgAtom} from '^models/Organization/atom';
import {MembershipDto} from 'src/models/Membership/types';
import {useModal} from '^v3/share/modals/useModal';
import {useForm} from 'react-hook-form';
import {UserEditProfileRequestDto, UserNotificationsStateDto} from '^models/User/types';
import {userNotificationsStateAtom} from '^models/User/atom';

export const userEditModalIsShow = atom({
    key: 'v3/userEditModalIsShow',
    default: false,
});

/**
 TODO
 - [x] 토글 기능 구현 (UI)
 - [ ] 토글 상태 변경시, UserEditModal 재렌더링 방지하기
 - [x] 알림 상태 state 유지를 위해 전역 상태로 관리
 - [ ] 반응형 스타일 수정
 - [ ] 프로필 조회에서 아직 알림에 대한 정보 조회
 - [ ] 각 알림 토글 on 시, 호출할 API가 필요
 - [ ] 나중에 react-hook-form으로 변경하기 (리팩토링)
 */

export const UserEditModal = memo(() => {
    const {Modal, CloseButton} = useModal({isShowAtom: userEditModalIsShow});
    const currentOrg = useRecoilValue(currentOrgAtom);
    const {currentUser} = useCurrentUser(undefined, {
        orgIdParam: 'orgId',
    });

    console.log('UserEditModal 렌더링'); // 주석 삭제 예정

    const form = useForm<UserEditProfileRequestDto>();
    const [currentMembership, setCurrentMembership] = useState<null | MembershipDto>(null);
    const [notifications, setNotifications] = useRecoilState<UserNotificationsStateDto>(userNotificationsStateAtom);

    console.log(notifications); // 주석 삭제 예정

    const handleChangeToggle = useCallback(
        (notification: string) => {
            setNotifications((prev) => ({
                ...prev,
                [notification]: !prev[notification],
            }));

            // TODO API 호출 로직 작성 예정
        },
        [notifications],
    );

    useEffect(() => {
        if (!currentUser || !currentOrg) return;

        const membership = currentOrg.memberships?.find((membership) => {
            return membership.userId === currentUser.id;
        });
        if (membership) setCurrentMembership(membership);
    }, [currentUser, currentOrg]);

    useEffect(() => {
        if (!currentMembership) return;

        form.setValue('isAgreeForMarketingTerm', !!currentMembership.user?.marketingTermAgreedAt);
    }, [currentMembership]);

    if (!currentUser || !currentOrg || !currentMembership) return <></>;

    return (
        <Modal className="px-6 py-4 sm:px-12 sm:py-10 max-w-3xl">
            <div className="flex justify-between items-center mb-6 md:mb-10 bg-base-100">
                <h3 className="font-bold text-lg flex-1">내 계정</h3>
                <CloseButton />
            </div>

            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="col-span-1">
                    <UserAvatar user={currentUser} size="w-24 sm:w-32" textClass="!text-2xl" />
                </div>

                <div className="col-span-2">
                    <h4 className="font-bold text-lg">{currentUser.name}</h4>

                    <p className="text-gray-700 text-14 capitalize">
                        {currentMembership?.level?.toLowerCase()} @{currentOrg.name}
                    </p>

                    <div className="flex flex-col gap-3 my-7">
                        <p className="text-gray-900 font-[500] text-14 flex gap-4">
                            <span className="w-[100px]">휴대전화 번호</span>
                            <span>{currentUser.phone}</span>
                        </p>
                        <p className="text-gray-900 font-[500] text-14 flex gap-4">
                            <span className="w-[100px]">이메일</span>
                            <span>{currentUser.email}</span>
                        </p>
                    </div>

                    <a className="link link-primary no-underline text-sm">비밀번호 변경하기</a>

                    <div className="divider my-7"></div>

                    <div className="flex flex-col gap-4 mb-7">
                        <p className="text-sm font-semibold">알림</p>

                        <SwitchNotificationCard
                            id="email"
                            title="Email"
                            description={`${currentUser.email}으로 scordi 관련 알림 메일이 발송됩니다.`}
                            onToggle={handleChangeToggle}
                            checked={notifications.email}
                        />

                        <SwitchNotificationCard
                            id="sms"
                            title="SMS"
                            description={`${currentUser.phone}으로 scordi 관련 알림 SMS가 발송됩니다.`}
                            onToggle={handleChangeToggle}
                            checked={notifications.sms}
                        />
                    </div>

                    <div className="flex flex-col gap-4 mb-7">
                        <p className="text-sm font-semibold">혜택 및 이벤트 알림</p>

                        <SwitchNotificationCard
                            id="marketing"
                            title="마케팅 정보 수신 동의"
                            description="scordi의 혜택·정보를 받아 볼 수 있습니다."
                            onToggle={handleChangeToggle}
                            checked={notifications.marketing}
                        />
                        {/*{...form.register('isAgreeForMarketingTerm')}*/}
                        {/*onChange={(e) => {*/}
                        {/*    form.setValue('isAgreeForMarketingTerm', e.target.checked);*/}
                        {/*}}*/}
                    </div>
                </div>
            </div>
        </Modal>
    );
});

interface SwitchNotificationCardProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    title: string;
    description: string;
    onToggle: (notification: string) => void;
    checked: boolean;
}

const SwitchNotificationCard = ({id, title, description, checked, onToggle}: SwitchNotificationCardProps) => {
    return (
        <div className="card card-bordered">
            <div className="card-body p-4">
                <p className="card-title text-sm justify-between">
                    <span>{title}</span>
                    <input
                        readOnly
                        type="checkbox"
                        className="toggle toggle-primary toggle-sm"
                        checked={checked}
                        onClick={() => onToggle(id)}
                    />
                </p>
                <p className="card-text text-xs text-gray-400">{description}</p>
            </div>
        </div>
    );
};
