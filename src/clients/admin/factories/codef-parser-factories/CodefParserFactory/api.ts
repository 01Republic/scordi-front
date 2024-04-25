import {api} from '^api/api';
import {plainToInstance} from 'class-transformer';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {ProductDto} from '^models/Product/type';
import {OrganizationDto} from '^models/Organization/type';
import {CodefBillingHistoryDto, FindAllCodefBillingHistoryQueryDto} from '^models/CodefBillingHistory/type';
import {
    CodefParserDataDto,
    CreateCodefParserDto,
    FindOperatorUnitDto,
    UpdateCodefParserDto,
} from './CreateCodefParserDto';
import {CodefCardSearchResultDto} from './CodefCardSearchResult.dto';
import {CodefParserFile} from './CodefParserFile';

export const codefParserFactoryApi = {
    index() {
        const url = '/codef-parser-factories';
        return api.get<CodefParserFile[]>(url).then((res) => {
            res.data = plainToInstance(CodefParserFile, res.data);
            return res;
        });
    },

    show(serviceName: string) {
        const url = `/codef-parser-factories/r/${serviceName}`;
        return api.get<CodefParserDataDto>(url).then((res) => {
            res.data = plainToInstance(CodefParserDataDto, res.data);
            return res;
        });
    },

    create(data: CreateCodefParserDto) {
        const url = '/codef-parser-factories';
        return api.post<CodefParserFile>(url, data).then((res) => {
            res.data = plainToInstance(CodefParserFile, res.data);
            return res;
        });
    },

    update(serviceName: string, data: UpdateCodefParserDto) {
        const url = `/codef-parser-factories/r/${serviceName}`;
        return api.patch<CodefParserFile>(url, data).then((res) => {
            res.data = plainToInstance(CodefParserFile, res.data);
            return res;
        });
    },

    destroy() {
        //
    },

    searchProducts(params: FindOperatorUnitDto) {
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

    searchCodefCards(params: FindAllQueryDto<OrganizationDto>) {
        const url = '/codef-parser-factories/codef-cards';
        return api.get<CodefCardSearchResultDto>(url, {params}).then((res) => {
            res.data = plainToInstance(CodefCardSearchResultDto, res.data);
            return res;
        });
    },
};
