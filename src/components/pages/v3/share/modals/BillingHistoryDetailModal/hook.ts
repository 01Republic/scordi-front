import {useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {billingHistoryApi} from '^models/BillingHistory/api';
import {useModal} from '^v3/share/modals/useModal';
import {BillingHistoryManager} from '^models/BillingHistory/manager';
import {UpdateBillingHistoryRequestDtoV3} from '^models/BillingHistory/type/update-billing-history.request.dto.v2';
import {
    billingHistoryDetailStateInShowModal,
    billingHistoryPagedStateInShowModal,
    billingHistoryShowModal,
} from './atom';
import {orgIdParamState} from '^atoms/common';
import {GetBillingHistoriesParams} from '^models/BillingHistory/type';
import {useAlert} from '^hooks/useAlert';
import {useToast} from '^hooks/useToast';
import {useBillingHistoryListInSiblings} from '^models/BillingHistory/hook';

/**
 * 결제내역 상세모달 호출
 */
export const useBillingHistoryModal = () => {
    const organizationId = useRecoilValue(orgIdParamState);
    const {open, ...res} = useModal(billingHistoryShowModal);
    const {loadData: loadSubjectHistory} = useBillingHistoryInModal();
    const {search: loadSiblingHistories} = useBillingHistoryListInSiblings();

    const showModal = (billingHistoryId: number, subscriptionId: number) => {
        if (!organizationId) {
            alert('조직 아이디를 식별할 수 없습니다.');
            return;
        }
        open();
        loadSubjectHistory(billingHistoryId);
        loadSiblingHistories({
            where: {subscriptionId, organizationId},
            order: {issuedAt: 'DESC'},
        });
    };

    return {showModal, ...res};
};

/**
 * [결제내역 상세모달에서] 대상 결제내역 세부 정보 조회
 */
export const useBillingHistoryInModal = () => {
    const [billingHistory, setBillingHistory] = useRecoilState(billingHistoryDetailStateInShowModal);
    const [isLoading, setIsLoading] = useState(false);
    const {alert} = useAlert();
    const {toast} = useToast();

    const loadData = (id: number) => {
        setIsLoading(true);
        billingHistoryApi
            .show(id)
            .then((res) => setBillingHistory(res.data))
            .finally(() => setIsLoading(false));
    };

    /**
     * 24.01.04 Han
     * 아래 update, delete hook 들은
     * BillingHistory/hook/index.ts useBillingHistoryV2 코드와 동일합니다.
     * 해당 모달에서 추상화 레이어를 이전하기에 시간이 부족하여
     * 부득이하게 코드를 복.붙,,, 했습니다.
     */
    const updateBillingHistory = async (data: UpdateBillingHistoryRequestDtoV3) => {
        if (!billingHistory) {
            toast.error('알 수 없는 결제내역');
            return;
        }

        const {id} = billingHistory;

        setIsLoading(true);
        const res = billingHistoryApi.updateV3(id, data);
        res.then(() => toast.success('변경되었습니다.')).then(() => loadData(id));
        res.finally(() => setIsLoading(false));
        return res;
    };

    const deleteBillingHistory = async (onConfirm?: () => void) => {
        if (!billingHistory) {
            toast.error('알 수 없는 결제내역');
            return;
        }

        const {id} = billingHistory;

        return alert.destroy({
            title: '결제내역을 정말 삭제할까요?',
            showSuccessAlertOnFinal: false,
            onConfirm: async () => {
                setIsLoading(true);
                const res = billingHistoryApi.destroy(id);

                res.then(() => toast.success('삭제했습니다.')).then(() => {
                    onConfirm && onConfirm();
                    setBillingHistory(null);
                });
                res.finally(() => setIsLoading(false));
                return res;
            },
        });
    };

    return {
        billingHistory,
        setBillingHistory,
        isLoading,
        setIsLoading,
        loadData,
        updateBillingHistory,
        deleteBillingHistory,
    };
};

/**
 * [결제내역 상세모달에서] 해당 구독의 전체 결제내역 조회 (paginated)
 */
export const useBillingHistoriesInModal = () => {
    const [pagedHistories, setPagedHistories] = useRecoilState(billingHistoryPagedStateInShowModal);
    const [isLoading, setIsLoading] = useState(false);

    const loadData = (params: GetBillingHistoriesParams = {}) => {
        setIsLoading(true);
        billingHistoryApi
            .index(params)
            .then((res) => {
                const items = BillingHistoryManager.init(res.data.items).validateToListing().sortByIssue('DESC');
                setPagedHistories({...res.data, items: items.all()});
            })
            .finally(() => setIsLoading(false));
    };

    return {pagedHistories, setPagedHistories, isLoading, setIsLoading, loadData};
};
