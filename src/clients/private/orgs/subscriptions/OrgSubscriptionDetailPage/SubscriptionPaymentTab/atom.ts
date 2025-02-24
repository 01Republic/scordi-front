import {useEffect, useState} from 'react';
import {toast} from 'react-hot-toast';
import {useCodefCardSync} from '^models/CodefCard/hooks/useCodefCardSync';
import {CreditCardDto} from '^models/CreditCard/type';
import {useQuery} from '@tanstack/react-query';
import {codefCardApi} from '^models/CodefCard/api';
import {FindAllCardQueryDto} from '^models/CodefCard/type/find-all.card.query.dto';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';

export const useCreditCardSync = (creditCard?: CreditCardDto) => {
    const {syncCardWithConfirm, isSyncRunning} = useCodefCardSync();
    const [params, search] = useState<FindAllCardQueryDto>();
    const queryResult = useQuery({
        queryKey: ['hi hello world', creditCard?.organizationId, creditCard?.id, params],
        queryFn: () =>
            codefCardApi.index(creditCard?.organizationId!, params).then((res) => {
                return res.data.items[0];
            }),
        enabled: !!creditCard?.organizationId && !!params,
        initialData: undefined,
    });
    const codefCard = queryResult.data;

    useEffect(() => {
        if (!creditCard) return;
        search({
            where: {creditCardId: creditCard.id},
            order: {id: 'DESC'},
        });
    }, [creditCard]);

    const startSync = async () => {
        if (!creditCard) return;

        if (codefCard) {
            return syncCardWithConfirm(creditCard.organizationId, codefCard);
        } else {
            toast('먼저 카드사를 연결해주세요');
            return;
        }
    };

    const startSyncStandAlone = async (orgId: number, codefCard: CodefCardDto) => {
        return syncCardWithConfirm(orgId, codefCard);
    };

    return {startSync, isSyncRunning, codefCard, startSyncStandAlone};
};
