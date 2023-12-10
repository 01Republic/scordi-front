import React, {memo, useEffect} from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {SubscriptionListViewMode, subscriptionListViewModeState} from './atom';
import {SubscriptionTable} from './SubscriptionTable';
import {SubscriptionCardList} from './SubscriptionCardList';
import {useSubscriptionsV2} from '^models/Subscription/hook';
import {orgIdParamState} from '^atoms/common';
import {tagOptionsState} from '^v3/V3OrgAppsPage/SubscriptionListSection/SubscriptionTable/SubscriptionTr/columns/PayingType/PayingTypeSelect';
import {usePayingTypeTags} from '^models/Tag/hook';

export const SubscriptionListSection = memo(function SubscriptionListSection() {
    const [viewMode, setViewMode] = useRecoilState(subscriptionListViewModeState);
    const {search: getTags} = usePayingTypeTags();
    const {search: getSubscriptions, result} = useSubscriptionsV2();
    const setTagOptions = useSetRecoilState(tagOptionsState);
    const orgId = useRecoilValue(orgIdParamState);

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;

        getSubscriptions({
            where: {organizationId: orgId},
            relations: ['master', 'teamMembers'],
            itemsPerPage: 0,
        });

        getTags({}).then((res) => setTagOptions(res.items));
    }, [orgId]);

    return (
        <>
            <section className="flex items-center mb-4">
                <div></div>
                <div className="ml-auto flex gap-1">
                    <div
                        onClick={() => setViewMode(SubscriptionListViewMode.Cards)}
                        className={`p-1 rounded-btn cursor-pointer transition-all btn-animation hover:bg-gray-200 ${
                            viewMode === SubscriptionListViewMode.Cards ? 'bg-gray-200' : ''
                        }`}
                    >
                        <svg
                            role="graphics-symbol"
                            viewBox="0 0 16 16"
                            className="collectionGallery"
                            style={{
                                height: '20px',
                                display: 'block',
                                fill: 'inherit',
                                flexShrink: 0,
                            }}
                        >
                            <path d="M2.0542 7.75952H5.96973C7.00464 7.75952 7.50562 7.25854 7.50562 6.19727V3.58691C7.50562 2.53223 7.00464 2.03125 5.96973 2.03125H2.0542C1.01929 2.03125 0.518311 2.53223 0.518311 3.58691V6.19727C0.518311 7.25854 1.01929 7.75952 2.0542 7.75952ZM10.0303 7.75952H13.9392C14.9741 7.75952 15.4751 7.25854 15.4751 6.19727V3.58691C15.4751 2.53223 14.9741 2.03125 13.9392 2.03125H10.0303C8.98877 2.03125 8.48779 2.53223 8.48779 3.58691V6.19727C8.48779 7.25854 8.98877 7.75952 10.0303 7.75952ZM2.06079 6.55322C1.83008 6.55322 1.71802 6.44116 1.71802 6.20386V3.58032C1.71802 3.34961 1.83008 3.23755 2.06079 3.23755H5.96313C6.18726 3.23755 6.30591 3.34961 6.30591 3.58032V6.20386C6.30591 6.44116 6.18726 6.55322 5.96313 6.55322H2.06079ZM10.0369 6.55322C9.79956 6.55322 9.69409 6.44116 9.69409 6.20386V3.58032C9.69409 3.34961 9.79956 3.23755 10.0369 3.23755H13.9392C14.1633 3.23755 14.2754 3.34961 14.2754 3.58032V6.20386C14.2754 6.44116 14.1633 6.55322 13.9392 6.55322H10.0369ZM2.0542 14.4634H5.96973C7.00464 14.4634 7.50562 13.969 7.50562 12.9077V10.2974C7.50562 9.24268 7.00464 8.7417 5.96973 8.7417H2.0542C1.01929 8.7417 0.518311 9.24268 0.518311 10.2974V12.9077C0.518311 13.969 1.01929 14.4634 2.0542 14.4634ZM10.0303 14.4634H13.9392C14.9741 14.4634 15.4751 13.969 15.4751 12.9077V10.2974C15.4751 9.24268 14.9741 8.7417 13.9392 8.7417H10.0303C8.98877 8.7417 8.48779 9.24268 8.48779 10.2974V12.9077C8.48779 13.969 8.98877 14.4634 10.0303 14.4634ZM2.06079 13.2637C1.83008 13.2637 1.71802 13.1516 1.71802 12.9143V10.2974C1.71802 10.0601 1.83008 9.94141 2.06079 9.94141H5.96313C6.18726 9.94141 6.30591 10.0601 6.30591 10.2974V12.9143C6.30591 13.1516 6.18726 13.2637 5.96313 13.2637H2.06079ZM10.0369 13.2637C9.79956 13.2637 9.69409 13.1516 9.69409 12.9143V10.2974C9.69409 10.0601 9.79956 9.94141 10.0369 9.94141H13.9392C14.1633 9.94141 14.2754 10.0601 14.2754 10.2974V12.9143C14.2754 13.1516 14.1633 13.2637 13.9392 13.2637H10.0369Z" />
                        </svg>
                    </div>

                    <div
                        onClick={() => setViewMode(SubscriptionListViewMode.Table)}
                        className={`p-1 rounded-btn cursor-pointer transition-all btn-animation hover:bg-gray-200 ${
                            viewMode === SubscriptionListViewMode.Table ? 'bg-gray-200' : ''
                        }`}
                    >
                        <svg
                            role="graphics-symbol"
                            viewBox="0 0 16 16"
                            className="collectionList"
                            style={{
                                height: '20px',
                                display: 'block',
                                fill: 'inherit',
                                flexShrink: 0,
                            }}
                        >
                            <path d="M2.08716 5.15576C2.64087 5.15576 3.08911 4.70752 3.08911 4.15381C3.08911 3.6001 2.64087 3.15186 2.08716 3.15186C1.53345 3.15186 1.08521 3.6001 1.08521 4.15381C1.08521 4.70752 1.53345 5.15576 2.08716 5.15576ZM5.29736 4.85254H14.2161C14.605 4.85254 14.9148 4.54272 14.9148 4.15381C14.9148 3.76489 14.605 3.45508 14.2161 3.45508H5.29736C4.90845 3.45508 4.59863 3.7583 4.59863 4.15381C4.59863 4.54272 4.90186 4.85254 5.29736 4.85254ZM2.08716 9.24927C2.64087 9.24927 3.08911 8.80103 3.08911 8.24731C3.08911 7.6936 2.64087 7.24536 2.08716 7.24536C1.53345 7.24536 1.08521 7.6936 1.08521 8.24731C1.08521 8.80103 1.53345 9.24927 2.08716 9.24927ZM5.29736 8.94604H14.2161C14.605 8.94604 14.9148 8.64282 14.9148 8.24731C14.9148 7.8584 14.605 7.54858 14.2161 7.54858H5.29736C4.90845 7.54858 4.59863 7.8584 4.59863 8.24731C4.59863 8.63623 4.90186 8.94604 5.29736 8.94604ZM2.08716 13.3428C2.64087 13.3428 3.08911 12.8945 3.08911 12.3408C3.08911 11.7937 2.64087 11.3389 2.08716 11.3389C1.53345 11.3389 1.08521 11.7937 1.08521 12.3408C1.08521 12.8945 1.53345 13.3428 2.08716 13.3428ZM5.29736 13.0396H14.2161C14.605 13.0396 14.9148 12.7363 14.9148 12.3408C14.9148 11.9519 14.605 11.6487 14.2161 11.6487H5.29736C4.90845 11.6487 4.59863 11.9519 4.59863 12.3408C4.59863 12.7297 4.90186 13.0396 5.29736 13.0396Z" />
                        </svg>
                    </div>
                </div>
            </section>

            <section>
                {viewMode === SubscriptionListViewMode.Cards && <SubscriptionCardList items={result.items} />}
                {viewMode === SubscriptionListViewMode.Table && <SubscriptionTable items={result.items} />}
            </section>
        </>
    );
});
