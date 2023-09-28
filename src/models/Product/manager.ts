import {BasicModel} from '^models/BasicModel';
import {ProductDto} from '^types/product.type';

export class ProductManager extends BasicModel<ProductDto> {
    findById(id: number) {
        return this.find((product) => product.id === id);
    }
}
