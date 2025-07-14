export class CreateProductSimilarNameRequestDto {
    name: string;
    productId?: number | null;
    isBlock?: boolean;
}
