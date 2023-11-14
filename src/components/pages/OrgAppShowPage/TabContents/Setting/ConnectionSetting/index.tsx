import {memo, useEffect} from 'react';
import {useCurrentSubscription} from '^models/Subscription/hook';
import {useForm} from 'react-hook-form';
import {UpdateSubscriptionRequestDto as UpdateDto} from 'src/models/Subscription/types';
import {ContentForm, ContentPanel, ContentPanelInput, ContentPanelList} from '^layouts/ContentLayout';
import {TextInput} from '^components/TextInput';
import {DangerPanel} from './DangerPanel';

export const ConnectionSetting = memo(() => {
    const {currentSubscription: subscription} = useCurrentSubscription();
    const form = useForm<UpdateDto>();

    useEffect(() => {
        if (!subscription) return;

        form.setValue('connectStatus', subscription.connectStatus);
        // form.setValue('displayName', subscription.displayName);
        // form.setValue('isFreeTier', subscription.isFreeTier);
        // form.setValue('registeredAt', subscription.registeredAt);
        // form.setValue('paidMemberCount', subscription.paidMemberCount);
    }, [subscription]);

    const onSubmit = (data: UpdateDto) => {
        console.log(data);
    };

    return (
        <div>
            <ContentForm onSubmit={form.handleSubmit(onSubmit)}>
                <ContentPanel>
                    <ContentPanelList>
                        <ContentPanelInput title="연동상태">
                            <TextInput placeholder="" {...form.register('connectStatus')} />
                        </ContentPanelInput>
                        {/*<ContentPanelInput title="조직이름">*/}
                        {/*    <TextInput placeholder="" {...form.register('displayName')} />*/}
                        {/*</ContentPanelInput>*/}
                        {/*<ContentPanelInput title="프리티어 여부">*/}
                        {/*    <TextInput placeholder="" {...form.register('isFreeTier')} />*/}
                        {/*</ContentPanelInput>*/}
                        {/*<ContentPanelInput title="사용시작일">*/}
                        {/*    <TextInput placeholder="" {...form.register('registeredAt')} />*/}
                        {/*</ContentPanelInput>*/}
                        {/*<ContentPanelInput title="결제되는 사용자 수">*/}
                        {/*    <TextInput placeholder="" {...form.register('paidMemberCount')} />*/}
                        {/*</ContentPanelInput>*/}
                    </ContentPanelList>
                </ContentPanel>
            </ContentForm>

            <DangerPanel />
        </div>
    );
});
