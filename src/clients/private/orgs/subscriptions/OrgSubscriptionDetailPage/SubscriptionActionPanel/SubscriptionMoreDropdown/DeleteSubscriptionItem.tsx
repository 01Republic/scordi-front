import {errorToast} from '^api/api';
import {MoreDropdownMenuItem} from '^clients/private/_components/rest-pages/ShowPage/MoreDropdown';
import {confirm2, confirmed} from '^components/util/dialog';
import {useRemoveSubscription, useSubscriptionTableListAtom} from '^models/Subscription/hook';
import {OrgSubscriptionListPageRoute} from '^pages/orgs/[id]/subscriptions';
import {useTranslation} from 'next-i18next';
import {useRouter} from 'next/router';
import {memo} from 'react';
import {toast} from 'react-hot-toast';
import {useCurrentSubscription} from '../../atom';

export const DeleteSubscriptionItem = memo(() => {
    const {currentSubscription: subscription} = useCurrentSubscription();
    const router = useRouter();
    const {reload} = useSubscriptionTableListAtom();
    const {mutate: deleteSubscription} = useRemoveSubscription();
    const {t} = useTranslation('subscription');

    if (!subscription) return <></>;

    const onClick = async () => {
        const {id, organizationId} = subscription;

        const removeConfirm = () =>
            confirm2(
                t('delete.confirmTitle'),
                <div className="text-16" dangerouslySetInnerHTML={{__html: t('delete.confirmMessage')}} />,
                'warning',
            );

        return confirmed(removeConfirm())
            .then(() => deleteSubscription(id))
            .then(() => toast.success(t('delete.success')))
            .then(() => router.replace(OrgSubscriptionListPageRoute.path(organizationId)))
            .then(() => reload())
            .catch(errorToast);
    };

    return (
        <MoreDropdownMenuItem onClick={onClick} theme="danger">
            {t('table.actions.delete')}
        </MoreDropdownMenuItem>
    );
    // return (
    //     <LinkTo
    //         className="btn btn-square !bg-white border border-slate-300 rounded-md hover:border-slate-400 hover:shadow transition-all mb-1"
    //         onClick={onClick}
    //     >
    //         <CgTrash fontSize={20} color={'red'} />
    //     </LinkTo>
    // );
});
