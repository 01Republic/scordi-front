import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {Paginated} from '^types/utils/paginated.dto';
import {adminNotificationTemplatesApi} from '../api';
import {NotificationTemplateDto} from '../types';

export const useAdminNotificationTemplates = (params: FindAllQueryDto<NotificationTemplateDto>) => {
    const [query, setQuery] = useState<FindAllQueryDto<NotificationTemplateDto>>(params);
    const queryResult = useQuery({
        queryKey: ['useAdminNotificationTemplates', query],
        queryFn: () => adminNotificationTemplatesApi.index(query).then((res) => res.data),
        initialData: Paginated.init(),
    });

    const search = setQuery;
    const clearQuery = () => search(params);

    return {
        ...queryResult,
        params: query,
        search: setQuery,
        clearQuery,
    };
};
