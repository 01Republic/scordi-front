import React from 'react';
import { useRouter } from 'next/router';
import { PageRoute } from '^types/pageRoute.type';
import { useCurrentOrg } from '^hooks/useCurrentOrg';
import { getOrgMainLayout } from '^layouts/org/mainLayout';
import { ContentLayout } from '^layouts/ContentLayout';
import { PreLoader } from '^components/PreLoader';
import { ContentForm } from '^layouts/ContentLayout/ContentForm';
import {
  ContentPanel,
  ContentPanelInput,
  ContentPanelItem,
  ContentPanelItemTitle,
  ContentPanelItemText,
  ContentPanelList,
} from '^layouts/ContentLayout/ContentPanel';
import { useForm } from 'react-hook-form';
import {
  OrganizationDto,
  UpdateOrganizationRequestDto,
} from '^types/organizationTypes';
import { TextInput } from '^components/TextInput';
import { ProfileImageFileInput } from '^components/ProfileImageFileInput';
import { updateOrganization } from '^api/organizationApi';
import { errorNotify, successNotify } from '^utils/toast-notify';

export const OrgShowRoute: PageRoute = {
  pathname: '/orgs/[id]',
  path: (orgId: number) => OrgShowRoute.pathname.replace('[id]', String(orgId)),
};

export default function OrgShowPage() {
  const router = useRouter();
  const { currentOrg, setCurrentOrg } = useCurrentOrg(Number(router.query.id));
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

  return (
    <ContentLayout title="Organization Settings">
      <ContentForm onSubmit={generalForm.handleSubmit(UpdateOrgHandler)}>
        <ContentPanel title="General">
          <ContentPanelList>
            <ContentPanelInput
              title="Organization Slug"
              text="A unique ID used to identify this organization"
              required={true}
            >
              <TextInput
                required={true}
                {...generalForm.register('slug', {
                  required: true,
                  value: org.slug,
                })}
              />
            </ContentPanelInput>

            <ContentPanelInput
              title="Display Name"
              text="A human-friendly name for the organization"
              required={true}
            >
              <TextInput
                required={true}
                {...generalForm.register('name', {
                  required: true,
                  value: org.name,
                })}
              />
            </ContentPanelInput>

            <ContentPanelInput
              title="Avatar"
              text="A display image for the organization. By default, use the first letter of it's own display name"
              required={false}
            >
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

      <ContentForm onSubmit={membershipsForm.handleSubmit(UpdateOrgHandler)}>
        <ContentPanel title="memberships">
          <ContentPanelList>
            <ContentPanelInput
              title="Default Role"
              text="The default role new members will receive"
              required={true}
            >
              <TextInput
                required={true}
                {...membershipsForm.register('name', {
                  required: true,
                  value: org.name,
                })}
              />
            </ContentPanelInput>
          </ContentPanelList>
        </ContentPanel>
      </ContentForm>

      <ContentPanel title="Remove Organization">
        <ContentPanelList>
          <ContentPanelItem>
            <div className="flex-1">
              <ContentPanelItemTitle text="Remove Organization" />
              <ContentPanelItemText text="Removing this organization will delete all data including teams and their associated events." />
            </div>
            <div className="flex-1 text-end">
              <button className="btn btn-error text-white">
                Remove Organization
              </button>
            </div>
          </ContentPanelItem>
        </ContentPanelList>
      </ContentPanel>
    </ContentLayout>
  );
}

OrgShowPage.getLayout = getOrgMainLayout;
