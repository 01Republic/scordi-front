import {useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {CreditCardManager} from '^models/CreditCard/manager';
import {creditCardApi} from '^models/CreditCard/api';
import {orgIdParamState} from '^atoms/common';
import {creditCardListResultAtom} from '^models/CreditCard/atom';
import {PagedResourceAtoms, usePagedResource} from '^hooks/usePagedResource';
import {CreditCardDto, FindAllCreditCardDto} from '^models/CreditCard/type';
import {plainToast as toast} from '^hooks/useToast';
import {ApiError} from '^api/api';

export const useCreditCardsOfOrganization = (isShow: boolean) => {
    const orgId = useRecoilValue(orgIdParamState);
    const [CreditCard, setCreditCardManager] = useState<CreditCardManager>();

    useEffect(() => {
        if (!isShow) return;
        if (!orgId || isNaN(orgId)) return;

        const req = creditCardApi.index(orgId, {
            itemsPerPage: 0,
            relations: ['holdingMember', 'subscriptions'],
        });
        req.then((res) => {
            setCreditCardManager(CreditCardManager.init(res.data.items));
        });
    }, [isShow, orgId]);

    return {CreditCard};
};

export const useCreditCards = () => {
    const {deleteCreditCard, ...pagedResource} = useCreditCardsV3(creditCardListResultAtom);
    return {...pagedResource, deleteCreditCard};
};

const useCreditCardsV3 = (atoms: PagedResourceAtoms<CreditCardDto, FindAllCreditCardDto>, mergeMode = false) => {
    const pagedResource = usePagedResource(atoms, {
        useOrgId: true,
        endpoint: (params, orgId) => creditCardApi.index(orgId, params),
        buildQuery: (params) => ({
            itemsPerPage: 0,
            relations: ['holdingMember', 'subscriptions'],
            ...params,
        }),
        getId: 'id',
        mergeMode,
    });

    const deleteCreditCard = async (creditCard: CreditCardDto, orgId: number) => {
        let msg = '이 결제수단을 정말로 삭제할까요?';

        const arr: string[] = [];
        if (creditCard.subscriptions?.length) {
            arr.push(`[${creditCard.subscriptions?.length}개]의 구독`);
        }
        if (creditCard.billingHistories?.length) {
            arr.push(`[${creditCard.billingHistories?.length}개]의 결제내역`);
        }
        if (arr.length) {
            msg += `\n${arr.join('과 ')}을 담고있어요`;
        }

        if (!confirm(msg)) return;

        return creditCardApi
            .destroy(orgId, creditCard.id)
            .then((res) => {
                if (res) toast.success('삭제했습니다.');
                return res;
            })
            .catch((e: ApiError) => {
                const apiErrorObj = e.response?.data;
                if (apiErrorObj) toast.error(apiErrorObj.message);
            });
    };

    return {deleteCreditCard, ...pagedResource};
};
