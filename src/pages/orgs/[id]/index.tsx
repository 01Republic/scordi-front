import React from 'react';
import {useRouter} from 'next/router';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {useCurrentOrg} from '^hooks/useCurrentOrg';
import {getOrgMainLayout} from '^layouts/org/mainLayout';
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
import {OrganizationDto, UpdateOrganizationRequestDto} from '^types/organization.type';
import {TextInput} from '^components/TextInput';
import {ProfileImageFileInput} from '^components/ProfileImageFileInput';
import {destroyOrganization, updateOrganization} from '^api/organization.api';
import {errorNotify, successNotify} from '^utils/toast-notify';
import {toast} from 'react-toastify';

export const OrgShowRoute = pathRoute({
    pathname: '/orgs/[id]',
    path: (orgId: number) => pathReplace(OrgShowRoute.pathname, {id: orgId}),
});

export default function OrgShowPage() {
    const router = useRouter();
    const {currentOrg, setCurrentOrg} = useCurrentOrg(Number(router.query.id));
    const org = currentOrg || ({} as OrganizationDto);
    const generalForm = useForm<UpdateOrganizationRequestDto>({
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

    if (!org.id) return <PreLoader />;

    const UpdateOrgHandler = (dto: UpdateOrganizationRequestDto) => {
        updateOrganization(org.id, dto)
            .then((res) => {
                setCurrentOrg(res.data);
                successNotify('성공적으로 업데이트 되었습니다.');
            })
            .catch(errorNotify);
    };

    const DestroyOrgHandler = () => {
        destroyOrganization(org.id)
            .then(() => toast.success('삭제되었습니다.'))
            .catch(errorNotify);
    };

    return (
        <ContentLayout title="회사정보 설정">
            <ContentForm onSubmit={generalForm.handleSubmit(UpdateOrgHandler)}>
                <ContentPanel title="일반">
                    <ContentPanelList>
                        <ContentPanelInput title="회사 ID" text="회사 ID는 유일한 값입니다." required={true}>
                            <TextInput
                                required={true}
                                {...generalForm.register('slug', {
                                    required: true,
                                    value: org.slug,
                                })}
                            />
                        </ContentPanelInput>

                        <ContentPanelInput title="회사명" text="회사명을 정확히 써주세요." required={true}>
                            <TextInput
                                required={true}
                                {...generalForm.register('name', {
                                    required: true,
                                    value: org.name,
                                })}
                            />
                        </ContentPanelInput>

                        <ContentPanelInput title="회사 로고" text="회사의 로고를 업로드 해주세요." required={false}>
                            <ProfileImageFileInput
                                imageUrl={org.image}
                                fallbackLetter={org.name[0]}
                                onChange={console.log}
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

            <ContentPanel title="이 회사 삭제">
                <ContentPanelList>
                    <ContentPanelItem>
                        <div className="flex-1">
                            <ContentPanelItemTitle text="삭제하기" />
                            <ContentPanelItemText text="회사 정보를 삭제하시면 모든 데이터가 사라집니다." />
                        </div>
                        <div className="flex-1 text-end">
                            <button type="button" className="btn btn-error text-white" onClick={DestroyOrgHandler}>
                                삭제 요청하기
                            </button>
                        </div>
                    </ContentPanelItem>
                </ContentPanelList>
            </ContentPanel>
        </ContentLayout>
    );
}

OrgShowPage.getLayout = getOrgMainLayout;
