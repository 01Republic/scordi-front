import {ForwardedRef, forwardRef, InputHTMLAttributes, memo, useEffect, useState} from 'react';
import {atom, useRecoilValue} from 'recoil';
import {UserAvatar} from '^v3/share/UserAvatar';
import {useCurrentUser} from '^hooks/useCurrentUser';
import {currentOrgAtom} from '^atoms/organizations.atom';
import {MembershipDto} from '^types/membership.type';
import {useModal} from '^v3/share/modals/useModal';
import {useForm} from 'react-hook-form';
import {UserEditProfileRequestDto} from '^types/user.type';

export const userEditModalIsShow = atom({
    key: 'v3/userEditModalIsShow',
    default: false,
});

export const UserEditModal = memo(() => {
    const {Modal, CloseButton} = useModal({isShowAtom: userEditModalIsShow});
    const currentOrg = useRecoilValue(currentOrgAtom);
    const {currentUser} = useCurrentUser(undefined, {
        orgIdParam: 'orgId',
    });
    const form = useForm<UserEditProfileRequestDto>();
    const [currentMembership, setCurrentMembership] = useState<null | MembershipDto>(null);

    useEffect(() => {
        if (!currentUser || !currentOrg) return;

        const membership = currentOrg.memberships?.find((membership) => {
            return membership.userId === currentUser.id;
        });
        if (membership) setCurrentMembership(membership);
    }, [currentUser, currentOrg]);

    useEffect(() => {
        if (!currentMembership) return;

        form.setValue('isAgreeForMarketingTerm', !!currentMembership.user.marketingTermAgreedAt);
    }, [currentMembership]);

    console.log(currentMembership);
    if (!currentUser || !currentOrg || !currentMembership) return <></>;

    return (
        <Modal className="px-12 pt-0 pb-10 md:max-w-md lg:max-w-3xl">
            <div className="flex justify-between items-center mb-10 pt-10 sticky top-0 bg-base-100 z-10">
                <h3 className="font-bold text-lg flex-1">내 계정</h3>
                <CloseButton />
            </div>

            <div className="grid grid-cols-3">
                <div className="col-span-1">
                    <UserAvatar user={currentUser} size="w-32" textClass="!text-2xl" />
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

                        <SwitchBox
                            title="Email"
                            desc={`${currentUser.email}으로 scordi 관련 알림 메일이 발송됩니다.`}
                            // checked={true}
                            // onChange={console.log}
                        />
                        <SwitchBox
                            title="SMS"
                            desc={`${currentUser.phone}으로 scordi 관련 알림 SMS가 발송됩니다.`}
                            // checked={true}
                            // onChange={console.log}
                        />
                    </div>

                    <div className="flex flex-col gap-4 mb-7">
                        <p className="text-sm font-semibold">혜택 및 이벤트 알림</p>

                        <SwitchBox title="마케팅 정보 수신 동의" desc="scordi의 혜택·정보를 받아 볼 수 있습니다." />
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

interface SwitchBoxProps extends InputHTMLAttributes<HTMLInputElement> {
    title: string;
    desc: string;
    checked?: boolean;
}

const SwitchBox = forwardRef((props: SwitchBoxProps, ref: ForwardedRef<any>) => {
    const {title, desc, checked, onChange} = props;
    const [isChecked, setIsChecked] = useState(false);

    // useEffect(() => {
    //     //
    // }, [checked]);

    return (
        <div className="card card-bordered">
            <div className="card-body p-4">
                <p className="card-title text-sm justify-between">
                    <span>{title}</span>
                    <input
                        ref={ref}
                        type="checkbox"
                        className="toggle toggle-primary toggle-sm"
                        defaultChecked={isChecked}
                        // checked={isChecked}
                        // onChange={(e) => {
                        //     console.log(title, 'checked', e.target.checked);
                        //     onChange && onChange(e);
                        // }}
                        onClick={(e) => {
                            const input = e.target as HTMLInputElement;
                            console.log(input.checked);
                            setIsChecked(input.checked);
                        }}
                    />
                </p>
                <p className="card-text text-xs text-gray-400">{desc}</p>
            </div>
        </div>
    );
});
