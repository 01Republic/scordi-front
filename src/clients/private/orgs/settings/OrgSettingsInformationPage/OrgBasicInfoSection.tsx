import React, {memo, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {currentOrgAtom} from '^models/Organization/atom';
import {OrgSettingsListSection} from '^clients/private/_layouts/OrgSettingsLayout';
import {ChangeOrgInformationModal} from './ChangeOrgInformationModal';

interface OrgBasicInfoSectionProps {
    orgId: number;
}

export const OrgBasicInfoSection = memo((props: OrgBasicInfoSectionProps) => {
    const {orgId} = props;
    const currentOrg = useRecoilValue(currentOrgAtom);
    const [isChangeOrgInformationModalOpened, setIsChangeOrgInformationModalOpened] = useState(false);

    return (
        <>
            <OrgSettingsListSection
                title={'기본'}
                buttonOnClick={() => setIsChangeOrgInformationModalOpened(true)}
                items={[
                    {title: '워크스페이스명', desc: currentOrg?.name},
                    {
                        title: '주소',
                        desc: currentOrg?.address ? (
                            `${currentOrg?.address} ${currentOrg?.addressDetail}`
                        ) : (
                            <span className={'text-gray-400'}>주소를 등록해주세요</span>
                        ),
                    },
                    {title: '멤버', desc: `${currentOrg?.memberCount}명`},
                ]}
            />
            <ChangeOrgInformationModal
                isOpened={isChangeOrgInformationModalOpened}
                onClose={() => setIsChangeOrgInformationModalOpened(false)}
            />
        </>
    );
});
OrgBasicInfoSection.displayName = 'OrgBasicInfoSection';
