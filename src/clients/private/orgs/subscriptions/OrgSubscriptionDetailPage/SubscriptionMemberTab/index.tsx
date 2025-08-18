import {ApiError, errorToast} from '^api/api';
import {useOrgIdParam} from '^atoms/common';
import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import {useCurrentSubscription} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/atom';
import {confirm2, confirmed} from '^components/util/dialog';
import {useDestroyAllSubscriptionSeat, useSubscriptionSeat} from '^models/SubscriptionSeat/hook';
import {SubscriptionSeatStatus} from '^models/SubscriptionSeat/type';
import {MinusCircle, Plus} from 'lucide-react';
import {useTranslation} from 'next-i18next';
import {memo, useState} from 'react';
import {toast} from 'react-hot-toast';
import {MemberStatusScopeHandler} from '../SubscriptionMemberTab/MemberStatusScopeHandler';
import {SubscriptionSeatStatusSection} from '../SubscriptionMemberTab/SubscriptionSeatStatusSection';
import {SubscriptionTeamMemberSelectModal} from './SubscriptionTeamMemberSelect';
import {TeamMemberInSubscriptionTableHeader} from './TeamMemberInSubscriptionTableHeader';
import {TeamMemberInSubscriptionTableRow} from './TeamMemberInSubscriptionTableRow';

/**
 * 구독 상세p > 시트탭
 */
export const SubscriptionMemberTab = memo(function SubscriptionMemberTab() {
    const {t} = useTranslation('subscription');
    const orgId = useOrgIdParam();
    const {currentSubscription: subscription} = useCurrentSubscription();

    if (!orgId || !subscription) return <></>;

    const {
        query,
        setQuery,
        data: subscriptionSeat,
        isLoading,
        isFetched,
        sortVal,
        orderBy,
    } = useSubscriptionSeat(orgId, subscription.id);
    const {mutateAsync: destroySubscriptionSeat} = useDestroyAllSubscriptionSeat();
    const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
    const [isOpened, setIsOpened] = useState(false);

    const teamMembers = subscriptionSeat?.items.filter((item) => item.teamMember);

    const onChangeScopeHandler = (status: SubscriptionSeatStatus | null) => {
        setSelectedMembers([]);

        if (!status) {
            setQuery({
                relations: ['teamMember', 'teamMember.teams'],
                order: {id: 'DESC'},
            });
        } else
            setQuery({
                ...query,
                order: {id: 'DESC'},
                where: {status},
            });
    };

    const changePageSize = (itemsPerPage: number) => {
        setQuery((prev) => ({
            ...prev,
            page: 1,
            itemsPerPage,
        }));
    };

    const movePage = (page: number) => {
        setQuery((prev) => ({
            ...prev,
            page,
        }));
    };

    const onDeleteMembers = (targetMembers: number[]) => {
        confirmed(
            confirm2(
                t('detail.memberTab.disconnectConfirm.title'),
                <div dangerouslySetInnerHTML={{__html: t('detail.memberTab.disconnectConfirm.message')}} />,
                'warning',
                {
                    showLoaderOnConfirm: true,
                    preConfirm: async () => {
                        try {
                            await destroySubscriptionSeat({orgId, subscriptionId: subscription.id, ids: targetMembers});
                            setSelectedMembers([]);
                            toast.success(t('detail.memberTab.disconnectConfirm.success'));
                        } catch (e) {
                            errorToast(e as ApiError);
                        }
                    },
                    customClass: {
                        loader: 'mx-auto',
                    },
                },
            ),
        ).catch(errorToast);
    };

    return (
        <div className={'py-4 space-y-4'}>
            <SubscriptionSeatStatusSection />

            <div className={'flex justify-between'}>
                <MemberStatusScopeHandler onSearch={onChangeScopeHandler} />
                <button className={'btn btn-outline btn-sm text-14 bg-white'} onClick={() => setIsOpened(true)}>
                    <Plus />
                    &nbsp;{t('detail.memberTab.addMember')}
                </button>
            </div>

            <ListTableContainer
                pagination={subscriptionSeat.pagination}
                movePage={movePage}
                changePageSize={changePageSize}
                unit={t('detail.memberTab.unit')}
                isNotLoaded={!isFetched}
                isLoading={isLoading}
                isEmptyResult={subscriptionSeat.pagination.totalItemCount === 0 && !isLoading}
                emptyMessage={t('detail.memberTab.emptyMessage')}
                emptyButtonText={t('detail.memberTab.emptyButtonText')}
                EmptyButtons={() => (
                    <button className={'btn btn-outline btn-sm text-14 bg-white'} onClick={() => setIsOpened(true)}>
                        <Plus />
                        &nbsp;{t('detail.memberTab.addMember')}
                    </button>
                )}
                TopMenu={
                    selectedMembers.length > 0
                        ? () => (
                              <div className="flex items-stretch border border-gray-200 rounded-md shadow-sm">
                                  <div className="text-sm py-1 px-2">
                                      {t('detail.memberTab.selectedMembers', {count: selectedMembers.length})}
                                  </div>
                                  <button
                                      onClick={() => onDeleteMembers(selectedMembers)}
                                      className="border-l border-gray-200 py-1 px-2 hover:bg-gray-100"
                                  >
                                      <MinusCircle className="size-4 text-red-500" />
                                  </button>
                              </div>
                          )
                        : undefined
                }
            >
                <ListTable
                    items={teamMembers}
                    isLoading={false}
                    Header={() => (
                        <TeamMemberInSubscriptionTableHeader
                            sortVal={sortVal}
                            orderBy={orderBy}
                            allSelected={selectedMembers.length > 0 && selectedMembers.length === teamMembers.length}
                            onAllSelect={() =>
                                setSelectedMembers((prev) =>
                                    prev.length === teamMembers.length ? [] : teamMembers.map((item) => item.id),
                                )
                            }
                        />
                    )}
                    Row={({item}) => (
                        <TeamMemberInSubscriptionTableRow
                            key={item.id}
                            seat={item}
                            reload={() => {}}
                            selected={selectedMembers.includes(item.id)}
                            onSelect={(value: boolean) =>
                                setSelectedMembers((prev) =>
                                    value ? [...prev, item.id] : prev.filter((v) => v !== item.id),
                                )
                            }
                            onDelete={() => onDeleteMembers([item.id])}
                        />
                    )}
                />
            </ListTableContainer>

            <SubscriptionTeamMemberSelectModal
                isOpened={isOpened}
                onClose={() => {
                    setIsOpened(false);
                }}
                onCreate={() => {
                    setIsOpened(false);
                }}
            />
        </div>
    );
});
