import {draftInvoiceAccount} from '^api/invoiceAccount.api';
import {atom, useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {CreateInvoiceAccountRequestDto, InvoiceAccountDto} from '^types/invoiceAccount.type';
import {useTranslation} from 'next-i18next';
import {draftAccountAtom, draftBillingHistoriesAtom, gmailItemsLoadedAtom, gmailItemsLoadingAtom} from '../pageAtoms';
import {dateSortBy, dayAfter, monthBefore} from '^components/util/date';
import {InvoiceAppDto} from '^types/invoiceApp.type';
import {BillingHistoryDto} from '^types/billing.type';
import {useCallback} from 'react';
import {deepCopy} from '^utils/object';

const draftQueryAtom = atom<CreateInvoiceAccountRequestDto | null>({
    key: 'draftQueryAtom',
    default: null,
});

const draftSearchFromAtom = atom<Date | null>({
    key: 'draftSearchFromAtom',
    default: null,
});

export const useDraft = () => {
    const setDraftAccount = useSetRecoilState(draftAccountAtom);
    const [billingHistories, setBillingHistories] = useRecoilState(draftBillingHistoriesAtom);
    const setIsLoading = useSetRecoilState(gmailItemsLoadingAtom);
    const setIsLoaded = useSetRecoilState(gmailItemsLoadedAtom);
    const setDraftSearchFrom = useSetRecoilState(draftSearchFromAtom);
    const [draftQuery, setDraftQuery] = useRecoilState(draftQueryAtom);
    const {t} = useTranslation('publicTasting');

    const appendDraftAccount = useCallback((draftAccount: InvoiceAccountDto) => {
        setDraftAccount((account) => {
            if (!account) {
                const invoiceApps = mergeInvoiceApps([], draftAccount.invoiceApps || []);
                return {...draftAccount, invoiceApps} as InvoiceAccountDto;
            } else {
                const invoiceApps = mergeInvoiceApps(account.invoiceApps || [], draftAccount.invoiceApps || []);
                return {...account, invoiceApps} as InvoiceAccountDto;
            }
        });
    }, []);

    const appendBillingHistories = useCallback((billingHistories: BillingHistoryDto[]) => {
        const list = billingHistoryListReady(billingHistories);
        setBillingHistories((histories) => {
            return sortHistories([...histories, ...list]);
        });
    }, []);

    const fetchDraftAccount = async (query: CreateInvoiceAccountRequestDto) => {
        const draftAccount = await draftInvoiceAccount(query)
            .then((res) => {
                setDraftQuery(query);
                return res.data;
            })
            .catch(() => alert(t('something_went_to_wrong')));

        if (draftAccount) {
            const billingHistories = (draftAccount.invoiceApps || []).map((app) => app.billingHistories).flat();

            appendDraftAccount(draftAccount);
            appendBillingHistories(billingHistories);
            setDraftSearchFrom(query.gmailQueryOptions.from);
            setIsLoading(false);
            setIsLoaded(true);
        }
    };

    const fetchMonthBefore = async (size: number) => {
        if (!draftQuery) return;

        const to = draftQuery.gmailQueryOptions.from;
        const query: CreateInvoiceAccountRequestDto = {
            ...draftQuery,
            gmailQueryOptions: {
                from: monthBefore(size, to),
                to,
            },
        };

        return fetchDraftAccount(query);
    };

    return {
        fetchDraftAccount,
        fetchMonthBefore,
        billingHistories,
    };
};

export const useDraftResult = () => {
    const draftAccount = useRecoilValue(draftAccountAtom);
    const billingHistories = useRecoilValue(draftBillingHistoriesAtom);
    const isLoading = useRecoilValue(gmailItemsLoadingAtom);
    const isLoaded = useRecoilValue(gmailItemsLoadedAtom);
    const query = useRecoilValue(draftQueryAtom);
    const draftSearchFrom = useRecoilValue(draftSearchFromAtom);
    const isEmpty = billingHistories.length === 0;

    const latestHistory = billingHistories[0];
    const oldestHistory = billingHistories[billingHistories.length - 1];

    return {
        query,
        draftSearchFrom,
        draftAccount,
        billingHistories,
        latestHistory,
        oldestHistory,
        isLoading,
        isLoaded,
        isEmpty,
    };
};

function mergeInvoiceApps(oldApps: InvoiceAppDto[], newApps: InvoiceAppDto[]): InvoiceAppDto[] {
    const protoIds = oldApps.map((app) => app.productId);
    const oldFoundApps = [...oldApps];
    const newFoundApps = newApps.filter((app) => !protoIds.includes(app.productId));

    const oldMergedApps = oldFoundApps.map((oldApp) => {
        const newApp = newApps.find((newApp) => newApp.productId === oldApp.productId);
        if (!newApp) return {...oldApp};
        const billingHistories = mergeBillingHistories(oldApp.billingHistories, newApp.billingHistories);
        return {...oldApp, billingHistories};
    });

    const newMergedApps = newFoundApps.map((newApp) => {
        const billingHistories = mergeBillingHistories([], newApp.billingHistories);
        return {...newApp, billingHistories};
    });

    return [...oldMergedApps, ...newMergedApps];
}

function mergeBillingHistories(oldHistories: BillingHistoryDto[], newHistories: BillingHistoryDto[]) {
    const oldHistoryUIDs = oldHistories.map((his) => his.emailContent!.id);
    const notDuplicatedList = newHistories.filter((his) => !oldHistoryUIDs.includes(his.emailContent!.id));
    const newHistoryList = billingHistoryListReady(notDuplicatedList);
    return sortHistories([...oldHistories, ...newHistoryList]);
}

function billingHistoryListReady(histories: BillingHistoryDto[]) {
    return histories.map(billingHistoryReady).filter((e) => e) as BillingHistoryDto[];
}

function billingHistoryReady(history: BillingHistoryDto) {
    if (!history) return;

    const email = history.emailContent;
    if (!email) return;

    const copiedHistory = deepCopy(history);
    copiedHistory.issuedAt = new Date(history.issuedAt);
    copiedHistory.emailContent!.metadata.date = new Date(email.metadata.date);
    return copiedHistory;
}

function sortHistories(items: BillingHistoryDto[]) {
    if (items.length < 1) return items;

    return items.sort(dateSortBy('DESC', (history) => new Date(history?.issuedAt)));
}
