import {memo, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import toast from 'react-hot-toast';
import {debounce} from 'lodash';
import {currentOrgAtom} from '^models/Organization/atom';
import {UserEditProfileRequestDto} from '^models/User/types';
import {UserAvatar} from '^models/User/components/UserAvatar';
import {currentUserAtom} from '^models/User/atom';
import {userApi, userSessionApi} from '^models/User/api/session';
import {AnimatedModal} from '^components/modals/_shared/AnimatedModal';
import SwitchNotificationCard from './SwitchNotificationCard';
import {t_membershipLevel} from '^models/Membership/types';
import {X} from 'lucide-react';
import {useForm} from 'react-hook-form';
import {useUpdateUser} from '^models/User/hook';
import {validPasswordRegex} from '^utils/valildation';
import {appEnv} from '^config/environments';

interface EditUserProfileModalProps {
    isOpened: boolean;
    onClose: () => void;
}

export const EditUserProfileModal = memo((props: EditUserProfileModalProps) => {
    const {isOpened, onClose} = props;
    const isNotProduction = appEnv !== 'production';
    const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);
    const currentOrg = useRecoilValue(currentOrgAtom);
    const {mutateAsync} = useUpdateUser();
    const [isChangePasswordClicked, setIsChangePasswordClicked] = useState(false);

    const form = useForm<UserEditProfileRequestDto>({
        mode: 'all',
        defaultValues: {
            password: '',
            passwordConfirmation: '',
        },
    });

    const {
        register,
        watch,
        handleSubmit,
        formState: {errors},
    } = form;

    const {password, passwordConfirmation} = watch();

    const updateUser = debounce((updateDto: UserEditProfileRequestDto) => {
        return userApi.registration
            .update(updateDto)
            .then(() => userSessionApi.index())
            .then((req) => setCurrentUser(req.data))
            .then(() => toast.success('변경사항이 저장되었습니다.'))
            .catch(() => toast.error('프로필 수정을 다시 시도해주세요.'));
    }, 500);

    const onSubmit = (data: UserEditProfileRequestDto) => {
        if (!data.password && !data.passwordConfirmation) return;
        mutateAsync({data})
            .then(() => userSessionApi.index())
            .then((req) => {
                setCurrentUser(req.data);
                setIsChangePasswordClicked(false);
            })
            .then(() => toast.success('변경사항이 저장되었습니다.'));
    };

    if (!currentUser) return <></>;

    const {profileImgUrl, name, email, phone, memberships} = currentUser;

    if (!currentOrg || !memberships) return <></>;

    const membership = memberships.find((m) => m.organizationId === currentOrg.id) || memberships[0];

    return (
        <AnimatedModal open={isOpened} onClose={onClose}>
            <div className="w-full min-w-[350px] max-w-3xl m-4 sm:m-6 bg-white px-6 py-4 sm:px-12 sm:py-10 rounded-2xl flex flex-col gap-5 sm:gap-8 z-10">
                <div className="w-full flex justify-between items-center">
                    <h3 className="font-bold text-18">내 계정</h3>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-stroke-gray text-gray-500 hover:text-gray-900 transition-colors duration-200"
                    >
                        <X size={26} />
                    </button>
                </div>

                <div className="w-full flex flex-col sm:flex-row gap-6 sm:gap-8">
                    <UserAvatar src={profileImgUrl} className="w-20 h-20 sm:w-24 sm:h-24" alt="프로필 이미지" />
                    <div className="grow">
                        <div className="mb-6">
                            <h4 className="font-bold text-18 mb-1">{name}</h4>
                            <p className="text-gray-700 capitalize mb-6">
                                {t_membershipLevel(membership.level)} @{currentOrg.name}
                            </p>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-6 flex flex-col gap-2 text-14 text-gray-900">
                                    <p className="flex items-center gap-4">
                                        <span className="w-32">휴대전화 번호</span>
                                        <span>{phone}</span>
                                    </p>
                                    <p className="flex items-center gap-4">
                                        <span className="w-32">이메일</span>
                                        <span>{email}</span>
                                    </p>
                                    <p className="flex items-center gap-4">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (!isNotProduction) return;
                                                setIsChangePasswordClicked(!isChangePasswordClicked);
                                            }}
                                            className={`w-32 flex justify-start underline hover:text-scordi ${
                                                isChangePasswordClicked ? 'hidden' : ''
                                            }`}
                                        >
                                            비밀번호 변경
                                        </button>
                                    </p>
                                    {isNotProduction && isChangePasswordClicked && (
                                        <div className="w-full grid grid-cols-3 gap-4">
                                            <div className="col-span-2 flex flex-col gap-2">
                                                <div className="flex items-center gap-4">
                                                    <span className="w-32">비밀번호 확인</span>
                                                    <div className="flex flex-col gap-2">
                                                        {isChangePasswordClicked && (
                                                            <label
                                                                htmlFor="password"
                                                                className="w-full border-b border-gray-200 flex items-center justify-between p-0.5"
                                                            >
                                                                <input
                                                                    id="password"
                                                                    type="password"
                                                                    {...register('password', {
                                                                        pattern: {
                                                                            value: validPasswordRegex,
                                                                            message:
                                                                                '8~20자의 영문, 숫자를 사용해 주세요.',
                                                                        },
                                                                    })}
                                                                />
                                                            </label>
                                                        )}
                                                        {errors.password && (
                                                            <p className="text-red-400 text-12">
                                                                {errors.password.message}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-4">
                                                    <span className="w-32">비밀번호 확인</span>
                                                    <div className="flex flex-col gap-2">
                                                        <label
                                                            htmlFor="passwordConfirmation"
                                                            className="w-full border-b border-gray-200 flex items-center justify-between p-0.5"
                                                        >
                                                            <input
                                                                id="passwordConfirmation"
                                                                type="password"
                                                                {...register('passwordConfirmation', {
                                                                    validate: (value) =>
                                                                        value === password ||
                                                                        '비밀번호가 일치하지 않습니다.',
                                                                })}
                                                            />
                                                        </label>
                                                        {errors.passwordConfirmation && (
                                                            <p className="text-red-400 text-12">
                                                                {errors.passwordConfirmation.message}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-1 flex gap-2 h-full items-end justify-end">
                                                <button
                                                    type="button"
                                                    onClick={() => setIsChangePasswordClicked(false)}
                                                    className="btn btn-xs btn-white"
                                                >
                                                    취소
                                                </button>
                                                <button type="submit" className="btn btn-xs btn-scordi">
                                                    변경
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>

                        <div className="h-[1.5px] w-full bg-stroke-gray mb-6"></div>

                        <div className="w-full flex flex-col gap-4">
                            <div>
                                <h4 className="font-semibold text-16 mb-2">알림</h4>
                                <div className="flex flex-col gap-3">
                                    <SwitchNotificationCard
                                        label="Email"
                                        content={`${email}로 scordi 관련 알림 메일이 발송됩니다.`}
                                        checked={currentUser.isEmailNoticeAllowed}
                                        onChange={(isEmailNoticeAllowed) => updateUser({isEmailNoticeAllowed})}
                                    />
                                    <SwitchNotificationCard
                                        label="SMS"
                                        content={`${phone}(으)로 scordi 관련 알림 SMS가 발송됩니다.`}
                                        checked={currentUser.isSMSNoticeAllowed}
                                        onChange={(isSMSNoticeAllowed) => updateUser({isSMSNoticeAllowed})}
                                    />
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold text-16 mb-2">혜택 및 이벤트 알림</h4>
                                <SwitchNotificationCard
                                    label="마케팅 정보 수신 동의"
                                    content="scordi의 혜택·정보를 받아 볼 수 있습니다."
                                    checked={currentUser.isAgreeForMarketingTerm}
                                    onChange={(isAgreeForMarketingTerm) => updateUser({isAgreeForMarketingTerm})}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedModal>
    );
});
