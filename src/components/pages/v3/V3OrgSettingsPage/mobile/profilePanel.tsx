import React, {memo} from 'react';
import {Avatar} from '^components/Avatar';
import {Icon} from '^components/Icon';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {useRecoilValue} from 'recoil';
import {currentUserAtom} from '^atoms/currentUser.atom';
import {currentOrgAtom} from '^atoms/organizations.atom';

interface OrganizationProps {
    isOrganization: boolean;
}

export const ProfilePanel = memo((props: OrganizationProps) => {
    const {isOrganization} = props;
    const currentUser = useRecoilValue(currentUserAtom);
    const currentOrg = useRecoilValue(currentOrgAtom);

    return (
        <MobileSection.Item>
            <MobileSection.Padding>
                <div className="flex items-center gap-6 px-3 py-2.5 -mx-3 bg-base-100 text-gray-700 cursor-pointer hover:bg-neutral">
                    <Avatar
                        src={isOrganization ? currentOrg?.image : currentUser?.profileImgUrl}
                        className="w-16 h-16 outline outline-offset-1 outline-slate-100"
                    />
                    <div className="flex-1">
                        <h1 className="text-xl text-500">{isOrganization ? currentOrg?.name : currentUser?.name}</h1>
                        <p className="text-[16px]">
                            {/* TODO: currentUser에서 직급 가져올 수 없음 수정 예정 */}
                            <small className="mr-0.5">{isOrganization ? '' : ''} </small>
                        </p>
                    </div>
                    <Icon.ChevronRight />
                </div>
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
