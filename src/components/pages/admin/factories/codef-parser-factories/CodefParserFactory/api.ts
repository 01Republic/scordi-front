import {api} from '^api/api';
import {CreateParserDto, QueryUnitDto} from './CreateParserDto';
import {CodefParserFile} from '^admin/factories/codef-parser-factories/CodefParserFactory/CodefParserFile';
import {plainToInstance} from 'class-transformer';
import {ProductDto} from '^models/Product/type';
import {CodefBillingHistoryDto, FindAllCodefBillingHistoryQueryDto} from '^models/CodefBillingHistory/type';

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

    searchProducts(params: QueryUnitDto) {
        const url = '/codef-parser-factories/products';
        return api.get<ProductDto[]>(url, {params}).then((res) => {
            res.data = plainToInstance(ProductDto, res.data);
            return res;
        });
    },

    searchCodefBillingHistories(params: FindAllCodefBillingHistoryQueryDto) {
        const url = '/codef-parser-factories/codef-billing-histories';
        return api.get<CodefBillingHistoryDto[]>(url, {params}).then((res) => {
            res.data = plainToInstance(CodefBillingHistoryDto, res.data);
            return res;
        });
    },
};
