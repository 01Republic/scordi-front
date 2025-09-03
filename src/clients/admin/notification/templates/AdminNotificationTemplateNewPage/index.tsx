import {memo} from 'react';
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {AdminDetailPageLayout, AdminPageContainer} from '^admin/layouts';
import {AdminNotificationTemplateListPageRoute} from '^pages/admin/notification/templates';
import {AdminNotificationTemplateDetailPageRoute} from '^pages/admin/notification/templates/[id]';
import {adminNotificationTemplatesApi} from '^models/_notification/NotificationTemplate/api';
import {CreateNotificationTemplateRequestDto} from '^models/_notification/NotificationTemplate/types';
import {ContentForm, ContentPanel, ContentPanelInput, ContentPanelList} from '^layouts/ContentLayout';
import {TextInput} from '^components/TextInput';

export const AdminNotificationTemplateNewPage = memo(function AdminNotificationTemplateNewPage() {
    const router = useRouter();
    const form = useForm<CreateNotificationTemplateRequestDto>({
        defaultValues: {
            activatedAt: null,
        },
    });

    const onSubmit = (dto: CreateNotificationTemplateRequestDto) => {
        adminNotificationTemplatesApi
            .create(dto)
            .then((res) => {
                toast.success('생성 완료');
                const template = res.data;
                return router.replace(AdminNotificationTemplateDetailPageRoute.path(template.id));
            })
            .catch(errorToast);
    };

    return (
        <AdminDetailPageLayout
            title="새 알림 등록"
            breadcrumbs={[
                {text: '알림 관리'},
                {text: '알림 목록', href: AdminNotificationTemplateListPageRoute.path()},
                {text: '새 알림 등록'},
            ]}
        >
            <AdminPageContainer>
                <ContentForm onSubmit={form.handleSubmit(onSubmit)}>
                    <ContentPanel title="일반 정보">
                        <ContentPanelList>
                            <ContentPanelInput title={'알림 이름'} required={true}>
                                <TextInput required {...form.register('title')} />
                            </ContentPanelInput>
                            <ContentPanelInput title={'구분키'} required={true}>
                                <TextInput required {...form.register('about')} />
                            </ContentPanelInput>
                        </ContentPanelList>
                    </ContentPanel>

                    <ContentPanel title="알림 내용">
                        <ContentPanelList>
                            <ContentPanelInput title={'제목'} required={true}>
                                <TextInput required {...form.register('titleTemplate')} />
                            </ContentPanelInput>
                            <ContentPanelInput title={'본문'} required={true}>
                                <TextInput required {...form.register('contentTemplate')} />
                            </ContentPanelInput>
                        </ContentPanelList>
                    </ContentPanel>
                </ContentForm>
            </AdminPageContainer>
        </AdminDetailPageLayout>
    );
});
