import {useState} from 'react';
import {useRecoilState} from 'recoil';
import {getBillingHistories, getBillingHistory} from '^api/billing.api';
import {useModal} from '^v3/share/modals/useModal';
import {GetBillingHistoriesParams} from '^types/billing.type';
import {BillingHistoryManager} from '^models/BillingHistory';
import {
    billingHistoryDetailStateInShowModal,
    billingHistoryPagedStateInShowModal,
    billingHistoryShowModal,
} from './atom';

/**
 * 결제내역 상세모달 호출
 */
export const useBillingHistoryModal = () => {
    const {open, ...res} = useModal(billingHistoryShowModal);
    const {loadData: loadSubjectHistory} = useBillingHistoryInModal();
    const {loadData: loadSiblingHistories} = useBillingHistoriesInModal();

    const showModal = (billingHistoryId: number, subscriptionId: number) => {
        open();
        loadSubjectHistory(billingHistoryId);
        loadSiblingHistories({where: {subscriptionId}});
    };

    return {showModal, ...res};
};

/**
 * [결제내역 상세모달에서] 대상 결제내역 세부 정보 조회
 */
export const useBillingHistoryInModal = () => {
    const [billingHistory, setBillingHistory] = useRecoilState(billingHistoryDetailStateInShowModal);
    const [isLoading, setIsLoading] = useState(false);

    const loadData = (id: number) => {
        setIsLoading(true);
        getBillingHistory(id)
            .then((res) => setBillingHistory(res.data))
            .finally(() => setIsLoading(false));
    };

    return {billingHistory, setBillingHistory, isLoading, setIsLoading, loadData};
};

/**
 * [결제내역 상세모달에서] 해당 구독의 전체 결제내역 조회 (paginated)
 */
export const useBillingHistoriesInModal = () => {
    const [pagedHistories, setPagedHistories] = useRecoilState(billingHistoryPagedStateInShowModal);
    const [isLoading, setIsLoading] = useState(false);

    const loadData = (params: GetBillingHistoriesParams = {}) => {
        setIsLoading(true);
        getBillingHistories(params)
            .then((res) => {
                const items = BillingHistoryManager.init(res.data.items).validateToListing().sortByIssue('DESC');
                setPagedHistories({...res.data, items: items.all()});
            })
            .finally(() => setIsLoading(false));
    };

    return {pagedHistories, setPagedHistories, isLoading, setIsLoading, loadData};
};
