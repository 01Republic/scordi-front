import {useEffect, useState} from 'react';
import {atom, useRecoilState, useRecoilValue} from 'recoil';
import {AxiosResponse} from 'axios';
import {plainToInstance} from 'class-transformer';
import {padStart} from 'lodash';
import {toast} from 'react-hot-toast';
import {CreditCardDto, UnSignedCreditCardFormData, UpdateCreditCardDto} from '^models/CreditCard/type';
import {creditCardApi} from '^models/CreditCard/api';
import {useAltForm} from '^hooks/useAltForm';
import {errorNotify} from '^utils/toast-notify';
import {TeamDto} from '^models/Team/type';
import {orgIdParamState} from '^atoms/common';
import {useCodefCardsOfCreditCardShow} from '^models/CodefCard/hook';
import {useSubscriptionListOfCreditCard} from '^models/Subscription/hook';
import {useBillingHistoryListOfCreditCard} from '^models/BillingHistory/hook';
import {useCodefCardSync} from '^models/CodefCard/hooks/useCodefCardSync';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {pick} from '^types/utils/one-of-list.type';

export const creditCardSubjectAtom = atom<CreditCardDto | null>({
    key: 'OrgCreditCardShowPage/creditCardSubjectAtom',
    default: null,
});

export const useCurrentCreditCard = () => {
    const [currentCreditCard, setCurrentCreditCard] = useRecoilState(creditCardSubjectAtom);

    const findOne = async (orgId: number, id: number) => {
        return creditCardApi.show(orgId, id).then((res) => {
            setCurrentCreditCard(res.data);
            return res.data;
        });
    };

    const reload = async () => {
        if (!currentCreditCard) return;
        return findOne(currentCreditCard.organizationId, currentCreditCard.id);
    };

    return {currentCreditCard, setCurrentCreditCard, findOne, reload};
};

export const useCurrentCodefCard = () => {
    const {search, result, reload, isLoading, isNotLoaded, isEmptyResult, clearCache, reset} =
        useCodefCardsOfCreditCardShow();
    const currentCodefCard = pick(result.items[0]);

    const isApiConnected = !isNotLoaded && !!currentCodefCard;
    const isManuallyCreated = !isApiConnected;

    return {
        currentCodefCard,
        isApiConnected,
        isManuallyCreated,
        search,
        reload,
        result,
        isLoading,
        isNotLoaded,
        isEmptyResult,
        clearCache,
        reset,
    };
};

export const useCurrentCreditCardEdit = () => {
    const orgId = useRecoilValue(orgIdParamState);
    const {currentCreditCard, setCurrentCreditCard} = useCurrentCreditCard();
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

            setExpiryValues(() => {
                const year = currentCreditCard.expireYear || 0;
                const month = currentCreditCard.expireMonth || 0;
                return [`${year}`, padStart(`${month}`, 2, '0')];
            });
        }
    }, [isEditMode]);

    const handleResponse = (req: Promise<AxiosResponse<CreditCardDto, any>>) => {
        req.then((res) => {
            toast.success('저장완료');
            setCurrentCreditCard(res.data);
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

        if (expiryValues.length) {
            if (expiryValues.length != 2) {
                toast.error('유효기간 입력이 완료되지 않았습니다');
                return;
            }
            if (expiryValues[0].length != 4 || expiryValues[1].length != 2) {
                toast.error('유효기간 입력이 올바르지 않습니다');
                return;
            }
            const [year, month] = expiryValues;
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
    const {currentCreditCard, reload: reloadCurrentCreditCard} = useCurrentCreditCard();
    const {result, reload: reloadCodefCards} = useCodefCardsOfCreditCardShow();
    const {reload: reloadSubscriptions, isNotLoaded: subscriptionIsNotLoaded} = useSubscriptionListOfCreditCard();
    const {reload: reloadBillingHistories, isNotLoaded: billingHistoryIsNotLoaded} =
        useBillingHistoryListOfCreditCard();
    const {syncCardWithConfirm, isSyncRunning} = useCodefCardSync();
    const currentCodefCard: CodefCardDto | undefined = result.items[0];

    const onFinish = () => {
        return Promise.allSettled([
            reloadCurrentCreditCard(),
            reloadCodefCards(),
            !subscriptionIsNotLoaded && reloadSubscriptions(),
            !billingHistoryIsNotLoaded && reloadBillingHistories(),
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
