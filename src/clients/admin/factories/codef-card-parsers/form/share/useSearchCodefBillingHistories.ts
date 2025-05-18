import {useState} from 'react';
import {
    FindOperatorType,
    FindOperatorUnitDto,
} from '^admin/factories/codef-parser-factories/CodefParserFactory/CreateCodefParserDto';
import {codefParserFactoryApi} from '^admin/factories/codef-parser-factories/CodefParserFactory/api';
import {CodefBillingHistoryDto, FindAllCodefBillingHistoryQueryDto} from '^models/CodefBillingHistory/type';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {getLikeQueryString} from '^admin/factories/codef-parser-factories/form/share/get-like-query-string';

export function useSearchCodefBillingHistories() {
    const [isLoading, setIsLoading] = useState(false);
    const [codefBillingHistories, setCodefBillingHistories] = useState<CodefBillingHistoryDto[]>([]);

    const search = (params: FindOperatorUnitDto, codefCard?: CodefCardDto) => {
        const {ops = FindOperatorType.Like, fo = false, bo = false, value = ''} = params;
        if (!codefCard && !value) {
            setCodefBillingHistories([]);
            return;
        }

        setIsLoading(true);
        const query = {} as FindAllCodefBillingHistoryQueryDto;
        if (codefCard) query.where = {codefCardId: codefCard.id};
        query.find = {ops, value: getLikeQueryString(fo, bo, value)};
        codefParserFactoryApi
            .searchCodefBillingHistories(query)
            .then((res) => setCodefBillingHistories(res.data))
            .finally(() => setIsLoading(false));
    };

    return {
        isLoading,
        codefBillingHistories,
        search,
    };
}
