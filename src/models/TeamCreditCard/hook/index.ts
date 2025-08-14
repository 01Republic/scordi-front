// 팀 상세p - 결제탭
import {useState} from 'react';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {teamCreditCardApi} from '^models/TeamCreditCard/api';
import {CreateTeamCreditCardDto, FindAllTeamCreditCardQueryDto} from '^models/TeamCreditCard/type';
import {TEAM_CREDIT_CARD_HOOK_KEY} from '^models/TeamCreditCard/hook/key';
import {usePaginateUtils} from '^hooks/usePagedResource';
import {Paginated} from '^types/utils/paginated.dto';
import {TEAM_HOOK_KEY} from '^models/Team/hook/key';

// 팀 상세p/결제수단 탭 - 결제수단 목록 요청
export const useTeamCreditCard = (orgId: number, teamId: number, param: FindAllTeamCreditCardQueryDto) => {
    const [query, setQuery] = useState(param);

    const queryResult = useQuery({
        queryKey: [TEAM_CREDIT_CARD_HOOK_KEY.base, orgId, query, teamId],
        queryFn: () => teamCreditCardApi.index(orgId, query).then((res) => res.data),
        initialData: Paginated.init(),
        enabled: !!orgId && !isNaN(orgId) && !!teamId,
    });

    return usePaginateUtils({query, setQuery, queryResult});
};

// 팀 상세p/결제수단 탭 - 팀과 결제수단 연결
export const useUpdateTeamCreditCard = (orgId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (dto: CreateTeamCreditCardDto) => teamCreditCardApi.create(orgId, dto).then((res) => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [TEAM_CREDIT_CARD_HOOK_KEY.base], exact: false});
            queryClient.invalidateQueries({queryKey: [TEAM_HOOK_KEY.detail], exact: false, refetchType: 'all'}); // 팀상세 요약패널
        },
    });
};
