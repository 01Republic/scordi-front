import {memo} from 'react';
import {Avatar, Avatar2} from '^components/Avatar';
import {FcConferenceCall, FcDoughnutChart, FcKey, FcLink, FcOrgUnit} from 'react-icons/fc';
import {useTeamMemberModalSubject} from '../../modals/TeamMemberModal/hooks';
import {TeamMemberDto} from '^models/TeamMember/type';

interface MemberItemProps {
    member: TeamMemberDto;
}

// TODO: 231117 멤버상세카드에 데이터 연결해야 함.
export const MemberItem = memo((props: MemberItemProps) => {
    const {member} = props;
    const {setSubjectMember} = useTeamMemberModalSubject();

    const onClick = () => setSubjectMember(member);
    console.log('member', member);

    return (
        <div
            className="card card-compact bg-white shadow p-4 flex flex-col justify-between min-w-[300px] cursor-pointer transition-all hover:shadow-lg btn-animation"
            onClick={onClick}
        >
            <div>
                <div className="mb-4 w-full flex justify-between">
                    <div>
                        <Avatar
                            src={member.profileImgUrl || undefined}
                            alt={member.name}
                            className="w-[40px] shadow-xl"
                        />
                    </div>
                    <div>
                        <div className="avatar-group -space-x-3">
                            <div className="avatar">
                                <div className="w-6">
                                    <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                </div>
                            </div>
                            <div className="avatar">
                                <div className="w-6">
                                    <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                </div>
                            </div>
                            <div className="avatar">
                                <div className="w-6">
                                    <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                </div>
                            </div>
                            <div className="avatar placeholder">
                                <div className="w-6 bg-neutral-focus text-neutral-content">
                                    <span className="text-xs">+9</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="mb-3 text-16">
                    <b>{member.name}</b>
                </p>

                <div className="w-full text-gray-500">
                    <p>개발팀</p>
                    <div className="w-full flex gap-2 items-center">
                        <FcOrgUnit size={18} />
                        {/*<FcDoughnutChart size={18} />*/}
                        <p>0개 이용 중</p>
                    </div>
                </div>
            </div>
        </div>
    );
});
MemberItem.displayName = 'MemberItem';
