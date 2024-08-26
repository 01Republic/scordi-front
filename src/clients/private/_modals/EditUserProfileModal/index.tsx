import {IoClose} from '@react-icons/all-files/io5/IoClose';
import {useRecoilValue} from 'recoil';

import {MembershipLevel} from '^models/Membership/types';
import {currentOrgAtom} from '^models/Organization/atom';
import {UserDto} from '^models/User/types';

import {AnimatedModal} from '^components/modals/_shared/AnimatedModal';

interface EditUserProfileModalProps {
    currentUser: UserDto;
    membershipLevel: MembershipLevel;
    isOpened: boolean;
    onClose: () => void;
}

/**
 TODO
 - modal-box 대신 tailwind로 스타일링
 */

export const EditUserProfileModal = (props: EditUserProfileModalProps) => {
    const {currentUser, membershipLevel, isOpened, onClose} = props;
    const {profileImgUrl, name, email, phone} = currentUser;

    const currentOrg = useRecoilValue(currentOrgAtom);

    console.log(profileImgUrl, name, email, phone, membershipLevel); // 삭제 예정

    if (!currentOrg) return <></>;

    return (
        <AnimatedModal open={isOpened} onClose={onClose}>
            <div className="w-[48rem] bg-white px-6 py-4 sm:px-12 sm:py-10 rounded-2xl flex flex-col gap-6 sm:gap-10">
                <div className="w-full flex justify-between items-center">
                    <h3 className="font-bold text-lg">내 계정</h3>
                    <button>
                        <IoClose size={26} />
                    </button>
                </div>

                <article className="w-full flex flex-col sm:flex-row">
                    <div className="w-[128px] h-[128px]">아바타</div>
                    <div>
                        <div>
                            <h4>{name}</h4>
                            <p className="text-gray-700 text-14 capitalize">
                                {membershipLevel.toLowerCase()} @{currentOrg?.name}
                            </p>
                            <div>
                                <p>
                                    <span>휴대전화 번호</span>
                                    <span>{phone}</span>
                                </p>
                                <p>
                                    <span>이메일</span>
                                    <span>{email}</span>
                                </p>
                            </div>
                            <p>
                                <button>비밀번호 변경하기</button>
                            </p>
                        </div>

                        <div>선</div>

                        <div>
                            <div>
                                <h4>알림</h4>
                                <div className="card card-bordered"></div>
                            </div>
                            <div>
                                <h4>혜택 및 이벤트 알림</h4>
                                <div className="card card-bordered"></div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </AnimatedModal>
    );
};
