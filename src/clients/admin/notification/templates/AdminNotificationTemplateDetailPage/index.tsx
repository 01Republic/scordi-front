import {memo, useEffect} from 'react';
import {useQuery} from '@tanstack/react-query';
import {useIdParam} from '^atoms/common';
import {AdminDetailPageLayout, AdminPageContainer} from '^admin/layouts';
import {AdminNotificationTemplateListPageRoute} from '^pages/admin/notification/templates';
import {adminNotificationTemplatesApi} from '^models/_notification/NotificationTemplate/api';
import {useForm} from 'react-hook-form';
import {UpdateNotificationTemplateRequestDto} from '^models/_notification/NotificationTemplate/types';
import {toast} from 'react-hot-toast';
import {ContentForm, ContentPanel, ContentPanelInput, ContentPanelList} from '^layouts/ContentLayout';
import {TextInput} from '^components/TextInput';

export const AdminNotificationTemplateDetailPage = memo(function AdminNotificationTemplateDetailPage() {
    const id = useIdParam('id');
    const {data: template, refetch} = useQuery({
        queryKey: ['notification-template/show', id],
        queryFn: () => adminNotificationTemplatesApi.show(id).then((res) => res.data),
        enabled: !!id,
    });

    const form = useForm<UpdateNotificationTemplateRequestDto>();

    useEffect(() => {
        if (!template) return;
        form.setValue('title', template.title);
        form.setValue('about', template.about);
        form.setValue('titleTemplate', template.titleTemplate);
        form.setValue('contentTemplate', template.contentTemplate);
    }, [template]);

    const onSubmit = (dto: UpdateNotificationTemplateRequestDto) => {
        adminNotificationTemplatesApi
            .update(id, dto)
            .then(() => toast.success('수정 완료'))
            .then(() => refetch());
    };

    const title = `#${id} ${template?.title || ''}`;

    return (
        <AdminDetailPageLayout
            title={title}
            breadcrumbs={[
                {text: '알림 관리'},
                {text: '알림 목록', href: AdminNotificationTemplateListPageRoute.path()},
                {text: title},
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
