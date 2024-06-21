import React, {memo} from 'react';
import {GoDotFill} from 'react-icons/go';
import {HiOutlineMail, HiOutlinePhone} from 'react-icons/hi';
import {TeamMemberAvatar} from '^v3/share/TeamMemberAvatar';
import {TeamTag} from '^models/Team/components/TeamTag';
import {useCurrentTeamMember} from '../atom';
import {KeyValue} from './KeyValue';
import {ContactButton} from './ContactButton';

export const TeamMemberProfilePanel = memo(function TeamMemberProfilePanel() {
    const {currentTeamMember} = useCurrentTeamMember();

    if (!currentTeamMember) return <></>;

    const teams = currentTeamMember.teams || [];

    return (
        <div className="flex gap-8">
            <div>
                <TeamMemberAvatar teamMember={currentTeamMember} className="w-32 h-32 text-30" />
            </div>

            <div className="">
                <h1 className="text-2xl font-semibold my-2">{currentTeamMember.name}</h1>

                <div className="mt-2 mb-4">
                    {/*<KeyValue label="이메일" value={currentTeamMember.email} />*/}
                    {/*<KeyValue label="휴대폰" value={currentTeamMember.phone} />*/}
                    <KeyValue
                        label="팀(소속)"
                        value={
                            <div className="flex items-center gap-1">
                                {teams.length > 0 ? (
                                    teams.map((team, i) => <TeamTag id={team.id} name={team.name} key={i} />)
                                ) : (
                                    <i className="text-gray-400">미설정</i>
                                )}
                            </div>
                        }
                    />
                    {/*Job Status*/}
                </div>

                <div className="flex items-center gap-2">
                    <ContactButton
                        tooltipText={currentTeamMember.phone || '전화번호를 등록해주세요'}
                        href={`tel:${currentTeamMember.phone}`}
                        disabled={!currentTeamMember.phone}
                        className={currentTeamMember.phone ? '' : 'btn-disabled !border-opacity-70'}
                    >
                        <HiOutlinePhone fontSize={14} />
                    </ContactButton>

                    <ContactButton
                        tooltipText={currentTeamMember.email || '이메일을 등록해주세요'}
                        href={`mailto:${currentTeamMember.email}`}
                        disabled={!currentTeamMember.email}
                        className={currentTeamMember.email ? '' : 'btn-disabled !border-opacity-70'}
                    >
                        <HiOutlineMail fontSize={14} />
                    </ContactButton>

                    <div>
                        <button className="btn btn-sm !outline-0 gap-0.5 items-center !bg-white border !border-slate-300 cursor-default rounded-md transition-all pl-[6px] no-animation">
                            <GoDotFill fontSize={24} className="text-green-500 relative top-[1px]" />
                            <span>재직중</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});
