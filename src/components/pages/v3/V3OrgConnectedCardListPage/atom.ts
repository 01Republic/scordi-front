import {atom, useRecoilState} from 'recoil';
import {codefAccountApi} from '^models/CodefAccount/api';
import {resourceAtoms, useResource2} from '^hooks/useResource';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {useConnectedCodefCards, useNewCodefCards, useSubscriptionsForCodefAccount} from '^models/CodefCard/hook';
import {codefAccountIdParamState} from '^atoms/common';
import {ApiErrorResponse} from '^api/api';
import {CodefApiResultCode, CodefResponse} from '^models/CodefAccount/codef-common';
import {toast} from 'react-hot-toast';
import {useRouter} from 'next/router';
import {router} from 'next/client';

export enum CardListPageMode {
    ConnectedCards,
    NewCards,
    IsLoading,
}

export const cardListPageModeAtom = atom<CardListPageMode>({
    key: 'cardListPageMode',
    default: CardListPageMode.IsLoading,
});

export const reloadingDataAtom = atom({
    key: 'reloadingDataAtom',
    default: false,
});

const codefAccountPageSubjectAtoms = resourceAtoms<CodefAccountDto>({
    key: 'codefAccountPageSubjectAtoms',
});

export const useCodefAccountPageSubject = () => {
    const showCodefAccount = (orgId: number, id: number) => codefAccountApi.show(orgId, id).then((res) => res.data);
    const hook = useResource2(codefAccountPageSubjectAtoms, showCodefAccount);
    const connectMethod = CardAccountsStaticData.findOne(hook.data?.organization);

    return {...hook, connectMethod};
};

export const useConnectedCardListPageData = () => {
    const router = useRouter();
    const {search: fetchNewCodefCards, reload: refreshNewCodefCards} = useNewCodefCards(codefAccountIdParamState);
    const {search: fetchConnectedCodefCards, reload: refreshConnectedCodefCards} =
        useConnectedCodefCards(codefAccountIdParamState);
    const {search: fetchAccountSubscriptions, reload: refreshAccountSubscriptions} =
        useSubscriptionsForCodefAccount(codefAccountIdParamState);
    const [reloading, setReloading] = useRecoilState(reloadingDataAtom);

    const search = (codefAccountId: number) => {
        const req = fetchConnectedCodefCards(
            {
                relations: ['creditCard'],
                where: {accountId: codefAccountId},
                sync: false,
                connected: true,
            },
            false,
        );
        fetchNewCodefCards(
            {
                where: {accountId: codefAccountId, isSleep: false},
                sync: true,
                connected: false,
            },
            false,
        )
            .then((res) => {
                console.log('res', res);
                return res;
            })
            .catch((err: ApiErrorResponse<CodefResponse<any>>) => {
                console.log('err', err);
                const apiError = err.response?.data;
                if (!apiError) return;

                const codefError = apiError.data;
                console.log('codefError', codefError);
                if (!codefError) return console.error('[codef] codefError is not defined.', err);

                if (!codefError.result) {
                    /**
                     * 이 곳에서는 순수하게 스코디 비즈니스로직에 의해 발생된 예외만 다룹니다.
                     * 코드에프에서 전달받은 예외는 else 범위 내에서 분기하여 처리됩니다.
                     */
                    // at least, Unhandled
                    const msg = `[codef] Scordi service exception erupted.\nIt must be handled by catch scope`;
                    console.warn(msg, codefError);
                    return;
                } else {
                    /**
                     * 이 곳에서는 순수하게 코드에프로부터 전달받은 예외에 대해서만 다룹니다.
                     */
                    console.warn(`[codef] ${codefError.result.message}`, codefError);
                    toast.error(codefError.result.message);
                    if (codefError.result.code == CodefApiResultCode.LOGIN_PARAMETER_LOST) {
                        router.back();
                    }
                }
                console.log('err', err);
            });
        fetchAccountSubscriptions({}, false);

        return req;
    };

    const reload = () => {
        setReloading(true);
        return Promise.allSettled([
            refreshNewCodefCards(),
            refreshConnectedCodefCards(),
            refreshAccountSubscriptions(),
        ]).then(() => setReloading(false));
    };

    return {search, reload, reloading};
};
