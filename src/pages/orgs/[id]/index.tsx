import React from 'react';
import {useRouter} from 'next/router';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {useCurrentOrg} from '^models/Organization/hook';
import OrgMainLayout from '^layouts/org/mainLayout';
import {ContentLayout} from '^layouts/ContentLayout';
import {PreLoader} from '^components/PreLoader';
import {ContentForm} from '^layouts/ContentLayout/ContentForm';
import {
    ContentPanel,
    ContentPanelInput,
    ContentPanelItem,
    ContentPanelItemTitle,
    ContentPanelItemText,
    ContentPanelList,
} from '^layouts/ContentLayout/ContentPanel';
import {useForm} from 'react-hook-form';
import {OrganizationDto, UpdateOrganizationRequestDto} from '^models/Organization/type';
import {TextInput} from '^components/TextInput';
import {ProfileImageFileInput} from '^components/ProfileImageFileInput';
import {organizationApi} from '^models/Organization/api';
import {errorNotify, successNotify} from '^utils/toast-notify';
import {toast} from 'react-toastify';
import {useCurrentUser} from '^models/User/hook';
import {MembershipLevel} from 'src/models/Membership/types';

export const OrgShowRoute = pathRoute({
    pathname: '/orgs/[id]',
    path: (orgId: number) => pathReplace(OrgShowRoute.pathname, {id: orgId}),
});

export default function OrgShowPage() {
    const router = useRouter();
    const {currentUserMembership} = useCurrentUser(null);
    const {currentOrg, setCurrentOrg} = useCurrentOrg(Number(router.query.id));
    const org = currentOrg || ({} as OrganizationDto);
    const orgUpdateForm = useForm<UpdateOrganizationRequestDto>({
        defaultValues: {
            name: org.name,
            slug: org.slug,
            image: org.image,
        },
    });
    const membershipsForm = useForm<UpdateOrganizationRequestDto>({
        defaultValues: {
            name: org.name,
            slug: org.slug,
            image: org.image,
        },
    });

    const isOwner = currentUserMembership?.level === MembershipLevel.OWNER;

    if (!currentUserMembership) return <PreLoader />;
    if (!org.id) return <PreLoader />;

    const UpdateOrgHandler = (dto: UpdateOrganizationRequestDto) => {
        organizationApi
            .update(org.id, dto)
            .then((res) => {
                setCurrentOrg(res.data);
                successNotify('Update completed.');
            })
            .catch(errorNotify);
    };

    const DestroyOrgHandler = () => {
        organizationApi
            .destroy(org.id)
            .then(() => toast.success('Delete completed.'))
            .catch(errorNotify);
    };

    return (
        <OrgMainLayout>
            <ContentLayout title="Settings">
                <ContentForm onSubmit={orgUpdateForm.handleSubmit(UpdateOrgHandler)}>
                    <ContentPanel title="General">
                        <ContentPanelList>
                            <ContentPanelInput title="Organization ID" required={true}>
                                <TextInput
                                    required={true}
                                    disabled={!isOwner}
                                    {...orgUpdateForm.register('slug', {
                                        required: true,
                                        value: org.slug,
                                    })}
                                />
                            </ContentPanelInput>

                            <ContentPanelInput title="Organization Name" required={true}>
                                <TextInput
                                    required={true}
                                    disabled={!isOwner}
                                    {...orgUpdateForm.register('name', {
                                        required: true,
                                        value: org.name,
                                    })}
                                />
                            </ContentPanelInput>

                            <ContentPanelInput title="Logo" required={false}>
                                <ProfileImageFileInput
                                    imageUrl={org.image}
                                    disabled={!isOwner}
                                    fallbackLetter={org.name[0]}
                                    {...orgUpdateForm.register('image')}
                                    onChange={(e) => {
                                        const uploadedFiles = e.target.files as FileList;
                                        orgUpdateForm.setValue('image', uploadedFiles[0]);
                                    }}
                                />
                            </ContentPanelInput>

                            {/*<ContentPanelInput*/}
                            {/*  title="Accessibility"*/}
                            {/*  text="A unique ID used to identify this organization"*/}
                            {/*>*/}
                            {/*  zzzzzz*/}
                            {/*</ContentPanelInput>*/}
                        </ContentPanelList>
                    </ContentPanel>
                </ContentForm>

                {/*<ContentForm onSubmit={membershipsForm.handleSubmit(UpdateOrgHandler)}>*/}
                {/*  <ContentPanel title="memberships">*/}
                {/*    <ContentPanelList>*/}
                {/*      <ContentPanelInput*/}
                {/*        title="Default Role"*/}
                {/*        text="The default role new members will receive"*/}
                {/*        required={true}*/}
                {/*      >*/}
                {/*        <TextInput*/}
                {/*          required={true}*/}
                {/*          {...membershipsForm.register('name', {*/}
                {/*            required: true,*/}
                {/*            value: org.name,*/}
                {/*          })}*/}
                {/*        />*/}
                {/*      </ContentPanelInput>*/}
                {/*    </ContentPanelList>*/}
                {/*  </ContentPanel>*/}
                {/*</ContentForm>*/}

                {isOwner && (
                    <ContentPanel title="Remove this organization">
                        <ContentPanelList>
                            <ContentPanelItem>
                                <div className="flex-1">
                                    <ContentPanelItemTitle text="Remove" />
                                    {/*<ContentPanelItemText text="회사 정보를 삭제하시면 모든 데이터가 사라집니다." />*/}
                                </div>
                                <div className="flex-1 text-end">
                                    <button
                                        type="button"
                                        className="btn btn-error text-white"
                                        onClick={DestroyOrgHandler}
                                    >
                                        Request to remove
                                    </button>
                                </div>
                            </ContentPanelItem>
                        </ContentPanelList>
                    </ContentPanel>
                )}
            </ContentLayout>
        </OrgMainLayout>
    );
}
