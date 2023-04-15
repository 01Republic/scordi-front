import React, {memo} from 'react';
import {ContentHeading, ContentHeadingPrimaryButton, ContentLayout, ContentPanel} from '^layouts/ContentLayout';
import OrgMainLayout from '^layouts/org/mainLayout';
import {InviteMemberModal} from './InviteMemberModal';
import {MembershipList} from './MembershipList';
import {DefaultButton} from '^components/Button';

export const OrgMembershipIndexPageDesktop = memo(() => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    return (
        <OrgMainLayout>
            <InviteMemberModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            <ContentLayout>
                <ContentHeading title={'Members'}>
                    <DefaultButton text={'Invite Members'} isInline={true} onClick={() => setIsModalOpen(true)} />
                </ContentHeading>

                <ContentPanel title={'Member List'} bodyWrap={false}>
                    <MembershipList />
                </ContentPanel>
            </ContentLayout>
        </OrgMainLayout>
    );
});
