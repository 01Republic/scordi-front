import {atom, useRecoilState} from 'recoil';
import {codefAccountApi} from '^models/CodefAccount/api';
import {resourceAtoms, useResource2} from '^hooks/useResource';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {useConnectedCodefCards, useNewCodefCards, useSubscriptionsForCodefAccount} from '^models/CodefCard/hook';
import {codefAccountIdParamState} from '^atoms/common';

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
        );
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
