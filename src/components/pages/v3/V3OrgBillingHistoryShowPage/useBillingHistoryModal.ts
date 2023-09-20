import {useState} from 'react';
import {useRecoilState} from 'recoil';
import {getBillingHistories, getBillingHistory} from '^api/billing.api';
import {useModal} from '^v3/share/modals/useModal';
import {billingHistoryDetailState, billingHistoryPagedState, billingHistoryShowModal} from './atom';
import {GetBillingHistoriesParams} from '^types/billing.type';
import {BillingHistoryManager} from '^models/BillingHistory';

export const useBillingHistoryInModal = () => {
    const [billingHistory, setBillingHistory] = useRecoilState(billingHistoryDetailState);
    const [isLoading, setIsLoading] = useState(false);

    const loadData = (id: number) => {
        setIsLoading(true);
        getBillingHistory(id)
            .then((res) => setBillingHistory(res.data))
            .finally(() => setIsLoading(false));
    };

    return {billingHistory, setBillingHistory, isLoading, setIsLoading, loadData};
};

export const useBillingHistoriesInModal = () => {
    const [billingHistoriesPage, setBillingHistoriesPage] = useRecoilState(billingHistoryPagedState);
    const [isLoading, setIsLoading] = useState(false);

    const loadData = (params: GetBillingHistoriesParams = {}) => {
        setIsLoading(true);
        getBillingHistories(params)
            .then((res) => {
                const items = BillingHistoryManager.init(res.data.items).validateToListing().sortByIssue('DESC');
                setBillingHistoriesPage({...res.data, items: items.all()});
            })
            .finally(() => setIsLoading(false));
    };

    return {billingHistoriesPage, setBillingHistoriesPage, isLoading, setIsLoading, loadData};
};

export const useBillingHistoryModal = () => {
    const {open} = useModal(billingHistoryShowModal);
    const {loadData: loadSubjectHistory} = useBillingHistoryInModal();
    const {loadData: loadSiblingHistories} = useBillingHistoriesInModal();

    const showModal = (billingHistoryId: number, subscriptionId: number) => {
        open();
        loadSubjectHistory(billingHistoryId);
        loadSiblingHistories({where: {subscriptionId}});
    };

    return {showModal};
};
