import {api} from '^api/api';
import {CreateParserDto} from './CreateParserDto';
import {CodefParserFile} from '^admin/factories/codef-parser-factories/CodefParserFactory/CodefParserFile';
import {plainToInstance} from 'class-transformer';

export const codefParserFactoryApi = {
    index() {
        const url = '/codef-parser-factories';
        return api.get<CodefParserFile[]>(url).then((res) => {
            res.data = plainToInstance(CodefParserFile, res.data);
            return res;
        });
    },

    show() {
        //
    },

    create(data: CreateParserDto) {
        const url = '/codef-parser-factories';
        return api.post(url, data);
    },

    update() {
        //
    },

    destroy() {
        //
    },
};
