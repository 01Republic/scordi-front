import React, {memo} from 'react';
import {ContentHeading, ContentHeadingPrimaryButton, ContentLayout, ContentPanel} from '^layouts/ContentLayout';
import OrgMainLayout from '^layouts/org/mainLayout';
import {InviteMemberModal} from './InviteMemberModal';
import {MembershipList} from './MembershipList';

export const OrgMembershipIndexPageDesktop = memo(() => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    return (
        <OrgMainLayout>
            <InviteMemberModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            <ContentLayout>
                <ContentHeading title={'Members'}>
                    <ContentHeadingPrimaryButton onClick={() => setIsModalOpen(true)}>
                        멤버 초대하기
                    </ContentHeadingPrimaryButton>
                </ContentHeading>

                <ContentPanel title={'멤버 목록'} bodyWrap={false}>
                    <MembershipList />
                </ContentPanel>
            </ContentLayout>
        </OrgMainLayout>
    );
});
