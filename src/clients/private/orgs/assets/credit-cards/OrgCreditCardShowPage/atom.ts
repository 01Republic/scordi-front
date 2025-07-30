import {useEffect, useState} from 'react';
import {atom} from 'recoil';
import {AxiosResponse} from 'axios';
import {plainToInstance} from 'class-transformer';
import {padStart} from 'lodash';
import {toast} from 'react-hot-toast';
import {CreditCardDto, UnSignedCreditCardFormData, UpdateCreditCardDto} from '^models/CreditCard/type';
import {creditCardApi} from '^models/CreditCard/api';
import {useAltForm} from '^hooks/useAltForm';
import {errorNotify} from '^utils/toast-notify';
import {TeamDto} from '^models/Team/type';
import {useIdParam, useOrgIdParam} from '^atoms/common';
import {useCodefCardsOfCreditCardShow2} from '^models/CodefCard/hook';
import {useCodefCardSync} from '^models/CodefCard/hooks/useCodefCardSync';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {ErrorResponse} from '^models/User/types';
import {SUBSCRIPTION_HOOK_KEY} from '^models/Subscription/hook/key';
import {BILLING_HISTORY_HOOK_KEY} from '^models/BillingHistory/hook/key';

export const creditCardSubjectAtom = atom<CreditCardDto | null>({
    key: 'OrgCreditCardShowPage/creditCardSubjectAtom',
    default: null,
});

export const useCurrentCreditCard = () => {
    const orgId = useOrgIdParam();
    const creditCardId = useIdParam('creditCardId');
    const {data: currentCreditCard, refetch} = useQuery({
        queryKey: ['useCurrentCreditCard', orgId, creditCardId],
        queryFn: () => creditCardApi.show(orgId, creditCardId).then((res) => res.data),
        enabled: !!orgId && !!creditCardId,
    });

    return {currentCreditCard, reload: refetch};
};

export const useCurrentCodefCard = () => {
    const creditCardId = useIdParam('creditCardId');
    const queryResult = useCodefCardsOfCreditCardShow2(creditCardId);
    const {currentCodefCard} = queryResult;

    const isApiConnected = !!currentCodefCard;
    const isManuallyCreated = !isApiConnected;

    return {
        isManuallyCreated,
        ...queryResult,
    };
};

export const useCurrentCreditCardEdit = () => {
    const orgId = useOrgIdParam();
    const {currentCreditCard, reload} = useCurrentCreditCard();
    const {formData, setFormValue} = useAltForm(plainToInstance(UpdateCreditCardDto, {}));
    const [expiryValues, setExpiryValues] = useState<string[]>([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        if (currentCreditCard && !isEditMode) {
            const cardNumbers = currentCreditCard.numbers;
            setFormValue({
                name: currentCreditCard.name,
                isPersonal: currentCreditCard.isPersonal,
                isCreditCard: currentCreditCard.isCreditCard,
                usingStatus: currentCreditCard.usingStatus,
                memo: currentCreditCard.memo,
                number1: cardNumbers.number1,
                number2: cardNumbers.number2,
                number3: cardNumbers.number3,
                number4: cardNumbers.number4,
            });

            const {expireYear, expireMonth} = currentCreditCard;
            if (expireYear != null && expireMonth != null) {
                setExpiryValues([`${expireYear}`, padStart(`${expireMonth}`, 2, '0')]);
            } else {
                setExpiryValues([]);
            }
        }
    }, [currentCreditCard, isEditMode]);

    const handleResponse = (req: Promise<AxiosResponse<CreditCardDto, any>>) => {
        req.then((res) => {
            toast.success('변경사항을 저장했어요.');
            reload();
            setIsEditMode(false);
        })
            .catch(errorNotify)
            .finally(() => setLoading(false));
    };

    const onSubmit = async () => {
        if (!currentCreditCard) return;

        const data = plainToInstance(UnSignedCreditCardFormData, formData);

        if (!data.name) {
            toast.error('카드 별칭을 입력해주세요');
            return;
        }

        if (!data.number1 || !data.number2 || !data.number3 || !data.number4) {
            toast.error('카드 번호를 입력해주세요');
            return;
        }

        const [year = '', month = ''] = expiryValues;

        if ((year && !month) || (!year && month)) {
            toast.error('유효기간의 년과 월을 모두 선택해주세요');
            return;
        }

        if (year && month) {
            data.expiry = `${month}${year.slice(2, 4)}`;
        }

        setLoading(true);
        handleResponse(creditCardApi.update(orgId, currentCreditCard.id, data.toUpdateDto()));
    };

    const patch = (data: UpdateCreditCardDto) => {
        if (!currentCreditCard) return;
        const id = currentCreditCard.id;
        setLoading(true);
        handleResponse(creditCardApi.update(orgId, id, data));
    };

    const connectTeam = (team?: TeamDto) => {
        if (!currentCreditCard) return;
        const id = currentCreditCard.id;
        const reloadCard = () => creditCardApi.show(orgId, id);
        const request = (req: () => Promise<any>) => {
            setLoading(true);
            handleResponse(req().then(reloadCard));
        };

        if (team) {
            request(() => creditCardApi.teamsApi.create(id, team.id));
        } else {
            const [attachedTeam] = currentCreditCard.teams || [];
            if (!attachedTeam) return;
            request(() => creditCardApi.teamsApi.destroy(id, attachedTeam.id));
        }
    };

    return {
        currentCreditCard,
        formData,
        setFormValue,
        onSubmit,
        patch,
        connectTeam,
        expiryValues,

        /**
         * Ex.
         *  onYearChange={(year) => setExpiryValues(0, year)}
         *  onMonthChange={(month) => setExpiryValues(1, month)}
         */
        setExpiryValues: (i: number, val: string) => {
            setExpiryValues((arr: string[]) => {
                const newArr = [...arr];
                newArr[i] = val;
                return newArr;
            });
        },
        isEditMode,
        setIsEditMode,
        isLoading,
    };
};

export const useCurrentCreditCardSync = () => {
    const creditCardId = useIdParam('creditCardId');
    const queryClient = useQueryClient();
    const {currentCreditCard, reload: reloadCurrentCreditCard} = useCurrentCreditCard();
    const {currentCodefCard, refetch: reloadCodefCards} = useCodefCardsOfCreditCardShow2(creditCardId);
    const {syncCardWithConfirm, isSyncRunning} = useCodefCardSync();

    const onFinish = () => {
        return Promise.allSettled([
            reloadCurrentCreditCard(),
            reloadCodefCards(),
            queryClient.invalidateQueries({queryKey: [SUBSCRIPTION_HOOK_KEY.listOfCreditCard]}),
            queryClient.invalidateQueries({queryKey: [BILLING_HISTORY_HOOK_KEY.useBillingHistoryListOfCreditCard2]}),
        ]);
    };

    const startSync = () => {
        if (!currentCreditCard) return;
        const {organizationId} = currentCreditCard;

        if (currentCodefCard) {
            syncCardWithConfirm(organizationId, currentCodefCard).then(onFinish);
        } else {
            toast('먼저 카드사를 연결해주세요');
        }
    };

    return {startSync, isSyncRunning, onFinish, currentCodefCard};
};

export const useCreditCardUpdate = () => {
    const {reload} = useCurrentCreditCard();
    const queryClient = useQueryClient();

    return useMutation<CreditCardDto, ErrorResponse, {orgId: number; id: number; data: UpdateCreditCardDto}>({
        mutationFn: ({orgId, id, data}) => creditCardApi.update(orgId, id, data).then((res) => res.data),
        onSuccess: (creditCard) => {
            reload();
            queryClient.setQueryData(['page/subject', 'creditCards', 'detail', creditCard.id], creditCard);
            queryClient.invalidateQueries({queryKey: ['page/subject', 'creditCards', 'list']});
        },
    });
};

export const useUpdateCreditCard = (id: number) => {
    const {reload} = useCurrentCreditCard();
    const queryClient = useQueryClient();
    return useMutation<CreditCardDto, ErrorResponse, {orgId: number; data: UpdateCreditCardDto}>({
        mutationFn: ({orgId, data}) => creditCardApi.update(orgId, id, data).then((res) => res.data),
        onSuccess: (creditCard) => {
            reload();
            queryClient.setQueryData(['page/subject', 'creditCards', 'detail', id], creditCard);
            queryClient.invalidateQueries({queryKey: ['page/subject', 'creditCards', 'list']});
        },
    });
};
