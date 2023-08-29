import React, {memo, useCallback} from 'react';
import {useRouter} from 'next/router';
import Swal from 'sweetalert2';
import {destroySubscription} from '^api/subscription.api';
import {OrgAppIndexPageRoute} from '^pages/orgs/[id]/apps';
import {
    ContentPanel,
    ContentPanelItem,
    ContentPanelItemText,
    ContentPanelItemTitle,
    ContentPanelList,
} from '^layouts/ContentLayout';
import {useCurrentSubscription} from '^hooks/useSubscriptions';

export const DangerPanel = memo(() => {
    const router = useRouter();
    const {currentApplication: app} = useCurrentSubscription();

    const onDisconnect = useCallback((id: number) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'If you disconnect, It will be difficult to manage the app.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#0066FF',
            confirmButtonText: 'Disconnect',
        }).then((result) => {
            console.log(result);
            if (!result.isConfirmed) return;
            destroySubscription(id)
                .then((res) => {
                    Swal.fire('Disconnect!', 'Please go to the site and cancel the subscription.', 'success').then(() =>
                        router.push(OrgAppIndexPageRoute.path(id)),
                    );
                })
                .catch((error) => {
                    if (error.code === 'ERR_BAD_REQUEST') {
                        Swal.fire('Permission Error', 'Please check you permission.', 'error');
                    }
                });
        });
    }, []);

    if (!app) return <></>;

    return (
        <ContentPanel title="Danger Zone">
            <ContentPanelList>
                <ContentPanelItem>
                    <div className="flex-1">
                        <ContentPanelItemTitle text="이 앱을 스코디 전체에서 제거합니다." />
                        <ContentPanelItemText
                            text={`
                            <ul>
                              <li>앱을 삭제하면 스코디를 사용하는 <b>모든 조직의 구독이 삭제됩니다.</b></li>
                              <li><b>이 작업은 돌이킬 수 없습니다.</b> 신중하게 검토 후 삭제하세요!</li>
                            </ul>
                            `}
                        />
                    </div>
                    <div className="flex-1 text-end">
                        <button
                            type="button"
                            className="btn btn-error text-white capitalize"
                            onClick={() => onDisconnect(app.id)}
                        >
                            Disconnect This Subscription
                        </button>
                    </div>
                </ContentPanelItem>
            </ContentPanelList>
        </ContentPanel>
    );
});
