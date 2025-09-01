import {CreateProductSimilarNameRequestDto} from '^models/ProductSimilarName/type';

export interface ProductSimilarNameConnectModalFormValues {
    mappings: {
        id: number;
        data: CreateProductSimilarNameRequestDto;
    }[];
}
