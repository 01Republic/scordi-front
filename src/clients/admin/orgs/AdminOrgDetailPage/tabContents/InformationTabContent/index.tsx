import React, {memo, useEffect} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {ContentForm, ContentPanel, ContentPanelInput, ContentPanelItem, ContentPanelList} from '^layouts/ContentLayout';
import {OrganizationDeletePanel} from '^admin/orgs/AdminOrgDetailPage/tabContents/InformationTabContent/OrganizationDeletePanel';
import {UpdateOrganizationRequestDto} from '^models/Organization/type';
import {organizationAdminApi, organizationApi} from '^models/Organization/api';
import {errorNotify, successNotify} from '^utils/toast-notify';
import {useForm} from 'react-hook-form';
import {TextInput} from '^components/TextInput';
import {ProfileImageFileInput} from '^components/ProfileImageFileInput';

export const InformationTabContent = memo(() => {
    const [org, setOrg] = useRecoilState(adminOrgDetail);
    const orgUpdateForm = useForm<UpdateOrganizationRequestDto>();

    useEffect(() => {
        if (!org) return;
        orgUpdateForm.setValue('name', org.name);
        orgUpdateForm.setValue('slug', org.slug);
    }, [org]);

    const updateOrg = async (dto: UpdateOrganizationRequestDto) => {
        if (!org) return;
        organizationAdminApi
            .update(org.id, dto)
            .then((res) => {
                setOrg(res.data);
                successNotify('Update completed.');
            })
            .catch(errorNotify);
    };

    if (!org) return <></>;

    return (
        <>
            <ContentForm onSubmit={orgUpdateForm.handleSubmit(updateOrg)}>
                <ContentPanel title="일반 정보">
                    <ContentPanelList>
                        <ContentPanelInput title="조직명" required={true}>
                            <TextInput
                                required={true}
                                {...orgUpdateForm.register('name', {
                                    required: true,
                                    value: org.name,
                                })}
                            />
                        </ContentPanelInput>

                        <ContentPanelInput title="URL 슬러그" required={true}>
                            <TextInput
                                required={true}
                                {...orgUpdateForm.register('slug', {
                                    required: true,
                                    value: org.slug,
                                })}
                            />
                        </ContentPanelInput>

                        {/*<ContentPanelInput title="Logo" required={false}>*/}
                        {/*    <ProfileImageFileInput*/}
                        {/*        imageUrl={org.image}*/}
                        {/*        fallbackLetter={org.name[0]}*/}
                        {/*        {...orgUpdateForm.register('image')}*/}
                        {/*        onChange={(e) => {*/}
                        {/*            const uploadedFiles = e.target.files as FileList;*/}
                        {/*            orgUpdateForm.setValue('image', uploadedFiles[0]);*/}
                        {/*        }}*/}
                        {/*    />*/}
                        {/*</ContentPanelInput>*/}

                        {/*<ContentPanelInput*/}
                        {/*  title="Accessibility"*/}
                        {/*  text="A unique ID used to identify this organization"*/}
                        {/*>*/}
                        {/*  zzzzzz*/}
                        {/*</ContentPanelInput>*/}
                    </ContentPanelList>
                </ContentPanel>
            </ContentForm>
            <OrganizationDeletePanel organization={org} />
        </>
    );
});
