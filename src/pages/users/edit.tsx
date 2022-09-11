import React from 'react';
import { PageRoute } from '^types/pageRoute.type';
import { useCurrentUser } from '^hooks/useCurrentUser';
import { ContentForm } from '^layouts/ContentLayout/ContentForm';
import {
  ContentPanel,
  ContentPanelInput,
  ContentPanelItem,
  ContentPanelItemText,
  ContentPanelItemTitle,
  ContentPanelList,
} from '^layouts/ContentLayout/ContentPanel';
import { TextInput } from '^components/TextInput';
import { ContentLayout } from '^layouts/ContentLayout';
import { useForm } from 'react-hook-form';
import { getOrgMainLayout } from '^layouts/org/mainLayout';

export const UserEditPageRoute: PageRoute = {
  pathname: '/users/edit',
  path: () => UserEditPageRoute.pathname,
};

const UserEditPage = () => {
  const currentUser = useCurrentUser();
  const userInfoForm = useForm();

  const UpdateUserHandler = (dto: any) => {
    console.log(dto);
  };

  return (
    <ContentLayout title="Profile Setting">
      <ContentForm onSubmit={userInfoForm.handleSubmit(UpdateUserHandler)}>
        <ContentPanel title="ACCOUNT DETAILS">
          <ContentPanelList>
            <ContentPanelInput
              title="Name"
              text="Your full name"
              required={true}
              // lastItem={true}
            >
              <TextInput
                required={true}
                {...userInfoForm.register('slug', {
                  required: true,
                })}
              />
            </ContentPanelInput>
          </ContentPanelList>
        </ContentPanel>
      </ContentForm>

      <ContentPanel title="비밀번호 변경">
        <ContentPanelList>
          <ContentPanelItem>
            <div className="flex-1">
              <ContentPanelItemTitle text="Remove Organization" />
              <ContentPanelItemText text="Removing this organization will delete all data including teams and their associated events." />
            </div>
            <div className="flex-1 text-end">
              <button className="btn btn-error text-white">
                비밀번호 변경
              </button>
            </div>
          </ContentPanelItem>
        </ContentPanelList>
      </ContentPanel>
    </ContentLayout>
  );
};

UserEditPage.getLayout = getOrgMainLayout;

export default UserEditPage;
