import React, {memo, useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {ContentForm, ContentPanel, ContentPanelInput, ContentPanelItem, ContentPanelList} from '^layouts/ContentLayout';
import {OrganizationDeletePanel} from '^admin/orgs/AdminOrgDetailPage/tabContents/InformationTabContent/OrganizationDeletePanel';
import {UpdateOrganizationRequestDto} from '^models/Organization/type';
import {organizationAdminApi, organizationApi} from '^models/Organization/api';
import {useForm} from 'react-hook-form';
import {TextInput} from '^components/TextInput';
import {ProfileImageFileInput} from '^components/ProfileImageFileInput';
import {MdRefresh} from 'react-icons/md';
import {errorToast} from '^api/api';
import {toast} from 'react-hot-toast';

export const InformationTabContent = memo(() => {
    const [org, setOrg] = useRecoilState(adminOrgDetail);
    const orgUpdateForm = useForm<UpdateOrganizationRequestDto>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!org) return;
        orgUpdateForm.setValue('name', org.name);
        orgUpdateForm.setValue('slug', org.slug);
    }, [org]);

    const reload = () => org && organizationApi.show(org.id).then((res) => setOrg(res.data));

    const updateOrg = async (dto: UpdateOrganizationRequestDto) => {
        if (!org) return;

        setIsLoading(true);
        organizationAdminApi
            .update(org.id, dto)
            .then(() => reload())
            .then(() => toast.success('업데이트 완료'))
            .catch(errorToast)
            .finally(() => setIsLoading(false));
    };

    const updateCounterCache = () => {
        if (!org) return;

        setIsLoading(true);
        organizationAdminApi
            .updateCounter(org.id)
            .then(() => reload())
            .then(() => toast.success('업데이트 완료'))
            .catch(errorToast)
            .finally(() => setIsLoading(false));
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

                        <ContentPanelInput title="조직명" required={true}>
                            <TextInput
                                required={true}
                                {...orgUpdateForm.register('name', {
                                    required: true,
                                    value: org.name,
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

            <ContentPanel title="부가 정보">
                <ContentPanelList>
                    <ContentPanelItem>
                        <div className="flex-1 pr-4">
                            <div>멤버 수</div>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-4">
                                <div>{org.memberCount.toLocaleString()} 명</div>
                                <div>
                                    <button
                                        className="btn btn-scordi btn-sm btn-circle"
                                        onClick={() => updateCounterCache()}
                                    >
                                        <MdRefresh
                                            fontSize={16}
                                            className={`cursor-pointer ${isLoading ? 'animate-spin' : ''}`}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </ContentPanelItem>
                </ContentPanelList>
            </ContentPanel>

            <OrganizationDeletePanel organization={org} />
        </>
    );
});
