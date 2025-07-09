import {CreateProductSimilarNameRequestDto} from '^models/ProductSimilarName/type/CreateProductSimilarName.request.dto';
import {PartialType} from '^types/utils/partial-type';

export class UpdateProductSimilarNameRequestDto extends PartialType(CreateProductSimilarNameRequestDto) {}
