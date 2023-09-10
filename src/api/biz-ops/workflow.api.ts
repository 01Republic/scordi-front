import {api} from '^api/api';
import {AxiosRequestHeaders} from 'axios';
import {TaskFileDto} from '^api/biz-ops/progress.api';

export default {
    collectionPath: () => '/biz-ops/organizations/workflows',
    memberPath: (name: string) => `/biz-ops/organizations/workflows/${name}`,

    run<T>(name: string, data: T, multipart = false) {
        const url = `${this.memberPath(name)}/run`;
        const headers: AxiosRequestHeaders = {};
        if (multipart) {
            headers['Content-Type'] = 'multipart/form-data';
        }
        return api.post<TaskFileDto>(url, data, {headers});
    },
};
